"use client"

/**
 * PlayerDetailsSheetLoading.tsx
 * Skeleton loading state for the PlayerDetailsSheet.
 * Shows placeholder rows for player info, booking info, and score management.
 */

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

function PlayerDetailsSheetLoading() {
  return (
    <div className="px-5 py-6 space-y-6">
      {/* Player Info Section */}
      <div>
        <Skeleton className="h-5 w-28 mb-3" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={`player-row-${index}`} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Booking Info Section */}
      <div>
        <Skeleton className="h-5 w-32 mb-3" />
        <div className="space-y-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={`booking-row-${index}`} className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Score Management Section */}
      <div>
        <Skeleton className="h-5 w-40 mb-3" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  )
}

export default PlayerDetailsSheetLoading
