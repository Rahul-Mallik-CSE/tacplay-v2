/** @format */

"use client";

import React from "react";
import LayoutWrapper from "@/components/SharedComponents/LayoutWrapper";
import { useDashboardNavItems } from "./DashboardSidebarConfig";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navItems = useDashboardNavItems();

  return (
    <LayoutWrapper
      navItems={navItems}
      showUpgradeBanner={true}
    >
      {children}
    </LayoutWrapper>
  );
}
