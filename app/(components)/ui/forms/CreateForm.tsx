import { getRandomPrompt } from "@/utils/prompts";
import Button from "../buttons/Button";
import SizeToggle from "../buttons/SizeToggle";
import FormField from "./FormField";
import { FormDetails, FormErrors } from "@/types/global";
import { AspectRatio } from "@/utils/actions";

interface CreateFormProps {
  formDetails: FormDetails;
  errors: FormErrors;
  onFormChange: (newDetails: FormDetails) => void;
  onGenerate: () => void;
}

export default function CreateForm({ formDetails, errors, onFormChange, onGenerate }: CreateFormProps) {
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    onFormChange({
      ...formDetails,
      prompt: randomPrompt
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onFormChange({
      ...formDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleAspectRatioChange = (newAspectRatio: AspectRatio) => {
    onFormChange({
      ...formDetails,
      aspectRatio: newAspectRatio
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-end justify-between">
        <FormField
          label="Name"
          placeholder="Creator tag"
          value={formDetails.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <SizeToggle
          selectedSize={formDetails.aspectRatio}
          onAspectChange={handleAspectRatioChange}
        />
      </div>
      <FormField
        label="Prompt"
        variant="area"
        onChange={handleInputChange}
        value={formDetails.prompt}
        error={errors.prompt}
      />
      <div className="self-end flex gap-4">
        <Button
          text="Surprise me"
          interaction={{ type: "action", onClick: handleSurpriseMe }}
          color="complement"
          size="slim"
        />
        <Button
          text="Generate"
          // interaction={{ type: "server-action", action: generateImage }}
          interaction={{ type: "action", onClick: onGenerate }}
          color="accent"
          size="slim"
        />
      </div>
    </form>
  )
}