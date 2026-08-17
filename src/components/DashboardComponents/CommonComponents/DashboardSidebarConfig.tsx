/** @format */

"use client";

import { LayoutGrid, Settings, BarChart3, CircleHelp } from "lucide-react";
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
      href: "/dashboard/bookings",
      icon: IoDocumentTextOutline,
      label: t("sidebar.bookings"),
    },
    {
      href: "/dashboard/sessions",
      icon: CiTrophy,
      label: t("sidebar.sessions"),
    },
    
    {
      href: "/dashboard/earnings",
      icon: BiMoneyWithdraw,
      label: t("sidebar.earnings"),
    },
    {
      href: "/dashboard/analytics",
      icon: BarChart3,
      label: t("sidebar.analytics"),
    },
    {
      href: "/dashboard/field-profile",
      icon: GrUserManager,
      label: t("sidebar.fieldProfile"),
      children: [
        {
          href: "/dashboard/field-profile/field-details",
          icon: GrUserManager,
          label: t("arena.tabs.fieldDetails"),
        },
        {
          href: "/dashboard/field-profile/field-setup",
          icon: GrUserManager,
          label: t("arena.tabs.fieldSetup"),
        },
        {
          href: "/dashboard/field-profile/package-management",
          icon: GrUserManager,
          label: t("arena.tabs.packageManagement"),
        },
        {
          href: "/dashboard/field-profile/opening-hours",
          icon: GrUserManager,
          label: t("arena.tabs.openingHours"),
        },
        {
          href: "/dashboard/field-profile/payout-details",
          icon: GrUserManager,
          label: t("arena.tabs.payoutDetails"),
        },
        {
          href: "/dashboard/field-profile/ai-pricing",
          icon: GrUserManager,
          label: t("arena.tabs.aiPricing"),
        },
        {
          href: "/dashboard/field-profile/billings",
          icon: GrUserManager,
          label: t("arena.tabs.billings"),
        },
      ],
    },
    {
      href: "/dashboard/help-support",
      icon: CircleHelp,
      label: t("sidebar.helpSupport"),
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      label: t("common.settings"),
    },
  ];
}
