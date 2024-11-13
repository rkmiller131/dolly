import Link from "next/link";
import Image from "next/image";

interface IconButtonProps {
  href: string;
  className?: string;
  iconPath: string;
  text?:string;
}

export default function IconButton ({ href, className, iconPath, text }: IconButtonProps) {
  return (
    <Link
      href={href}
      className={`
        text-accent text-lg
        border border-transparent rounded-full
        px-5 py-2
        transition-border duration-300 ease-in-out
        hover:border-accent
        ${className}`
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex">
        <Image
          src={iconPath}
          height={25}
          width={27}
          alt={`Clickable ${text ? text : 'Icon'}`}
        />
        {text && (
          <span className="ml-2">{text}</span>
        )}
      </span>
    </Link>
  );
}