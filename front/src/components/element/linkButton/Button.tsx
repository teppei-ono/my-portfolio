import type { LinkButtonProps } from "@/components/element/linkButton/types";
import LinkButtonPrimary from "@/components/variant/linkButton/primary/LinkButtonPrimary";
import LinkButtonSecondary from "@/components/variant/linkButton/secondary/LinkButtonSecondary";

export default function LinkButton(props: LinkButtonProps) {
  switch (props.variant) {
    case "secondary":
      return <LinkButtonSecondary {...props} />;
    case "primary":
      return <LinkButtonPrimary {...props} />;
    default:
      return <LinkButtonPrimary {...props} />;
  }
}