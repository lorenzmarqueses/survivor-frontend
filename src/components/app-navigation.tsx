"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import React from "react";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Image from "next/image";

const items = [
  {
    name: "Report",
    href: "/report",
  },
  {
    name: "Survivors",
    href: "/survivors",
  },
  {
    name: "Inventory",
    href: "/inventory",
  },
];

const AppNavigation: React.FC = () => {
  const pathname = usePathname();

  const activeNavCss = (href: string) => (pathname === href ? "bg-[#1F0D24]" : "");

  return (
    <NavigationMenu className="bg-[#3E1F47]">
      <NavigationMenuList className="flex justify-between py-4 max-w-[1200px] mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 mr-32">
            <Image
              className="dark:invert"
              src="/assets/images/logo.svg"
              alt="Next.js logo"
              width={35}
              height={35}
              priority
            />
            <NavigationMenuItem>
              <span className="text-white">Survival Nexus</span>
            </NavigationMenuItem>
          </div>
          {items.map((item) => (
            <NavigationMenuItem key={item.name} className={`py-3 px-12 ${activeNavCss(item.href)}`}>
              <NavigationMenuLink href={item.href} className="text-white text-sm">
                {item.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </div>
        <NavigationMenuItem>
          <Avatar className="border-2 border-white">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AppNavigation;
