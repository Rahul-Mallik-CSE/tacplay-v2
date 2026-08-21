/** @format */

"use client";

import { LayoutGrid, Settings, BarChart3, CircleHelp, Package, Users, Megaphone, MessageCircle } from "lucide-react";
import { CiTrophy } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
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
      href: "/dashboard/field-profile",
      icon: GrUserManager,
      label: t("sidebar.fieldProfile"),
      subItems: [
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
      href: "/dashboard/marketing",
      icon: Megaphone,
      label: t("sidebar.marketing"),
      subItems: [
        {
          href: "/dashboard/marketing/overview",
          icon: Megaphone,
          label: t("marketing.overview"),
        },
        {
          href: "/dashboard/marketing/campaigns",
          icon: Megaphone,
          label: t("marketing.campaigns"),
        },
        {
          href: "/dashboard/marketing/email",
          icon: Megaphone,
          label: t("marketing.email"),
        },
        {
          href: "/dashboard/marketing/sms",
          icon: Megaphone,
          label: t("marketing.sms"),
        },
        {
          href: "/dashboard/marketing/push-notification",
          icon: Megaphone,
          label: t("marketing.pushNotification"),
        },
        {
          href: "/dashboard/marketing/vouchers",
          icon: Megaphone,
          label: t("marketing.vouchers"),
        },
      ],
      separator: true,
    },
    {
      href: "/dashboard/staff",
      icon: Users,
      label: t("sidebar.staff"),
    },
    {
      href: "/dashboard/analytics",
      icon: BarChart3,
      label: t("sidebar.analytics"),
    },
    {
      href: "/dashboard/subscription",
      icon: Package,
      label: t("subscription.title"),
      subItems: [
        {
          href: "/dashboard/subscription/overview",
          icon: Package,
          label: t("subscription.tabs.overview"),
        },
        {
          href: "/dashboard/subscription/billing-history",
          icon: Package,
          label: t("subscription.tabs.billingHistory"),
        },
        {
          href: "/dashboard/subscription/payment-methods",
          icon: Package,
          label: t("subscription.tabs.paymentMethods"),
        },
      ],
      
    },
    {
      href: "/dashboard/chat",
      icon: MessageCircle,
      label: t("sidebar.chat"),
      separator: true,
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
