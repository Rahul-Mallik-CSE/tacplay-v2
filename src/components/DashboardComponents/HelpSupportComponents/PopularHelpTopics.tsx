"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { HelpCircle } from "lucide-react"
import type { PopularHelpTopicsProps } from "@/types/DashboardTypes/HelpSupportTypes"

function PopularHelpTopics({
  topics,
  onBrowseHelpCenter,
}: PopularHelpTopicsProps) {
  const { t } = useTranslation("dashboard")

  const getTopicTitle = (icon: string) => {
    switch (icon) {
      case "booking":
        return t("helpSupport.topics.booking")
      case "billing":
        return t("helpSupport.topics.billing")
      case "account":
        return t("helpSupport.topics.account")
      case "field":
        return t("helpSupport.topics.fieldProfile")
      case "technical":
        return t("helpSupport.topics.technical")
      case "guides":
        return t("helpSupport.topics.guides")
      default:
        return ""
    }
  }

  const getTopicDescription = (icon: string) => {
    switch (icon) {
      case "booking":
        return t("helpSupport.topics.bookingDesc")
      case "billing":
        return t("helpSupport.topics.billingDesc")
      case "account":
        return t("helpSupport.topics.accountDesc")
      case "field":
        return t("helpSupport.topics.fieldProfileDesc")
      case "technical":
        return t("helpSupport.topics.technicalDesc")
      case "guides":
        return t("helpSupport.topics.guidesDesc")
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">
          {t("helpSupport.popularTopics")}
        </h2>
        <button
          onClick={onBrowseHelpCenter}
          className="text-sm text-custom-red hover:text-custom-red/80 transition-colors cursor-pointer"
        >
          {t("helpSupport.browseHelpCenter")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-white/5 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-primary">
                {getTopicTitle(topic.icon)}
              </h3>
              <p className="text-xs text-secondary mt-0.5">
                {getTopicDescription(topic.icon)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularHelpTopics
