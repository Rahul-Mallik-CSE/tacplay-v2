/**
 * ScoreManagementPage.tsx
 * Main administration page for configuring Win, Loss, and Draw scores.
 * Integrated with:
 * - GET /api/admin/player-score-setting/
 * - POST /api/admin/player-score-setting/
 * - PATCH /api/admin/player-score-setting/
 */

"use client"

import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import {
  Trophy,
  Scale,
  ShieldAlert,
  Save,
  RotateCcw,
  Loader2,
  AlertCircle,
  Clock,
  Sparkles,
  Pencil,
  X,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ScoreCard from "./ScoreCard"
import ScoreOutcomeSimulator from "./ScoreOutcomeSimulator"
import ScoreManagementSkeleton from "./ScoreManagementSkeleton"
import {
  useGetPlayerScoreSettingQuery,
  useCreatePlayerScoreSettingMutation,
  useUpdatePlayerScoreSettingMutation,
} from "@/redux/features/admin/scoreManagement/scoreManagementAPI"

export default function ScoreManagementPage() {
  const { t } = useTranslation("dashboard")

  // API query & mutations
  const {
    data: settingResponse,
    isLoading,
    isError,
    refetch,
  } = useGetPlayerScoreSettingQuery()

  const [createSetting, { isLoading: isCreating }] =
    useCreatePlayerScoreSettingMutation()
  const [updateSetting, { isLoading: isUpdating }] =
    useUpdatePlayerScoreSettingMutation()

  const isSaving = isCreating || isUpdating

  const setting = settingResponse?.data
  const exists = Boolean(setting?.exists)

  // Edit mode state: normally scores cannot be edited until clicking "Edit Score"
  const [isEditing, setIsEditing] = useState<boolean>(false)

  // Form state
  const [winScore, setWinScore] = useState<number>(5)
  const [lossScore, setLossScore] = useState<number>(-2)
  const [drawScore, setDrawScore] = useState<number>(1)

  // Synchronize state when query data arrives
  useEffect(() => {
    if (setting) {
      setWinScore(setting.win_score ?? 5)
      setLossScore(setting.loss_score ?? -2)
      setDrawScore(setting.draw_score ?? 1)
    }
  }, [setting])

  // Check if form has unsaved modifications
  const isDirty =
    Boolean(setting) &&
    (winScore !== (setting?.win_score ?? 5) ||
      lossScore !== (setting?.loss_score ?? -2) ||
      drawScore !== (setting?.draw_score ?? 1))

  // Presets definition
  const presets = [
    {
      name: t("scoreManagement.presetStandard", "Default Tacplay"),
      win: 5,
      loss: -2,
      draw: 1,
    },
    {
      name: t("scoreManagement.presetCompetitive", "Competitive League"),
      win: 3,
      loss: 0,
      draw: 1,
    },
    {
      name: t("scoreManagement.presetCasual", "High Stakes"),
      win: 10,
      loss: -5,
      draw: 2,
    },
  ]

  const handleApplyPreset = (preset: (typeof presets)[0]) => {
    setWinScore(preset.win)
    setLossScore(preset.loss)
    setDrawScore(preset.draw)
  }

  const handleReset = () => {
    if (setting) {
      setWinScore(setting.win_score ?? 5)
      setLossScore(setting.loss_score ?? -2)
      setDrawScore(setting.draw_score ?? 1)
    } else {
      setWinScore(5)
      setLossScore(-2)
      setDrawScore(1)
    }
  }

  const handleCancel = () => {
    handleReset()
    setIsEditing(false)
  }

  const handleSave = async () => {
    try {
      const payload = {
        win_score: winScore,
        loss_score: lossScore,
        draw_score: drawScore,
      }

      if (exists) {
        const res = await updateSetting(payload).unwrap()
        toast.success(
          res.message ||
            t(
              "scoreManagement.successUpdate",
              "Player score setting updated successfully."
            )
        )
      } else {
        const res = await createSetting(payload).unwrap()
        toast.success(
          res.message ||
            t(
              "scoreManagement.successCreate",
              "Player score setting created successfully."
            )
        )
      }
      setIsEditing(false)
      refetch()
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        t(
          "scoreManagement.failedUpdate",
          "Failed to save player score settings."
        )
      toast.error(errorMsg)
    }
  }

  if (isLoading && !setting) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <ScoreManagementSkeleton />
      </div>
    )
  }

  if (isError && !setting) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="p-8 rounded-2xl bg-card border border-custom-red/30 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-custom-red mx-auto" />
          <h3 className="text-lg font-bold text-primary">
            {t("scoreManagement.failedFetch", "Failed to load score settings.")}
          </h3>
          <p className="text-sm text-secondary">
            Unable to connect to the scoring configuration service. Please try
            again.
          </p>
          <Button
            onClick={() => refetch()}
            className="cursor-pointer bg-custom-yellow hover:bg-custom-yellow/80 text-black font-semibold"
          >
            Retry Loading
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              {t("scoreManagement.title", "Score Management")}
            </h1>
            {isEditing && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t("scoreManagement.editMode", "Editing Mode")}
              </span>
            )}
            {isDirty && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-custom-yellow/15 text-custom-yellow border border-custom-yellow/30 animate-pulse">
                {t("scoreManagement.unsavedChanges", "Unsaved changes")}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {t(
              "scoreManagement.subtitle",
              "Configure point values awarded for match results across all player rankings and sessions."
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer bg-custom-yellow hover:bg-custom-yellow/80 text-black font-bold rounded-xl text-sm px-5 py-2.5 shadow-lg shadow-custom-yellow/10 transition-all flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              <span>{t("scoreManagement.editScore", "Edit Score")}</span>
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
                className="cursor-pointer border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                <span>{t("scoreManagement.cancel", "Cancel")}</span>
              </Button>

              {isDirty && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isSaving}
                  className="cursor-pointer border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t("scoreManagement.discard", "Discard")}</span>
                </Button>
              )}

              <Button
                type="button"
                onClick={handleSave}
                disabled={isSaving || !isDirty}
                className="cursor-pointer bg-custom-yellow hover:bg-custom-yellow/80 text-black font-bold rounded-xl text-sm px-5 py-2.5 shadow-lg shadow-custom-yellow/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t("scoreManagement.saving", "Saving Changes...")}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{t("scoreManagement.saveChanges", "Save Changes")}</span>
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Quick Presets (when editing) or Locked Status Notice (when in view mode) */}
      {isEditing ? (
        <div className="flex flex-wrap items-center gap-2 p-3.5 rounded-xl bg-custom-yellow/5 border border-custom-yellow/20 animate-in fade-in-50 duration-200">
          <span className="text-xs text-muted-foreground mr-1 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-custom-yellow" />
            <span>{t("scoreManagement.quickPresets", "Quick Presets")}:</span>
          </span>
          {presets.map((preset) => {
            const isActive =
              winScore === preset.win &&
              lossScore === preset.loss &&
              drawScore === preset.draw
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isActive
                    ? "bg-custom-yellow/20 text-custom-yellow border-custom-yellow/40 shadow-sm shadow-custom-yellow/10"
                    : "bg-card/60 text-secondary hover:text-white hover:bg-white/5 border-white/5"
                }`}
              >
                {preset.name} ({preset.win > 0 ? `+${preset.win}` : preset.win} /{" "}
                {preset.draw > 0 ? `+${preset.draw}` : preset.draw} /{" "}
                {preset.loss > 0 ? `+${preset.loss}` : preset.loss})
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-card/60 border border-white/5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-secondary" />
            <span>
              {t(
                "scoreManagement.viewModeNotice",
                "Scores are currently locked. Click \"Edit Score\" to modify values."
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-custom-yellow hover:underline font-semibold flex items-center gap-1.5 text-xs"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>{t("scoreManagement.editScore", "Edit Score")}</span>
          </button>
        </div>
      )}

      {/* Main 3 Score Configuration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Win Score Card */}
        <ScoreCard
          title={t("scoreManagement.winScore", "Win Score")}
          badgeLabel={t("scoreManagement.victoryPoints", "Victory Points")}
          description={t(
            "scoreManagement.winDesc",
            "Points awarded to players when their team wins a match."
          )}
          icon={Trophy}
          value={winScore}
          onChange={setWinScore}
          disabled={isSaving}
          isEditable={isEditing}
          variant="win"
        />

        {/* Draw Score Card */}
        <ScoreCard
          title={t("scoreManagement.drawScore", "Draw Score")}
          badgeLabel={t("scoreManagement.tiePoints", "Tie Points")}
          description={t(
            "scoreManagement.drawDesc",
            "Points awarded to both teams when a match concludes in a tie."
          )}
          icon={Scale}
          value={drawScore}
          onChange={setDrawScore}
          disabled={isSaving}
          isEditable={isEditing}
          variant="draw"
        />

        {/* Loss Score Card */}
        <ScoreCard
          title={t("scoreManagement.lossScore", "Loss Score")}
          badgeLabel={t("scoreManagement.defeatPoints", "Defeat Points")}
          description={t(
            "scoreManagement.lossDesc",
            "Points deducted or awarded when a team loses a match."
          )}
          icon={ShieldAlert}
          value={lossScore}
          onChange={setLossScore}
          disabled={isSaving}
          isEditable={isEditing}
          variant="loss"
        />
      </div>

      {/* Real-time Calculation Simulator */}
      <ScoreOutcomeSimulator
        winScore={winScore}
        drawScore={drawScore}
        lossScore={lossScore}
      />

      {/* Metadata & Audit Footer */}
      {setting?.updated_at && (
        <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground pt-2">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {t("scoreManagement.lastUpdated", "Last updated")}:{" "}
            {new Date(setting.updated_at).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  )
}
