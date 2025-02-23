"use client";

import Link from "next/link";
import Button from "../../ui/buttons/Button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const color = pathname === "/create" ? "complement" : "callout";
  return (
    <nav className="w-full bg-secondary drop-shadow-md">
      <div className="container px-5 mx-auto py-5 flex justify-between items-center lg:px-0">
        <Link href="/" className="text-2xl font-semi-bold hover:text-callout transition-colors duration-200">
          DOLLY
        </Link>
        <Button
          text="Create"
          interaction={{ type: "navigate", href: "/create" }}
          color={color}
        />
      </div>
    </nav>
  )
}