/** @format */

"use client";

import React from "react";
import LayoutWrapper from "@/components/SharedComponents/LayoutWrapper";
import { useAdminNavItems } from "./AdminSidebarConfig";
import { useAuth } from "@/hooks/use-auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navItems = useAdminNavItems();
  const { logout } = useAuth();

  return (
    <LayoutWrapper
      navItems={navItems}
      showUpgradeBanner={false}
      onLogout={logout}
    >
      {children}
    </LayoutWrapper>
  );
}
