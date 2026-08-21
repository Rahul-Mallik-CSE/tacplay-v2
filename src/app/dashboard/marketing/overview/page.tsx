"use client"

import MarketingOverview from "@/components/DashboardComponents/MarketingComponents/OverviewComponents"

export default function MarketingOverviewPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <MarketingOverview />
      </div>
    </div>
  )
}
