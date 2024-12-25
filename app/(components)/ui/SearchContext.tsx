"use client";

import { createContext, useContext, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isPending: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQueryState] = useState(
    searchParams.get("q") || ""
  );

  const setSearchQuery = (query: string) => {
    setSearchQueryState(query);
    startTransition(() => { // in React 19, startTransition will automatically set isPending to true
      // Update URL with search query "q" parameter
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`, { scroll: false });
      router.refresh(); // This triggers a server component rerender
    });
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, isPending }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}