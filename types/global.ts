export type ButtonInteraction =
| { type: 'navigate'; href: string; external?: boolean }
| { type: 'download'; href: string }
| { type: 'action'; onClick: () => void | Promise<void> }
| { type: 'server-action'; action: (args: unknown) => Promise<void> };

export type AspectRatio = "1024x1024" | "1792x1024";

export type FormDetails = {
  name: string;
  prompt: string;
  image: string;
  aspectRatio: AspectRatio;
}

export type FormErrors = {
  name?: string;
  prompt?: string;
}