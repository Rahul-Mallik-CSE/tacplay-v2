"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminSubscriptionLoading() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-8 w-60 bg-white/10 rounded-md" />
          <Skeleton className="h-4 w-72 bg-white/5 rounded-md" />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Skeleton className="h-10 w-full sm:w-64 bg-white/10 rounded-lg" />
          <Skeleton className="h-10 w-24 bg-white/10 rounded-lg" />
        </div>
      </div>

      {/* Filter Toolbar Skeleton */}
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-9 w-28 bg-white/10 rounded-lg" />
        <Skeleton className="h-9 w-28 bg-white/10 rounded-lg" />
        <Skeleton className="h-9 w-28 bg-white/10 rounded-lg" />
        <Skeleton className="h-9 w-32 bg-white/10 rounded-lg" />
        <Skeleton className="h-9 w-40 bg-white/10 rounded-lg ml-auto" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-card border border-white/5 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <Skeleton className="h-5 w-32 bg-white/10 rounded" />
          <Skeleton className="h-8 w-44 bg-white/10 rounded-md" />
        </div>
        <Skeleton className="h-11 w-full bg-white/10 rounded-lg" />
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex items-center gap-4 py-2.5">
            <Skeleton className="h-10 w-10 rounded-full bg-white/10 shrink-0" />
            <Skeleton className="h-4 w-36 bg-white/5 rounded" />
            <Skeleton className="h-5 w-20 bg-white/10 rounded-full" />
            <Skeleton className="h-5 w-24 bg-white/10 rounded-full" />
            <Skeleton className="h-4 w-16 bg-white/5 rounded" />
            <Skeleton className="h-4 w-20 bg-white/5 rounded" />
            <Skeleton className="h-5 w-16 bg-white/10 rounded-full" />
            <Skeleton className="h-4 w-24 bg-white/5 rounded ml-auto" />
            <Skeleton className="h-8 w-24 bg-white/10 rounded-lg shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
