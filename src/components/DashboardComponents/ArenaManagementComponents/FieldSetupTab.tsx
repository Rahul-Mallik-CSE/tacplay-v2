"use client"

/**
 * FieldSetupTab.tsx
 * Editable form for field configuration including min/max players per team/session,
 * session duration, base price, and social/ranked match toggles.
 * Uses EditSaveHeader and ToggleField components.
 */

import React, { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import type { FieldSetupData, FieldSetupForm, FieldSetupTabProps } from "@/types/DashboardTypes/ArenaManagementTypes"
import { mockFieldSetup } from "./mock-data"
import EditSaveHeader from "./EditSaveHeader"
import ToggleField from "./ToggleField"

const FieldSetupTab = ({ fieldSetup = mockFieldSetup }: FieldSetupTabProps) => {
  const { t } = useTranslation("dashboard")
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<FieldSetupForm | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const baseForm = useMemo<FieldSetupForm>(
    () => ({
      minimum_players_per_team: fieldSetup.minimum_players_per_team ?? 0,
      maximum_players_per_team: fieldSetup.maximum_players_per_team ?? 0,
      minimum_players_per_session: fieldSetup.minimum_players_per_session ?? 0,
      maximum_players_per_session: fieldSetup.maximum_players_per_session ?? 0,
      default_session_duration: fieldSetup.default_session_duration ?? 0,
      duration_unit: fieldSetup.duration_unit ?? "minute",
      base_price_per_player: fieldSetup.base_price_per_player ?? "",
      allow_social_matches: fieldSetup.allow_social_matches ?? false,
      allow_ranked_matches: fieldSetup.allow_ranked_matches ?? false,
    }),
    [fieldSetup],
  )

  const form = isEditing ? (draft ?? baseForm) : baseForm

  const handleToggleEdit = () => {
    if (isEditing) { setDraft(null); setIsEditing(false); return }
    setDraft(baseForm)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!draft) return
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success(t("arena.fieldSetupTab.updated"))
      setDraft(null)
      setIsEditing(false)
    } catch {
      toast.error(t("arena.fieldSetupTab.updateFailed"))
    } finally {
      setIsSaving(false)
    }
  }

  const updateField = <K extends keyof FieldSetupForm>(key: K, value: FieldSetupForm[K]) => {
    setDraft((p) => p ? { ...p, [key]: value } : p)
  }

  return (
    <div className="space-y-6">
      <EditSaveHeader
        title={t("onboardingFields.business.title")}
        subtitle={t("onboardingFields.business.subtitle")}
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
      />

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.business.minPlayersTeam")}
            </label>
            <Input
              type="number"
              value={form.minimum_players_per_team}
              onChange={(e) => updateField("minimum_players_per_team", Number(e.target.value))}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.business.maxPlayersTeam")}
            </label>
            <Input
              type="number"
              value={form.maximum_players_per_team}
              onChange={(e) => updateField("maximum_players_per_team", Number(e.target.value))}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.business.minPlayersSession")}
            </label>
            <Input
              type="number"
              value={form.minimum_players_per_session}
              onChange={(e) => updateField("minimum_players_per_session", Number(e.target.value))}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.business.maxPlayersSession")}
            </label>
            <Input
              type="number"
              value={form.maximum_players_per_session}
              onChange={(e) => updateField("maximum_players_per_session", Number(e.target.value))}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("onboardingFields.business.defaultDuration")}
          </label>
          <div className="flex gap-3">
            <Input
              type="number"
              value={form.default_session_duration}
              onChange={(e) => updateField("default_session_duration", Number(e.target.value))}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11 flex-1"
            />
            <Select value={form.duration_unit} disabled>
              <SelectTrigger className="w-28 bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder={t("onboardingFields.business.unitPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="minute">{t("onboardingFields.business.unitMinute")}</SelectItem>
                <SelectItem value="hour">{t("onboardingFields.business.unitHour")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ToggleField
          label={t("onboardingFields.business.allowSocial")}
          checked={form.allow_social_matches}
          disabled={!isEditing}
          onCheckedChange={(c) => updateField("allow_social_matches", c)}
        />

        <ToggleField
          label={t("onboardingFields.business.allowRanked")}
          checked={form.allow_ranked_matches}
          disabled={!isEditing}
          onCheckedChange={(c) => updateField("allow_ranked_matches", c)}
        />
      </div>
    </div>
  )
}

export default FieldSetupTab
