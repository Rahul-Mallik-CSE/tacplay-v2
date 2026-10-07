"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminEarningLoading() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44 bg-white/10 rounded-md" />
          <Skeleton className="h-4 w-60 bg-white/5 rounded-md" />
        </div>
        <Skeleton className="h-10 w-full sm:w-72 bg-white/10 rounded-lg" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/5 bg-card p-4 sm:p-5 space-y-3"
          >
            <Skeleton className="h-4 w-28 bg-white/10 rounded" />
            <Skeleton className="h-7 w-24 bg-white/10 rounded" />
          </div>
        ))}
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-9 w-32 bg-white/10 rounded-lg" />
        <Skeleton className="h-9 w-32 bg-white/10 rounded-lg" />
        <Skeleton className="h-9 w-32 bg-white/10 rounded-lg" />
        <Skeleton className="h-9 w-40 bg-white/10 rounded-lg" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-card border border-white/5 rounded-xl p-4 space-y-3">
        <Skeleton className="h-10 w-full bg-white/10 rounded-lg" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-14 w-full bg-white/5 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
