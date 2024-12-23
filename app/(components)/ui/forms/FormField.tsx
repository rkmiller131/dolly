import { ChangeEvent } from "react";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  base: "text-primary px-3 py-1 border-2 border-accent rounded-lg focus:outline-none",
  variants: {
    variant: {
      default: "w-[175px]",
      search: "md:w-[400px]",
      area: "py-2 h-[125px] resize-none"
    }
  }
});

type VariantOptions = "default" | "search" | "area";
type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface FormFieldProps {
  label: string;
  variant?: VariantOptions;
  placeholder?: string;
  onChange?: (e: ChangeEvent<InputElement>) => void;
  value?: string;
  error?: string;
}

export default function FormField({
  label,
  variant = "default",
  placeholder,
  onChange,
  value,
  error,
}: FormFieldProps) {
  const errorBorder = error ? "border-red-400" : "";
  const inputClasses = inputVariants({ variant });
  return variant === "area" ? (
    <div className="flex flex-col">
      <label
        className="font-primary text-accent text-sm md:text-lg"
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      <textarea
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        className={`${inputClasses} ${errorBorder}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  ) : (
    <div className="flex flex-col">
      <label
        className="font-primary text-accent text-sm md:text-lg"
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      <input
        type="text"
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        className={`${inputClasses} ${errorBorder}`}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  )
}