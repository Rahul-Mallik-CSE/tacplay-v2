"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { Eye } from "lucide-react"
import type { SubscriptionActionDropdownProps } from "@/types/AdminTypes/SubscriptionManagementTypes"

function SubscriptionActionDropdown({
  subscription,
  onViewDetails,
}: SubscriptionActionDropdownProps) {
  const { t } = useTranslation("dashboard")

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    onViewDetails(subscription)
  }

  return (
    <button
      type="button"
      onClick={handleViewDetails}
      className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-xs font-medium text-primary hover:text-white transition-all duration-150 group shrink-0"
      title={t("subscriptionManagement.actions.viewDetails", "View Details")}
    >
      <Eye className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
      <span>{t("subscriptionManagement.actions.viewDetails", "View Details")}</span>
    </button>
  )
}

export default SubscriptionActionDropdown
