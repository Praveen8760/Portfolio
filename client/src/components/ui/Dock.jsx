import React from "react";
import { FloatingDock } from "../magicui/floating-dock";
import { IconHome, IconCode, IconUser, IconMail, IconBrandGithub } from "@tabler/icons-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

export function Dock() {
  const links = [
    { title: "Home", icon: <IconHome className="h-6 w-6 text-white" />, href: "#home" },
    { title: "Projects", icon: <IconCode className="h-6 w-6 text-white" />, href: "#projects" },
    { title: "Skills", icon: <IconUser className="h-6 w-6 text-white" />, href: "#skills" },
    { title: "Contact", icon: <IconMail className="h-6 w-6 text-white" />, href: "#contact" },
    { title: "LinkedIn", icon: <LinkedInLogoIcon className="h-6 w-6 text-white" />, href: "https://www.linkedin.com/in/praveenthirumurthy/" },
    { title: "GitHub", icon: <IconBrandGithub className="h-6 w-6 text-white" />, href: "https://github.com/Praveen8760" },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-max flex justify-center">
      <FloatingDock
        items={links}
      />
    </div>
  );
}
