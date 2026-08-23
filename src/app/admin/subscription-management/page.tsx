"use client"

import SubscriptionListTable from "@/components/AdminComponents/SubscriptionManagementComponents/SubscriptionListTable"

export default function AdminSubscriptionManagementPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <SubscriptionListTable />
      </div>
    </div>
  )
}
