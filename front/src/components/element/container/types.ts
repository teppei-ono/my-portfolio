// types.ts
import type React from "react";

export type ContainerVariant = "top" | "wide" | "lower";

export type ContainerBaseProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

// 各variantは Base + 自分だけの props + variant リテラル
export type ContainerTopProps = ContainerBaseProps & {
  variant: "top"; // smはデフォルトにしたいなら optional でもOK
};

export type ContainerWideProps = ContainerBaseProps & {
  variant: "wide";
};

export type ContainerLowerProps = ContainerBaseProps & {
  variant: "lower";
};

// Container が受け取る型（ここが肝）
export type ContainerProps =
  | ContainerTopProps
  | ContainerWideProps
  | ContainerLowerProps;