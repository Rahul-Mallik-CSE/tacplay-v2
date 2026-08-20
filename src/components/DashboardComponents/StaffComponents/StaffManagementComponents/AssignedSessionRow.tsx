"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import type { AssignedSession } from "@/types/DashboardTypes/StaffTypes"

const STATUS_COLORS: Record<string, string> = {
  Ongoing: "bg-emerald-500",
  Upcoming: "bg-amber-500",
  Completed: "bg-secondary",
}

function AssignedSessionRow({ session }: { session: AssignedSession }) {
  const { t } = useTranslation("dashboard")

  const statusText = t(`staff.${session.status.toLowerCase()}` as never)

  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-primary w-24">{session.time}</span>
      <span className="text-sm text-primary flex-1">{session.session_name}</span>
      <span className="text-sm text-secondary w-16 text-right">{session.players}</span>
      <div className="flex items-center gap-2 w-28 justify-end">
        <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[session.status]}`} />
        <span className="text-xs text-secondary">{statusText}</span>
      </div>
    </div>
  )
}

export default AssignedSessionRow
