"use client"

/**
 * FieldSetupTab.tsx
 * Editable form for field configuration including min/max players per team/session,
 * session duration, base price, and social/ranked match toggles.
 * Fully integrated with GET /api/arena/field-setup/ and PATCH /api/arena/field-setup/edit/.
 */

import React, { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { getErrorMessage } from "@/lib/auth"
import type {
  FieldSetupForm,
  FieldSetupTabProps,
  UpdateFieldSetupPayload,
} from "@/types/DashboardTypes/ArenaManagementTypes"
import {
  useGetFieldSetupQuery,
  useUpdateFieldSetupMutation,
} from "@/redux/features/dashboard/field-profile/fieldProfileAPI"
import SectionHeader from "../SectionHeader"
import EditSaveButton from "../EditSaveButton"
import ToggleField from "../ToggleField"

const FieldSetupTab = ({ fieldSetup: propFieldSetup }: FieldSetupTabProps) => {
  const { t } = useTranslation("dashboard")
  const { data: apiData, isLoading } = useGetFieldSetupQuery()
  const [updateFieldSetup, { isLoading: isUpdating }] = useUpdateFieldSetupMutation()

  const fieldSetup = propFieldSetup ?? apiData?.data

  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<FieldSetupForm | null>(null)

  const baseForm = useMemo<FieldSetupForm>(
    () => ({
      minimum_players_per_team: fieldSetup?.minimum_players_per_team ?? 0,
      maximum_players_per_team: fieldSetup?.maximum_players_per_team ?? 0,
      minimum_players_per_session: fieldSetup?.minimum_players_per_session ?? 0,
      maximum_players_per_session: fieldSetup?.maximum_players_per_session ?? 0,
      default_session_duration: fieldSetup?.default_session_duration ?? 0,
      duration_unit: fieldSetup?.duration_unit ?? "minute",
      base_price_per_player: fieldSetup?.base_price_per_player ?? "0.00",
      allow_own_gear: fieldSetup?.allow_own_gear ?? false,
      allow_social_matches: fieldSetup?.allow_social_matches ?? false,
      allow_ranked_matches: fieldSetup?.allow_ranked_matches ?? false,
    }),
    [fieldSetup],
  )

  const form = isEditing ? (draft ?? baseForm) : baseForm

  const handleToggleEdit = () => {
    if (isEditing) {
      setDraft(null)
      setIsEditing(false)
      return
    }
    setDraft(baseForm)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!draft) return

    try {
      const payload: UpdateFieldSetupPayload = {
        minimum_players_per_team: Number(draft.minimum_players_per_team),
        maximum_players_per_team: Number(draft.maximum_players_per_team),
        minimum_players_per_session: Number(draft.minimum_players_per_session),
        maximum_players_per_session: Number(draft.maximum_players_per_session),
        default_session_duration: Number(draft.default_session_duration),
        base_price_per_player: String(draft.base_price_per_player || "0.00"),
        allow_social_matches: Boolean(draft.allow_social_matches),
        allow_ranked_matches: Boolean(draft.allow_ranked_matches),
      }

      const res = await updateFieldSetup(payload).unwrap()
      toast.success(
        res.message || t("arena.fieldSetupTab.updated", "Field setup updated successfully"),
      )
      setDraft(null)
      setIsEditing(false)
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          t("arena.fieldSetupTab.updateFailed", "Failed to update field setup"),
        ),
      )
    }
  }

  const updateField = <K extends keyof FieldSetupForm>(
    key: K,
    value: FieldSetupForm[K],
  ) => {
    setDraft((p) => (p ? { ...p, [key]: value } : p))
  }

  if (isLoading && !propFieldSetup) {
    return (
      <div className="space-y-6">
        <SectionHeader
          title={t("onboardingFields.business.title")}
          subtitle={t("onboardingFields.business.subtitle")}
        />

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title={t("onboardingFields.business.title")}
        subtitle={t("onboardingFields.business.subtitle")}
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
              onChange={(e) =>
                updateField("minimum_players_per_team", Number(e.target.value))
              }
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
              onChange={(e) =>
                updateField("maximum_players_per_team", Number(e.target.value))
              }
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
              onChange={(e) =>
                updateField(
                  "minimum_players_per_session",
                  Number(e.target.value),
                )
              }
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
              onChange={(e) =>
                updateField(
                  "maximum_players_per_session",
                  Number(e.target.value),
                )
              }
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.business.defaultDuration")}
            </label>
            <div className="flex gap-3">
              <Input
                type="number"
                value={form.default_session_duration}
                onChange={(e) =>
                  updateField(
                    "default_session_duration",
                    Number(e.target.value),
                  )
                }
                readOnly={!isEditing}
                className="bg-input/30 border-white/10 text-primary h-11 flex-1"
              />
              <Select value={form.duration_unit} disabled>
                <SelectTrigger className="w-28 bg-input/30 border-white/10 text-primary h-11">
                  <SelectValue
                    placeholder={t("onboardingFields.business.unitPlaceholder")}
                  />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  <SelectItem value="minute">
                    {t("onboardingFields.business.unitMinute")}
                  </SelectItem>
                  <SelectItem value="hour">
                    {t("onboardingFields.business.unitHour")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("onboardingFields.business.basePrice", "Base Price Per Player")}
            </label>
            <Input
              type="text"
              placeholder="35.00"
              value={form.base_price_per_player}
              onChange={(e) =>
                updateField("base_price_per_player", e.target.value)
              }
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>

        {/* Allow Own Gear - commented out for later use as backend doesn't use it currently
        <ToggleField
          label={t("onboardingFields.business.allowOwnGear")}
          checked={form.allow_own_gear}
          disabled={!isEditing}
          onCheckedChange={(c) => updateField("allow_own_gear", c)}
        />
        */}

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

      <div className="flex justify-end">
        <EditSaveButton
          isEditing={isEditing}
          isSaving={isUpdating}
          onToggleEdit={handleToggleEdit}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default FieldSetupTab
