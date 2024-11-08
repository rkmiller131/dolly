import { ButtonInteraction } from "@/types/global";
import Link from "next/link";
import { tv } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex items-center justify-center transition-all duration-200 ease-in-out font-semibold drop-shadow-xl border",
  variants: {
    color: {
      callout: "bg-callout border-callout text-black hover:bg-[#7DE9FF]",
      accent: "bg-accent border-accent text-secondary hover:bg-primary hover:text-white",
      complement: "bg-complement border-complement text-accent hover:bg-[#2D3137] hover:border-accent",
    },
    size: {
      default: "px-6 py-2 rounded-full text-md",
      slim: "px-6 py-1 rounded-full text-md",
    },
    disabled: {
      true: "pointer-events-none",
    },
  },
  compoundVariants: [
    {
      color: "callout",
      disabled: true,
      class: "bg-complement border-accent text-accent",
    },
  ],
  defaultVariants: {
    color: "callout",
    size: "default",
  },
});

type ColorOptions = "callout" | "accent" | "complement";
type SizeOptions = "default" | "slim";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  interaction: ButtonInteraction;
  color?: ColorOptions;
  size?: SizeOptions;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  text,
  interaction,
  color,
  size,
  disabled = false,
  className
}: ButtonProps) {
  const renderButton = () => {
    const buttonClasses = buttonVariants({
      color,
      size,
      disabled,
      className
    });

    switch (interaction.type) {
      case "navigate":
        // External link
        if (interaction.external) {
          return (
            <Link
              href={interaction.href}
              className={buttonClasses}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </Link>
          );
        }
        // Internal navigation
        return (
          <Link
            href={interaction.href}
            className={buttonClasses}
          >
            {text}
          </Link>
        );

      case 'download':
        return (
          <a
            href={interaction.href}
            download
            className={buttonClasses}
          >
            {text}
          </a>
        );

      case 'action':
        return (
          <button
            onClick={interaction.onClick}
            className={buttonClasses}
            disabled={disabled}
          >
            {text}
          </button>
        );

      case 'server-action':
        return (
          <button
            type="submit"
            onClick={interaction.action}
            className={buttonClasses}
            disabled={disabled}
          >
            {text}
          </button>
        );

      default:
        throw new Error('Invalid button interaction type');
    }
  };

  return renderButton();
}