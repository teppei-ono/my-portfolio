import type { LabelItem } from "@/components/element/label/types";

export type MediaLinkProps = {
  href: string;

  imageSrc: string;
  imageAlt: string;

  labels?: LabelItem[];

  title: React.ReactNode;

  className?: string;
};