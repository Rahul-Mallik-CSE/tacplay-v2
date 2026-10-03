"use client"

/**
 * DayScheduleRow.tsx
 * A single day row in the opening hours schedule.
 * Shows day name, toggle, time pickers (from/to), and add button for multiple slots.
 */

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import TimeSlotPicker from "./TimeSlotPicker"

export interface TimeSlot {
  id?: number
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
  onRemoveTimeSlot?: (slotIndex: number) => void
}

export default function DayScheduleRow({
  schedule,
  isEditing,
  onToggleDay,
  onUpdateTimeSlot,
  onAddTimeSlot,
  onRemoveTimeSlot,
}: DayScheduleRowProps) {
  return (
    <div className="flex flex-col gap-3 py-2 border-b border-white/5 last:border-b-0">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3 sm:w-40 shrink-0">
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

        {schedule.isOpen ? (
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {schedule.timeSlots.map((slot, slotIndex) => (
              <div key={slotIndex} className="flex items-center gap-2 bg-input/10 p-1.5 rounded-lg border border-white/5">
                <TimeSlotPicker
                  value={slot.openTime}
                  onChange={(val) => onUpdateTimeSlot(slotIndex, "openTime", val)}
                  disabled={!isEditing}
                />
                <span className="text-xs text-muted-foreground px-1">to</span>
                <TimeSlotPicker
                  value={slot.closeTime}
                  onChange={(val) => onUpdateTimeSlot(slotIndex, "closeTime", val)}
                  disabled={!isEditing}
                />
                {isEditing && schedule.timeSlots.length > 1 && onRemoveTimeSlot && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveTimeSlot(slotIndex)}
                    className="w-8 h-8 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 shrink-0"
                    title="Remove slot"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            ))}

            {isEditing && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onAddTimeSlot}
                className="w-9 h-9 rounded-lg border border-white/10 hover:bg-white/5 shrink-0"
                title="Add time slot"
              >
                <Plus className="w-4 h-4 text-primary" />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground px-2.5 py-1 rounded bg-white/5 font-mono">
              Closed
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

