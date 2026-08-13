"use client"

/**
 * SessionFilters.tsx
 * Filter dropdown components for session list.
 * Provides status and match type filter selects.
 */

import React from "react"
import { useTranslation } from "react-i18next"
import type {
  SessionFiltersProps,
  SessionStatusFilter,
  SessionMatchTypeFilter,
} from "@/types/DashboardTypes/SessionTypes"

function SessionFilters({
  status,
  matchType,
  onStatusChange,
  onMatchTypeChange,
}: SessionFiltersProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex items-center gap-3 w-full sm:w-auto">
      {/* Status Filter */}
      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as SessionStatusFilter)
        }
        className="cursor-pointer bg-muted border border-white/10 rounded-lg px-4 py-2 text-sm text-primary outline-none"
      >
        <option value="all">{t("sessions.filters.allStatus")}</option>
        <option value="open">{t("sessions.filters.open")}</option>
        <option value="ongoing">{t("sessions.filters.ongoing")}</option>
        <option value="completed">{t("sessions.filters.completed")}</option>
        <option value="cancelled">{t("sessions.filters.cancelled")}</option>
      </select>

      {/* Match Type Filter */}
      <select
        value={matchType}
        onChange={(event) =>
          onMatchTypeChange(event.target.value as SessionMatchTypeFilter)
        }
        className="cursor-pointer bg-muted border border-white/10 rounded-lg px-4 py-2 text-sm text-primary outline-none"
      >
        <option value="all">{t("sessions.filters.allMatchTypes")}</option>
        <option value="ranked">{t("sessions.filters.ranked")}</option>
        <option value="social">{t("sessions.filters.social")}</option>
      </select>
    </div>
  )
}

export default SessionFilters
