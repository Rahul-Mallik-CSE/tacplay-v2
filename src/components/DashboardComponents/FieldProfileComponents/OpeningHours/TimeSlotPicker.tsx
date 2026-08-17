"use client"

/**
 * TimeSlotPicker.tsx
 * A styled time picker with dropdown-style UI showing time with a chevron.
 * Uses native HTML time input styled to match the design.
 */

import { ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"

interface TimeSlotPickerProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const formatDisplayTime = (time24: string): string => {
  if (!time24) return "9:00 AM"
  const [hours, minutes] = time24.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const displayHours = hours % 12 || 12
  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`
}

export default function TimeSlotPicker({
  value,
  onChange,
  disabled = false,
}: TimeSlotPickerProps) {
  return (
    <div className="relative">
      <div className="flex items-center">
        <Input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-28 sm:w-32 bg-input/30 border-white/10 text-primary h-10 pr-8 appearance-none cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-4 [&::-webkit-calendar-picker-indicator]:h-4"
        />
        <ChevronDown className="absolute right-2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  )
}
