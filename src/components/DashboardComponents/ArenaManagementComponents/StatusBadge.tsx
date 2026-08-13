"use client"

import { useTranslation } from "react-i18next"

const statusBadgeClassMap: Record<string, string> = {
  paid: "bg-teal-500/20 text-teal-400 border border-teal-500/30",
  pending: "bg-custom-yellow/20 text-yellow-400 border border-custom-yellow/30",
  failed: "bg-custom-red/20 text-red-400 border border-custom-red/30",
  refunded: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
}

export default function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation("dashboard")

  const colors =
    statusBadgeClassMap[status.toLowerCase()] ??
    "bg-secondary/20 text-secondary border border-secondary/30"

  const normalizedStatus = status.toLowerCase()
  const statusKey = `status${normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)}`
  const translatedStatus = t(`arena.billingsTab.${statusKey}`, {
    defaultValue: status,
  })

  return (
    <span
      className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-md capitalize ${colors}`}
    >
      {translatedStatus}
    </span>
  )
}
