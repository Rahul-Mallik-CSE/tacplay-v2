"use client"

import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"

export default function CancelActions() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <button
        onClick={() => router.back()}
        className="flex-1 px-6 py-3 border border-custom-yellow text-custom-yellow rounded-xl text-sm font-medium hover:bg-custom-yellow/10 transition-colors cursor-pointer"
      >
        {t("subscription.manageBilling.keepSubscription")}
      </button>
      <button className="flex-1 px-6 py-3 bg-custom-red text-white rounded-xl text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer">
        {t("subscription.manageBilling.confirmCancellation")}
      </button>
    </div>
  )
}
