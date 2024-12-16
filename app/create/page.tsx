"use client";

import React, { useState } from "react";
import CreateForm from "../(components)/ui/forms/CreateForm";
import AspectImage from "../(components)/ui/AspectImage";
import Button from "../(components)/ui/buttons/Button";
import IconButton from "../(components)/ui/buttons/IconButton";
import HeaderSubtitle from "../(components)/HeaderSubtitle";
import { AspectRatio, FormDetails, FormErrors } from "@/types/global";
import { generateImage, saveGeneratedImage } from "@/utils/actions";

export default function Create() {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    name: "",
    prompt: "",
    image: "",
    aspectRatio: "1024x1024" as AspectRatio
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormChange = (newDetails: FormDetails) => {
    // when user starts typing, clear the errors by deleting from err obj
    const clearedErrors: FormErrors = { ...errors };
    if (newDetails.prompt !== formDetails.prompt) {
      delete clearedErrors.prompt;
    }
    if (newDetails.name !== formDetails.name) {
      delete clearedErrors.name;
    }
    setErrors(clearedErrors);
    setFormDetails(newDetails);
  };

  const onGenerateHandler = async () => {
    setIsGenerating(true);
    const formData = new FormData();
    formData.append("prompt", formDetails.prompt);
    formData.append("aspectRatio", formDetails.aspectRatio);

    try {
      const result = await generateImage(formData);
      if (result.errors) {
        setErrors(result.errors);
      } else if (result.image) {
        setFormDetails({ ...formDetails, image: result.image });
        // Clear any previous errors
        setErrors({});
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setErrors({
        ...errors,
        general: "An unexpected error occurred"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const submitToCommunity = async () => {
    if (!formDetails.image) return;

    try {
      const result = await saveGeneratedImage(formDetails);
      if (result.errors) {
        setErrors(result.errors);
      }
    } catch (error) {
      console.error('Error submitting to community:', error);
    }
  };

  return (
    <>
      <div className={`
        absolute z-[-1] left-0 top-[10%]
        w-full h-full
        bg-paint-palette bg-cover bg-center bg-no-repeat
        lg:top-12 lg:w-[75%]`}
      />
      <div className="flex flex-col gap-20 justify-between items-center min-h-[78.5dvh] lg:flex-row lg:gap-20">
        <section className="flex flex-col gap-10 lg:w-[53%]">
          <HeaderSubtitle
            header="Create"
            subtitle="Generate an imaginative image through DALL•E AI and download or share it with the community."
          />
          <CreateForm
            formDetails={formDetails}
            errors={errors}
            onFormChange={handleFormChange}
            onGenerate={onGenerateHandler}
          />
        </section>
        <div className="flex flex-col items-center gap-5 mb-20 lg:mb-0">
          <AspectImage
            aspectRatio={formDetails.aspectRatio}
            isGenerating={isGenerating}
            generatedImage={formDetails.image}
          />
          {formDetails.image && (
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <IconButton
                href={formDetails.image}
                iconPath="/download-icon.svg"
                text="Download"
                variant="download"
              />
              <Button
                text={errors.name ? errors.name : "Share with the community"}
                interaction={{ type: "action", onClick: submitToCommunity }}
                className={errors.name && "bg-red-400 border-white text-white"}
                disabled={errors.name ? true : false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
