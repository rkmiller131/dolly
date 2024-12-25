import { Suspense } from "react";
import ImageMasonryGrid from "./(components)/images/ImageMasonryGrid";
import DollySearchInteraction from "./(components)/DollySearchInteraction";
import { SearchProvider } from "./(components)/ui/SearchContext";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <SearchProvider>
      <div className="flex flex-col gap-8">
        <DollySearchInteraction />
        <div className="lg:h-[68vh] overflow-hidden">
          <Suspense fallback={<div>Loading...</div>}>
            <ImageMasonryGrid searchParams={searchParams}/>
          </Suspense>
        </div>
      </div>
    </SearchProvider>
  );
}
