"use client";

import React, { useState } from "react";
import CreateForm from "../(components)/ui/forms/CreateForm";
import { AspectRatio } from "@/utils/actions";
import AspectImage from "../(components)/ui/AspectImage";
import Button from "../(components)/ui/buttons/Button";
import IconButton from "../(components)/ui/buttons/IconButton";
import HeaderSubtitle from "../(components)/HeaderSubtitle";
import { FormDetails } from "@/types/global";

export default function Create() {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    name: "",
    prompt: "",
    image: "",
    aspectRatio: "1080x1080" as AspectRatio
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormChange = (newDetails: FormDetails) => {
    setFormDetails(newDetails);
  };

  const generateImage = async () => {
    if (!formDetails.prompt) return;

    setIsGenerating(true);
    try {
      // Call OpenAI API
      console.log('Generating image with:', formDetails);
      // Update formDetails.image with the generated image URL
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const submitToCommunity = async () => {
    if (!formDetails.image || !formDetails.name) return;

    try {
      // Call API to save to db
      console.log('Submitting to community:', formDetails);
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
        <section className="flex flex-col gap-10">
          <HeaderSubtitle
            header="Create"
            subtitle="Generate an imaginative image through DALL•E AI and download or share it with the community."
          />
          <CreateForm
            formDetails={formDetails}
            onFormChange={handleFormChange}
            onGenerate={generateImage}
          />
        </section>
        <div className="flex flex-col items-center gap-5 mb-20 lg:mb-0">
          <AspectImage
            aspectRatio={formDetails.aspectRatio}
            isGenerating={isGenerating}
          />
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <IconButton
              href=""
              iconPath="/download-icon.svg"
              text="Download"
            />
            <Button
              text="Share with the community"
              interaction={{ type: "action", onClick: submitToCommunity }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
