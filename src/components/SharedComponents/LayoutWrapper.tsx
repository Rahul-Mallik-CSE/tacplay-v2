/** @format */

"use client";

import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import NavBar from "./NavBar";
import type { NavItemConfig } from "./NavItem";

interface LayoutWrapperProps {
  children: React.ReactNode;
  navItems: NavItemConfig[];
  onLogout?: () => void;
  showUpgradeBanner?: boolean;
  sidebarFooter?: React.ReactNode;
  logo?: React.ReactNode;
  pageTitle?: string;
}

export default function LayoutWrapper({
  children,
  navItems,
  onLogout,
  showUpgradeBanner = false,
  sidebarFooter,
  logo,
  pageTitle,
}: LayoutWrapperProps) {
  return (
    <SidebarProvider>
      <AppSidebar
        navItems={navItems}
        onLogout={onLogout}
        showUpgradeBanner={showUpgradeBanner}
        footer={sidebarFooter}
        logo={logo}
      />
      <SidebarInset className="overflow-x-hidden">
        <div className="bg-root-bg min-h-screen">
          <NavBar pageTitle={pageTitle} onLogout={onLogout} />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
