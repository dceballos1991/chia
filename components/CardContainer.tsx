import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const CardContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex gap-4 items-center max-w-md w-full p-2 md:p-4 backdrop-blur-[2px] bg-transparent z-10 rounded-md shadow",
        className
      )}
    >
      {children}
    </div>
  );
};
