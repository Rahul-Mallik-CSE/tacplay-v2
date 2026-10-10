"use client"

import React from "react"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { SubscriptionSearchBarProps } from "@/types/AdminTypes/SubscriptionManagementTypes"

function SubscriptionSearchBar({
  value,
  onChange,
  placeholder,
}: SubscriptionSearchBarProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder || t("common.search", "Search subscriptions...")}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-colors"
      />
    </div>
  )
}

export default SubscriptionSearchBar
