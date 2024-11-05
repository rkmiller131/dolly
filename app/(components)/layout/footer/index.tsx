import OpenAI from "./OpenAI";
import Socials from "./socials/Socials";

export default function Footer () {
  return (
    <footer className="w-full">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <OpenAI />
        <Socials />
      </div>
    </footer>
  )
}