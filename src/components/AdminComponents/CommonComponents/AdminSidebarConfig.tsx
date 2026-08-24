/** @format */

"use client";

import {
  LayoutGrid,
  Users,
  Settings,
  BarChart3,
  DollarSign,
  Megaphone,
  Percent,
  CreditCard,
} from "lucide-react";
import { GiSoccerField } from "react-icons/gi";
import { FaUserGroup } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import type { NavItemConfig } from "@/components/SharedComponents/NavItem";

export function useAdminNavItems(): NavItemConfig[] {
  const { t } = useTranslation("dashboard");

  return [
    {
      href: "/admin",
      icon: LayoutGrid,
      label: t("adminSidebar.overview"),
      exact: true,
    },
    {
      href: "/admin/field-management",
      icon: GiSoccerField,
      label: t("adminSidebar.fieldManagement"),
    },
    {
      href: "/admin/player-management",
      icon: FaUserGroup,
      label: t("adminSidebar.playerManagement"),
    },
    {
      href: "/admin/staff",
      icon: Users,
      label: t("sidebar.staff"),
      subItems: [
        {
          href: "/admin/staff/staff-management",
          icon: Users,
          label: t("sidebar.staffManagement"),
        },
        {
          href: "/admin/staff/role-management",
          icon: Users,
          label: t("sidebar.roleManagement"),
        },
      ],
      
    },
    {
      href: "/admin/marketing",
      icon: Megaphone,
      label: t("sidebar.marketing"),
      subItems: [
        {
          href: "/admin/marketing/overview",
          icon: Megaphone,
          label: t("marketing.overview"),
        },
        {
          href: "/admin/marketing/campaigns",
          icon: Megaphone,
          label: t("marketing.campaigns"),
        },
        {
          href: "/admin/marketing/email",
          icon: Megaphone,
          label: t("marketing.email"),
        },
        {
          href: "/admin/marketing/sms",
          icon: Megaphone,
          label: t("marketing.sms"),
        },
        {
          href: "/admin/marketing/push-notification",
          icon: Megaphone,
          label: t("marketing.pushNotification"),
        },
        {
          href: "/admin/marketing/vouchers",
          icon: Megaphone,
          label: t("marketing.vouchers"),
        },
      ],
      separator: true,
    },
    {
      href: "/admin/analytics",
      icon: BarChart3,
      label: t("adminSidebar.analytics"),
    },
    {
      href: "/admin/earning",
      icon: DollarSign,
      label: t("adminSidebar.earning"),
    },
    // {
    //   href: "/admin/commission-management",
    //   icon: Percent,
    //   label: t("adminSidebar.commissionManagement"),
    // },
    {
      href: "/admin/subscription-management",
      icon: CreditCard,
      label: t("adminSidebar.subscriptionManagement"),
      
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: t("common.settings"),
      separator: true,
    },
  ];
}
