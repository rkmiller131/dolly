import { getImages } from "@/utils/actions";
import ImageMasonryCard from "./ImageMasonryCard";

export default async function ImageMasonryGrid () {
  const images2 = await getImages();
  return (
    <div className='columns-1 sm:columns-3 md:columns-4 lg:columns-6 gap-2'>
      {images2.map((img) => (
        <ImageMasonryCard key={img.id} img={img} />
      ))}
    </div>
  );
}