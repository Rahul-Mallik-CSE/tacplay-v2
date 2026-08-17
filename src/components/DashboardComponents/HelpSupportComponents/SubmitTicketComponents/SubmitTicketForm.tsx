"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronRight } from "lucide-react"
import FileUpload from "./FileUpload"
import type {
  SubmitTicketFormProps,
  SubmitTicketFormData,
} from "@/types/DashboardTypes/HelpSupportTypes"

function SubmitTicketForm({
  categories,
  onSubmit,
  onCancel,
}: SubmitTicketFormProps) {
  const { t } = useTranslation("dashboard")

  const [formData, setFormData] = useState<SubmitTicketFormData>({
    category: "",
    subject: "",
    description: "",
    attachment: null,
  })

  const [errors, setErrors] = useState<{
    category?: string
    subject?: string
    description?: string
  }>({})

  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors: typeof errors = {}

    if (!formData.category) {
      newErrors.category = t("helpSupport.submit.validation.categoryRequired")
    }
    if (!formData.subject.trim()) {
      newErrors.subject = t("helpSupport.submit.validation.subjectRequired")
    }
    if (!formData.description.trim()) {
      newErrors.description = t(
        "helpSupport.submit.validation.descriptionRequired",
      )
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setIsSubmitting(true)
      await onSubmit(formData)
      setIsSubmitting(false)
    }
  }

  const handleCategorySelect = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
    setIsCategoryOpen(false)
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }))
    }
  }

  const selectedCategoryLabel =
    categories.find((c) => c.value === formData.category)?.label || ""

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category Select */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          {t("helpSupport.submit.selectCategory")}
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 bg-muted border rounded-lg text-sm text-left transition-colors ${
              errors.category
                ? "border-red-500/50"
                : "border-white/10 hover:border-white/20"
            } ${formData.category ? "text-primary" : "text-secondary"}`}
          >
            <span>{selectedCategoryLabel || t("helpSupport.submit.categoryPlaceholder")}</span>
            <ChevronRight
              className={`w-4 h-4 text-secondary transition-transform ${isCategoryOpen ? "rotate-90" : ""}`}
            />
          </button>

          {isCategoryOpen && (
            <div className="absolute z-10 w-full mt-1 bg-muted border border-white/10 rounded-lg shadow-lg overflow-hidden">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleCategorySelect(category.value)}
                  className={`w-full px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors ${
                    formData.category === category.value
                      ? "text-custom-red bg-white/5"
                      : "text-primary"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.category && (
          <p className="text-xs text-red-400">{errors.category}</p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          {t("helpSupport.submit.subject")}
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, subject: e.target.value }))
            if (errors.subject) {
              setErrors((prev) => ({ ...prev, subject: undefined }))
            }
          }}
          placeholder={t("helpSupport.submit.subjectPlaceholder")}
          className={`w-full px-4 py-3 bg-muted border rounded-lg text-sm text-primary placeholder-secondary outline-none transition-colors ${
            errors.subject
              ? "border-red-500/50"
              : "border-white/10 focus:border-white/20"
          }`}
        />
        {errors.subject && (
          <p className="text-xs text-red-400">{errors.subject}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          {t("helpSupport.submit.description")}
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, description: e.target.value }))
            if (errors.description) {
              setErrors((prev) => ({ ...prev, description: undefined }))
            }
          }}
          placeholder={t("helpSupport.submit.descriptionPlaceholder")}
          rows={6}
          className={`w-full px-4 py-3 bg-muted border rounded-lg text-sm text-primary placeholder-secondary outline-none transition-colors resize-none ${
            errors.description
              ? "border-red-500/50"
              : "border-white/10 focus:border-white/20"
          }`}
        />
        {errors.description && (
          <p className="text-xs text-red-400">{errors.description}</p>
        )}
      </div>

      {/* Attachment */}
      <FileUpload
        onFileSelect={(file) =>
          setFormData((prev) => ({ ...prev, attachment: file }))
        }
        selectedFile={formData.attachment}
      />

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-custom-yellow text-custom-yellow hover:bg-custom-yellow/10 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          {t("helpSupport.submit.cancel")}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-custom-red hover:bg-custom-red/80 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? t("helpSupport.submit.submitting")
            : t("helpSupport.submit.submitTicket")}
        </button>
      </div>
    </form>
  )
}

export default SubmitTicketForm
