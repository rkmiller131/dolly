"use client";

import { ImagePost } from "@/types/global";
import { useState } from "react";

interface ImageLikesProps {
  img: ImagePost;
}

export default function ImageLikes({ img }: ImageLikesProps) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
    console.log('clicked')
  }
  return (
    <button
      className={`
        absolute top-2 right-2 z-[1] px-2 py-1 text-xs ${clicked ? 'text-red-500' : 'text-white'}
        bg-black/50 rounded-full
      `}
      onClick={handleClick}
    >
      {img.likes} ♥
    </button>
  );
}