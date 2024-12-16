import Image from "next/image";

const images = [
  {
    id: 1,
    name: "Test",
    image: "https://res.cloudinary.com/dnr41r1lq/image/upload/v1734283251/ai-generated/w8kgmgiwdscqbutadkkt.png",
    aspectRatio: "1792x1024",
    likes: 2
  },
  {
    id: 2,
    name: "Test",
    image: "https://res.cloudinary.com/dnr41r1lq/image/upload/v1734197678/ai-generated/xtdwwgeyvsaz6shw9l7o.png",
    aspectRatio: "1024x1024",
    likes: 1
  },
  {
    id: 3,
    name: "Test",
    image: "https://res.cloudinary.com/dnr41r1lq/image/upload/v1734199274/ai-generated/w39dsya5xzruxtdyipei.png",
    aspectRatio: "1024x1024",
    likes: 0
  },
  {
    id: 4,
    name: "Test",
    image: "https://res.cloudinary.com/dnr41r1lq/image/upload/v1734283251/ai-generated/w8kgmgiwdscqbutadkkt.png",
    aspectRatio: "1792x1024",
    likes: 2
  },
  {
    id: 5,
    name: "Test",
    image: "https://res.cloudinary.com/dnr41r1lq/image/upload/v1734199274/ai-generated/w39dsya5xzruxtdyipei.png",
    aspectRatio: "1024x1024",
    likes: 0
  },
]
export default function ImageMasonryGrid () {
  const getImageClasses = (aspectRatio: string) => {
    switch (aspectRatio) {
      case '1792x1024':
        return 'col-span-2 row-span-1';
      case '1024x1024':
        return 'col-span-1 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <div
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6
                 gap-1 lg:gap-2"
    >
      {images.map((img) => (
        <div
          key={img.id}
          className={`relative ${img.aspectRatio === "1024x1024" ? "aspect-square" : "aspect-[16.2/8]"}
            ${getImageClasses(img.aspectRatio)}
            overflow-hidden group cursor-pointer`}
        >
          <Image
            src={img.image}
            alt={img.name}
            fill
            className="sticky z-[-1] object-cover group-hover:scale-105 transition-transform duration-300"
            // sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
          />
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs z-[-1]">
            {img.likes} ♥
          </div>
        </div>
      ))}
    </div>
  );
}