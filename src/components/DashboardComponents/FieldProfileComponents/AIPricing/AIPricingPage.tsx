"use client"

/**
 * AIPricingPage.tsx
 * Page component for AI-powered pricing settings.
 * Features date picker, AI suggest button, extras charge, and session selection modal.
 */

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Calendar, Sparkles, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { toast } from "react-toastify"
import SelectSessionModal from "./SelectSessionModal"

interface AIPricingSettings {
  enabled: boolean
  selectedDate: string
  extrasCharge: string
  selectedSession: string
}

const DEFAULT_SETTINGS: AIPricingSettings = {
  enabled: true,
  selectedDate: "",
  extrasCharge: "20%",
  selectedSession: "",
}

export default function AIPricingPage() {
  const { t } = useTranslation("dashboard")
  const [settings, setSettings] = useState<AIPricingSettings>(DEFAULT_SETTINGS)
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const updateField = <K extends keyof AIPricingSettings>(key: K, value: AIPricingSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success(t("arena.aiPricingTab.saved"))
    } catch {
      toast.error(t("arena.aiPricingTab.saveFailed"))
    } finally {
      setIsSaving(false)
    }
  }

  const handleSessionSelect = (session: { sessionName: string }) => {
    updateField("selectedSession", session.sessionName)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            {t("arena.aiPricingTab.title")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("arena.aiPricingTab.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={settings.enabled}
            onCheckedChange={(checked) => updateField("enabled", checked)}
            className="data-[state=checked]:bg-custom-yellow"
          />
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-500" />

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("arena.aiPricingTab.selectDate")}
          </label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Input
                type="datetime-local"
                value={settings.selectedDate}
                onChange={(e) => updateField("selectedDate", e.target.value)}
                className="bg-input/30 border-white/10 text-primary h-11 pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-white/10 h-11 px-6"
            >
              <Sparkles className="w-4 h-4" />
              {t("arena.aiPricingTab.aiSuggest")}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("arena.aiPricingTab.extrasCharge")}
          </label>
          <Input
            type="text"
            value={settings.extrasCharge}
            onChange={(e) => updateField("extrasCharge", e.target.value)}
            placeholder={t("arena.aiPricingTab.extrasChargePlaceholder")}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("arena.aiPricingTab.selectSession")}
          </label>
          <button
            onClick={() => setIsSessionModalOpen(true)}
            className="w-full flex items-center justify-between p-3 bg-input/30 border border-white/10 rounded-lg text-left hover:bg-input/50 transition-colors"
          >
            <span className={`text-sm ${settings.selectedSession ? "text-primary" : "text-muted-foreground"}`}>
              {settings.selectedSession || t("arena.aiPricingTab.registeredCompany")}
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : null}
          {t("common.save")}
        </Button>
      </div>

      <SelectSessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        onSelect={handleSessionSelect}
      />
    </div>
  )
}
