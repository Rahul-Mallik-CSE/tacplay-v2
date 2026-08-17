"use client"

/**
 * OpeningHoursPage.tsx
 * Page component for managing field opening hours.
 * Allows setting operating hours for each day of the week with multiple time slots.
 */

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import DayScheduleRow, { type DayScheduleItem } from "./DayScheduleRow"

const DEFAULT_SCHEDULE: DayScheduleItem[] = [
  { day: "Monday", isOpen: true, timeSlots: [{ openTime: "09:00", closeTime: "21:00" }] },
  { day: "Tuesday", isOpen: true, timeSlots: [{ openTime: "09:00", closeTime: "21:00" }] },
  { day: "Wednesday", isOpen: true, timeSlots: [{ openTime: "09:00", closeTime: "21:00" }] },
  { day: "Thursday", isOpen: true, timeSlots: [{ openTime: "09:00", closeTime: "21:00" }] },
  { day: "Friday", isOpen: true, timeSlots: [{ openTime: "09:00", closeTime: "22:00" }] },
  { day: "Saturday", isOpen: true, timeSlots: [{ openTime: "08:00", closeTime: "22:00" }] },
  { day: "Sunday", isOpen: true, timeSlots: [{ openTime: "08:00", closeTime: "20:00" }] },
]

export default function OpeningHoursPage() {
  const { t } = useTranslation("dashboard")
  const [schedule, setSchedule] = useState<DayScheduleItem[]>(DEFAULT_SCHEDULE)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<DayScheduleItem[] | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const currentSchedule = isEditing ? (draft ?? schedule) : schedule

  const handleToggleEdit = () => {
    if (isEditing) {
      setDraft(null)
      setIsEditing(false)
      return
    }
    setDraft(schedule.map((d) => ({ ...d, timeSlots: d.timeSlots.map((s) => ({ ...s })) })))
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!draft) return
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSchedule(draft)
      setDraft(null)
      setIsEditing(false)
      toast.success(t("arena.openingHoursTab.updated"))
    } catch {
      toast.error(t("arena.openingHoursTab.updateFailed"))
    } finally {
      setIsSaving(false)
    }
  }

  const updateDay = (dayIndex: number, patch: Partial<DayScheduleItem>) => {
    setDraft((prev) => {
      if (!prev) return prev
      return prev.map((item, i) => (i === dayIndex ? { ...item, ...patch } : item))
    })
  }

  const updateTimeSlot = (dayIndex: number, slotIndex: number, field: "openTime" | "closeTime", value: string) => {
    setDraft((prev) => {
      if (!prev) return prev
      return prev.map((item, i) => {
        if (i !== dayIndex) return item
        return {
          ...item,
          timeSlots: item.timeSlots.map((slot, si) =>
            si === slotIndex ? { ...slot, [field]: value } : slot
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            {t("arena.openingHoursTab.title")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("arena.openingHoursTab.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="ghost" size="sm" onClick={handleToggleEdit}>
                {t("arena.cancelEdit")}
              </Button>
              <Button variant="default" size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : null}
                {t("arena.openingHoursTab.saveChanges")}
              </Button>
            </>
          ) : (
            <Button variant="default" size="sm" onClick={handleToggleEdit}>
              {t("arena.editInfo")}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {currentSchedule.map((day, index) => (
          <DayScheduleRow
            key={day.day}
            schedule={day}
            isEditing={isEditing}
            onToggleDay={(checked) => updateDay(index, { isOpen: checked })}
            onUpdateTimeSlot={(slotIndex, field, value) => updateTimeSlot(index, slotIndex, field, value)}
            onAddTimeSlot={() => addTimeSlot(index)}
          />
        ))}
      </div>

      {isEditing && (
        <div className="flex justify-end">
          <Button variant="destructive" size="sm" onClick={handleSave} disabled={isSaving}>
            {t("arena.openingHoursTab.saveChanges")}
          </Button>
        </div>
      )}
    </div>
  )
}
