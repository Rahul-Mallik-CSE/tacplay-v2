"use client"

/**
 * FieldSetupTab.tsx
 * Editable form for field configuration including min/max players per team/session,
 * session duration, base price, and social/ranked match toggles.
 * Fully integrated with GET /api/arena/field-setup/ and PATCH /api/arena/field-setup/edit/
 * with frontend validation for min/max players per team and session limits.
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
import { cn } from "@/lib/utils"
import { getErrorMessage } from "@/lib/auth"
import type {
  FieldSetupForm,
  FieldSetupTabProps,
  UpdateFieldSetupPayload,
} from "@/types/DashboardTypes/ArenaManagementTypes"
import {
  useGetFieldSetupQuery,
  useCreateFieldSetupMutation,
  useUpdateFieldSetupMutation,
} from "@/redux/features/dashboard/field-profile/fieldProfileAPI"
import SectionHeader from "../SectionHeader"
import EditSaveButton from "../EditSaveButton"
import ToggleField from "../ToggleField"

const FieldSetupTab = ({ fieldSetup: propFieldSetup }: FieldSetupTabProps) => {
  const { t } = useTranslation("dashboard")
  const { data: apiData, isLoading } = useGetFieldSetupQuery()
  const [createFieldSetup, { isLoading: isCreating }] = useCreateFieldSetupMutation()
  const [updateFieldSetup, { isLoading: isUpdating }] = useUpdateFieldSetupMutation()

  const isSaving = isCreating || isUpdating
  const fieldSetup = propFieldSetup ?? apiData?.data

  const hasExistingSetup = Boolean(
    apiData?.success &&
      apiData?.data &&
      ((apiData.data.minimum_players_per_team ?? 0) > 0 ||
        (apiData.data.maximum_players_per_team ?? 0) > 0 ||
        (apiData.data.default_session_duration ?? 0) > 0 ||
        Boolean(apiData.data.base_price_per_player)),
  )

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

  // Validation rules
  const teamError = useMemo(() => {
    if (!isEditing || !draft) return null
    const min = Number(draft.minimum_players_per_team)
    const max = Number(draft.maximum_players_per_team)
    if (min > max) {
      return t(
        "arena.fieldSetupValidation.teamRange",
        "Minimum Players Per Team must be less than or equal to Maximum Players Per Team",
      )
    }
    return null
  }, [isEditing, draft, t])

  const sessionError = useMemo(() => {
    if (!isEditing || !draft) return null
    const min = Number(draft.minimum_players_per_session)
    const max = Number(draft.maximum_players_per_session)
    if (min > max) {
      return t(
        "arena.fieldSetupValidation.sessionRange",
        "Minimum Players Per Sessions must be less than or equal to Maximum Players Per Sessions",
      )
    }
    return null
  }, [isEditing, draft, t])

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

    const minTeam = Number(draft.minimum_players_per_team)
    const maxTeam = Number(draft.maximum_players_per_team)
    const minSession = Number(draft.minimum_players_per_session)
    const maxSession = Number(draft.maximum_players_per_session)

    if (minTeam <= 0) {
      toast.error(
        t(
          "arena.fieldSetupValidation.minTeamPositive",
          "Minimum Players Per Team must be greater than 0",
        ),
      )
      return
    }

    if (minTeam > maxTeam) {
      toast.error(
        teamError ||
          t(
            "arena.fieldSetupValidation.teamRange",
            "Minimum Players Per Team must be less than or equal to Maximum Players Per Team",
          ),
      )
      return
    }

    if (minSession <= 0) {
      toast.error(
        t(
          "arena.fieldSetupValidation.minSessionPositive",
          "Minimum Players Per Sessions must be greater than 0",
        ),
      )
      return
    }

    if (minSession > maxSession) {
      toast.error(
        sessionError ||
          t(
            "arena.fieldSetupValidation.sessionRange",
            "Minimum Players Per Sessions must be less than or equal to Maximum Players Per Sessions",
          ),
      )
      return
    }

    if (Number(draft.default_session_duration) <= 0) {
      toast.error(
        t(
          "arena.fieldSetupValidation.durationPositive",
          "Default session duration must be greater than 0",
        ),
      )
      return
    }

    try {
      const payload: UpdateFieldSetupPayload = {
        minimum_players_per_team: minTeam,
        maximum_players_per_team: maxTeam,
        minimum_players_per_session: minSession,
        maximum_players_per_session: maxSession,
        default_session_duration: Number(draft.default_session_duration),
        base_price_per_player: String(draft.base_price_per_player || "0.00"),
        allow_social_matches: Boolean(draft.allow_social_matches),
        allow_ranked_matches: Boolean(draft.allow_ranked_matches),
      }

      if (!hasExistingSetup) {
        const res = await createFieldSetup(payload).unwrap()
        toast.success(
          res.message ||
            t("arena.fieldSetupTab.created", "Step 2 saved successfully"),
        )
      } else {
        const res = await updateFieldSetup(payload).unwrap()
        toast.success(
          res.message ||
            t("arena.fieldSetupTab.updated", "Field setup updated successfully"),
        )
      }
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
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                {t("onboardingFields.business.minPlayersTeam")}
              </label>
              <Input
                type="number"
                min={1}
                value={form.minimum_players_per_team}
                onChange={(e) =>
                  updateField(
                    "minimum_players_per_team",
                    Number(e.target.value),
                  )
                }
                readOnly={!isEditing}
                className={cn(
                  "bg-input/30 border-white/10 text-primary h-11",
                  teamError &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                {t("onboardingFields.business.maxPlayersTeam")}
              </label>
              <Input
                type="number"
                min={1}
                value={form.maximum_players_per_team}
                onChange={(e) =>
                  updateField(
                    "maximum_players_per_team",
                    Number(e.target.value),
                  )
                }
                readOnly={!isEditing}
                className={cn(
                  "bg-input/30 border-white/10 text-primary h-11",
                  teamError &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />
            </div>
          </div>
          {teamError && (
            <p className="text-xs text-destructive mt-1.5 font-medium">
              {teamError}
            </p>
          )}
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                {t("onboardingFields.business.minPlayersSession")}
              </label>
              <Input
                type="number"
                min={1}
                value={form.minimum_players_per_session}
                onChange={(e) =>
                  updateField(
                    "minimum_players_per_session",
                    Number(e.target.value),
                  )
                }
                readOnly={!isEditing}
                className={cn(
                  "bg-input/30 border-white/10 text-primary h-11",
                  sessionError &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                {t("onboardingFields.business.maxPlayersSession")}
              </label>
              <Input
                type="number"
                min={1}
                value={form.maximum_players_per_session}
                onChange={(e) =>
                  updateField(
                    "maximum_players_per_session",
                    Number(e.target.value),
                  )
                }
                readOnly={!isEditing}
                className={cn(
                  "bg-input/30 border-white/10 text-primary h-11",
                  sessionError &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />
            </div>
          </div>
          {sessionError && (
            <p className="text-xs text-destructive mt-1.5 font-medium">
              {sessionError}
            </p>
          )}
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
          isSaving={isSaving}
          disabled={Boolean(teamError || sessionError)}
          onToggleEdit={handleToggleEdit}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default FieldSetupTab
