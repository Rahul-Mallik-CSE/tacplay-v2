"use client"

/**
 * AIPricingPage.tsx
 * Page component for AI-powered pricing settings.
 * Allows configuring dynamic pricing rules and AI recommendations.
 */

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import EditSaveHeader from "../EditSaveHeader"
import ToggleField from "../ToggleField"

interface AIPricingSettings {
  enableDynamicPricing: boolean
  demandMultiplier: number
  peakHourSurcharge: number
  earlyBirdDiscount: number
  lastMinuteDiscount: number
  minimumPrice: number
  maximumPrice: number
}

const DEFAULT_SETTINGS: AIPricingSettings = {
  enableDynamicPricing: false,
  demandMultiplier: 1.2,
  peakHourSurcharge: 15,
  earlyBirdDiscount: 10,
  lastMinuteDiscount: 20,
  minimumPrice: 20,
  maximumPrice: 100,
}

export default function AIPricingPage() {
  const { t } = useTranslation("dashboard")
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState<AIPricingSettings>(DEFAULT_SETTINGS)
  const [draft, setDraft] = useState<AIPricingSettings | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const currentSettings = isEditing ? (draft ?? settings) : settings

  const handleToggleEdit = () => {
    if (isEditing) {
      setDraft(null)
      setIsEditing(false)
      return
    }
    setDraft(settings)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!draft) return
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSettings(draft)
      setDraft(null)
      setIsEditing(false)
      toast.success("AI pricing settings updated successfully.")
    } catch {
      toast.error("Failed to update AI pricing settings.")
    } finally {
      setIsSaving(false)
    }
  }

  const updateField = <K extends keyof AIPricingSettings>(
    key: K,
    value: AIPricingSettings[K]
  ) => {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  return (
    <div className="space-y-6">
      <EditSaveHeader
        title="AI Pricing"
        subtitle="Configure AI-powered dynamic pricing rules to maximize your revenue."
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
      />

      <div className="space-y-5">
        <ToggleField
          label="Enable Dynamic Pricing"
          checked={currentSettings.enableDynamicPricing}
          disabled={!isEditing}
          onCheckedChange={(checked) =>
            updateField("enableDynamicPricing", checked)
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Demand Multiplier
            </label>
            <Input
              type="number"
              step="0.1"
              value={currentSettings.demandMultiplier}
              onChange={(e) =>
                updateField("demandMultiplier", Number(e.target.value))
              }
              disabled={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
            <p className="text-xs text-muted-foreground">
              Multiplier applied during high-demand periods
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Peak Hour Surcharge (%)
            </label>
            <Input
              type="number"
              value={currentSettings.peakHourSurcharge}
              onChange={(e) =>
                updateField("peakHourSurcharge", Number(e.target.value))
              }
              disabled={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
            <p className="text-xs text-muted-foreground">
              Extra charge during peak hours (6PM - 9PM)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Early Bird Discount (%)
            </label>
            <Input
              type="number"
              value={currentSettings.earlyBirdDiscount}
              onChange={(e) =>
                updateField("earlyBirdDiscount", Number(e.target.value))
              }
              disabled={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
            <p className="text-xs text-muted-foreground">
              Discount for bookings made 7+ days in advance
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Last Minute Discount (%)
            </label>
            <Input
              type="number"
              value={currentSettings.lastMinuteDiscount}
              onChange={(e) =>
                updateField("lastMinuteDiscount", Number(e.target.value))
              }
              disabled={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
            <p className="text-xs text-muted-foreground">
              Discount for bookings within 2 hours of session
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Minimum Price ($)
            </label>
            <Input
              type="number"
              value={currentSettings.minimumPrice}
              onChange={(e) =>
                updateField("minimumPrice", Number(e.target.value))
              }
              disabled={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
            <p className="text-xs text-muted-foreground">
              Floor price for AI pricing adjustments
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Maximum Price ($)
            </label>
            <Input
              type="number"
              value={currentSettings.maximumPrice}
              onChange={(e) =>
                updateField("maximumPrice", Number(e.target.value))
              }
              disabled={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
            <p className="text-xs text-muted-foreground">
              Ceiling price for AI pricing adjustments
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
