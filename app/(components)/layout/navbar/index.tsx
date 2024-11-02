import Button from "../../ui/buttons/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-secondary drop-shadow-md">
      <div className="container mx-auto py-4 flex justify-between">
        <h1 className="text-2xl">
          DOLLY
        </h1>
        <Button
          text="Create"
          interaction={{ type: 'navigate', href: '/create' }}
          color="callout"
        />
      </div>
    </nav>
  )
}