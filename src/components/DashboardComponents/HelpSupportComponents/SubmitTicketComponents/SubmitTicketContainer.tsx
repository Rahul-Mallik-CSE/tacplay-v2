"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import SubmitTicketForm from "./SubmitTicketForm"
import { mockTicketCategories } from "../../../../mock-data/DashboardMockData/help-support-mock-data"
import type { SubmitTicketFormData } from "@/types/DashboardTypes/HelpSupportTypes"

function SubmitTicketContainer() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: SubmitTicketFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    router.push("/dashboard/help-support")
  }

  const handleCancel = () => {
    router.push("/dashboard/help-support")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {t("helpSupport.submit.title")}
        </h1>
        <p className="text-sm text-secondary mt-1">
          {t("helpSupport.submit.subtitle")}
        </p>
      </div>

      <div className="border-t border-white/5 pt-6">
        <SubmitTicketForm
          categories={mockTicketCategories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}

export default SubmitTicketContainer
