/** @format */

"use client";

import React from "react";
import LayoutWrapper from "@/components/SharedComponents/LayoutWrapper";
import { useDashboardNavItems } from "./DashboardSidebarConfig";
import { useAuth } from "@/hooks/use-auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navItems = useDashboardNavItems();
  const { logout } = useAuth();

  return (
    <LayoutWrapper
      navItems={navItems}
      showUpgradeBanner={true}
      onLogout={logout}
    >
      {children}
    </LayoutWrapper>
  );
}
