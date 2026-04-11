import type { HeadingH2Props } from "./types";
import styles from "./styles.module.scss";

export default function HeadingH2({ variant = "en", children, className, isCentered = false }: HeadingH2Props) {
  const headingH2Classes = [
    styles.headingH2,
    styles[`headingH2--${variant}`],
    isCentered && styles["headingH2--centered"],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <h2 className={headingH2Classes} data-io>
      {children}
    </h2>
  );
}