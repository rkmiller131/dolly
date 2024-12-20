'use client';

import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [videoClass, setVideoClass] = useState("top-0 left-0 z-10 object-cover w-full h-full");

  return (
    <>
      <video
        loop={false}
        autoPlay={true}
        muted
        className={`fixed ${videoClass}`}
        onEnded={() => setVideoClass("hidden")}
      >
        <source src="/stinger.webm" type="video/webm" />
      </video>
      {children}
    </>
  );
}