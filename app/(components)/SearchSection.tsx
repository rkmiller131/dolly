"use client";

import { ChangeEvent } from "react";
import FormField from "./ui/forms/FormField";

interface SearchSectionProps {
  onSearch: (value: string) => void;
  initialValue: string;
  isSearching?: boolean;
}

export default function SearchSection({
  onSearch,
  initialValue,
}: SearchSectionProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onSearch(e.target.value);
  };

  return (
    <section className="flex flex-col-reverse gap-4 md:flex-row md:gap-0 md:justify-between">
      <search className="flex flex-col gap-1">
        <FormField
          label="Search"
          placeholder="Search by tag or creator..."
          variant="search"
          onChange={handleInputChange}
          value={initialValue}
        />
      </search>
      <h2 className="text-2xl self-end md:text-4xl md:self-start">
        AI Image Generator
      </h2>
    </section>
  );
}