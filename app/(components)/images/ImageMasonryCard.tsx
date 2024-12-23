import Image from "next/image";

export default function ImageMasonryCard({img}) {
  return (
    <div key={img.id}
      className={`relative mb-2 break-inside-avoid group cursor-pointer`}
    >
      <Image
        src={img.image}
        alt={img.name}
        width={img.aspectRatio === "1024x1024" ? 1024 : 1792}
        height={1024}
        className="sticky z-[-2] object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs z-[-1]">
        {img.likes} ♥
      </div>
    </div>
  )
}