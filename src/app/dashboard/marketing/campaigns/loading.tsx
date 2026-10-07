import CampaignsTableLoading from "@/components/CommonPagesComponents/MarketingComponents/CommonComponents/CampaignsTableLoading"

export default function Loading() {
  return (
    <CampaignsTableLoading
      title="All Campaigns"
      hasFilterButton={true}
      hasTypeColumn={true}
    />
  )
}
