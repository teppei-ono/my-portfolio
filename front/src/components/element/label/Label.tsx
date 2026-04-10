import styles from "./styles.module.scss";
import type { LabelSize } from "./types";

export type LabelProps = {
  text: string;
  size?: LabelSize; // default: md
  className?: string;
};

export default function Label({ text, size = "md", className }: LabelProps) {
  return (
    <span
      className={[styles.label, styles[size], className].filter(Boolean).join(" ")}
    >
      {text}
    </span>
  );
}