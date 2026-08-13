"use client"

/**
 * SessionDetailsLoading.tsx
 * Skeleton loading state component for the session details page.
 * Renders placeholder elements matching the scoreboard and player card layout.
 */

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

function SessionDetailsLoading() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>

        {/* Scoreboard skeleton */}
        <div className="rounded-xl bg-card border border-white/5 p-6">
          <div className="flex justify-center mb-4">
            <Skeleton className="h-8 w-48 rounded" />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="text-center">
              <Skeleton className="h-12 w-16 mx-auto" />
              <Skeleton className="h-3 w-12 mx-auto mt-1" />
            </div>
            <div className="text-center">
              <Skeleton className="h-12 w-20 mx-auto" />
              <Skeleton className="h-3 w-16 mx-auto mt-1" />
            </div>
            <div className="text-center">
              <Skeleton className="h-12 w-16 mx-auto" />
              <Skeleton className="h-3 w-12 mx-auto mt-1" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Player cards skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`player-skeleton-${index}`}
              className="rounded-xl border border-white/5 p-4"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {Array.from({ length: 5 }).map((__, statIndex) => (
                  <div key={`stat-skeleton-${statIndex}`} className="rounded-lg p-2">
                    <Skeleton className="h-3 w-8 mx-auto mb-1" />
                    <Skeleton className="h-4 w-6 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SessionDetailsLoading
