"use client"

import CampaignsTable from "@/components/CommonPagesComponents/MarketingComponents/CampaignsComponents"

export default function CampaignsPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <CampaignsTable />
      </div>
    </div>
  )
}
