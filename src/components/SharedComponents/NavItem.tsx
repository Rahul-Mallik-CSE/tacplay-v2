/** @format */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export interface NavItemConfig {
  href: string;
  icon: React.ElementType;
  label: string;
  exact?: boolean;
  subItems?: NavItemConfig[];
  separator?: boolean;
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
  subItems,
}: NavItemProps) {
  const pathname = usePathname();
  const hasSubItems = subItems && subItems.length > 0;

  const isChildActive = subItems?.some(
    (child: NavItemConfig) =>
      pathname === child.href || pathname?.startsWith(child.href + "/")
  );

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isChildActive) {
      setIsExpanded(true);
    }
  }, [isChildActive]);

  if (hasSubItems) {
    return (
      <SidebarMenuItem>
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              collapsed
                ? "flex items-center justify-center px-2 py-3 transition-colors rounded-xl w-12 h-10 mx-auto cursor-pointer"
                : "flex items-center gap-3 h-11 rounded-xl p-3 transition-colors text-sm w-full cursor-pointer",
              active || isChildActive
                ? "bg-gradient-to-r from-[#3d0e18] via-[#2a0a12] to-[#1a0810] text-white hover:text-white! font-medium shadow-[inset_0_0_20px_rgba(152,0,9,0.15)] border border-white/5"
                : "text-secondary hover:bg-transparent! hover:text-primary! font-medium"
            )}
          >
            <Icon size={collapsed ? 20 : 18} />
            {!collapsed && (
              <>
                <span className="text-base flex-1 text-left">{label}</span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                />
              </>
            )}
          </button>

          {isExpanded && !collapsed && (
            <div className="ml-5 mt-1 mb-2 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/20" />
              <div className="space-y-0">
                {subItems.map((child: NavItemConfig) => {
                  const isChildItemActive =
                    pathname === child.href ||
                    pathname?.startsWith(child.href + "/");
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "relative flex items-center h-10 pl-6 pr-3 transition-colors text-sm",
                        isChildItemActive
                          ? "text-custom-yellow font-medium"
                          : "text-gray-400 hover:text-primary"
                      )}
                    >
                      <div className="absolute left-0 top-1/2 w-4 h-[1px] bg-white/20" />
                      <span>{child.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
          <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-xl w-12 h-10 mx-auto"
              : "flex items-center gap-3 h-10 md:h-10 rounded-lg p-3 transition-colors text-sm",
            active
              ? "bg-linear-to-r from-[#232327] via-[#432428] to-[#232327] text-white hover:bg-[#232327]! hover:text-white! font-medium  border-none"
              : "text-secondary hover:bg-transparent! hover:text-primary! font-medium"
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && <span className="text-base">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
