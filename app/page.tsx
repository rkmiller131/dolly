"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import FormField from "./(components)/ui/forms/FormField";
import dollyImg from "../public/dolly.webp";
import paperfall1 from "../public/paperfall1.webp";
import paperfall2 from "../public/paperfall2.webp";
import ImageMasonryGrid from "./(components)/ui/ImageMasonryGrid";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const dollyRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsVisible(!e.target.value);
    if (!e.target.value && dollyRef.current) {
      dollyRef.current.style.display = "flex";
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === "fade-out") {
      e.currentTarget.style.display = "none";
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="hidden fixed z-2 lg:flex self-center min-h-[87dvh] mt-[-8%]">
        <div
          ref={dollyRef}
          className={`relative ${isVisible ? 'animate-fade-in' : 'animate-fade-out pointer-events-all'}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <Image
            src={dollyImg}
            height={1100}
            width={600}
            alt="Dolly Character"
            priority
            className="animate-float-3"
          />
          <Image
            src={paperfall1}
            height={97}
            width={200}
            alt="Floating paper 1"
            className="absolute top-[20%] right-0 animate-float-1 delay-700"
          />
          <Image
            src={paperfall2}
            height={97}
            width={200}
            alt="Floating paper 2"
            className="absolute bottom-[32%] left-[17%] animate-float-2"
          />
        </div>
      </div>
      <section className="flex flex-col-reverse gap-4 md:flex-row md:gap-0 md:justify-between">
        <search className="flex flex-col gap-1">
          <FormField
            label="Search"
            placeholder="Search by tag or creator..."
            variant="search"
            onChange={handleInputChange}
          />
        </search>
        <h2 className="text-2xl self-end md:text-4xl md:self-start">
          AI Image Generator
        </h2>
      </section>
      <div className="lg:h-[68vh] overflow-hidden border border-blue-500">
        <ImageMasonryGrid />
      </div>
    </div>
  );
}
