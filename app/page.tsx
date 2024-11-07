import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="hidden fixed z-2 lg:flex self-center min-h-[87dvh] mt-[-8%]">
        <div className="relative">
          <Image
            src="/dolly.png"
            height={1100}
            width={600}
            alt="Dolly Character"
            priority={true}
          />
        </div>
      </div>
      <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-0 md:justify-between">
        <div className="flex flex-col gap-1">
          <label htmlFor="search" className="font-primary text-accent text-sm md:text-lg">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by tag or creator..."
            className="text-primary px-3 border-2 border-accent rounded-md h-[40px] md:w-[400px] focus:outline-none"
          />
        </div>
        <h2 className="text-2xl self-end md:text-4xl md:self-start">
          AI Image Generator
        </h2>
      </div>
      <div className="grid max-h-[68vh] overflow-hidden border border-blue-500">
        Helloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo ooooooooooooooooo oo0000000000000000000000000000000000
      </div>
    </div>
  );
}
