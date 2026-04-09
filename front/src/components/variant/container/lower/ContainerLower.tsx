import type { ContainerLowerProps } from "@/components/element/container/types";
import styles from "./styles.module.scss";

export default function ContainerLower({ className, children, variant, ...rest }: ContainerLowerProps) {
  return (
    <div
      {...rest}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}