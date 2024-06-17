"use client";
import { useState } from "react";
import { CardContainer } from "./CardContainer";
import { NavDropdown } from "./NavDropdown";
import {
  Share,
  Link,
  Send,
  FlaskConical,
  Ghost,
  Heart,
  AudioLines,
} from "lucide-react";
import { AboutMePopover } from "./AboutMePopover";

const iconSizeStyles = "h-5 w-5";
const menuItemIconSize = "h-3 w-3";

export const DockNav = () => {
  const [copiedLink, setCopiedLink] = useState(false);

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
      onClick: () => {
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(() => {
          setTimeout(() => {
            setCopiedLink(false);
          }, 2000);
          return true;
        });
      },
    },
  ];

  const projectsMenuItems = [
    {
      title: "doodleNoir",
      icon: <Ghost className="h-4 w-4" />,
      href: "https://doodlenoir.com",
    },
    {
      title: "@dc1b3l",
      icon: "x.com",
      href: "https://www.x.com/dc1b3l",
    },
    {
      title: "hungry hearts",
      icon: <Heart className="h-4 w-4" />,
      href: "https://open.spotify.com/artist/1QxEmFYxF3QbTLRekIBafb?si=MRJ1ULzxQPGKxE5U8uxM7g",
    },
    {
      title: "gloom.wav",
      icon: <AudioLines className="h-4 w-4" />,
      href: "https://soundcloud.com/user-962728801-920656170",
    },
  ];

  return (
    <CardContainer className="absolute bottom-20 justify-center w-[calc(100%-1rem)]">
      <nav className="w-full flex justify-center gap-2">
        <NavDropdown
          menuItems={shareMenuItems}
          tooltipContent={copiedLink ? "copied!" : "share"}
        >
          <Send className={iconSizeStyles} />
        </NavDropdown>
        <NavDropdown
          menuItems={projectsMenuItems}
          tooltipContent={"projects"}
          title="my projects (and friends)"
        >
          <FlaskConical className={iconSizeStyles} />
        </NavDropdown>
        <AboutMePopover />
      </nav>
    </CardContainer>
  );
};
