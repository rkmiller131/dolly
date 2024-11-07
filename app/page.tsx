'use client'

import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const dollyRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsVisible(!e.target.value);
    if (!e.target.value && dollyRef.current) {
      dollyRef.current.style.display = 'flex';
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === 'fade-out') {
      e.currentTarget.style.display = 'none';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="hidden fixed z-2 lg:flex self-center min-h-[87dvh] mt-[-8%]">
        <div
          ref={dollyRef}
          className={`relative ${isVisible ? 'animate-fade-in' : 'animate-fade-out pointer-events-none'}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <Image
            src="/dolly.png"
            height={1100}
            width={600}
            alt="Dolly Character"
            priority={true}
            className="animate-float-3"
          />
          <Image
            src="/paperfall1.png"
            height={97}
            width={200}
            alt="Floating paper 1"
            className="absolute top-[20%] right-0 animate-float-1 delay-700"
          />
          <Image
            src="/paperfall2.png"
            height={97}
            width={200}
            alt="Floating paper 2"
            className="absolute bottom-[32%] left-[17%] animate-float-2"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-0 md:justify-between">
        <div className="flex flex-col gap-1">
          <label htmlFor="search" className="font-primary text-accent text-sm md:text-lg">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by tag or creator..."
            className="text-primary px-3 border-2 border-accent rounded-md h-[40px] md:w-[400px] focus:outline-none"
            onChange={handleInputChange}
          />
        </div>
        <h2 className="text-2xl self-end md:text-4xl md:self-start">
          AI Image Generator
        </h2>
      </div>
      <div className="grid lg:h-[68vh] overflow-hidden border border-blue-500">
        Helloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo ooooooooooooooooo oo0000000000000000000000000000000000
      </div>
    </div>
  );
}
