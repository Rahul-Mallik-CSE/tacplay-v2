"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { Calendar, ChevronRight, ArrowLeft } from "lucide-react"

export default function CreateVoucher() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const [formData, setFormData] = useState({
    voucher_code: "",
    select_session: "",
    discount_value: "20",
    minimum_order_value: "",
    description: "",
    schedule: "scheduled" as "active" | "scheduled",
    start_date: "",
    end_date: "",
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
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("marketing.createVoucherDiscount")}
          </h1>
          <p className="text-sm text-secondary mt-1">{t("marketing.form.subtitle")}</p>
        </div>
      </div>

      {/* Voucher Details */}
      <div className="bg-card border border-white/5 rounded-xl p-4 md:p-5 space-y-5">
        <h3 className="text-base font-semibold text-primary">
          {t("marketing.form.campaignDetails")}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Voucher Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.voucherCode")}
            </label>
            <input
              type="text"
              value={formData.voucher_code}
              onChange={(e) => handleChange("voucher_code", e.target.value)}
              placeholder={t("marketing.form.campaignNamePlaceholder")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Select Session */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.selectSession")}
            </label>
            <div className="relative">
              <select
                value={formData.select_session}
                onChange={(e) => handleChange("select_session", e.target.value)}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary focus:outline-none focus:border-white/20 appearance-none"
              >
                <option value="">{t("marketing.form.selectSession")}</option>
                <option value="session1">Session 1</option>
                <option value="session2">Session 2</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary rotate-90" />
            </div>
          </div>

          {/* Discount Value */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.discountValue")}
            </label>
            <div className="relative">
              <select
                value={formData.discount_value}
                onChange={(e) => handleChange("discount_value", e.target.value)}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary focus:outline-none focus:border-white/20 appearance-none"
              >
                {[5, 10, 15, 20, 25, 30, 35, 40, 50].map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary rotate-90" />
            </div>
          </div>

          {/* Minimum Order Value */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("marketing.form.minimumOrderValue")}
            </label>
            <input
              type="text"
              value={formData.minimum_order_value}
              onChange={(e) => handleChange("minimum_order_value", e.target.value)}
              placeholder={t("marketing.form.minimumOrderPlaceholder")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("marketing.form.description")}
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder={t("marketing.form.descriptionPlaceholder")}
            rows={4}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20 resize-none"
          />
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
                  formData.schedule === "active" ? "border-custom-yellow" : "border-white/20"
                }`}
              >
                {formData.schedule === "active" && (
                  <div className="w-2 h-2 rounded-full bg-custom-yellow" />
                )}
              </div>
              <span className="text-sm text-primary">{t("marketing.form.activeNow")}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  formData.schedule === "scheduled" ? "border-custom-yellow" : "border-white/20"
                }`}
              >
                {formData.schedule === "scheduled" && (
                  <div className="w-2 h-2 rounded-full bg-custom-yellow" />
                )}
              </div>
              <span className="text-sm text-primary">{t("marketing.form.scheduleForSomeDays")}</span>
            </label>
          </div>
          {formData.schedule === "scheduled" && (
            <div className="relative">
              <input
                type="text"
                placeholder={t("marketing.form.selectStartAndEndDate")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            </div>
          )}
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
