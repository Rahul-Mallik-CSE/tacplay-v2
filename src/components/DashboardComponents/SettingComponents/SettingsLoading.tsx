"use client"

/**
 * SettingsLoading.tsx
 * Skeleton loading state component for the settings page.
 * Renders placeholder elements matching the profile card layout
 * while data is being fetched from the API.
 */

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

function SettingsLoading() {
  return (
    <div className="space-y-6">
      {/* Title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Profile card skeleton */}
      <div className="rounded-xl border border-white/5 bg-card p-5 sm:p-6 space-y-8">
        {/* Avatar & Name skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Personal Info skeleton */}
        <div>
          <Skeleton className="h-6 w-40 mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`field-skeleton-${index}`} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex gap-3">
          <Skeleton className="h-10 w-40 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default SettingsLoading
