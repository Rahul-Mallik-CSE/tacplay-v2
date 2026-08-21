"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Upload, Sparkles } from "lucide-react"
import AudienceFilterDropdown from "../CommonComponents/AudienceFilterDropdown"

export default function CreateEmailCampaign() {
  const { t } = useTranslation("dashboard")
  const [formData, setFormData] = useState({
    campaign_name: "",
    email_subject: "",
    preheader_text: "",
    email_body: "",
    from_name: "",
    from_email: "",
    schedule: "now" as "now" | "later",
    audience: "all" as "all" | "active",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          {t("marketing.createEmailCampaign")}
        </h1>
        <p className="text-sm text-secondary mt-1">{t("marketing.form.subtitle")}</p>
      </div>

      {/* Email Preview */}
      <div className="bg-card border border-white/5 rounded-xl p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-primary">
            {t("marketing.createEmailCampaign")}
          </h3>
          <button className="px-5 py-2 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer">
            {t("marketing.form.apply")}
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-primary">Weekend Warried offer</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary">€960</span>
              <span className="text-xs text-secondary">48 bookings</span>
            </div>
          </div>
          <p className="text-xs text-secondary">
            Hi Get 20% OFF on any booking this weekend at (tioId_name) Limited slots available.{" "}
            <span className="font-bold">BOOK NOW</span> and enjoy the game!
          </p>
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
            <button className="flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors cursor-pointer">
              <Sparkles className="w-3 h-3" />
              {t("marketing.form.aiOptimization")}
            </button>
          </div>

          {/* Email Subject */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.emailSubject")}
            </label>
            <input
              type="text"
              value={formData.email_subject}
              onChange={(e) => handleChange("email_subject", e.target.value)}
              placeholder={t("marketing.form.emailSubjectPlaceholder")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
            <button className="flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors cursor-pointer">
              <Sparkles className="w-3 h-3" />
              {t("marketing.form.aiOptimization")}
            </button>
          </div>

          {/* Preheader */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.preheaderText")}
            </label>
            <input
              type="text"
              value={formData.preheader_text}
              onChange={(e) => handleChange("preheader_text", e.target.value)}
              placeholder={t("marketing.form.preheaderPlaceholder")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
            <button className="flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors cursor-pointer">
              <Sparkles className="w-3 h-3" />
              {t("marketing.form.aiOptimization")}
            </button>
          </div>

          {/* Email Body */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.emailBody")}
            </label>
            <textarea
              value={formData.email_body}
              onChange={(e) => handleChange("email_body", e.target.value)}
              placeholder={t("marketing.form.emailBodyPlaceholder")}
              rows={5}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20 resize-none"
            />
            <button className="flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors cursor-pointer">
              <Sparkles className="w-3 h-3" />
              {t("marketing.form.aiOptimization")}
            </button>
          </div>

          {/* Upload Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.uploadImage")}
            </label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center">
              <Upload className="w-8 h-8 text-secondary mx-auto mb-3" />
              <p className="text-sm text-primary">{t("marketing.form.uploadInstructions")}</p>
              <p className="text-xs text-secondary mt-1">{t("marketing.form.uploadFormats")}</p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary hover:bg-white/10 transition-colors cursor-pointer">
                  {t("marketing.form.uploadImages")}
                </button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {t("marketing.form.generateImage")}
                </button>
              </div>
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

          {/* From Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                {t("marketing.form.fromName")}
              </label>
              <input
                type="text"
                value={formData.from_name}
                onChange={(e) => handleChange("from_name", e.target.value)}
                placeholder={t("marketing.form.fromNamePlaceholder")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                {t("marketing.form.fromEmail")}
              </label>
              <input
                type="text"
                value={formData.from_email}
                onChange={(e) => handleChange("from_email", e.target.value)}
                placeholder={t("marketing.form.fromEmailPlaceholder")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
              />
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
