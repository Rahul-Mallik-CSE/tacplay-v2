"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import AudienceFilterDropdown from "../CommonComponents/AudienceFilterDropdown"
import { useCreateSmsCampaignMutation } from "@/redux/features/shared/marketing/marketingAPI"
import { getErrorMessage } from "@/lib/auth"

export default function CreateSmsCampaign() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const [createSmsCampaign, { isLoading: isSubmitting }] = useCreateSmsCampaignMutation()

  const [formData, setFormData] = useState({
    campaign_name: "",
    sender_id: "TACPLAY",
    sms_body: "",
    notification_type: "promotional",
    schedule: "now" as "now" | "later",
    schedule_date: "",
    audience: "all" as "all" | "active",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (action: "send" | "draft") => {
    if (!formData.campaign_name.trim()) {
      toast.error(t("marketing.validation.campaignNameRequired", "Campaign name is required"))
      return
    }

    if (!formData.sms_body.trim() && action === "send") {
      toast.error(t("marketing.validation.smsBodyRequired", "SMS message body is required"))
      return
    }

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

    let formattedDate: string | null = null
    if (formData.schedule === "later" && formData.schedule_date) {
      try {
        const d = new Date(formData.schedule_date)
        if (!isNaN(d.getTime())) {
          formattedDate = d.toISOString()
        } else {
          formattedDate = formData.schedule_date
        }
      } catch {
        formattedDate = formData.schedule_date
      }
    }

    try {
      const payload = {
        campaign_name: formData.campaign_name.trim(),
        audience: formData.audience === "all" ? "all_players" : "active_players",
        sender_id: formData.sender_id.trim() || "TACPLAY",
        sms_body: formData.sms_body.trim(),
        notification_type: formData.notification_type.toLowerCase(),
        schedule_type: scheduleType,
        action,
        scheduled_at: formattedDate,
      }

      const res = await createSmsCampaign(payload).unwrap()
      toast.success(
        res.message ||
          (action === "send"
            ? t("marketing.smsSentSuccess", "SMS campaign sent successfully.")
            : t("marketing.smsDraftSuccess", "SMS campaign saved as draft."))
      )
      router.push(`${basePath}/marketing/sms`)
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to save SMS campaign"))
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
            {t("marketing.createSmsCampaign", "Create SMS Campaign")}
          </h1>
          <p className="text-sm text-secondary mt-1">
            {t("marketing.form.subtitle", "Set up your SMS campaign and broadcast to your players")}
          </p>
        </div>
      </div>

      {/* Campaign Details */}
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
              placeholder={t("marketing.form.campaignNamePlaceholder", "e.g. Weekend 37% Offer")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Sender ID */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.senderId", "Sender ID")}
            </label>
            <input
              type="text"
              value={formData.sender_id}
              onChange={(e) => handleChange("sender_id", e.target.value)}
              placeholder="TACPLAY"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>

          {/* SMS Body */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.smsBody", "SMS Body / Message")} *
            </label>
            <textarea
              value={formData.sms_body}
              onChange={(e) => handleChange("sms_body", e.target.value)}
              placeholder="Hi {{player_name}}, get 37% OFF your next booking at {{field_name}}. Limited slots available!"
              rows={4}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20 resize-none"
            />
            <div className="flex items-center justify-between text-xs text-secondary">
              <span>
                Available tags: <span className="text-custom-yellow font-mono">{"{{player_name}}"}</span>,{" "}
                <span className="text-custom-yellow font-mono">{"{{field_name}}"}</span>
              </span>
              <span>{formData.sms_body.length} characters</span>
            </div>
          </div>

          {/* Notification Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.notificationType", "Notification Type")}
            </label>
            <div className="flex flex-wrap items-center gap-6">
              {[
                { label: "Promotional", value: "promotional" },
                { label: "Alert", value: "alert" },
                { label: "Update", value: "update" },
                { label: "Reminder", value: "reminder" },
              ].map((item) => (
                <label key={item.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="notification_type"
                    checked={formData.notification_type === item.value}
                    onChange={() => handleChange("notification_type", item.value)}
                    className="accent-custom-yellow"
                  />
                  <span className="text-sm text-primary">{item.label}</span>
                </label>
              ))}
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
