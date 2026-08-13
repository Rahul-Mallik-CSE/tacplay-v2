/** @format */

"use client";

import React from "react";
import LayoutWrapper from "@/components/SharedComponents/LayoutWrapper";
import { useAdminNavItems } from "./AdminSidebarConfig";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navItems = useAdminNavItems();

  return (
    <LayoutWrapper
      navItems={navItems}
      showUpgradeBanner={false}
    >
      {children}
    </LayoutWrapper>
  );
}
