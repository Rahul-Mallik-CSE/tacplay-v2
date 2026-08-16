/** @format */

"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoutModal from "./LogOutModal";
import UpgradeModal from "./UpgradeModal";
import type { NavItemConfig } from "./NavItem";
import NavItem from "./NavItem";
import { useTranslation } from "react-i18next";

interface AppSidebarProps {
  navItems: NavItemConfig[];
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  onLogout?: () => void;
  showUpgradeBanner?: boolean;
}

export default function AppSidebar({
  navItems,
  logo,
  footer,
  onLogout,
  showUpgradeBanner = false,
}: AppSidebarProps) {
  const { t } = useTranslation("dashboard");
  const { state } = useSidebar();
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const isCollapsed = state === "collapsed";

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    onLogout?.();
  };

  return (
    <>
      <Sidebar
        className={`shadow-none py-4 bg-root-bg border-r border-none ${isCollapsed ? "px-1" : "px-4"}`}
        collapsible="icon"
      >
        <SidebarContent
          className={`bg-background border-t-2 border-l-2 border-r-2 border-[#2C2740] shadow-neutral-600 rounded-t-4xl
                      ${isCollapsed ? "px-0.5" : "px-2"}`}
        >
          {/* Logo */}
          <div
            className={`mb-6 flex items-center justify-center rounded-md ${
              isCollapsed
                ? "flex items-center w-full justify-center mx-auto p-1"
                : "gap-2"
            }`}
          >
            <Link href="/" className="flex gap-2">
              {logo ? (
                logo
              ) : isCollapsed ? (
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
              ) : (
                <div className="mt-2 flex items-center gap-2 h-10">
                  <Image
                    src="/Tacplay-logo-2.png"
                    alt="Logo"
                    width={120}
                    height={120}
                    className="w-40 h-10"
                    priority
                  />
                </div>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <SidebarMenu
            className={
              isCollapsed ? "px-2 space-y-1 items-center" : "md:px-1 space-y-1"
            }
          >
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                exact={item.exact}
                children={item.children}
                active={
                  item.exact
                    ? pathname === item.href
                    : !!(
                        pathname === item.href ||
                        pathname?.startsWith(item.href + "/")
                      )
                }
                collapsed={isCollapsed}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="pb-16 bg-background rounded-b-4xl border-r-2 border-b-2 border-l-2 border-[#2C2740] shadow-neutral-600">
          {showUpgradeBanner && (
            isCollapsed ? (
              <div className="flex justify-center mb-2">
                <Button
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-br from-[#980009] to-[#C00069] border-2 border-[#cdba20] shadow-lg"
                  title={t("sidebar.upgradeToPremium")}
                >
                  <Crown size={18} className="text-[#cdba20]" />
                </Button>
              </div>
            ) : (
              <div className="mx-2 mb-3 rounded-2xl border border-[#C00069] bg-[#100F17] p-3 shadow-[0_0_12px_rgba(192,0,105,0.25)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative shrink-0">
                    <div
                      className="w-12 h-12 bg-[#980009] flex items-center justify-center"
                      style={{
                        clipPath:
                          "polygon(50% 0%,61% 15%,79% 9%,75% 28%,93% 35%,82% 50%,93% 65%,75% 72%,79% 91%,61% 85%,50% 100%,39% 85%,21% 91%,25% 72%,7% 65%,18% 50%,7% 35%,25% 28%,21% 9%,39% 15%)",
                      }}
                    >
                      <Crown size={20} className="text-[#cdba20]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-primary text-sm font-semibold leading-snug mb-0.5">
                      {t("sidebar.upgradeToSilver")}
                    </p>
                    <p className="text-secondary text-xs mb-2">
                      {t("sidebar.unlockMessage")}
                    </p>
                    <Button
                      onClick={() => setIsUpgradeModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#980009] via-[#C00069] to-[#980009] text-white font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-[0_0_10px_rgba(192,0,105,0.4)]"
                    >
                      <Crown size={15} className="text-[#cdba20]" />
                      {t("sidebar.upgrade")}
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}
          {footer}
        </SidebarFooter>
      </Sidebar>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </>
  );
}
