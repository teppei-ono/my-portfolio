import type { ContainerWideProps } from "@/components/element/container/types";
import styles from "./styles.module.scss";

export default function ContainerWide({ className, children, ...rest }: ContainerWideProps) {
  return (
    <div
      {...rest}
      className={[styles.containerWide, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}