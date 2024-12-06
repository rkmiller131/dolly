"use server";

import OpenAI from "openai";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

type ImageGenerationErrors = {
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
    return {
      errors,
      image: null
    };
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