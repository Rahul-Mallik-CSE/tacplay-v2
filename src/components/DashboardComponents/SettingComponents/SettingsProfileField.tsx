"use client"

/**
 * SettingsProfileField.tsx
 * Reusable read-only field component for displaying profile information.
 * Shows label and value with optional password toggle functionality.
 */

import React from "react"
import { Eye, EyeOff } from "lucide-react"
import type { SettingsProfileFieldProps } from "@/types/DashboardTypes/SettingsTypes"

function SettingsProfileField({
  label,
  value,
  type = "text",
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
}: SettingsProfileFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-secondary">{label}</label>
      <div className="relative">
        <input
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          readOnly
          value={value}
          className="w-full px-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary cursor-default focus:outline-none"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default SettingsProfileField
