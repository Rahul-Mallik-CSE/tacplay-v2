/** @format */

"use client";

import { ChevronDown, Globe, Bell, Mail } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCog, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { changeAppLanguage, default as appI18n } from "@/i18n/init";
import {
  LANGUAGE_LABELS,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/i18n/resources";
import LogoutModal from "./LogOutModal";
import { useAppSelector } from "@/redux/hooks";
import { resolveAccountType } from "@/redux/features/auth/authSlice";
import { toAbsoluteMediaUrl } from "@/lib/utils";

interface NavBarProps {
  pageTitle?: string;
  onLogout?: () => void;
}

const getInitials = (name?: string) => {
  if (!name) return "U";

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

export default function NavBar({ pageTitle, onLogout }: NavBarProps) {
  const { t } = useTranslation("dashboard");
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Read user from Redux
  const { user } = useAppSelector((s) => s.auth);
  const accountType = resolveAccountType(user);
  const isAdmin = accountType === "admin";

  const profileImageUrl = toAbsoluteMediaUrl(user?.profile_image);
  const displayName = user?.full_name || "User";
  const displayEmail = user?.email || "";
  const initials = getInitials(displayName);

  const currentLanguage = (SUPPORTED_LANGUAGES.find(
    (item) => item === appI18n.language,
  ) ?? "en") as SupportedLanguage;

  const computedPageTitle = useMemo(() => {
    if (pageTitle) return pageTitle;

    if (!pathname) return t("common.dashboard");
    if (pathname === "/" || pathname.startsWith("/?"))
      return t("common.dashboard");
    if (pathname.startsWith("/admin")) return t("common.admin");
    if (pathname.startsWith("/dashboard")) return t("common.dashboard");
    if (pathname.startsWith("/sessions")) return t("sidebar.sessions");
    if (pathname.startsWith("/booking-list")) return t("sidebar.bookingList");
    if (pathname.startsWith("/earnings")) return t("sidebar.earnings");
    if (pathname.startsWith("/field-profile"))
      return t("sidebar.fieldProfile");
    if (pathname.startsWith("/settings")) return t("common.settings");

    return t("common.dashboard");
  }, [pathname, pageTitle, t]);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    onLogout?.();
  };

  const settingsPath = isAdmin ? "/admin/settings" : "/dashboard/settings";

  return (
    <div className="w-full sticky top-0 z-9 px-3 md:px-4">
      <div className="max-w-625 rounded-2xl mx-auto flex items-center justify-between py-3">
        {/* Left side - Welcome message */}
        <div className="flex items-center gap-2">
          <div className="rounded-sm">
            <SidebarTrigger />
          </div>
          <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl 2xl:text-3xl font-bold text-primary truncate">
            {t("navbar.welcomeBack", {
              name: displayName.split(" ")[0],
              defaultValue: `Welcome back, ${displayName.split(" ")[0]} 👋`,
            })}
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-2">
          {/* Notification Button */}
          <button
            onClick={() =>
              router.push(
                isAdmin ? "/admin/notifications" : "/dashboard/notifications",
              )
            }
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2a2a3e] flex items-center justify-center hover:bg-[#3a3a4e] transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1a1a2e]" />
          </button>

          {/* Email Button */}
          <button
            onClick={() =>
              router.push(
                isAdmin
                  ? "/admin/marketing/email"
                  : "/dashboard/marketing/email",
              )
            }
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2a2a3e] flex items-center justify-center hover:bg-[#3a3a4e] transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
          </button>

          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer border border-transparent hover:border-secondary items-center gap-2 rounded-lg px-2 py-1 transition-colors shrink-0 text-primary text-xs sm:text-sm ">
              <Globe className="w-4 h-4" />
              <span className="hidden xl:inline">{t("language.label")}</span>
              <span className="font-semibold">
                {LANGUAGE_LABELS[currentLanguage]}
              </span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 border border-secondary bg-background rounded-lg shadow-lg"
            >
              {SUPPORTED_LANGUAGES.map((languageCode) => (
                <DropdownMenuItem
                  key={languageCode}
                  onClick={() => {
                    void changeAppLanguage(languageCode);
                  }}
                  className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer"
                >
                  <span className="text-base">
                    {t(`language.${languageCode}`)}
                  </span>
                  {currentLanguage === languageCode ? (
                    <span className="text-xs text-secondary">Selected</span>
                  ) : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer border border-transparent hover:border-secondary items-center gap-2 sm:gap-3 rounded-lg px-1 sm:px-2 py-1 transition-colors shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                {profileImageUrl ? (
                  <Image
                    src={profileImageUrl}
                    alt={displayName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm sm:text-base font-semibold text-gray-700">
                    {initials}
                  </span>
                )}
              </div>
              <div className="text-left hidden xl:block">
                <p className="text-sm font-semibold text-primary">
                  {displayName}
                </p>
                <p className="text-xs text-gray-400">{displayEmail}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 border border-secondary bg-background rounded-lg shadow-lg"
            >
              <DropdownMenuItem
                onClick={() => router.push(settingsPath)}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer"
              >
                <UserCog className="w-5 h-5 text-blue-500" />
                <span className="text-base">{t("navbar.menuSetting")}</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="text-base">{t("navbar.menuLogout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
