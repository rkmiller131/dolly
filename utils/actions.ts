"use server";

import { AspectRatio } from "@/types/global";
import { revalidatePath } from "next/cache";

interface GenerateImageData {
  name: string;
  prompt: string;
  aspectRatio: AspectRatio;
}

export async function generateImage(formData: FormData) {
  const name = formData.get("name") as string;
  const prompt = formData.get("prompt") as string;
  const aspectRatio = formData.get("aspectRatio") as AspectRatio;

  if (!name || !prompt || !aspectRatio) {
    throw new Error('Missing required fields');
  }

  const data: GenerateImageData = {
    name,
    prompt,
    aspectRatio
  };

  // Here you would call your AI image generation service
  // const image = await yourImageService.generate(data);

  // For now, just log the data
  console.log('Generating image with data:', data);

  // Revalidate the page to show the new image
  revalidatePath('/create');

  // Return the data (or generated image URL in production)
  return data;
}