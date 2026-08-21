"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Search } from "lucide-react"
import CustomTable from "@/components/SharedComponents/CustomTable"
import CampaignActionMenu from "../CommonComponents/CampaignActionMenu"
import CampaignTypeBadge from "../CommonComponents/CampaignTypeBadge"
import CampaignStatusBadge from "../CommonComponents/CampaignStatusBadge"
import { mockCampaigns } from "@/mock-data/DashboardMockData/marketing-mock-data"
import type { Campaign } from "@/types/DashboardTypes/MarketingTypes"

export default function EmailCampaignsTable() {
  const { t } = useTranslation("dashboard")
  const [search, setSearch] = useState("")

  const emailCampaigns = mockCampaigns.filter((c) => c.type === "Email")
  const filteredCampaigns = emailCampaigns.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    {
      header: t("marketing.columns.campaigns"),
      accessor: (row: Campaign) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-primary">{row.name}</p>
            <p className="text-xs text-secondary">{row.description}</p>
          </div>
        </div>
      ),
    },
    {
      header: t("marketing.columns.type"),
      accessor: (row: Campaign) => <CampaignTypeBadge type={row.type} />,
    },
    {
      header: t("marketing.columns.audience"),
      accessor: (row: Campaign) => <span>{row.audience}</span>,
    },
    {
      header: t("marketing.columns.scheduled"),
      accessor: (row: Campaign) => (
        <div>
          <p className="text-sm">{row.scheduled_date}</p>
          <p className="text-xs text-secondary">{row.scheduled_time}</p>
        </div>
      ),
    },
    {
      header: t("marketing.columns.booking"),
      accessor: (row: Campaign) => (
        <div>
          <p className="text-sm">{row.booking_count}</p>
          <p className="text-xs text-green-400">+{row.booking_change}%</p>
        </div>
      ),
    },
    {
      header: t("marketing.columns.revenue"),
      accessor: (row: Campaign) => <span>€{row.revenue.toLocaleString()}</span>,
    },
    {
      header: t("marketing.columns.status"),
      accessor: (row: Campaign) => <CampaignStatusBadge status={row.status} />,
    },
  ]

  const handleDelete = (id: number) => console.log("Delete", id)
  const handleEdit = (id: number) => console.log("Edit", id)
  const handleDuplicate = (id: number) => console.log("Duplicate", id)

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          {t("marketing.emailCampaigns")}
        </h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder={t("common.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
          />
        </div>
      </div>
      <CustomTable
        data={filteredCampaigns as unknown as Record<string, unknown>[]}
        columns={columns as never}
        actionRenderer={(row) => (
          <CampaignActionMenu
            campaign={row as unknown as Campaign}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
          />
        )}
      />
    </div>
  )
}
