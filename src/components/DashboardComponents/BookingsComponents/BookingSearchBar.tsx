"use client"

/**
 * BookingSearchBar.tsx
 * Search input component for filtering booking list.
 * Includes search icon and handles value changes.
 */

import React from "react"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { BookingSearchBarProps } from "@/types/DashboardTypes/BookingsTypes"

function BookingSearchBar({ value, onChange }: BookingSearchBarProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
      <input
        type="text"
        placeholder={t("common.search")}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
      />
    </div>
  )
}

export default BookingSearchBar
