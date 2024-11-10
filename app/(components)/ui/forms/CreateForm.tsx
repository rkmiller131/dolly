"use client"
import Button from "../buttons/Button";
import SizeToggle from "../buttons/SizeToggle";
import FormField from "./FormField";

interface CreateFormProps {
  changeAspectRatio: (newRatio: "1:1" | "16:9") => void;
}

export default function CreateForm({ changeAspectRatio }: CreateFormProps) {
  return (
    <form className="flex flex-col gap-5">
      <div className="flex items-end justify-between">
        <FormField
          label="Name"
          placeholder="Creator tag"
        />
        <SizeToggle onChange={changeAspectRatio}/>
      </div>
      <FormField
        label="Prompt"
        variant="area"
      />
      <div className="self-end flex gap-4">
        <Button
          text="Surprise me"
          interaction={{ type: "navigate", href: "/create" }}
          color="complement"
          size="slim"
        />
        <Button
          text="Generate"
          interaction={{ type: "navigate", href: "/create" }}
          // interaction={{ type: "server-action", action: () => {} }}
          color="accent"
          size="slim"
        />
      </div>
    </form>
  )
}