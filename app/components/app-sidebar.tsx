"use client";
import { Album, BadgeInfo, Home, Wrench } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin/home",
    icon: Home,
  },
  {
    title: "Albums",
    url: "/admin/albums",
    icon: Album,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: Wrench,
  },
  {
    title: "About",
    url: "/admin/about",
    icon: BadgeInfo,
  },
];

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar className="bg-black shadow-md">
      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent className="text-white text-xl font-bold">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={path === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
