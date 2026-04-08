export interface ContainerProps {
  variant: "wide" | "narrow";
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className="container">
      {children}
    </div>
  );
}