import CampaignsTableLoading from "@/components/CommonPagesComponents/MarketingComponents/CommonComponents/CampaignsTableLoading"

export default function Loading() {
  return (
    <CampaignsTableLoading
      title="Email Campaigns"
      hasCreateButton={true}
      hasFilterButton={false}
      hasTypeColumn={false}
    />
  )
}
