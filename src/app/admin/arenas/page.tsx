"use client"

import React from "react"
import { useTranslation } from "react-i18next"

export default function AdminArenasPage() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <div className="rounded-2xl border border-white/5 bg-muted/20 p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-bold text-primary mb-2">
            {t("adminSidebar.arenas")}
          </h2>
          <p className="text-sm text-secondary">
            View and manage all registered arenas.
          </p>
        </div>
      </div>
    </div>
  )
}
