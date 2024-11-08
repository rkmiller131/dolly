import Button from "../buttons/Button";
import FormField from "./FormField";

export default function CreateForm() {
  return (
    <form className="flex flex-col gap-3">
        <FormField
          label="Name"
          placeholder="Creator tag"
        />
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