"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  User,
  CreditCard,
  Settings,
  Keyboard,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Github,
  LifeBuoy,
  Cloud,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
  const router = useRouter();

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <NavigationMenu className="bg-[#3E1F47] px-4 w-full max-w-none">
      <NavigationMenuList className="flex justify-between w-[1200px]">
        <NavigationMenuItem className="flex items-center space-x-4 py-4">
          <Image
            className="dark:invert"
            src="/assets/images/logo.svg"
            alt="Next.js logo"
            width={35}
            height={35}
            priority
          />
          <span className="text-white">Survival Nexus</span>
        </NavigationMenuItem>
        <div className="flex flex-row space-x-2">
          {items.map((item) => (
            <NavigationMenuItem
              key={item.name}
              className={`py-3 px-12 ${cn(pathname === item.href ? "bg-[#1F0D24]" : "")}`}
            >
              <NavigationMenuLink href={item.href} className="text-white text-sm">
                {item.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </div>
        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="border-2 border-white cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AppNavigation;
