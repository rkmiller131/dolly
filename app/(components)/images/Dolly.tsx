"use client";

import { useRef } from "react";
import Image from "next/image";
import dollyImg from "../../../public/dolly.webp";
import paperfall1 from "../../../public/paperfall1.webp";
import paperfall2 from "../../../public/paperfall2.webp";

interface DollyProps {
  isVisible: boolean
}

export default function Dolly({ isVisible }: DollyProps) {
  const dollyRef = useRef<HTMLDivElement>(null);
  if (isVisible && dollyRef.current) {
    dollyRef.current.style.display = "flex";
  }

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === "fade-out") {
      e.currentTarget.style.display = "none";
    }
  };

  return (
    <div className="hidden fixed z-[5] lg:flex self-center min-h-[87dvh] w-auto mt-[-8%] pointer-events-none">
      <div
        ref={dollyRef}
        className={`relative ${isVisible ? 'animate-fade-in' : 'animate-fade-out'}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <Image
          src={dollyImg}
          height={1100}
          width={600}
          alt="Dolly Character"
          // priority
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
  );
}