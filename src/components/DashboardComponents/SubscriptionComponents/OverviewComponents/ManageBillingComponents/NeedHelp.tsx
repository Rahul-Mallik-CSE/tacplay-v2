"use client"

import { useTranslation } from "react-i18next"
import { Headphones } from "lucide-react"

export default function NeedHelp() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5">
      <div className="w-14 h-14 bg-custom-yellow/20 rounded-full flex items-center justify-center mb-4">
        <Headphones className="w-7 h-7 text-custom-yellow" />
      </div>
      <h3 className="text-base font-semibold text-primary mb-2">
        {t("subscription.manageBilling.needHelp")}
      </h3>
      <p className="text-sm text-secondary mb-4">
        {t("subscription.manageBilling.needHelpDesc")}
      </p>
      <button className="w-full px-4 py-2.5 bg-custom-yellow text-primary rounded-xl text-sm font-medium hover:bg-custom-yellow/90 transition-colors cursor-pointer">
        {t("subscription.manageBilling.contactSupport")}
      </button>
    </div>
  )
}
