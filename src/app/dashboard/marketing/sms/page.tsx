"use client"

import SmsCampaignsTable from "@/components/CommonPagesComponents/MarketingComponents/SmsComponents"

export default function SmsPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <SmsCampaignsTable />
      </div>
    </div>
  )
}
