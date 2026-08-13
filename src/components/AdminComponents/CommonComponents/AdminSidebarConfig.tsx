/** @format */

"use client";

import { LayoutGrid, Users, Settings, Shield, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { NavItemConfig } from "@/components/SharedComponents/NavItem";

export function useAdminNavItems(): NavItemConfig[] {
  const { t } = useTranslation("dashboard");

  return [
    {
      href: "/admin",
      icon: LayoutGrid,
      label: t("adminSidebar.overview"),
    },
    {
      href: "/admin/users",
      icon: Users,
      label: t("adminSidebar.users"),
    },
    {
      href: "/admin/arenas",
      icon: Shield,
      label: t("adminSidebar.arenas"),
    },
    {
      href: "/admin/analytics",
      icon: BarChart3,
      label: t("adminSidebar.analytics"),
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: t("common.settings"),
    },
  ];
}
