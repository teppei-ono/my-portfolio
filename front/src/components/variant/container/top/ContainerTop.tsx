import type { ContainerTopProps } from "@/components/element/container/types";
import styles from "./styles.module.scss";

export default function ContainerTop({ className, children, ...rest }: ContainerTopProps) {
  return (
    <div
      {...rest}
      className={[styles.containerTop, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}