import { getImages } from "@/utils/actions";
import ImageMasonryCard from "./ImageMasonryCard";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ImageMasonryGrid({ searchParams }: Props) {
  const params = await searchParams; // As of Next 15, this API for dynamic rendering has been made asynchronous.
  const searchQuery = typeof params.q === 'string' ? params.q : undefined;
  const images = await getImages(searchQuery);

  return (
    <div className='columns-1 sm:columns-3 md:columns-4 lg:columns-6 gap-2'>
      {images.map((img) => (
        <ImageMasonryCard key={img.id} img={img} />
      ))}
    </div>
  );
}