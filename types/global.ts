export type ButtonInteraction =
| { type: 'navigate'; href: string; external?: boolean }
| { type: 'download'; href: string }
| { type: 'action'; onClick: () => void | Promise<void> }
| { type: 'server-action'; action: () => Promise<void> };

export type SVGIconProps = {
  color: string;
}