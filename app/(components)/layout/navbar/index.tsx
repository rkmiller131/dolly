import Link from "next/link";
import Button from "../../ui/buttons/Button";

export default function Navbar() {
  return (
    <nav className="w-full bg-secondary drop-shadow-md">
      <div className="container mx-auto py-4 flex justify-between">
        <Link href="/" className="text-2xl font-semi-bold hover:text-callout transition-colors duration-200">
          DOLLY
        </Link>
        <Button
          text="Create"
          interaction={{ type: "navigate", href: "/create" }}
          color="callout"
        />
      </div>
    </nav>
  )
}