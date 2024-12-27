"use client";

import { createContext, useContext, useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isPending: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

function SearchProviderInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQueryState] = useState(
    searchParams.get("q") || ""
  );

  const setSearchQuery = (query: string) => {
    setSearchQueryState(query);
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`, { scroll: false });
      router.refresh();
    });
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, isPending }}>
      {children}
    </SearchContext.Provider>
  );
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <SearchProviderInner>{children}</SearchProviderInner>
    </Suspense>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}