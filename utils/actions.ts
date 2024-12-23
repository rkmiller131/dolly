"use server";

import OpenAI from "openai";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { FormDetails } from "@/types/global";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

type ImageGenerationErrors = {
  prompt?: string;
  general?: string;
};

type ImageSubmissionErrors = {
  name?: string;
  prompt?: string;
  general?: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const generateImageSchema = z.object({
  prompt: z.string().min(1, "Please enter a prompt"),
  aspectRatio: z.enum(["1024x1024", "1792x1024"]).default("1024x1024")
});

export async function generateImage(formData: FormData) {
  const validatedFields = generateImageSchema.safeParse({
    prompt: formData.get("prompt"),
    aspectRatio: formData.get("aspectRatio")
  });

  if (!validatedFields.success) {
    const errors: ImageGenerationErrors = {};
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    if (fieldErrors.prompt) {
      errors.prompt = fieldErrors.prompt[0];
    }
    return { errors, image: null };
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: validatedFields.data.prompt,
      n: 1,
      size: validatedFields.data.aspectRatio,
    });

    // Upload to Cloudinary
    const cloudinaryResponse = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload(
        response.data[0].url!,
        { folder: "ai-generated" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!.secure_url);
        }
      );
    });

    return {
      errors: null,
      image: cloudinaryResponse
    };
  } catch (error) {
    console.error("Image generation error:", error);
    return {
      errors: {
        general: `Image generation failed - ${error}`
      },
      image: null
    };
  }
}

const submitImageSchema = z.object({
  name: z.string().min(1, "Please enter your name first"),
  prompt: z.string().min(1, "Prompt required"),
  image: z.string().min(1, "Image required"),
  aspectRatio: z.enum(["1024x1024", "1792x1024"]).default("1024x1024")
});

export async function saveGeneratedImage(formDetails: FormDetails) {
  const validatedFields = submitImageSchema.safeParse(formDetails);

  if (!validatedFields.success) {
    const errors: ImageSubmissionErrors = {};
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    if (fieldErrors.prompt) {
      errors.prompt = fieldErrors.prompt[0];
    }
    if (fieldErrors.name) {
      errors.name = fieldErrors.name[0];
    }
    return { errors, image: null };
  }

  try {
    await prisma.post.create({
      data: {
        name: validatedFields.data.name,
        prompt: validatedFields.data.prompt,
        image: validatedFields.data.image,
        aspectRatio: validatedFields.data.aspectRatio
      }
    });
    revalidatePath('/');
  } catch (error) {
    console.error("Image submission error:", error);
    return {
      errors: {
        general: `Image submission failed - ${error instanceof Error ? error.message : 'Unknown error'}`
      },
      image: null
    };
  }
  redirect("/");
}

export async function getImages(textFilter?: string) {
  try {
    if (!textFilter) {
      return await prisma.post.findMany({
        orderBy: [
          { likes: "desc" },
          { createdAt: "desc" },
        ],
        take: 20,
      });
    }

    const images = await prisma.post.findMany({
      where: {
        OR: [
          { name: { contains: textFilter, mode: "insensitive" } },
          { prompt: { contains: textFilter, mode: "insensitive" } },
        ],
      },
      orderBy: [
        { likes: "desc" },
        { createdAt: "desc" },
      ],
      take: 20,
    });

    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Unable to fetch images.");
  }
}