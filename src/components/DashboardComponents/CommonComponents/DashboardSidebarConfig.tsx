/** @format */

"use client";

import { LayoutGrid, Settings } from "lucide-react";
import { CiTrophy } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import type { NavItemConfig } from "@/components/SharedComponents/NavItem";

export function useDashboardNavItems(): NavItemConfig[] {
  const { t } = useTranslation("dashboard");

  return [
    {
      href: "/dashboard",
      icon: LayoutGrid,
      label: t("common.dashboard"),
      exact: true,
    },
    {
      href: "/dashboard/sessions",
      icon: CiTrophy,
      label: t("sidebar.sessions"),
    },
    {
      href: "/dashboard/booking-list",
      icon: IoDocumentTextOutline,
      label: t("sidebar.bookingList"),
    },
    {
      href: "/dashboard/earnings",
      icon: BiMoneyWithdraw,
      label: t("sidebar.earnings"),
    },
    {
      href: "/dashboard/arena-management",
      icon: GrUserManager,
      label: t("sidebar.arenaManagement"),
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      label: t("common.settings"),
    },
  ];
}
