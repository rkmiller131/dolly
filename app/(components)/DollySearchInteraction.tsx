"use client";

import Dolly from "./images/Dolly";
import SearchSection from "./ui/SearchSection";
import { useSearch } from "./ui/SearchContext";

export default function DollySearchInteraction() {
  const { searchQuery, setSearchQuery, isPending } = useSearch();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <>
      <Dolly isVisible={!searchQuery} />
      <SearchSection
        onSearch={handleSearch}
        initialValue={searchQuery}
        isSearching={isPending}
      />
    </>
  );
}
