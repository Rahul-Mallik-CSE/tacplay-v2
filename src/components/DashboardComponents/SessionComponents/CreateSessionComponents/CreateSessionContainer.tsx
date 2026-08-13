"use client"

/**
 * CreateSessionContainer.tsx
 * Main container component for the Create Session page.
 * Manages form state, validation, and submission.
 * Uses local state for demonstration without API integration.
 */

import React, { useMemo, useRef, useState } from "react"
import { ArrowLeft, Calendar, Upload, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

import SessionFormField from "./SessionFormField"
import SessionCustomSelect from "./SessionCustomSelect"
import SessionFileUpload from "./SessionFileUpload"
import TimePicker from "@/components/SharedComponents/TimePicker"

/** Session type options */
type SessionType = "teams" | "manual_player"

/** Form data type for create session */
type CreateSessionForm = {
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
const DEFAULT_FORM: CreateSessionForm = {
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

function CreateSessionContainer() {
  const router = useRouter()
  const { t } = useTranslation("dashboard")

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
  const [form, setForm] = useState<CreateSessionForm>(DEFAULT_FORM)
  const [sessionTypeOpen, setSessionTypeOpen] = useState(false)
  const [matchTypeOpen, setMatchTypeOpen] = useState(false)
  const [visibilityOpen, setVisibilityOpen] = useState(false)
  const [cutOffUnitOpen, setCutOffUnitOpen] = useState(false)
  const [teamALogo, setTeamALogo] = useState<File | null>(null)
  const [teamBLogo, setTeamBLogo] = useState<File | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Refs for file inputs
  const teamARef = useRef<HTMLInputElement>(null)
  const teamBRef = useRef<HTMLInputElement>(null)
  const matchDateRef = useRef<HTMLInputElement>(null)

  /** Open native date/time picker */
  const openNativePicker = (inputRef: React.RefObject<HTMLInputElement | null>) => {
    const input = inputRef.current
    if (!input) return
    const pickerInput = input as HTMLInputElement & { showPicker?: () => void }
    if (typeof pickerInput.showPicker === "function") {
      pickerInput.showPicker()
      return
    }
    input.focus()
    input.click()
  }

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
  const handleFieldChange = <T extends keyof CreateSessionForm>(
    key: T,
    value: CreateSessionForm[T],
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  /** Validate form */
  const validateForm = (): string | null => {
    if (!form.session_name.trim()) return t("sessions.create.validation.sessionNameRequired")
    if (!form.description.trim()) return t("sessions.create.validation.descriptionRequired")
    if (!form.match_date) return t("sessions.create.validation.matchDateRequired")
    if (!isValidTime(form.start_time)) return t("sessions.create.validation.startTimeFormat")
    if (!isValidTime(form.end_time)) return t("sessions.create.validation.endTimeFormat")

    const start = convertToMinutes(form.start_time)
    const end = convertToMinutes(form.end_time)
    if (start === null || end === null) return t("sessions.create.validation.invalidTimes")

    const resolvedEnd = end <= start ? end + 24 * 60 : end
    if (resolvedEnd - start <= 0) return t("sessions.create.validation.endTimeAfterStart")

    const cutOff = Number(form.booking_cut_off_time)
    if (!Number.isInteger(cutOff) || cutOff <= 0) return t("sessions.create.validation.cutOffPositive")

    const teamAPlayers = Number(form.team_a_player)
    const teamBPlayers = Number(form.team_b_player)
    if (!Number.isInteger(teamAPlayers) || teamAPlayers <= 0) return t("sessions.create.validation.teamAPlayersPositive")
    if (!Number.isInteger(teamBPlayers) || teamBPlayers <= 0) return t("sessions.create.validation.teamBPlayersPositive")

    const entryFee = Number(form.entry_fee)
    if (Number.isNaN(entryFee) || entryFee < 0) return t("sessions.create.validation.entryFeePositive")

    if (form.session_type === "manual_player") {
      if (!form.team_a_name.trim()) return t("sessions.create.validation.teamANameRequired")
      if (!form.team_b_name.trim()) return t("sessions.create.validation.teamBNameRequired")
      if (!teamALogo) return t("sessions.create.validation.teamALogoRequired")
      if (!teamBLogo) return t("sessions.create.validation.teamBLogoRequired")
    }

    return null
  }

  /** Handle form submission */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      toast.error(validationError)
      return
    }

    setIsCreating(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(t("sessions.create.messages.success"))
      router.push("/dashboard/sessions")
    } catch {
      toast.error(t("sessions.create.messages.failed"))
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Link href="/dashboard/sessions">
            <button className="cursor-pointer p-1.5 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            {t("sessions.create.title")}
          </h1>
        </div>
        <p className="text-sm text-secondary ml-10">
          {t("sessions.create.subtitle")}
        </p>
      </div>

      {/* Form */}
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Session Details Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">
            {t("sessions.create.sessionDetails")}
          </h2>

          <SessionFormField label={t("sessions.create.sessionName")}>
            <input
              type="text"
              placeholder={t("sessions.create.enterSessionName")}
              className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
              value={form.session_name}
              onChange={(event) => handleFieldChange("session_name", event.target.value)}
            />
          </SessionFormField>

          <SessionFormField label={t("sessions.create.matchType")}>
            <SessionCustomSelect
              placeholder={t("sessions.create.selectMatchType")}
              options={selectOptions.matchType}
              value={form.match_type}
              open={matchTypeOpen}
              onToggle={() => setMatchTypeOpen(!matchTypeOpen)}
              onSelect={(value) => {
                handleFieldChange("match_type", value as CreateSessionForm["match_type"])
                setMatchTypeOpen(false)
              }}
            />
          </SessionFormField>

          <SessionFormField label={t("sessions.create.sessionVisibility")}>
            <SessionCustomSelect
              placeholder={t("sessions.create.selectVisibility")}
              options={selectOptions.sessionVisibility}
              value={form.session_visibility}
              open={visibilityOpen}
              onToggle={() => setVisibilityOpen(!visibilityOpen)}
              onSelect={(value) => {
                handleFieldChange("session_visibility", value as CreateSessionForm["session_visibility"])
                setVisibilityOpen(false)
              }}
            />
          </SessionFormField>

          <SessionFormField label={t("sessions.create.description")}>
            <textarea
              rows={4}
              placeholder={t("sessions.create.enterDescription")}
              className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors resize-none min-h-24"
              value={form.description}
              onChange={(event) => handleFieldChange("description", event.target.value)}
            />
          </SessionFormField>
        </section>

        {/* Date & Time Configuration Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">
            {t("sessions.create.dateTimeConfig")}
          </h2>

          <SessionFormField label={t("sessions.create.matchDate")}>
            <div className="relative">
              <input
                ref={matchDateRef}
                type="date"
                className="w-full px-4 py-2.5 pr-10 rounded-lg bg-transparent border border-white/10 text-sm text-primary outline-none focus:border-custom-red/50 transition-colors"
                value={form.match_date}
                onChange={(event) => handleFieldChange("match_date", event.target.value)}
              />
              <button
                type="button"
                aria-label={t("sessions.create.openDatePicker")}
                onClick={() => openNativePicker(matchDateRef)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
              >
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </SessionFormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SessionFormField label={t("sessions.create.startTime")}>
              <TimePicker
                value={form.start_time}
                onChange={(val) => handleFieldChange("start_time", val)}
              />
            </SessionFormField>
            <SessionFormField label={t("sessions.create.endTime")}>
              <TimePicker
                value={form.end_time}
                onChange={(val) => handleFieldChange("end_time", val)}
              />
            </SessionFormField>
          </div>

          <SessionFormField label={t("sessions.create.duration")}>
            <div className="relative">
              <input
                type="text"
                value={durationDisplay}
                className="w-full px-4 py-2.5 pr-10 rounded-lg bg-transparent border border-white/10 text-sm text-primary outline-none"
                readOnly
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            </div>
          </SessionFormField>

          <SessionFormField label={t("sessions.create.bookingCutOffTime")}>
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                placeholder={t("sessions.create.enterCutOffValue")}
                className="flex-1 px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                value={form.booking_cut_off_time}
                onChange={(event) => handleFieldChange("booking_cut_off_time", event.target.value)}
              />
              <SessionCustomSelect
                placeholder={t("sessions.create.unit")}
                options={selectOptions.bookingCutOffUnit}
                value={form.booking_cut_off_unit}
                open={cutOffUnitOpen}
                onToggle={() => setCutOffUnitOpen(!cutOffUnitOpen)}
                onSelect={(val) => {
                  handleFieldChange("booking_cut_off_unit", val as CreateSessionForm["booking_cut_off_unit"])
                  setCutOffUnitOpen(false)
                }}
                className="w-28"
              />
            </div>
          </SessionFormField>
        </section>

        {/* Teams & Capacity Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">
            {t("sessions.create.teamsCapacity")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SessionFormField label={t("sessions.create.teamAPlayer")}>
              <input
                type="number"
                min={1}
                placeholder={t("sessions.create.enterTeamAPlayers")}
                className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                value={form.team_a_player}
                onChange={(event) => handleFieldChange("team_a_player", event.target.value)}
              />
            </SessionFormField>
            <SessionFormField label={t("sessions.create.teamBPlayer")}>
              <input
                type="number"
                min={1}
                placeholder={t("sessions.create.enterTeamBPlayers")}
                className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                value={form.team_b_player}
                onChange={(event) => handleFieldChange("team_b_player", event.target.value)}
              />
            </SessionFormField>
          </div>

          <SessionFormField label={t("sessions.create.sessionType")}>
            <SessionCustomSelect
              placeholder={t("sessions.create.selectTeamMode")}
              options={selectOptions.sessionType}
              value={form.session_type}
              open={sessionTypeOpen}
              onToggle={() => setSessionTypeOpen(!sessionTypeOpen)}
              onSelect={(val) => {
                handleFieldChange("session_type", val as CreateSessionForm["session_type"])
                setSessionTypeOpen(false)
              }}
            />
          </SessionFormField>

          {/* Conditional Team Fields */}
          {form.session_type === "manual_player" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SessionFormField label={t("sessions.create.teamAName")}>
                  <input
                    type="text"
                    placeholder={t("sessions.create.enterTeamAName")}
                    className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                    value={form.team_a_name}
                    onChange={(event) => handleFieldChange("team_a_name", event.target.value)}
                  />
                </SessionFormField>
                <SessionFormField label={t("sessions.create.teamBName")}>
                  <input
                    type="text"
                    placeholder={t("sessions.create.enterTeamBName")}
                    className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                    value={form.team_b_name}
                    onChange={(event) => handleFieldChange("team_b_name", event.target.value)}
                  />
                </SessionFormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Team A Logo */}
                <SessionFormField label={t("sessions.create.teamALogo")}>
                  <div className="space-y-3">
                    <div
                      onClick={() => teamARef.current?.click()}
                      className="cursor-pointer border border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center gap-2 hover:border-white/20 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-secondary" />
                      <p className="text-xs text-secondary text-center">
                        {t("sessions.create.uploadInstructions")}
                      </p>
                      <p className="text-[10px] text-secondary/60 text-center">
                        {t("sessions.create.uploadLimit")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => teamARef.current?.click()}
                      className="cursor-pointer px-4 py-1.5 text-xs font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md hover:bg-emerald-600/30 transition-colors"
                    >
                      {t("sessions.create.uploadLogo")}
                    </button>
                    <input
                      type="file"
                      ref={teamARef}
                      className="hidden"
                      accept="image/*"
                      onChange={(event) => setTeamALogo(event.target.files?.[0] ?? null)}
                    />
                    {teamALogo && (
                      <SessionFileUpload fileName={teamALogo.name} size={teamALogo.size} />
                    )}
                  </div>
                </SessionFormField>

                {/* Team B Logo */}
                <SessionFormField label={t("sessions.create.teamBLogo")}>
                  <div className="space-y-3">
                    <div
                      onClick={() => teamBRef.current?.click()}
                      className="cursor-pointer border border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center gap-2 hover:border-white/20 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-secondary" />
                      <p className="text-xs text-secondary text-center">
                        {t("sessions.create.uploadInstructions")}
                      </p>
                      <p className="text-[10px] text-secondary/60 text-center">
                        {t("sessions.create.uploadLimit")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => teamBRef.current?.click()}
                      className="cursor-pointer px-4 py-1.5 text-xs font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md hover:bg-emerald-600/30 transition-colors"
                    >
                      {t("sessions.create.uploadLogo")}
                    </button>
                    <input
                      type="file"
                      ref={teamBRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(event) => setTeamBLogo(event.target.files?.[0] ?? null)}
                    />
                    {teamBLogo && (
                      <SessionFileUpload fileName={teamBLogo.name} size={teamBLogo.size} />
                    )}
                  </div>
                </SessionFormField>
              </div>
            </>
          )}
        </section>

        {/* Pricing & Payment Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">
            {t("sessions.create.pricingPayment")}
          </h2>

          <SessionFormField label={t("sessions.create.entryFee")}>
            <input
              type="number"
              min={0}
              placeholder={t("sessions.create.enterEntryFee")}
              className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
              value={form.entry_fee}
              onChange={(event) => handleFieldChange("entry_fee", event.target.value)}
            />
          </SessionFormField>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 pt-4 pb-8">
          <Link href="/dashboard/sessions">
            <Button
              type="button"
              className="cursor-pointer bg-transparent px-10 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors"
            >
              {t("sessions.create.cancel")}
            </Button>
          </Link>
          <Button type="submit" disabled={isCreating} className="cursor-pointer">
            {isCreating ? t("sessions.create.creating") : t("sessions.create.createSession")}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateSessionContainer
