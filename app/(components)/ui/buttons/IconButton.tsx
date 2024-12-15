import Link from "next/link";
import Image from "next/image";

interface IconButtonProps {
  href: string;
  className?: string;
  iconPath: string;
  text?:string;
  variant: "download" | "link";
}

export default function IconButton ({ href, className, iconPath, text, variant }: IconButtonProps) {
  const downloadHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    fetch(href)
      .then(response => response.blob())
      .then(blob => {
        // Next.js blocks the download attribute on both anchor tags and Next/Link.
        // With url download links we have to fetch the image and create a blob
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'dolly_image'; // Filename when they download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Download failed:', error);
      });
  }

  const renderIcon = () => (
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
  );

  const baseClass = `
    text-accent text-lg
    border border-transparent rounded-full
    px-5 py-2
    transition-border duration-300 ease-in-out
    hover:border-accent
    ${className}`

  return variant === "download" ? (
    <div
      className={`${baseClass} cursor-pointer`}
      onClick={downloadHandler}
    >
      {renderIcon()}
    </div>
  ) : (
    <Link
      href={href}
      className={baseClass}
      target="_blank"
      rel="noopener noreferrer"
    >
      {renderIcon()}
    </Link>
  );
}