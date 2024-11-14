import { AspectRatio } from "@/types/global";

interface SizeToggleProps {
  selectedSize: AspectRatio;
  onAspectChange: (size: AspectRatio) => void;
}

export default function SizeToggle({ selectedSize, onAspectChange }: SizeToggleProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAspectChange(e.target.value as AspectRatio);
  };

  return (
    <div className="flex rounded-lg bg-complement border border-accent">
      <div className="flex">
        <input
          type="radio"
          id="1024x1024"
          name="aspectRatio"
          value="1024x1024"
          checked={selectedSize === "1024x1024" as AspectRatio}
          onChange={handleChange}
          className="appearance-none peer/square"
        />
        <label
          htmlFor="1024x1024"
          className={`
            px-4 py-2 rounded-md text-sm font-medium cursor-pointer
            shadow-[inset_3px_4px_5px_rgba(0,0,0,0.6)]
            transition-all duration-200
            peer-checked/square:bg-accent peer-checked/square:text-secondary peer-checked/square:shadow-none
            text-gray-500 hover:text-white
          `}
        >
          1:1
        </label>

        <input
          type="radio"
          id="1792x1024"
          name="aspectRatio"
          value="1792x1024"
          checked={selectedSize === "1792x1024"}
          onChange={handleChange}
          className="appearance-none peer/wide"
        />
        <label
          htmlFor="1792x1024"
          className={`
            px-3 py-2 rounded-md text-sm font-medium cursor-pointer
            shadow-[inset_3px_4px_5px_rgba(0,0,0,0.6)]
            transition-all duration-200
            peer-checked/wide:bg-accent peer-checked/wide:text-secondary peer-checked/wide:shadow-none
            text-gray-500 hover:text-white
          `}
        >
          16:9
        </label>
      </div>
    </div>
  );
}