import ImageMasonryGrid from "./(components)/images/ImageMasonryGrid";
import DollySearchInteraction from "./(components)/DollySearchInteraction";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <DollySearchInteraction />
      <div className="lg:h-[68vh] overflow-hidden border border-blue-500">
        <ImageMasonryGrid />
      </div>
    </div>
  );
}
