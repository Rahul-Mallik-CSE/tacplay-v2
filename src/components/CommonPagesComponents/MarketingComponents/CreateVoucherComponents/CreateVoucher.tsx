"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { ChevronRight, ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import { useCreateVoucherMutation } from "@/redux/features/shared/marketing/marketingAPI"
import { useGetSessionsQuery } from "@/redux/features/dashboard/session/sessionAPI"
import { getErrorMessage } from "@/lib/auth"

export default function CreateVoucher() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const [createVoucher, { isLoading: isSubmitting }] = useCreateVoucherMutation()
  const { data: sessionsResponse, isLoading: isLoadingSessions } = useGetSessionsQuery()
  const sessions = sessionsResponse?.data || []

  const [formData, setFormData] = useState({
    voucher_code: "",
    select_session: "",
    discount_value: "20",
    minimum_order_value: "",
    description: "",
    schedule: "active_now" as "active_now" | "schedule_days",
    start_date: "",
    end_date: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.voucher_code.trim()) {
      toast.error(t("marketing.validation.voucherCodeRequired", "Voucher code is required"))
      return
    }

    if (!formData.select_session) {
      toast.error(t("marketing.validation.sessionRequired", "Please select a session"))
      return
    }

    if (!formData.discount_value || isNaN(Number(formData.discount_value))) {
      toast.error(t("marketing.validation.discountRequired", "Please enter a valid discount percentage"))
      return
    }

    if (!formData.minimum_order_value.trim()) {
      toast.error(t("marketing.validation.minOrderRequired", "Minimum order value is required"))
      return
    }

    if (formData.schedule === "schedule_days") {
      if (!formData.start_date || !formData.end_date) {
        toast.error(
          t(
            "marketing.validation.datesRequired",
            "Please select both start date and end date for scheduled voucher."
          )
        )
        return
      }

      if (new Date(formData.start_date) > new Date(formData.end_date)) {
        toast.error(
          t(
            "marketing.validation.invalidDateRange",
            "Start date cannot be after end date."
          )
        )
        return
      }
    }

    try {
      const payload = {
        voucher_code: formData.voucher_code.trim().toUpperCase(),
        session_id: Number(formData.select_session),
        discount_percentage: Number(formData.discount_value),
        minimum_order_value: formData.minimum_order_value.trim(),
        description: formData.description.trim(),
        schedule_type: formData.schedule,
        ...(formData.schedule === "schedule_days"
          ? {
              start_date: formData.start_date,
              end_date: formData.end_date,
            }
          : {}),
      }

      const res = await createVoucher(payload).unwrap()
      toast.success(res.message || t("marketing.voucherCreatedSuccess", "Voucher created successfully."))
      router.push(`${basePath}/marketing/vouchers`)
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to create voucher"))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer text-primary"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("marketing.createVoucherDiscount", "Create Voucher & Discount")}
          </h1>
          <p className="text-sm text-secondary mt-1">
            {t("marketing.form.subtitle", "Set up promotional voucher codes and discounts for players.")}
          </p>
        </div>
      </div>

      {/* Voucher Details Form */}
      <form onSubmit={handleSubmit} className="bg-card border border-white/5 rounded-xl p-4 md:p-6 space-y-6">
        <h3 className="text-base font-semibold text-primary border-b border-white/5 pb-3">
          {t("marketing.form.campaignDetails", "Voucher Details")}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Voucher Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.voucherCode", "Voucher Code")} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.voucher_code}
              onChange={(e) => handleChange("voucher_code", e.target.value.toUpperCase())}
              placeholder="e.g. WEEKEND20"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary uppercase placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Select Session */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.selectSession", "Select Session")} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                required
                value={formData.select_session}
                onChange={(e) => handleChange("select_session", e.target.value)}
                disabled={isLoadingSessions}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary focus:outline-none focus:border-white/20 appearance-none disabled:opacity-50"
              >
                <option value="" className="bg-[#121316] text-primary">
                  {isLoadingSessions
                    ? t("common.loading", "Loading sessions...")
                    : t("marketing.form.selectSessionPlaceholder", "Select a session")}
                </option>
                {sessions.map((session) => (
                  <option key={session.id} value={session.id} className="bg-[#121316] text-primary">
                    {session.session_name || `Session #${session.id}`}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary rotate-90 pointer-events-none" />
            </div>
          </div>

          {/* Discount Value */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.discountValue", "Discount Percentage (%)")} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.discount_value}
                onChange={(e) => handleChange("discount_value", e.target.value)}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary focus:outline-none focus:border-white/20 appearance-none"
              >
                {[5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80].map((val) => (
                  <option key={val} value={val} className="bg-[#121316] text-primary">
                    {val}%
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary rotate-90 pointer-events-none" />
            </div>
          </div>

          {/* Minimum Order Value */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.minimumOrderValue", "Minimum Order Value (€)")} <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.minimum_order_value}
              onChange={(e) => handleChange("minimum_order_value", e.target.value)}
              placeholder="e.g. 30.00"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("marketing.form.description", "Description")}
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder={t("marketing.form.descriptionPlaceholder", "e.g. 20% off on weekend bookings. Limited time offer!")}
            rows={3}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20 resize-none"
          />
        </div>

        {/* Schedule */}
        <div className="space-y-3 pt-2">
          <label className="text-sm font-medium text-primary block">
            {t("marketing.form.schedule", "Schedule Type")}
          </label>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="schedule"
                value="active_now"
                checked={formData.schedule === "active_now"}
                onChange={() => handleChange("schedule", "active_now")}
                className="hidden"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  formData.schedule === "active_now"
                    ? "border-custom-yellow"
                    : "border-white/20"
                }`}
              >
                {formData.schedule === "active_now" && (
                  <div className="w-2 h-2 rounded-full bg-custom-yellow" />
                )}
              </div>
              <span className="text-sm text-primary">
                {t("marketing.form.activeNow", "Active Now")}
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="schedule"
                value="schedule_days"
                checked={formData.schedule === "schedule_days"}
                onChange={() => handleChange("schedule", "schedule_days")}
                className="hidden"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  formData.schedule === "schedule_days"
                    ? "border-custom-yellow"
                    : "border-white/20"
                }`}
              >
                {formData.schedule === "schedule_days" && (
                  <div className="w-2 h-2 rounded-full bg-custom-yellow" />
                )}
              </div>
              <span className="text-sm text-primary">
                {t("marketing.form.scheduleForLaterDays", "Schedule for Days")}
              </span>
            </label>
          </div>

          {/* Date range pickers for schedule_days */}
          {formData.schedule === "schedule_days" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl">
              <div className="space-y-1.5">
                <label className="text-xs text-secondary font-medium">
                  {t("marketing.form.startDate", "Start Date")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => handleChange("start_date", e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary focus:outline-none focus:border-white/20 [color-scheme:dark]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-secondary font-medium">
                  {t("marketing.form.endDate", "End Date")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.end_date}
                  onChange={(e) => handleChange("end_date", e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary focus:outline-none focus:border-white/20 [color-scheme:dark]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-primary text-sm font-medium transition-colors cursor-pointer"
          >
            {t("common.cancel", "Cancel")}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("marketing.createVoucher", "Create Voucher")}
          </button>
        </div>
      </form>
    </div>
  )
}
