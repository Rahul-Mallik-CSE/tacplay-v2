"use client"

/**
 * DayScheduleRow.tsx
 * A single day row in the opening hours schedule.
 * Shows day name, toggle, time pickers (from/to), and add button for multiple slots.
 */

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import TimeSlotPicker from "./TimeSlotPicker"

export interface TimeSlot {
  openTime: string
  closeTime: string
}

export interface DayScheduleItem {
  day: string
  isOpen: boolean
  timeSlots: TimeSlot[]
}

interface DayScheduleRowProps {
  schedule: DayScheduleItem
  isEditing: boolean
  onToggleDay: (checked: boolean) => void
  onUpdateTimeSlot: (slotIndex: number, field: "openTime" | "closeTime", value: string) => void
  onAddTimeSlot: () => void
}

export default function DayScheduleRow({
  schedule,
  isEditing,
  onToggleDay,
  onUpdateTimeSlot,
  onAddTimeSlot,
}: DayScheduleRowProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 sm:w-40">
          <Switch
            checked={schedule.isOpen}
            onCheckedChange={onToggleDay}
            disabled={!isEditing}
            className="data-[state=checked]:bg-custom-yellow"
          />
          <span className="text-sm font-medium text-primary whitespace-nowrap">
            {schedule.day}
          </span>
        </div>

        {schedule.isOpen && (
          <div className="flex items-center gap-3 flex-1">
            {schedule.timeSlots.map((slot, slotIndex) => (
              <div key={slotIndex} className="flex items-center gap-3">
                {slotIndex > 0 && (
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {slotIndex > 0 ? "" : ""}
                  </span>
                )}
                <TimeSlotPicker
                  value={slot.openTime}
                  onChange={(val) => onUpdateTimeSlot(slotIndex, "openTime", val)}
                  disabled={!isEditing}
                />
                <span className="text-sm text-muted-foreground">To</span>
                <TimeSlotPicker
                  value={slot.closeTime}
                  onChange={(val) => onUpdateTimeSlot(slotIndex, "closeTime", val)}
                  disabled={!isEditing}
                />
              </div>
            ))}
          </div>
        )}

        {isEditing && schedule.isOpen && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onAddTimeSlot}
            className="w-10 h-10 rounded-lg border border-white/10 hover:bg-white/5 shrink-0"
          >
            <Plus className="w-5 h-5 text-primary" />
          </Button>
        )}
      </div>
    </div>
  )
}
