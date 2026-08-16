"use client"

import React, { useState } from "react"
import { Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "react-i18next"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import {
  mockArenaInfo,
  mockSubscriptionStatus,
} from "../../../mock-data/DashboardMockData/arena-management-mock-data"
import ArenaManagementLoading from "./ArenaManagementLoading"
import CoverImageSlider from "./CoverImageSlider"
import ArenaLightbox from "./ArenaLightbox"
import ArenaProfileSection from "./ArenaProfileSection"
import ArenaInfoTab from "./FieldDetails/ArenaInfoTab"
import FieldSetupTab from "./FieldSetup/FieldSetupTab"
import PackageManagementTab from "./PackageManagement/PackageManagementTab"
import PayoutDetailsTab from "./PayoutDetails/PayoutDetailsTab"
import BillingsTab from "./Billings/BillingsTab"
import ManageCoverImagesModal from "./ManageCoverImagesModal"

export default function ArenaManagementContainer() {
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

  if (false) {
    return <ArenaManagementLoading />
  }

  return (
    <div className="w-full pt-3 pb-6 md:pb-12 md:pt-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
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
          <Tabs defaultValue="arena-info" className="w-full">
            <TabsList
              variant="line"
              className="w-full justify-start overflow-x-auto border-b border-white/10 gap-0"
            >
              <TabsTrigger
                value="arena-info"
                className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
              >
                <Shield className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
                {t("arena.tabs.arenaInfo")}
              </TabsTrigger>
              <TabsTrigger
                value="field-setup"
                className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
              >
                <Shield className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
                {t("arena.tabs.fieldSetup")}
              </TabsTrigger>
              <TabsTrigger
                value="package-management"
                className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
              >
                <Shield className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
                {t("arena.tabs.packageManagement")}
              </TabsTrigger>
              <TabsTrigger
                value="payout-details"
                className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
              >
                <Shield className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
                {t("arena.tabs.payoutDetails")}
              </TabsTrigger>
              <TabsTrigger
                value="billings"
                className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
              >
                {t("arena.tabs.billings")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="arena-info" className="mt-6">
              <ArenaInfoTab arenaInfo={arenaInfo} />
            </TabsContent>
            <TabsContent value="field-setup" className="mt-6">
              <FieldSetupTab />
            </TabsContent>
            <TabsContent value="package-management" className="mt-6">
              <PackageManagementTab />
            </TabsContent>
            <TabsContent value="payout-details" className="mt-6">
              <PayoutDetailsTab />
            </TabsContent>
            <TabsContent value="billings" className="mt-6">
              <BillingsTab />
            </TabsContent>
          </Tabs>
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
