"use client";

import { useState } from "react";
import CreateForm from "../(components)/ui/forms/CreateForm";
import Template from "./template";
import Image from "next/image";
import { AspectRatio } from "@/utils/actions";
import AspectImage from "../(components)/AspectImage";

export default function Create() {
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1080x1080" as AspectRatio);
  const changeAspectRatio = (newRatio: "1:1" | "16:9") => {
    const ratio = (newRatio === "1:1" ? "1080x1080" : "1920x1080") as AspectRatio;
    setAspectRatio(ratio);
  }
  return (
    <Template>
      <Image
        src="/paint-palette.svg"
        height={1417}
        width={1264}
        alt="Paint Palette Background"
        className="absolute z-[-1] left-0 top-12 md:left-auto md:top-0"
      />
      <div className="flex flex-col gap-20 lg:flex-row lg:gap-20 justify-between items-center min-h-[78.5dvh]">
        <section className="flex flex-col gap-10">
          <div>
            <h2 className="text-4xl font-primary mb-3">
              Create
            </h2>
            <p className="text-lg font-secondary">
              Generate an imaginative image through DALL•E AI and download or share it with the community.
            </p>
          </div>
          <CreateForm changeAspectRatio={changeAspectRatio}/>
        </section>
        <AspectImage
          aspectRatio={aspectRatio}
        />
        {/* <Image
          src="/no-image1-1.webp"
          alt="No Image Generated Yet"
          height={500}
          width={500}
        /> */}
      </div>
    </Template>
  )
}
