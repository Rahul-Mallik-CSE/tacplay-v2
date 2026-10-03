"use client"

/**
 * FieldProfileLayout.tsx
 * Shared layout for all field profile pages.
 * Includes static cover photo and profile section.
 * Uses authenticated user data matching NavBar.
 */

import React from "react"
import { useTranslation } from "react-i18next"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import { useAppSelector } from "@/redux/hooks"
import {
  mockSubscriptionStatus,
} from "../../../mock-data/DashboardMockData/arena-management-mock-data"
import CoverImageSlider from "./CoverImageSlider"
import ArenaProfileSection from "./ArenaProfileSection"

interface FieldProfileLayoutProps {
  children: React.ReactNode
}

export default function FieldProfileLayout({ children }: FieldProfileLayoutProps) {
  const { t } = useTranslation("dashboard")

  const { user } = useAppSelector((s) => s.auth)
  const subscriptionStatus = mockSubscriptionStatus

  const currentPlan = subscriptionStatus.plan_name
  const isBronze =
    currentPlan === "Bronze Plan" ||
    subscriptionStatus.plan_code === "field_bronze_monthly"

  const fullName = user?.full_name || t("arena.arenaOwner", "User")
  const email = user?.email || ""
  const profileImageUrl = toAbsoluteMediaUrl(user?.profile_image)

  return (
    <div className="w-full pt-3 pb-6 md:pb-12 md:pt-4">
      <div className="max-w-625 mx-auto space-y-0">
        <CoverImageSlider />

        <ArenaProfileSection
          fullName={fullName}
          email={email}
          profileImageUrl={profileImageUrl}
          showProBadge={!isBronze}
        />

        <div className="px-4 sm:px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  )
}
