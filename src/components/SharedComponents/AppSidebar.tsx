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
        className={`shadow-none py-4 bg-background border-r border-none ${isCollapsed ? "px-1" : "px-2"}`}
        collapsible="icon"
      >
        <SidebarContent
          className={`bg-background 
                      ${isCollapsed ? "px-0.5" : "px-1"}`}
        >
          {/* Logo */}
          <div
            className={`mb-1 flex items-center justify-center rounded-md ${
              isCollapsed
                ? "flex items-center w-full justify-center mx-auto "
                : "gap-2"
            }`}
          >
            <Link href="/" className="flex gap-2">
              {logo ? (
                logo
              ) : isCollapsed ? (
                <Image src="/logo.png" alt="Logo" width={40} height={40} 
                    className="pb-4 pt-1"
                    />
              ) : (
                <div className="w-full h-16 flex items-center gap-2 pb-2 border-b-2 border-white/10 ">
                  <Image
                    src="/Tacplay-logo-2.png"
                    alt="Logo"
                    width={520}
                    height={520}
                    className="w-52 h-14"
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
              <React.Fragment key={item.href}>
                {item.separator && (
                  <div className="my-2 mx-2  border-t border-white/10" />
                )}
                <NavItem
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  exact={item.exact}
                  subItems={item.subItems}
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
              </React.Fragment>
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="pb-2 bg-background ">
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
              <div className="mx-2 mb-3 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-linear-to-b from-[#DC2727] via-[#b80000] to-[#8b0000] p-3 relative">
                  <div className="mb-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-0.5">
                      <Image
                        src="/bronze.png"
                        alt="Bronze Badge"
                        width={64}
                        height={64}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  </div>
                  <h3 className="text-white text-lg font-semibold ">
                    Upgrade to Silver!
                  </h3>
                  <p className="text-white/80 text-sm mb-2 leading-relaxed">
                    Upgrade your account and unlock all of the benefits.
                  </p>
                  <Button
                    onClick={() => setIsUpgradeModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 font-bold py-3 rounded-2xl text-sm hover:bg-gray-100 transition-colors"
                  >
                    <Crown size={16} className="text-[#d4a843]" />
                    Upgrade Now!
                  </Button>
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
