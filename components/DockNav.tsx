"use client";
import { CardContainer } from "./CardContainer";
import { NavDropdown } from "./NavDropdown";
import { Share, Link, Send } from "lucide-react";

const iconSizeStyles = "h-5 w-5";
const menuItemIconSize = "h-3 w-3";

export const DockNav = () => {
  const shareMenuItems = [
    {
      title: "share via ...",
      icon: <Share className={menuItemIconSize} />,
      onClick: () =>
        navigator.share({
          title: "cant have it all :(",
          text: "check out what you cant have",
          url: window.location.href,
        }),
    },
    {
      title: "copy link",
      icon: <Link className={menuItemIconSize} />,
      onClick: () => navigator.clipboard.writeText(window.location.href),
    },
  ];
  return (
    <CardContainer className="absolute bottom-20 justify-center">
      <nav>
        <NavDropdown title="share" menuItems={shareMenuItems}>
          <Send className={iconSizeStyles} />
        </NavDropdown>
      </nav>
    </CardContainer>
  );
};
