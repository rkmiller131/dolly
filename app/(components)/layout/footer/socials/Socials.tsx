import Link from "next/link";
import GitHubIcon from "./GitHubIcon";
import LinkedInIcon from "./LinkedInIcon";

export default function Socials () {
  return (
    <div className="flex gap-3">
      <Link
        href="https://www.linkedin.com/in/rachel-miller-mlr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon />
      </Link>
      <Link
        href="https://github.com/rkmiller131/dolly"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </Link>
    </div>
  )
}