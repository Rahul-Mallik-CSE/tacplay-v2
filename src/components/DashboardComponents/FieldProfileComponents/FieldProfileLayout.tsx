"use client"

/**
 * FieldProfileLayout.tsx
 * Shared layout for all field profile pages.
 * Includes cover photo slider and profile section.
 * Navigation is handled by the main sidebar.
 */

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  toAbsoluteMediaUrl,
} from "@/lib/utils"
import {
  mockArenaInfo,
  mockSubscriptionStatus,
} from "../../../mock-data/DashboardMockData/arena-management-mock-data"
import CoverImageSlider from "./CoverImageSlider"
import ArenaLightbox from "./ArenaLightbox"
import ArenaProfileSection from "./ArenaProfileSection"
import ManageCoverImagesModal from "./ManageCoverImagesModal"

interface FieldProfileLayoutProps {
  children: React.ReactNode
}

export default function FieldProfileLayout({ children }: FieldProfileLayoutProps) {
  const { t } = useTranslation("dashboard")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)

  const arenaInfo = mockArenaInfo
  const subscriptionStatus = mockSubscriptionStatus

  const currentPlan = subscriptionStatus.plan_name
  const isBronze =
    currentPlan === "Bronze Plan" ||
    subscriptionStatus.plan_code === "field_bronze_monthly"

  const userInfo = arenaInfo.user_info
  const fullName = userInfo.full_name || t("arena.arenaOwner")
  const email = userInfo.email || ""

  const mediaList = arenaInfo.media || []
  const mappedUrls = mediaList
    .map((m) => toAbsoluteMediaUrl(m.file_url))
    .filter((url): url is string => !!url)
  const imageUrls = mappedUrls.length > 0 ? mappedUrls : ["/profile-cover.png"]

  const profileImageUrl = toAbsoluteMediaUrl(userInfo.profile_image)

  return (
    <div className="w-full pt-3 pb-6 md:pb-12 md:pt-4">
      <div className="max-w-625 mx-auto space-y-0">
        <CoverImageSlider
          imageUrls={imageUrls}
          onOpenLightbox={() => setIsLightboxOpen(true)}
          onOpenManageModal={() => setIsManageModalOpen(true)}
        />

        <ArenaLightbox
          isOpen={isLightboxOpen}
          imageUrls={imageUrls}
          currentSlide={currentSlide}
          onClose={() => setIsLightboxOpen(false)}
          onSlideChange={setCurrentSlide}
        />

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

      <ManageCoverImagesModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        existingMedia={arenaInfo.media}
      />
    </div>
  )
}
