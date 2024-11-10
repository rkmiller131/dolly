"use client"

import { getRandomPrompt } from "@/utils/prompts";
import Button from "../buttons/Button";
import SizeToggle from "../buttons/SizeToggle";
import FormField from "./FormField";
import React, { useState } from "react";
import { generateImage } from "@/utils/actions";

interface CreateFormProps {
  changeAspectRatio: (newRatio: "1:1" | "16:9") => void;
}

export default function CreateForm({ changeAspectRatio }: CreateFormProps) {
  const [promptValue, setPromptValue] = useState('');

  const handleSurpriseMe = () => {
    const prompt = getRandomPrompt();
    setPromptValue(prompt);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPromptValue(e.target.value);
  };

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
        onChange={handleInputChange}
        value={promptValue}
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
          interaction={{ type: "server-action", action: generateImage }}
          color="accent"
          size="slim"
        />
      </div>
    </form>
  )
}