"use server";

import OpenAI from "openai";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { FormDetails, ImagePost } from "@/types/global";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { Prisma } from "@prisma/client";

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

const dbImageSchema = z.object({
  id: z.string(),
  name: z.string(),
  prompt: z.string(),
  image: z.string(),
  aspectRatio: z.string(),
  likes: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const imagePostSchema = z.object({
  id: z.string(),
  name: z.string(),
  prompt: z.string(),
  image: z.string(),
  aspectRatio: z.enum(["1024x1024", "1792x1024"]),
  likes: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export async function getImages(textFilter?: string): Promise<ImagePost[]> {
  try {
    const baseQuery = {
      orderBy: [
        { likes: 'desc' as const },
        { createdAt: 'desc' as const }
      ],
      take: textFilter ? 200 : 30,
      where: textFilter ? {
        OR: [
          { name: { contains: textFilter, mode: 'insensitive' } },
          { prompt: { contains: textFilter, mode: 'insensitive' } }
        ]
      } : undefined
    } satisfies Prisma.PostFindManyArgs;

    const dbImages = await prisma.post.findMany(baseQuery);

    const validatedDbImages = dbImages.map(img => dbImageSchema.parse(img));

    return validatedDbImages.map(img => imagePostSchema.parse({
      ...img,
      createdAt: img.createdAt.toISOString(),
      updatedAt: img.updatedAt.toISOString(),
      aspectRatio: img.aspectRatio === "1792x1024" ? "1792x1024" : "1024x1024"
    }));

  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Unable to fetch images.");
  }
}

export async function likeImage(id: string, change: number) {
  try {
    await prisma.post.update({
      where: { id },
      data: {
        likes: {
          increment: change
        }
      }
    });
  } catch (error) {
    console.error("Error liking image:", error);
    throw new Error("Unable to like image.");
  }
  revalidatePath('/');
}