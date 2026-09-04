"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Coins, FileText, FolderArchive, Moon, Sun } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Katalog", href: "/catalog", icon: Coins },
  { name: "Karty informacyjne", href: "/cards", icon: FileText },
  { name: "Dodatkowe materiały", href: "/materials", icon: FolderArchive },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Coins className="text-primary h-6 w-6" />
          <span className="font-bold tracking-tight">Coin Vault</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <SidebarMenu>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton isActive={isActive} tooltip={item.name}>
                  <Link href={item.href} className="flex w-full items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:bg-muted hover:text-foreground w-full cursor-pointer justify-start gap-3"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute left-4 h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

          <span className="dark:hidden">Tryb ciemny</span>
          <span className="hidden dark:inline">Tryb jasny</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
