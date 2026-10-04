"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import type { AssignedSession, AssignedSessionToday } from "@/types/CommonPageTypes/StaffTypes"

const STATUS_COLORS: Record<string, string> = {
  Ongoing: "bg-emerald-500",
  ongoing: "bg-emerald-500",
  Upcoming: "bg-amber-500",
  upcoming: "bg-amber-500",
  Completed: "bg-secondary",
  completed: "bg-secondary",
}

interface AssignedSessionRowProps {
  session: AssignedSession | AssignedSessionToday
}

function AssignedSessionRow({ session }: AssignedSessionRowProps) {
  const { t } = useTranslation("dashboard")

  const statusKey = session.status ? session.status.toLowerCase() : "upcoming"
  const statusText = t(`staff.${statusKey}` as never, session.status)
  const capacity =
    "capacity_display" in session && session.capacity_display
      ? session.capacity_display
      : "players" in session && session.players
      ? session.players
      : ""

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
      <span className="text-sm text-primary w-24 shrink-0">{session.time}</span>
      <span className="text-sm text-primary flex-1 truncate px-2">{session.session_name}</span>
      {capacity && (
        <span className="text-sm text-secondary w-16 text-right shrink-0">{capacity}</span>
      )}
      <div className="flex items-center gap-2 w-28 justify-end shrink-0">
        <span
          className={`w-2 h-2 rounded-full ${
            STATUS_COLORS[session.status] || "bg-secondary"
          }`}
        />
        <span className="text-xs text-secondary capitalize">{statusText}</span>
      </div>
    </div>
  )
}

export default AssignedSessionRow
