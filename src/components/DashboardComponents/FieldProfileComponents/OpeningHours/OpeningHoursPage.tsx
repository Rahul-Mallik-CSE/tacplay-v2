"use client"

/**
 * OpeningHoursPage.tsx
 * Page component for managing field opening hours.
 * Allows setting operating hours for each day of the week with multiple time slots.
 * Fully integrated with GET /api/arena/opening-hours/, PATCH /api/arena/opening-hours/,
 * and fallback POST /api/arena/opening-hours/ for newly created or empty accounts.
 */

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { Skeleton } from "@/components/ui/skeleton"
import { getErrorMessage } from "@/lib/auth"
import DayScheduleRow, { type DayScheduleItem } from "./DayScheduleRow"
import SectionHeader from "../SectionHeader"
import EditSaveButton from "../EditSaveButton"
import {
  useGetOpeningHoursQuery,
  useCreateOpeningHoursMutation,
  useUpdateOpeningHoursMutation,
} from "@/redux/features/dashboard/field-profile/fieldProfileAPI"

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

const DEFAULT_SCHEDULE: DayScheduleItem[] = DAYS_OF_WEEK.map((day) => ({
  day,
  isOpen: day !== "Sunday",
  timeSlots: [{ openTime: "09:00", closeTime: "21:00" }],
}))

const timeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0
  const [h, m] = timeStr.split(":").map(Number)
  return (h || 0) * 60 + (m || 0)
}

