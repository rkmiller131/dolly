import Image from "next/image";

export default function OpenAI () {
  return (
    <div className="flex flex-col text-xs md:text-sm">
      <span className="flex gap-2">
        Powered by
        <Image
          src="/openai-logo.svg"
          height={24}
          width={88}
          alt="OpenAI Logo"
        />
      </span>
      <span className="font-primary">
        2024 - Next/MERN + DALL • E
      </span>
    </div>
  )
}