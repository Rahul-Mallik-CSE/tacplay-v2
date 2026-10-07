"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function MarketingOverviewLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 bg-white/10 rounded-md" />
          <Skeleton className="h-4 w-44 bg-white/5 rounded-md" />
        </div>
        <Skeleton className="h-10 w-28 bg-white/10 rounded-lg" />
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-card border border-white/5 rounded-xl p-4 md:p-5 flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28 bg-white/10" />
              <Skeleton className="h-8 w-8 rounded-lg bg-white/10" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-20 bg-white/10" />
              <Skeleton className="h-3 w-24 bg-white/5" />
            </div>
          </div>
        ))}
      </div>

      {/* 3 Grid cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card border border-white/5 rounded-xl p-4 md:p-5 flex flex-col h-[360px] space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-5 w-36 bg-white/10" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-10 w-full bg-white/5 rounded-lg" />
              <Skeleton className="h-10 w-full bg-white/5 rounded-lg" />
              <Skeleton className="h-10 w-full bg-white/5 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-44 bg-white/10" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 bg-white/5 rounded-lg" />
            <Skeleton className="h-8 w-20 bg-white/5 rounded-lg" />
          </div>
        </div>
        <div className="bg-card border border-white/5 rounded-xl p-4 space-y-3">
          <Skeleton className="h-10 w-full bg-white/10 rounded-lg" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-14 w-full bg-white/5 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
