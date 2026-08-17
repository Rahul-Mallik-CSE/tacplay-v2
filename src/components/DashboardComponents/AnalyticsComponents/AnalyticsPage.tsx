"use client"

/**
 * AnalyticsPage.tsx
 * Main analytics dashboard page.
 * Composes header, stat cards, charts, and top packages table.
 */

import React from "react"
import { mockAnalyticsData } from "../../../mock-data/DashboardMockData/analytics-mock-data"
import AnalyticsHeader from "./AnalyticsHeader"
import StatCards from "./StatCards"
import RevenueOverTimeChart from "./RevenueOverTimeChart"
import BookingVsCheckinsChart from "./BookingVsCheckinsChart"
import RevenueSourceChart from "./RevenueSourceChart"
import TopPackagesTable from "./TopPackagesTable"

export default function AnalyticsPage() {
  const data = mockAnalyticsData

  return (
    <div className="space-y-6">
      <AnalyticsHeader />

      <StatCards stats={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueOverTimeChart data={data.revenueOverTime} />
        <BookingVsCheckinsChart data={data.bookingVsCheckins} />
        <RevenueSourceChart data={data.revenueSources} />
      </div>

      <TopPackagesTable packages={data.topPackages} />
    </div>
  )
}
