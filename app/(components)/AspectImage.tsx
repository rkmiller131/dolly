"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/utils/actions";

interface AspectImageProps {
  aspectRatio: AspectRatio;
  generatedImage?: string;
}

export default function AspectImage({
  aspectRatio,
  generatedImage
}: AspectImageProps) {
  const [dimensions, setDimensions] = useState({
    width: 500,
    height: 500
  });
  const [imageToShow, setImageToShow] = useState("/no-image1-1.webp");

  useEffect(() => {
    if (aspectRatio === "1920x1080") {
      setDimensions({ width: 640, height: 360 });
      setImageToShow("/no-image16-9.webp");
    } else {
      setDimensions({ width: 500, height: 500 });
      setImageToShow("/no-image1-1.webp");
    }
    if (generatedImage) {
      setImageToShow(generatedImage);
    }
  }, [aspectRatio, generatedImage])

  return (
    <div className="relative bg-secondary border border-accent">
      <Image
        src={imageToShow}
        alt="Generated Image"
        height={dimensions.height}
        width={dimensions.width}
        className="object-contain"
      />
    </div>
  );
}