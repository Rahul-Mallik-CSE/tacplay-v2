import CampaignsTableLoading from "@/components/CommonPagesComponents/MarketingComponents/CommonComponents/CampaignsTableLoading"

export default function Loading() {
  return (
    <CampaignsTableLoading
      title="SMS Campaigns"
      hasCreateButton={true}
      hasFilterButton={false}
      hasTypeColumn={false}
    />
  )
}