export default function OpeningHoursPage() {
  const { t } = useTranslation("dashboard")
  const { data: apiData, isLoading } = useGetOpeningHoursQuery()
  const [createOpeningHours, { isLoading: isCreating }] = useCreateOpeningHoursMutation()
  const [updateOpeningHours, { isLoading: isUpdating }] = useUpdateOpeningHoursMutation()

  const isSaving = isCreating || isUpdating

  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<DayScheduleItem[] | null>(null)

  // Determine if opening hours already exist on the backend
  const hasExistingHours = Boolean(
    apiData?.success &&
      apiData?.data?.weekly_hours &&
      Array.isArray(apiData.data.weekly_hours) &&
      apiData.data.weekly_hours.length > 0,
  )

  // Parse API weekly_hours or use defaults
  const baseSchedule = useMemo<DayScheduleItem[]>(() => {
    if (!apiData?.data?.weekly_hours || !Array.isArray(apiData.data.weekly_hours)) {
      return DEFAULT_SCHEDULE
    }

    const apiHours = apiData.data.weekly_hours
    return DAYS_OF_WEEK.map((dayName) => {
      const match = apiHours.find(
        (h) => h.day.toLowerCase() === dayName.toLowerCase(),
      )

      if (!match) {
        return {
          day: dayName,
          isOpen: false,
          timeSlots: [{ openTime: "09:00", closeTime: "21:00" }],
        }
      }

      const slots =
        match.slots && match.slots.length > 0
          ? match.slots.map((s) => ({
              id: s.id,
              openTime: s.opening_time ? s.opening_time.slice(0, 5) : "09:00",
              closeTime: s.closing_time ? s.closing_time.slice(0, 5) : "21:00",
            }))
          : [{ openTime: "09:00", closeTime: "21:00" }]

      return {
        day: dayName,
        isOpen: Boolean(match.is_open),
        timeSlots: slots,
      }
    })
  }, [apiData])

  const currentSchedule = isEditing ? (draft ?? baseSchedule) : baseSchedule

  const handleToggleEdit = () => {
    if (isEditing) {
      setDraft(null)
      setIsEditing(false)
      return
    }
    setDraft(
      baseSchedule.map((d) => ({
        ...d,
        timeSlots: d.timeSlots.map((s) => ({ ...s })),
      })),
    )
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!draft) return

    // Frontend validation: check that each open day has valid, non-overlapping time slots
    for (const item of draft) {
      if (item.isOpen) {
        if (!item.timeSlots || item.timeSlots.length === 0) {
          toast.error(
            t(
              "arena.openingHoursTab.slotRequired",
              `Please add at least one time slot for ${item.day}`,
            ),
          )
          return
        }

        for (const slot of item.timeSlots) {
          if (!slot.openTime || !slot.closeTime) {
            toast.error(
              t(
                "arena.openingHoursTab.fillTimes",
                `Please specify both opening and closing times for ${item.day}`,
              ),
            )
            return
          }

          if (slot.openTime >= slot.closeTime) {
            toast.error(
              t(
                "arena.openingHoursTab.timeRangeInvalid",
                `${item.day}: Opening time (${slot.openTime}) must be earlier than closing time (${slot.closeTime})`,
              ),
            )
            return
          }
        }

        // Validate that slots do not overlap
        if (item.timeSlots.length > 1) {
          for (let i = 0; i < item.timeSlots.length; i++) {
            const startA = timeToMinutes(item.timeSlots[i].openTime)
            const endA = timeToMinutes(item.timeSlots[i].closeTime)

            for (let j = i + 1; j < item.timeSlots.length; j++) {
              const startB = timeToMinutes(item.timeSlots[j].openTime)
              const endB = timeToMinutes(item.timeSlots[j].closeTime)

              if (startA < endB && startB < endA) {
                toast.error(
                  t(
                    "arena.openingHoursTab.slotsOverlap",
                    `${item.day}: Opening hour slots cannot overlap.`,
                  ),
                )
                return
              }
            }
          }
        }
      }
    }

    try {
      const payload = {
        weekly_hours: draft.map((d) => ({
          day: d.day.toLowerCase(),
          is_open: d.isOpen,
          slots: d.isOpen
            ? d.timeSlots.map((s) => ({
                opening_time: s.openTime,
                closing_time: s.closeTime,
              }))
            : [],
        })),
      }

      if (!hasExistingHours) {
        const res = await createOpeningHours(payload).unwrap()
        toast.success(
          res.message ||
            t(
              "arena.openingHoursTab.created",
              "Weekly opening hours created successfully",
            ),
        )
      } else {
        const res = await updateOpeningHours(payload).unwrap()
        toast.success(
          res.message ||
            t(
              "arena.openingHoursTab.updated",
              "Weekly opening hours updated successfully",
            ),
        )
      }

      setDraft(null)
      setIsEditing(false)
    } catch (error: unknown) {
      // Specifically extract weekly_hours validation error structure if returned by backend
      const errorObj = error as {
        data?: {
          data?: {
            weekly_hours?: Array<{ slots?: string[] | string }>;
          };
        };
      };

      const weeklyHoursErrors = errorObj?.data?.data?.weekly_hours;
      if (Array.isArray(weeklyHoursErrors)) {
        for (let i = 0; i < weeklyHoursErrors.length; i++) {
          const dayErr = weeklyHoursErrors[i];
          if (dayErr?.slots && Array.isArray(dayErr.slots) && dayErr.slots.length > 0) {
            const dayName = DAYS_OF_WEEK[i] || `Day ${i + 1}`;
            toast.error(`${dayName}: ${dayErr.slots[0]}`);
            return;
          }
          if (typeof dayErr?.slots === "string" && dayErr.slots.trim()) {
            const dayName = DAYS_OF_WEEK[i] || `Day ${i + 1}`;
            toast.error(`${dayName}: ${dayErr.slots}`);
            return;
          }
        }
      }

      toast.error(
        getErrorMessage(
          error,
          t(
            "arena.openingHoursTab.updateFailed",
            "Failed to update opening hours",
          ),
        ),
      )
    }
  }

  const updateDay = (dayIndex: number, patch: Partial<DayScheduleItem>) => {
    setDraft((prev) => {
      if (!prev) return prev
      return prev.map((item, i) => (i === dayIndex ? { ...item, ...patch } : item))
    })
  }

  const updateTimeSlot = (
    dayIndex: number,
    slotIndex: number,
    field: "openTime" | "closeTime",
    value: string,
  ) => {
    setDraft((prev) => {
      if (!prev) return prev
      return prev.map((item, i) => {
        if (i !== dayIndex) return item
        return {
          ...item,
          timeSlots: item.timeSlots.map((slot, si) =>
            si === slotIndex ? { ...slot, [field]: value } : slot,
          ),
        }
      })
    })
  }

  const addTimeSlot = (dayIndex: number) => {
    setDraft((prev) => {
      if (!prev) return prev
      return prev.map((item, i) => {
        if (i !== dayIndex) return item
        return {
          ...item,
          timeSlots: [...item.timeSlots, { openTime: "09:00", closeTime: "17:00" }],
        }
      })
    })
  }

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    setDraft((prev) => {
      if (!prev) return prev
      return prev.map((item, i) => {
        if (i !== dayIndex) return item
        if (item.timeSlots.length <= 1) return item
        return {
          ...item,
          timeSlots: item.timeSlots.filter((_, si) => si !== slotIndex),
        }
      })
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SectionHeader
          title={t("arena.openingHoursTab.title")}
          subtitle={t("arena.openingHoursTab.subtitle")}
        />

        <div className="space-y-4">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="flex items-center gap-4 py-3 border-b border-white/5"
            >
              <Skeleton className="h-6 w-11 rounded-full" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-64 rounded-md ml-auto sm:ml-0" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title={t("arena.openingHoursTab.title")}
        subtitle={t("arena.openingHoursTab.subtitle")}
      />

      <div className="space-y-2 bg-card/30 border border-white/5 rounded-xl p-4 sm:p-6">
        {currentSchedule.map((day, index) => (
          <DayScheduleRow
            key={day.day}
            schedule={day}
            isEditing={isEditing}
            onToggleDay={(checked) => updateDay(index, { isOpen: checked })}
            onUpdateTimeSlot={(slotIndex, field, value) =>
              updateTimeSlot(index, slotIndex, field, value)
            }
            onAddTimeSlot={() => addTimeSlot(index)}
            onRemoveTimeSlot={(slotIndex) => removeTimeSlot(index, slotIndex)}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <EditSaveButton
          isEditing={isEditing}
          isSaving={isSaving}
          onToggleEdit={handleToggleEdit}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

