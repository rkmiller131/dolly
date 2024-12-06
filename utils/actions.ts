"use server";

import OpenAI from "openai";
import { z } from "zod";

type ImageGenerationErrors = {
  prompt?: string;
  general?: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID
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
  console.log('validatedFields ', validatedFields)

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

    return {
      errors: null,
      image: response.data[0].url
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