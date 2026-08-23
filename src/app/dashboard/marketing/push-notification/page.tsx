"use client"

import PushCampaignsTable from "@/components/CommonPagesComponents/MarketingComponents/PushComponents"

export default function PushNotificationPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <PushCampaignsTable />
      </div>
    </div>
  )
}
