"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminOverviewLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56 bg-white/10 rounded-md" />
          <Skeleton className="h-4 w-72 bg-white/5 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-36 bg-white/10 rounded-lg" />
          <Skeleton className="h-10 w-32 bg-white/10 rounded-lg" />
        </div>
      </div>

      {/* 5 Analytics Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-card border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20 bg-white/10 rounded" />
              <Skeleton className="h-5 w-5 rounded bg-white/10" />
            </div>
            <Skeleton className="h-8 w-16 bg-white/10 rounded" />
            <Skeleton className="h-3 w-28 bg-white/5 rounded" />
          </div>
        ))}
      </div>

      {/* 3 Grid Charts: Revenue Area, Subscription Bar, Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card border border-white/5 rounded-xl p-4 sm:p-6 flex flex-col h-[380px] space-y-4"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-36 bg-white/10 rounded" />
              <Skeleton className="h-7 w-20 bg-white/5 rounded-md" />
            </div>
            <Skeleton className="flex-1 w-full bg-white/5 rounded-lg" />
          </div>
        ))}
      </div>

      {/* 2 Grid Cards: Revenue by Country & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-card border border-white/5 rounded-xl p-4 sm:p-6 flex flex-col h-[340px] space-y-4"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-40 bg-white/10 rounded" />
              <Skeleton className="h-6 w-20 bg-white/5 rounded" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-14 w-full bg-white/5 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Fields Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-36 bg-white/10 rounded" />
          <Skeleton className="h-5 w-24 bg-white/5 rounded" />
        </div>
        <div className="bg-card border border-white/5 rounded-xl p-4 space-y-3">
          <Skeleton className="h-10 w-full bg-white/10 rounded-lg" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full bg-white/5 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
