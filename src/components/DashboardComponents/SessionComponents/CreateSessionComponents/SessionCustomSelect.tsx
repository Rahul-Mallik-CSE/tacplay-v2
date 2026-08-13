"use client"

/**
 * SessionCustomSelect.tsx
 * Custom select dropdown component with toggle functionality.
 * Displays options in a styled dropdown with chevron indicator.
 */

import React from "react"
import { ChevronDown } from "lucide-react"

/** Option type for select items */
interface SelectOption {
  label: string
  value: string
}

/** Props for SessionCustomSelect component */
interface SessionCustomSelectProps {
  placeholder: string
  options: readonly SelectOption[]
  value: string
  open: boolean
  onToggle: () => void
  onSelect: (value: string) => void
  className?: string
}

function SessionCustomSelect({
  placeholder,
  options,
  value,
  open,
  onToggle,
  onSelect,
  className = "",
}: SessionCustomSelectProps) {
  const selectedLabel = options.find((option) => option.value === value)?.label ?? ""

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        className="cursor-pointer w-full flex items-center justify-between bg-transparent border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-left outline-none hover:border-white/20 transition-colors"
      >
        <span className={selectedLabel ? "text-primary" : "text-secondary/60"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-secondary transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-card border border-white/10 rounded-lg shadow-xl overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className="cursor-pointer w-full px-3.5 py-2 text-sm text-primary/80 hover:bg-muted/50 text-left transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SessionCustomSelect
