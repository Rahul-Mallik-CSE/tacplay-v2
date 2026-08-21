"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { Calendar, ArrowLeft } from "lucide-react"
import AudienceFilterDropdown from "../CommonComponents/AudienceFilterDropdown"

export default function CreateSmsCampaign() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const [formData, setFormData] = useState({
    campaign_name: "",
    sender_id: "",
    notification_type: "Alert" as "Promotional" | "Alert" | "Update" | "Reminder",
    schedule: "later" as "now" | "later",
    schedule_date: "",
    audience: "all" as "all" | "active",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            {t("marketing.createSmsCampaign")}
          </h1>
          <p className="text-sm text-secondary mt-1">{t("marketing.form.subtitle")}</p>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="bg-card border border-white/5 rounded-xl p-4 md:p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-primary">
            {t("marketing.form.campaignDetails")}
          </h3>
          <AudienceFilterDropdown
            value={formData.audience}
            onChange={(val) => handleChange("audience", val)}
          />
        </div>

        <div className="space-y-5">
          {/* Campaign Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.campaignName")}
            </label>
            <input
              type="text"
              value={formData.campaign_name}
              onChange={(e) => handleChange("campaign_name", e.target.value)}
              placeholder={t("marketing.form.campaignNamePlaceholder")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Sender ID */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.senderId")}
            </label>
            <input
              type="text"
              value={formData.sender_id}
              onChange={(e) => handleChange("sender_id", e.target.value)}
              placeholder={t("marketing.form.senderIdPlaceholder")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Notification Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.notificationType")}
            </label>
            <div className="flex flex-wrap items-center gap-4">
              {(["Promotional", "Alert", "Update", "Reminder"] as const).map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.notification_type === type ? "border-custom-yellow" : "border-white/20"
                    }`}
                  >
                    {formData.notification_type === type && (
                      <div className="w-2 h-2 rounded-full bg-custom-yellow" />
                    )}
                  </div>
                  <span className="text-sm text-primary">{t(`marketing.form.${type.toLowerCase()}`)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.schedule")}
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    formData.schedule === "now" ? "border-custom-yellow" : "border-white/20"
                  }`}
                >
                  {formData.schedule === "now" && (
                    <div className="w-2 h-2 rounded-full bg-custom-yellow" />
                  )}
                </div>
                <span className="text-sm text-primary">{t("marketing.form.sendNow")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    formData.schedule === "later" ? "border-custom-yellow" : "border-white/20"
                  }`}
                >
                  {formData.schedule === "later" && (
                    <div className="w-2 h-2 rounded-full bg-custom-yellow" />
                  )}
                </div>
                <span className="text-sm text-primary">{t("marketing.form.scheduleForLater")}</span>
              </label>
            </div>
            {formData.schedule === "later" && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("marketing.form.selectDateTime")}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
          <button className="px-6 py-2.5 bg-custom-yellow/10 border border-custom-yellow text-custom-yellow rounded-lg text-sm font-medium hover:bg-custom-yellow/20 transition-colors cursor-pointer">
            {t("marketing.form.saveDraft")}
          </button>
          <button className="px-6 py-2.5 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer">
            {t("marketing.form.next")}
          </button>
        </div>
      </div>
    </div>
  )
}
