"use client"

/**
 * SessionInfoRow.tsx
 * Reusable row component for displaying label-value pairs in session detail sheets.
 * Used in SessionInfoSheet, PlayerDetailsSheet, and other detail views.
 */

import React from "react"

/** Props for SessionInfoRow component */
interface SessionInfoRowProps {
  label: string
  value: React.ReactNode
}

function SessionInfoRow({ label, value }: SessionInfoRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5 last:border-0">
      <span className="text-sm text-secondary whitespace-nowrap">{label}</span>
      <span className="text-sm text-primary text-right">{value}</span>
    </div>
  )
}

export default SessionInfoRow
