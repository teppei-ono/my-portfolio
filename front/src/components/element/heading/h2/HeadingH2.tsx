import type { HeadingH2Props } from "./types";
import styles from "./styles.module.scss";

export default function HeadingH2({ variant = "en", children, className }: HeadingH2Props) {
  return (
    <h2 className={`${styles.headingH2} ${styles[`headingH2--${variant}`]} ${className}`}>
      {children}
    </h2>
  );
}