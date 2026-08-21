"use client"

import ManageBillingContainer from "@/components/DashboardComponents/SubscriptionComponents/OverviewComponents/ManageBillingComponents/ManageBillingContainer"

export default function ManageBillingPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <ManageBillingContainer />
      </div>
    </div>
  )
}
