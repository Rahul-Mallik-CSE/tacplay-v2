/**
 * ScoreManagementSkeleton.tsx
 * Skeleton loading state for Score Management page.
 */

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ScoreManagementSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 bg-white/10" />
          <Skeleton className="h-4 w-96 bg-white/5" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-28 bg-white/5 rounded-xl" />
          <Skeleton className="h-10 w-36 bg-white/10 rounded-xl" />
        </div>
      </div>

      {/* Preset Pills Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-24 bg-white/5 rounded-lg" />
        <Skeleton className="h-8 w-28 bg-white/5 rounded-lg" />
        <Skeleton className="h-8 w-28 bg-white/5 rounded-lg" />
      </div>

      {/* 3 Score Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-6 bg-card/60 border border-white/5 space-y-5"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="w-12 h-12 rounded-xl bg-white/10" />
              <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/5" />
            </div>
            <Skeleton className="h-14 w-full rounded-xl bg-white/10" />
          </div>
        ))}
      </div>

      {/* Simulator Card Skeleton */}
      <div className="rounded-2xl p-6 bg-card/60 border border-white/5 space-y-4">
        <Skeleton className="h-6 w-48 bg-white/10" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-20 w-full rounded-xl bg-white/5" />
          <Skeleton className="h-20 w-full rounded-xl bg-white/5" />
          <Skeleton className="h-20 w-full rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  )
}
