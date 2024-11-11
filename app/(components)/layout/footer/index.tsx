import OpenAI from "./OpenAI";
import Socials from "./socials/Socials";

export default function Footer () {
  return (
    <footer className="w-full">
      <div className="container px-5 mx-auto py-5 flex justify-between items-center lg:px-0">
        <OpenAI />
        <Socials />
      </div>
    </footer>
  )
}