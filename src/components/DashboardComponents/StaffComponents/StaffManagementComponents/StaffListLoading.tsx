"use client"

import React from "react"
import { useTranslation } from "react-i18next"

function StaffListLoading() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-72 bg-muted rounded animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
          <div className="h-10 w-44 bg-muted rounded animate-pulse" />
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-white/5">
        <div className="space-y-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border-b border-white/5"
            >
              <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-48 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              <div className="h-4 w-16 bg-muted rounded animate-pulse" />
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-6 w-16 bg-muted rounded animate-pulse" />
              <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StaffListLoading
