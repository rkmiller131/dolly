"use client";

import { useState } from "react";

interface SizeToggleProps {
  onChange: (ratio: '1:1' | '16:9') => void;
}

export default function SizeToggle({ onChange }: SizeToggleProps) {
  const [selectedSize, setSelectedSize] = useState<'1:1' | '16:9'>("1:1");

  const handleChange = (newSize: '1:1' | '16:9') => {
    setSelectedSize(newSize);
    onChange(newSize);
  };

  return (
    <div className="flex rounded-lg bg-complement border border-accent">
      <div className="flex">
        <input
          type="radio"
          id="1:1"
          name="aspectRatio"
          value="1:1"
          checked={selectedSize === '1:1'}
          onChange={(e) => handleChange(e.target.value as '1:1' | '16:9')}
          className="appearance-none peer/square"
        />
        <label
          htmlFor="1:1"
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
          id="16:9"
          name="aspectRatio"
          value="16:9"
          checked={selectedSize === '16:9'}
          onChange={(e) => handleChange(e.target.value as '1:1' | '16:9')}
          className="appearance-none peer/wide"
        />
        <label
          htmlFor="16:9"
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