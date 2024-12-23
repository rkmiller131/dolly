import Image from "next/image";

export default function ImageMasonryCard({img}) {
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
      <div
        className={`
          absolute top-2 right-2 z-[-1] px-2 py-1 text-xs text-white
          bg-black/50 rounded-full
        `}
      >
        {img.likes} ♥
      </div>
    </div>
  );
}