"use client"

/**
 * CreateSessionContainer.tsx
 * Main container component for the Create Session page.
 * Manages form state, validation, and submission via:
 * - POST /api/session/owner/sessions/create/ (FormData)
 * Supports both "manual_player" (with team names & logos) and "teams" modes.
 */

import React, { useMemo, useRef, useState, useEffect } from "react"
import { ArrowLeft, Calendar, Upload, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

import SessionFormField from "./SessionFormField"
import SessionCustomSelect from "./SessionCustomSelect"
import SessionFileUpload from "./SessionFileUpload"
import TimePicker from "@/components/SharedComponents/TimePicker"
import { useCreateSessionMutation } from "@/redux/features/dashboard/session/sessionAPI"
import { useGetArenaInfoQuery } from "@/redux/features/dashboard/field-profile/fieldProfileAPI"

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
  field_name: string
  field_type: string
  game_type: string
}

/** Default form values */
const DEFAULT_FORM: CreateSessionForm = {
  session_name: "",
  match_type: "ranked",
  session_visibility: "premium",
  description: "",
  match_date: "",
  start_time: "10:00",
  end_time: "11:00",
  booking_cut_off_time: "2",
  booking_cut_off_unit: "hours",
  team_a_player: "5",
  team_b_player: "5",
  session_type: "manual_player",
  team_a_name: "Red",
  team_b_name: "Blue",
  entry_fee: "20",
  field_name: "",
  field_type: "Indoor",
  game_type: "Paintball",
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

/** Extract 12h time string and AM/PM period */
const formatTimeAndPeriod = (time24: string) => {
  if (!time24 || !isValidTime(time24)) return { time: "10:00", period: "AM" }
  const [hStr, mStr] = time24.split(":")
  const h = Number(hStr)
  const minute = mStr || "00"
  const period = h >= 12 ? "PM" : "AM"
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return {
    time: `${String(hour12).padStart(2, "0")}:${minute}`,
    period,
  }
}

function CreateSessionContainer() {
  const router = useRouter()
  const { t } = useTranslation("dashboard")

  // Prefill arena information if available
  const { data: arenaData } = useGetArenaInfoQuery()

  // API mutation
  const [createSession, { isLoading: isCreating }] = useCreateSessionMutation()

  // Select options
  const selectOptions = useMemo(
    () => ({
      matchType: [
        { label: t("sessions.create.options.ranked", "Ranked"), value: "ranked" },
        { label: t("sessions.create.options.social", "Social"), value: "social" },
      ],
      sessionVisibility: [
        { label: t("sessions.create.options.premium", "Premium"), value: "premium" },
        { label: t("sessions.create.options.public", "Public"), value: "public" },
        { label: t("sessions.create.options.private", "Private"), value: "private" },
      ],
      bookingCutOffUnit: [
        { label: t("sessions.create.options.hours", "Hours"), value: "hours" },
        { label: t("sessions.create.options.minutes", "Minutes"), value: "minutes" },
        { label: t("sessions.create.options.days", "Days"), value: "days" },
      ],
      sessionType: [
        { label: t("sessions.create.options.individualPlayer", "Individual Player"), value: "manual_player" },
        { label: t("sessions.create.options.team", "Teams"), value: "teams" },
      ],
      fieldType: [
        { label: "Indoor", value: "Indoor" },
        { label: "Outdoor", value: "Outdoor" },
      ],
    }),
    [t]
  )

  // Form state
  const [form, setForm] = useState<CreateSessionForm>(DEFAULT_FORM)
  const [sessionTypeOpen, setSessionTypeOpen] = useState(false)
  const [matchTypeOpen, setMatchTypeOpen] = useState(false)
  const [visibilityOpen, setVisibilityOpen] = useState(false)
  const [cutOffUnitOpen, setCutOffUnitOpen] = useState(false)
  const [fieldTypeOpen, setFieldTypeOpen] = useState(false)
  const [teamALogo, setTeamALogo] = useState<File | null>(null)
  const [teamBLogo, setTeamBLogo] = useState<File | null>(null)

  // Auto-set field name from arena info when loaded
  useEffect(() => {
    if (arenaData?.data?.field_name && !form.field_name) {
      setForm((prev) => ({ ...prev, field_name: arenaData.data.field_name }))
    }
  }, [arenaData, form.field_name])

  // Refs for file inputs
  const teamARef = useRef<HTMLInputElement>(null)
  const teamBRef = useRef<HTMLInputElement>(null)
  const matchDateRef = useRef<HTMLInputElement>(null)

  /** Open native date picker */
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
    if (start === null || end === null) return t("sessions.create.autoCount", "Auto count")
    const resolvedEnd = end <= start ? end + 24 * 60 : end
    const durationMinutes = resolvedEnd - start
    return durationMinutes > 0
      ? `${durationMinutes} ${t("sessions.create.min", "min")}`
      : t("sessions.create.autoCount", "Auto count")
  }, [form.end_time, form.start_time, t])

  /** Handle form field change */
  const handleFieldChange = <T extends keyof CreateSessionForm>(
    key: T,
    value: CreateSessionForm[T]
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  /** Validate form */
  const validateForm = (): string | null => {
    if (!form.session_name.trim()) return t("sessions.create.validation.sessionNameRequired", "Session name is required")
    if (!form.description.trim()) return t("sessions.create.validation.descriptionRequired", "Description is required")
    if (!form.match_date) return t("sessions.create.validation.matchDateRequired", "Match date is required")
    if (!isValidTime(form.start_time)) return t("sessions.create.validation.startTimeFormat", "Invalid start time")
    if (!isValidTime(form.end_time)) return t("sessions.create.validation.endTimeFormat", "Invalid end time")

    const cutOff = Number(form.booking_cut_off_time)
    if (!Number.isInteger(cutOff) || cutOff <= 0) return t("sessions.create.validation.cutOffPositive", "Booking cut-off time must be positive")

    const teamAPlayers = Number(form.team_a_player)
    const teamBPlayers = Number(form.team_b_player)
    if (!Number.isInteger(teamAPlayers) || teamAPlayers <= 0) return t("sessions.create.validation.teamAPlayersPositive", "Team A players must be a positive integer")
    if (!Number.isInteger(teamBPlayers) || teamBPlayers <= 0) return t("sessions.create.validation.teamBPlayersPositive", "Team B players must be a positive integer")

    const entryFee = Number(form.entry_fee)
    if (Number.isNaN(entryFee) || entryFee < 0) return t("sessions.create.validation.entryFeePositive", "Entry fee must be a valid number")

    if (form.session_type === "manual_player") {
      if (!form.team_a_name.trim()) return t("sessions.create.validation.teamANameRequired", "Team A name is required")
      if (!form.team_b_name.trim()) return t("sessions.create.validation.teamBNameRequired", "Team B name is required")
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

    const { time: startTimeStr, period: startPeriod } = formatTimeAndPeriod(form.start_time)
    const { time: endTimeStr, period: endPeriod } = formatTimeAndPeriod(form.end_time)

    const formData = new FormData()
    formData.append("session_name", form.session_name.trim())
    formData.append("match_type", form.match_type)
    formData.append("session_visibility", form.session_visibility)
    formData.append("description", form.description.trim())
    formData.append("match_date", form.match_date)
    formData.append("start_time", startTimeStr)
    formData.append("start_time_period", startPeriod)
    formData.append("end_time", endTimeStr)
    formData.append("end_time_period", endPeriod)
    formData.append("booking_cut_off_time", String(Number(form.booking_cut_off_time)))
    formData.append("booking_cut_off_unit", form.booking_cut_off_unit)
    formData.append("team_a_player", String(Number(form.team_a_player)))
    formData.append("team_b_player", String(Number(form.team_b_player)))
    formData.append("session_type", form.session_type)
    formData.append("entry_fee", String(Number(form.entry_fee)))
    formData.append("field_name", form.field_name.trim() || arenaData?.data?.field_name || "Tacplay Arena")
    formData.append("field_type", form.field_type.trim() || "Indoor")
    formData.append("game_type", form.game_type.trim() || "Paintball")

    if (form.session_type === "manual_player") {
      formData.append("team_a_name", form.team_a_name.trim())
      formData.append("team_b_name", form.team_b_name.trim())
      if (teamALogo) {
        formData.append("team_a_logo", teamALogo)
      }
      if (teamBLogo) {
        formData.append("team_b_logo", teamBLogo)
      }
    }

    try {
      const res = await createSession(formData).unwrap()
      toast.success(res.message || t("sessions.create.messages.success", "Session created successfully."))
      router.push("/dashboard/sessions")
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        t("sessions.create.messages.failed", "Failed to create session.")
      toast.error(errorMsg)
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
            {t("sessions.create.title", "Create New Session")}
          </h1>
        </div>
        <p className="text-sm text-secondary ml-10">
          {t("sessions.create.subtitle", "Set a new match session with teams, players, pricing and ranking rules.")}
        </p>
      </div>

      {/* Form */}
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Session Details Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">
            {t("sessions.create.sessionDetails", "Session Details")}
          </h2>

          <SessionFormField label={t("sessions.create.sessionName", "Session Name")}>
            <input
              type="text"
              placeholder={t("sessions.create.enterSessionName", "Enter session name")}
              className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
              value={form.session_name}
              onChange={(event) => handleFieldChange("session_name", event.target.value)}
            />
          </SessionFormField>

          <SessionFormField label={t("sessions.create.matchType", "Match Type")}>
            <SessionCustomSelect
              placeholder={t("sessions.create.selectMatchType", "Select match type")}
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

          <SessionFormField label={t("sessions.create.sessionVisibility", "Session Visibility")}>
            <SessionCustomSelect
              placeholder={t("sessions.create.selectVisibility", "Select visibility")}
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

          <SessionFormField label={t("sessions.create.description", "Description")}>
            <textarea
              rows={4}
              placeholder={t("sessions.create.enterDescription", "Enter session description")}
              className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors resize-none min-h-24"
              value={form.description}
              onChange={(event) => handleFieldChange("description", event.target.value)}
            />
          </SessionFormField>
        </section>

        {/* Date & Time Configuration Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">
            {t("sessions.create.dateTimeConfig", "Date & Time Configuration")}
          </h2>

          <SessionFormField label={t("sessions.create.matchDate", "Match Date")}>
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
                aria-label={t("sessions.create.openDatePicker", "Open date picker")}
                onClick={() => openNativePicker(matchDateRef)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
              >
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </SessionFormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SessionFormField label={t("sessions.create.startTime", "Start Time")}>
              <TimePicker
                value={form.start_time}
                onChange={(val) => handleFieldChange("start_time", val)}
              />
            </SessionFormField>
            <SessionFormField label={t("sessions.create.endTime", "End Time")}>
              <TimePicker
                value={form.end_time}
                onChange={(val) => handleFieldChange("end_time", val)}
              />
            </SessionFormField>
          </div>

          <SessionFormField label={t("sessions.create.duration", "Duration")}>
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

          <SessionFormField label={t("sessions.create.bookingCutOffTime", "Booking Cut-Off Time")}>
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                placeholder={t("sessions.create.enterCutOffValue", "Enter cut-off value")}
                className="flex-1 px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                value={form.booking_cut_off_time}
                onChange={(event) => handleFieldChange("booking_cut_off_time", event.target.value)}
              />
              <SessionCustomSelect
                placeholder={t("sessions.create.unit", "Unit")}
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
            {t("sessions.create.teamsCapacity", "Teams & Capacity")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SessionFormField label={t("sessions.create.teamAPlayer", "Team A Player")}>
              <input
                type="number"
                min={1}
                placeholder={t("sessions.create.enterTeamAPlayers", "Enter Team A players")}
                className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                value={form.team_a_player}
                onChange={(event) => handleFieldChange("team_a_player", event.target.value)}
              />
            </SessionFormField>
            <SessionFormField label={t("sessions.create.teamBPlayer", "Team B Player")}>
              <input
                type="number"
                min={1}
                placeholder={t("sessions.create.enterTeamBPlayers", "Enter Team B players")}
                className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                value={form.team_b_player}
                onChange={(event) => handleFieldChange("team_b_player", event.target.value)}
              />
            </SessionFormField>
          </div>

          <SessionFormField label={t("sessions.create.sessionType", "Session Type")}>
            <SessionCustomSelect
              placeholder={t("sessions.create.selectTeamMode", "Select session type")}
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

          {/* Conditional Team Fields (Manual Player Mode) */}
          {form.session_type === "manual_player" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SessionFormField label={t("sessions.create.teamAName", "Team A Name")}>
                  <input
                    type="text"
                    placeholder={t("sessions.create.enterTeamAName", "Enter Team A name")}
                    className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                    value={form.team_a_name}
                    onChange={(event) => handleFieldChange("team_a_name", event.target.value)}
                  />
                </SessionFormField>
                <SessionFormField label={t("sessions.create.teamBName", "Team B Name")}>
                  <input
                    type="text"
                    placeholder={t("sessions.create.enterTeamBName", "Enter Team B name")}
                    className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                    value={form.team_b_name}
                    onChange={(event) => handleFieldChange("team_b_name", event.target.value)}
                  />
                </SessionFormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Team A Logo */}
                <SessionFormField label={t("sessions.create.teamALogo", "Team A Logo")}>
                  <div className="space-y-3">
                    <div
                      onClick={() => teamARef.current?.click()}
                      className="cursor-pointer border border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center gap-2 hover:border-white/20 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-secondary" />
                      <p className="text-xs text-secondary text-center">
                        {t("sessions.create.uploadInstructions", "Click to upload team logo")}
                      </p>
                      <p className="text-[10px] text-secondary/60 text-center">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => teamARef.current?.click()}
                      className="cursor-pointer px-4 py-1.5 text-xs font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md hover:bg-emerald-600/30 transition-colors"
                    >
                      {t("sessions.create.uploadLogo", "Upload Logo")}
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
                <SessionFormField label={t("sessions.create.teamBLogo", "Team B Logo")}>
                  <div className="space-y-3">
                    <div
                      onClick={() => teamBRef.current?.click()}
                      className="cursor-pointer border border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center gap-2 hover:border-white/20 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-secondary" />
                      <p className="text-xs text-secondary text-center">
                        {t("sessions.create.uploadInstructions", "Click to upload team logo")}
                      </p>
                      <p className="text-[10px] text-secondary/60 text-center">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => teamBRef.current?.click()}
                      className="cursor-pointer px-4 py-1.5 text-xs font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md hover:bg-emerald-600/30 transition-colors"
                    >
                      {t("sessions.create.uploadLogo", "Upload Logo")}
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

        {/* Field & Game Details Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Field & Game Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SessionFormField label="Field Name">
              <input
                type="text"
                placeholder="e.g. RedValley Sports Arena"
                className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                value={form.field_name}
                onChange={(event) => handleFieldChange("field_name", event.target.value)}
              />
            </SessionFormField>

            <SessionFormField label="Field Type">
              <SessionCustomSelect
                placeholder="Select field type"
                options={selectOptions.fieldType}
                value={form.field_type}
                open={fieldTypeOpen}
                onToggle={() => setFieldTypeOpen(!fieldTypeOpen)}
                onSelect={(val) => {
                  handleFieldChange("field_type", val)
                  setFieldTypeOpen(false)
                }}
              />
            </SessionFormField>

            <SessionFormField label="Game Type">
              <input
                type="text"
                placeholder="e.g. Paintball, hockey"
                className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/10 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-custom-red/50 transition-colors"
                value={form.game_type}
                onChange={(event) => handleFieldChange("game_type", event.target.value)}
              />
            </SessionFormField>
          </div>
        </section>

        {/* Pricing & Payment Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">
            {t("sessions.create.pricingPayment", "Pricing & Payment")}
          </h2>

          <SessionFormField label={t("sessions.create.entryFee", "Entry Fee (€)")}>
            <input
              type="number"
              min={0}
              placeholder={t("sessions.create.enterEntryFee", "Enter entry fee")}
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
              {t("sessions.create.cancel", "Cancel")}
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isCreating}
            className="cursor-pointer bg-custom-red hover:bg-custom-red/80 text-white px-8 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isCreating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("sessions.create.creating", "Creating...")}
              </span>
            ) : (
              t("sessions.create.createSession", "Create Session")
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateSessionContainer
