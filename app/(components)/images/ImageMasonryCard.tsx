import Image from "next/image";
import ImageLikes from "../ui/buttons/ImageLikes";

import { ImagePost } from "@/types/global";

interface ImageMasonryCardProps {
  img: ImagePost;
}

export default function ImageMasonryCard({ img }: ImageMasonryCardProps) {
  const trimmedPrompt = img.prompt.length > 100 ? img.prompt.slice(0, 100) + "..." : img.prompt;
  return (
    <div
      key={img.id}
      className={"relative mb-2 break-inside-avoid group cursor-pointer"}
    >
      <Image
        src={img.image}
        alt={img.name}
        width={img.aspectRatio === "1024x1024" ? 1024 : 1792}
        height={1024}
        className={`
          sticky z-[-2] object-cover transition-transform duration-300
          group-hover:scale-105
        `}
      />
      <div
        className={`
          absolute top-0 w-full h-full z-[-2] hidden bg-black/50
          group-hover:scale-105 group-hover:flex group-hover:flex-col
          group-hover:justify-between
        `}
      >
        <div className="p-4 text-sm font-secondary">{img.name}</div>
        <div className={"w-full py-3 px-4 text-xs bg-black/75 font-primary"}>
          {trimmedPrompt}
        </div>
      </div>
      <ImageLikes img={img}/>
    </div>
  );
}