import OpenAI from "./OpenAI";
import Socials from "./socials/Socials";

export default function Footer () {
  return (
    <footer className="w-full">
      <div className="container px-4 mx-auto py-4 flex justify-between items-center md:px-0">
        <OpenAI />
        <Socials />
      </div>
    </footer>
  )
}