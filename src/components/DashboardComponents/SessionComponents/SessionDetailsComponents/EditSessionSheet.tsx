"use client"

/**
 * EditSessionSheet.tsx
 * Slide-out sheet component for editing an existing session.
 * Contains the same form sections as CreateSession page
 * but submits as an update operation.
 * Uses mock data for demonstration without API integration.
 */

import React, { useMemo, useRef, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { ArrowLeft, Calendar, ChevronDown, Upload, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import SessionInfoRow from "./SessionInfoRow"
import SessionInfoSheetLoading from "./SessionInfoSheetLoading"
import { mockSessionDetails } from "../../../DashboardMockData/sessions-mock-data"
import type { SessionInfoSheetProps } from "@/types/DashboardTypes/SessionTypes"

/** Session type options */
type SessionType = "teams" | "manual_player"

/** Form data type for editing session */
type EditSessionForm = {
  session_name: string
  match_type: "ranked" | "social"
  session_visibility: "premium" | "public" | "private"
  description: string
  match_date: string
  start_time: string
  end_time: string
  booking_cut_off_time: string
  booking_cut_off_unit: "hours" | "minutes" | "days"
  team_a_player: string
  team_b_player: string
  session_type: SessionType
  team_a_name: string
  team_b_name: string
  entry_fee: string
}

/** Default form values */
const DEFAULT_FORM: EditSessionForm = {
  session_name: "",
  match_type: "ranked",
  session_visibility: "premium",
  description: "",
  match_date: "",
  start_time: "",
  end_time: "",
  booking_cut_off_time: "12",
  booking_cut_off_unit: "hours",
  team_a_player: "",
  team_b_player: "",
  session_type: "teams",
  team_a_name: "",
  team_b_name: "",
  entry_fee: "",
}

/** Validate time format (HH:MM) */
const isValidTime = (value: string) =>
  /^([01]\d|2[0-3]):([0-5]\d)$/.test(value)

/** Convert time string to minutes */
const convertToMinutes = (time: string) => {
  if (!isValidTime(time)) return null
  const [hourString, minuteString] = time.split(":")
  const hour = Number(hourString)
  const minute = Number(minuteString)
  return (hour % 24) * 60 + minute
}

function EditSessionSheet({ open, onOpenChange, sessionId }: SessionInfoSheetProps) {
  const { t } = useTranslation("dashboard")
  const [isUpdating, setIsUpdating] = useState(false)

  // Use mock data for demonstration
  const details = mockSessionDetails

  // Select options
  const selectOptions = useMemo(
    () => ({
      matchType: [
        { label: t("sessions.create.options.ranked"), value: "ranked" },
        { label: t("sessions.create.options.social"), value: "social" },
      ],
      sessionVisibility: [
        { label: t("sessions.create.options.premium"), value: "premium" },
        { label: t("sessions.create.options.public"), value: "public" },
        { label: t("sessions.create.options.private"), value: "private" },
      ],
      bookingCutOffUnit: [
        { label: t("sessions.create.options.hours"), value: "hours" },
        { label: t("sessions.create.options.minutes"), value: "minutes" },
        { label: t("sessions.create.options.days"), value: "days" },
      ],
      sessionType: [
        { label: t("sessions.create.options.team"), value: "teams" },
        { label: t("sessions.create.options.individualPlayer"), value: "manual_player" },
      ],
    }),
    [t],
  )

  // Form state
  const [form, setForm] = useState<EditSessionForm>(DEFAULT_FORM)
  const [sessionTypeOpen, setSessionTypeOpen] = useState(false)
  const [matchTypeOpen, setMatchTypeOpen] = useState(false)
  const [visibilityOpen, setVisibilityOpen] = useState(false)
  const [cutOffUnitOpen, setCutOffUnitOpen] = useState(false)
  const [teamALogo, setTeamALogo] = useState<File | null>(null)
  const [teamBLogo, setTeamBLogo] = useState<File | null>(null)

  // Refs for file inputs
  const teamARef = useRef<HTMLInputElement>(null)
  const teamBRef = useRef<HTMLInputElement>(null)
  const matchDateRef = useRef<HTMLInputElement>(null)

  /** Calculate duration display */
  const durationDisplay = useMemo(() => {
    const start = convertToMinutes(form.start_time)
    const end = convertToMinutes(form.end_time)
    if (start === null || end === null) return t("sessions.create.autoCount")
    const resolvedEnd = end <= start ? end + 24 * 60 : end
    const durationMinutes = resolvedEnd - start
    return durationMinutes > 0
      ? `${durationMinutes} ${t("sessions.create.min")}`
      : t("sessions.create.autoCount")
  }, [form.end_time, form.start_time, t])

  /** Handle form field change */
  const handleFieldChange = <T extends keyof EditSessionForm>(
    key: T,
    value: EditSessionForm[T],
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  /** Handle form submission */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsUpdating(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success(t("sessions.details.updated"))
    setIsUpdating(false)
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
      >
        {/* Header */}
        <SheetHeader className="p-5 pb-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onOpenChange(false)}
              className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            {details?.status && (
              <span className="px-3 py-1 text-xs font-medium rounded-md border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                {details.status_display || details.status}
              </span>
            )}
          </div>
          <SheetTitle className="text-xl font-bold text-primary">
            {t("sessions.details.editSession")}
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            {t("sessions.create.subtitle")}
          </SheetDescription>
        </SheetHeader>

        {/* Form */}
        <form className="space-y-6 px-5 py-6" onSubmit={handleSubmit}>
          {/* Session Details Section */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-primary">
              {t("sessions.create.sessionDetails")}
            </h2>

            <div className="space-y-1.5">
              <label className="text-sm text-primary font-medium">{t("sessions.create.sessionName")}</label>
              <input
                type="text"
                placeholder={t("sessions.create.enterSessionName")}
                className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                value={form.session_name}
                onChange={(event) => handleFieldChange("session_name", event.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-primary font-medium">{t("sessions.create.matchType")}</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMatchTypeOpen(!matchTypeOpen)}
                  className="cursor-pointer w-full flex items-center justify-between bg-transparent border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-left outline-none hover:border-white/20 transition-colors"
                >
                  <span className={form.match_type ? "text-primary" : "text-secondary/60"}>
                    {selectOptions.matchType.find((o) => o.value === form.match_type)?.label || t("sessions.create.selectMatchType")}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-secondary transition-transform ${matchTypeOpen ? "rotate-180" : ""}`} />
                </button>
                {matchTypeOpen && (
                  <div className="absolute z-50 top-full mt-1 w-full bg-card border border-white/10 rounded-lg shadow-xl overflow-hidden">
                    {selectOptions.matchType.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          handleFieldChange("match_type", option.value as EditSessionForm["match_type"])
                          setMatchTypeOpen(false)
                        }}
                        className="cursor-pointer w-full px-3.5 py-2 text-sm text-primary/80 hover:bg-muted/50 text-left transition-colors"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-primary font-medium">{t("sessions.create.description")}</label>
              <textarea
                rows={4}
                placeholder={t("sessions.create.enterDescription")}
                className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors resize-none min-h-24"
                value={form.description}
                onChange={(event) => handleFieldChange("description", event.target.value)}
              />
            </div>
          </section>

          {/* Action Buttons */}
          <SheetFooter className="flex items-center gap-3 pt-4 border-t border-white/5">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 cursor-pointer bg-transparent border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors py-2.5"
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={isUpdating} className="flex-1 py-2.5 cursor-pointer">
              {isUpdating ? t("sessions.details.editing") : t("common.saveChanges")}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default EditSessionSheet
