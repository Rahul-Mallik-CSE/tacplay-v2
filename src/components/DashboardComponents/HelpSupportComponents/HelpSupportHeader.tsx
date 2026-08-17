"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import type { HelpSupportHeaderProps } from "@/types/DashboardTypes/HelpSupportTypes"

function HelpSupportHeader({ onSubmitTicket }: HelpSupportHeaderProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  const handleSubmit = () => {
    router.push("/dashboard/help-support/submit-ticket")
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {t("helpSupport.title")}
        </h1>
        <p className="text-sm text-secondary mt-1">
          {t("helpSupport.subtitle")}
        </p>
      </div>
      <button
        onClick={handleSubmit}
        className="px-6 py-2.5 bg-custom-red hover:bg-custom-red/80 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
      >
        {t("helpSupport.submitTicket")}
      </button>
    </div>
  )
}

export default HelpSupportHeader
