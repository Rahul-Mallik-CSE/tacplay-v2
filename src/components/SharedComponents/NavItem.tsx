/** @format */

"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export interface NavItemConfig {
  href: string;
  icon: React.ElementType;
  label: string;
}

interface NavItemProps extends NavItemConfig {
  active: boolean;
  collapsed?: boolean;
}

export default function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-full w-12 h-10 mx-auto"
              : "flex items-center gap-3 h-10 md:h-10 rounded-md p-3 transition-colors text-sm",
            active
              ? "bg-custom-red text-primary hover:bg-custom-red! hover:text-white! font-medium border-4 border-border shadow-md"
              : "text-secondary hover:bg-transparent! hover:text-primary! font-medium",
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && <span className="text-base">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
