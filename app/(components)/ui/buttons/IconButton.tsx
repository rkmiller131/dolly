import Link from "next/link";
import Image from "next/image";

// TODO - flagging because not currently used

interface IconButtonProps {
  href: string;
  className?: string;
  iconPath: string;
  text?:string;
}

export default function IconButton ({ href, className, iconPath, text }: IconButtonProps) {
  console.log(typeof iconPath)
  return (
    <Link
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex">
        <Image
          src={iconPath}
          height={25}
          width={25}
          alt={`Clickable ${text ? text : 'Icon'}`}
        />
        {text && (
          <span className="ml-2">{text}</span>
        )}
      </span>
    </Link>
  );
}