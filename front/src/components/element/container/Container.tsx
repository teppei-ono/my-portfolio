import type { ContainerProps } from "@/components/element/container/types";
import ContainerTop from "@/components/variant/container/top/ContainerTop";
import ContainerWide from "@/components/variant/container/wide/ContainerWide";
import ContainerLower from "@/components/variant/container/lower/ContainerLower";

export default function Container(props: ContainerProps) {
  switch (props.variant) {
    case "top":
      return <ContainerTop {...props} />;
    case "wide":
      return <ContainerWide {...props} />;
    case "lower":
      return <ContainerLower {...props} />;
  };
}