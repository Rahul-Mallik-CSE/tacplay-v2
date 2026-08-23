"use client"

import EmailCampaignsTable from "@/components/CommonPagesComponents/MarketingComponents/EmailComponents"

export default function AdminEmailPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <EmailCampaignsTable />
      </div>
    </div>
  )
}
