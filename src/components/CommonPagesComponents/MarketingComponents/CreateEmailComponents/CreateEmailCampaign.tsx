"use client"

import React, { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { Upload, ArrowLeft, Loader2, X, Image as ImageIcon } from "lucide-react"
import { toast } from "react-toastify"
import AudienceFilterDropdown from "../CommonComponents/AudienceFilterDropdown"
import { useCreateEmailCampaignMutation } from "@/redux/features/shared/marketing/marketingAPI"
import { getErrorMessage } from "@/lib/auth"

export default function CreateEmailCampaign() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [createEmailCampaign, { isLoading: isSubmitting }] = useCreateEmailCampaignMutation()

  const [formData, setFormData] = useState({
    campaign_name: "",
    email_subject: "",
    preheader_text: "",
    email_body: "",
    from_name: "TACPLAY",
    from_email: "",
    schedule: "now" as "now" | "later",
    schedule_date: "",
    audience: "all" as "all" | "active",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
      setImagePreview(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (action: "send" | "draft") => {
    if (!formData.campaign_name.trim()) {
      toast.error(t("marketing.validation.campaignNameRequired", "Campaign name is required"))
      return
    }

    if (action === "send") {
      if (!formData.email_subject.trim()) {
        toast.error(t("marketing.validation.subjectRequired", "Email subject is required"))
        return
      }
      if (!formData.email_body.trim()) {
        toast.error(t("marketing.validation.bodyRequired", "Email body is required"))
        return
      }
    }

    try {
      const data = new FormData()
      data.append("campaign_name", formData.campaign_name.trim())
      data.append(
        "audience",
        formData.audience === "all" ? "all_players" : "active_players"
      )
      data.append("email_subject", formData.email_subject.trim())
      data.append("preheader_text", formData.preheader_text.trim())
      data.append("email_body", formData.email_body.trim())
      data.append("from_name", formData.from_name.trim())
      data.append("from_email", formData.from_email.trim())
      if (formData.schedule === "later") {
        if (!formData.schedule_date) {
          toast.error(
            t(
              "marketing.validation.scheduleDateRequired",
              "Please select a date and time for the scheduled campaign."
            )
          )
          return
        }
      }

      const scheduleType = formData.schedule === "now" ? "send_now" : "schedule_later"
      data.append("schedule_type", scheduleType)

      if (formData.schedule === "later" && formData.schedule_date) {
        let isoDate = formData.schedule_date
        try {
          const d = new Date(formData.schedule_date)
          if (!isNaN(d.getTime())) {
            isoDate = d.toISOString()
          }
        } catch {
          isoDate = formData.schedule_date
        }
        data.append("scheduled_at", isoDate)
      }
      data.append("action", action)

      if (imageFile) {
        data.append("image", imageFile)
      }

      const res = await createEmailCampaign(data).unwrap()
      toast.success(
        res.message ||
          (action === "send"
            ? t("marketing.emailSentSuccess", "Email campaign sent successfully.")
            : t("marketing.emailDraftSuccess", "Email campaign saved as draft."))
      )
      router.push(`${basePath}/marketing/email`)
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to save email campaign"))
    }
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
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("marketing.createEmailCampaign", "Create Email Campaign")}
          </h1>
          <p className="text-sm text-secondary mt-1">
            {t("marketing.form.subtitle", "Set up your email campaign and send to your target players")}
          </p>
        </div>
      </div>

      {/* Campaign Details Form */}
      <div className="bg-card border border-white/5 rounded-xl p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <h3 className="text-base font-semibold text-primary">
            {t("marketing.form.campaignDetails", "Campaign Details")}
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
              {t("marketing.form.campaignName", "Campaign Name")} *
            </label>
            <input
              type="text"
              value={formData.campaign_name}
              onChange={(e) => handleChange("campaign_name", e.target.value)}
              placeholder={t("marketing.form.campaignNamePlaceholder", "e.g. Weekend Warrior Special")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Email Subject */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.emailSubject", "Email Subject")} *
            </label>
            <input
              type="text"
              value={formData.email_subject}
              onChange={(e) => handleChange("email_subject", e.target.value)}
              placeholder={t("marketing.form.emailSubjectPlaceholder", "e.g. Get 20% Off Your Next Game")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Preheader */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.preheaderText", "Preheader Text")}
            </label>
            <input
              type="text"
              value={formData.preheader_text}
              onChange={(e) => handleChange("preheader_text", e.target.value)}
              placeholder={t("marketing.form.preheaderPlaceholder", "e.g. Exclusive offer for our players")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Email Body */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.emailBody", "Email Body")} *
            </label>
            <textarea
              value={formData.email_body}
              onChange={(e) => handleChange("email_body", e.target.value)}
              placeholder={t(
                "marketing.form.emailBodyPlaceholder",
                "Hi {{player_name}}, Get 20% OFF on any booking this weekend at {{field_name}}."
              )}
              rows={5}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20 resize-none"
            />
            <p className="text-xs text-secondary">
              Available tags: <span className="text-custom-yellow font-mono">{"{{player_name}}"}</span>,{" "}
              <span className="text-custom-yellow font-mono">{"{{field_name}}"}</span>
            </p>
          </div>

          {/* Upload Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.uploadImage", "Campaign Image")}
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {!imageFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 hover:border-white/20 rounded-xl p-8 text-center cursor-pointer transition-colors"
              >
                <Upload className="w-8 h-8 text-secondary mx-auto mb-3" />
                <p className="text-sm text-primary">
                  {t("marketing.form.uploadInstructions", "Click to upload an image")}
                </p>
                <p className="text-xs text-secondary mt-1">
                  {t("marketing.form.uploadFormats", "PNG, JPG, WEBP up to 5MB")}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded-lg border border-white/10"
                  />
                ) : (
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-secondary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary font-medium truncate">{imageFile.name}</p>
                  <p className="text-xs text-secondary">
                    {(imageFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-1.5 hover:bg-white/10 text-secondary hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* From Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                {t("marketing.form.fromName", "From Name")}
              </label>
              <input
                type="text"
                value={formData.from_name}
                onChange={(e) => handleChange("from_name", e.target.value)}
                placeholder="TACPLAY"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                {t("marketing.form.fromEmail", "From Email")}
              </label>
              <input
                type="email"
                value={formData.from_email}
                onChange={(e) => handleChange("from_email", e.target.value)}
                placeholder="hello@tacplay.eu"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.schedule", "Schedule")}
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="schedule"
                  checked={formData.schedule === "now"}
                  onChange={() => handleChange("schedule", "now")}
                  className="accent-custom-yellow"
                />
                <span className="text-sm text-primary">
                  {t("marketing.form.sendNow", "Send Now")}
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="schedule"
                  checked={formData.schedule === "later"}
                  onChange={() => handleChange("schedule", "later")}
                  className="accent-custom-yellow"
                />
                <span className="text-sm text-primary">
                  {t("marketing.form.scheduleForLater", "Schedule for Later")}
                </span>
              </label>
            </div>

            {formData.schedule === "later" && (
              <div className="mt-3">
                <input
                  type="datetime-local"
                  value={formData.schedule_date}
                  onChange={(e) => handleChange("schedule_date", e.target.value)}
                  className="w-full sm:w-80 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary focus:outline-none focus:border-white/20 [color-scheme:dark]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("draft")}
            className="px-6 py-2.5 bg-custom-yellow/10 border border-custom-yellow text-custom-yellow rounded-lg text-sm font-medium hover:bg-custom-yellow/20 transition-colors cursor-pointer disabled:opacity-50"
          >
            {t("marketing.form.saveDraft", "Save Draft")}
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("send")}
            className="px-6 py-2.5 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {formData.schedule === "now"
              ? t("marketing.form.sendNow", "Send Now")
              : t("marketing.form.schedule", "Schedule")}
          </button>
        </div>
      </div>
    </div>
  )
}
