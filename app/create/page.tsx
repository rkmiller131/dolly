"use client";

import { useState } from "react";
import CreateForm from "../(components)/ui/forms/CreateForm";
import { AspectRatio } from "@/utils/actions";
import AspectImage from "../(components)/ui/AspectImage";
import Button from "../(components)/ui/buttons/Button";
import IconButton from "../(components)/ui/buttons/IconButton";
import HeaderSubtitle from "../(components)/HeaderSubtitle";

type FormDetails = {
  name: string;
  prompt: string;
  image: string;
  aspectRatio: AspectRatio;
}

export default function Create() {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    name: "",
    prompt: "",
    image: "",
    aspectRatio: "1080x1080" as AspectRatio
  });
  const changeAspectRatio = (newRatio: AspectRatio) => {
    setFormDetails({
      ...formDetails,
      aspectRatio: newRatio
    });
  }
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
          <CreateForm changeAspectRatio={changeAspectRatio}/>
        </section>
        <div className="flex flex-col items-center gap-5 mb-20 lg:mb-0">
          <AspectImage
            aspectRatio={formDetails.aspectRatio}
          />
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <IconButton
              href=""
              iconPath="/download-icon.svg"
              text="Download"
            />
            <Button
              text="Share with the community"
              interaction={{ type: "action", onClick: () => {} }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
