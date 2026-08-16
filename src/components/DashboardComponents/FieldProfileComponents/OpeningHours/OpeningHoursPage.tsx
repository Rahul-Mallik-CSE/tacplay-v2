"use client"

/**
 * OpeningHoursPage.tsx
 * Page component for managing field opening hours.
 * Allows setting operating hours for each day of the week.
 */

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "react-toastify"
import EditSaveHeader from "../EditSaveHeader"

interface DaySchedule {
  day: string
  isOpen: boolean
  openTime: string
  closeTime: string
}

const DEFAULT_SCHEDULE: DaySchedule[] = [
  { day: "Monday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
  { day: "Tuesday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
  { day: "Wednesday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
  { day: "Thursday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
  { day: "Friday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
  { day: "Saturday", isOpen: true, openTime: "08:00", closeTime: "22:00" },
  { day: "Sunday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
]

export default function OpeningHoursPage() {
  const { t } = useTranslation("dashboard")
  const [isEditing, setIsEditing] = useState(false)
  const [schedule, setSchedule] = useState<DaySchedule[]>(DEFAULT_SCHEDULE)
  const [draft, setDraft] = useState<DaySchedule[] | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const currentSchedule = isEditing ? (draft ?? schedule) : schedule

  const handleToggleEdit = () => {
    if (isEditing) {
      setDraft(null)
      setIsEditing(false)
      return
    }
    setDraft(schedule)
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
      toast.success("Opening hours updated successfully.")
    } catch {
      toast.error("Failed to update opening hours.")
    } finally {
      setIsSaving(false)
    }
  }

  const updateDay = (index: number, patch: Partial<DaySchedule>) => {
    setDraft((prev) => {
      if (!prev) return prev
      return prev.map((item, i) =>
        i === index ? { ...item, ...patch } : item
      )
    })
  }

  return (
    <div className="space-y-6">
      <EditSaveHeader
        title="Opening Hours"
        subtitle="Set your field's operating hours for each day of the week."
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
      />

      <div className="space-y-4">
        {currentSchedule.map((day, index) => (
          <div
            key={day.day}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-3 sm:w-40">
              <Switch
                checked={day.isOpen}
                onCheckedChange={(checked) =>
                  updateDay(index, { isOpen: checked })
                }
                disabled={!isEditing}
              />
              <span className="text-sm font-medium text-primary">
                {day.day}
              </span>
            </div>

            {day.isOpen ? (
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground">From</label>
                  <Input
                    type="time"
                    value={day.openTime}
                    onChange={(e) =>
                      updateDay(index, { openTime: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-32 bg-input/30 border-white/10 text-primary h-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground">To</label>
                  <Input
                    type="time"
                    value={day.closeTime}
                    onChange={(e) =>
                      updateDay(index, { closeTime: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-32 bg-input/30 border-white/10 text-primary h-10"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 text-sm text-muted-foreground">
                Closed
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
