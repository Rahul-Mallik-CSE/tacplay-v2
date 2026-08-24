"use client"

import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { PlayerSearchBarProps } from "@/types/AdminTypes/PlayerManagementTypes"

export default function PlayerSearchBar({
  value,
  onChange,
}: PlayerSearchBarProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("common.search")}
        className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
      />
    </div>
  )
}
