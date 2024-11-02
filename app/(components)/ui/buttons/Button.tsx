import { ButtonInteraction } from "@/types/global";
import Link from "next/link";
import { tv } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center transition-all duration-200 ease-in-out",
  variants: {
    color: {
      default: "bg-gray-100 text-black hover:bg-gray-200",
      callout: "bg-callout text-black hover:bg-complement",
      accent: "bg-green-500 text-white hover:bg-green-600",
      complement: "bg-purple-500 text-white hover:bg-purple-600",
    },
    size: {
      default: "px-5 py-2 rounded-full text-md",
      slim: "px-6 py-1 rounded-full text-md",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed pointer-events-none",
    },
  },
  // Compound variants (combining multiple conditions)
  compoundVariants: [
    {
      color: "default",
      disabled: true,
      class: "bg-gray-50 text-gray-400",
    },
  ],
  // Default variants
  defaultVariants: {
    color: "default",
    size: "default",
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  interaction: ButtonInteraction;
  color?: Parameters<typeof buttonVariants>[0]['color'];
  size?: Parameters<typeof buttonVariants>[0]['size'];
  disabled?: boolean;
  className?: string;
}

export default function Button({
  text,
  interaction,
  color,
  size,
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  // Render based on interaction type
  const renderButton = () => {
    // Generate classes using Tailwind Variants
    const buttonClasses = buttonVariants({
      color,
      size,
      disabled,
      className
    });

    switch (interaction.type) {
      case 'navigate':
        // External link
        if (interaction.external) {
          return (
            <a
              href={interaction.href}
              className={buttonClasses}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {text}
            </a>
          );
        }
        // Internal navigation
        return (
          <Link
            href={interaction.href}
            className={buttonClasses}
            {...props}
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
            {...props}
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
            {...props}
          >
            {text}
          </button>
        );

      case 'server-action':
        return (
          <form action={interaction.action}>
            <button
              type="submit"
              className={buttonClasses}
              disabled={disabled}
              {...props}
            >
              {text}
            </button>
          </form>
        );

      default:
        throw new Error('Invalid button interaction type');
    }
  };

  return renderButton();
}