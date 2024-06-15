import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export function NavDropdown({
  children,
  title,
  tooltipContent,
  menuItems,
}: {
  children: ReactNode;
  title?: string;
  tooltipContent: string;
  menuItems: {
    title: string;
    icon?: ReactNode;
    onClick?: () => void;
    href?: string;
  }[];
}) {
  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <span className="sr-only">{tooltipContent}</span>
              {children}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" className="flex items-center gap-4">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-56" side="top">
        {title && (
          <>
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          {menuItems.map((item) => {
            if (item.href) {
              return (
                <a key={item.title} href={item.href} target="_blank">
                  <DropdownMenuItem>
                    {item.title}
                    {item.icon && (
                      <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                </a>
              );
            }
            return (
              <DropdownMenuItem key={item.title} onClick={item.onClick}>
                {item.title}
                {item.icon && (
                  <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
