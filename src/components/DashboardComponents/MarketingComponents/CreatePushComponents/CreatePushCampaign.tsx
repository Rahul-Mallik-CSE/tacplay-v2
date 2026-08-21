"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Upload, Calendar } from "lucide-react"
import AudienceFilterDropdown from "../CommonComponents/AudienceFilterDropdown"

export default function CreatePushCampaign() {
  const { t } = useTranslation("dashboard")
  const [formData, setFormData] = useState({
    campaign_name: "",
    notification_type: "Alert" as "Promotional" | "Alert" | "Update" | "Reminder",
    schedule: "later" as "now" | "later",
    schedule_date: "",
    deep_link: "",
    audience: "all" as "all" | "active",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          {t("marketing.createPushCampaign")}
        </h1>
        <p className="text-sm text-secondary mt-1">{t("marketing.form.subtitle")}</p>
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

          {/* Deep Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.deepLink")}
            </label>
            <input
              type="text"
              value={formData.deep_link}
              onChange={(e) => handleChange("deep_link", e.target.value)}
              placeholder={t("marketing.form.deepLinkPlaceholder")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Upload Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.uploadImageOptional")}
            </label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center">
              <Upload className="w-8 h-8 text-secondary mx-auto mb-3" />
              <p className="text-sm text-primary">{t("marketing.form.uploadInstructions")}</p>
              <p className="text-xs text-secondary mt-1">{t("marketing.form.uploadFormats")}</p>
              <button className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary hover:bg-white/10 transition-colors cursor-pointer">
                {t("marketing.form.uploadLogo")}
              </button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-xs text-green-400">PNG</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-primary">welcome-image.png</p>
                <p className="text-xs text-secondary">0 KB of 120KB · ● Complete</p>
              </div>
            </div>
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
