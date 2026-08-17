"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import HelpSupportHeader from "./HelpSupportHeader"
import SupportChannelCards from "./SupportChannelCards"
import RecentTicketsTable from "./RecentTicketsTable"
import SupportInfoSection from "./SupportInfoSection"
import PopularHelpTopics from "./PopularHelpTopics"
import {
  mockSupportChannels,
  mockSupportInfoItems,
  mockHelpTopics,
  mockTicketListData,
} from "../../../mock-data/DashboardMockData/help-support-mock-data"

function HelpSupportContainer() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  const handleSubmitTicket = () => {
    router.push("/dashboard/help-support/submit-ticket")
  }

  const handleViewAllTickets = () => {
    // Future: navigate to all tickets page
  }

  const handleViewTicket = () => {
    // Future: open ticket details
  }

  const handleBrowseHelpCenter = () => {
    // Future: navigate to help center
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <HelpSupportHeader onSubmitTicket={handleSubmitTicket} />

      <SupportChannelCards channels={mockSupportChannels} />

      <RecentTicketsTable
        tickets={mockTicketListData}
        onViewAll={handleViewAllTickets}
        onViewTicket={handleViewTicket}
      />

      <SupportInfoSection items={mockSupportInfoItems} />

      <PopularHelpTopics
        topics={mockHelpTopics}
        onBrowseHelpCenter={handleBrowseHelpCenter}
      />
    </div>
  )
}

export default HelpSupportContainer
