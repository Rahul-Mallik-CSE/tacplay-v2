"use client"

/**
 * SessionInfoSheetLoading.tsx
 * Skeleton loading state for the SessionInfoSheet.
 * Shows placeholder rows for field info, session info, and team info sections.
 */

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

function SessionInfoSheetLoading() {
  return (
    <div className="px-5 py-6 space-y-6">
      {/* Field Info Section */}
      <div>
        <Skeleton className="h-5 w-28 mb-3" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`field-row-${index}`} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Session Info Section */}
      <div>
        <Skeleton className="h-5 w-32 mb-3" />
        <div className="space-y-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={`session-row-${index}`} className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Team Info Section */}
      <div>
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={`team-row-${index}`} className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SessionInfoSheetLoading
