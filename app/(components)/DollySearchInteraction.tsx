"use client";

import { useState } from "react";
import Dolly from "./images/Dolly";
import SearchSection from "./SearchSection";

export default function DollySearchInteraction() {
  const [isVisible, setIsVisible] = useState(true);

  const handleSearch = (value: string) => {
    setIsVisible(!value);
  };

  return (
    <>
      <Dolly isVisible={isVisible} />
      <SearchSection onSearch={handleSearch} />
    </>
  )
}