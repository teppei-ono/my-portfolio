import Link from "next/link";
import { isHttpUrl } from "@/utils/isHttpUrl";
import type { LinkButtonProps } from "@/components/element/linkButton/types";
import styles from "./styles.module.scss";

export default function LinkButtonPrimary({ href, children, className, ariaLabel }: LinkButtonProps) {
  const classes = [styles.linkButtonPrimary, className].filter(Boolean).join(" ");

  if (isHttpUrl(href)) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}