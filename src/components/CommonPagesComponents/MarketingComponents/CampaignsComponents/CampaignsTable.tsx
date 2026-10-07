"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Search, Filter, Megaphone, Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import CustomTable from "@/components/SharedComponents/CustomTable"
import FilterSheet from "@/components/SharedComponents/FilterSheet"
import CampaignActionMenu from "../CommonComponents/CampaignActionMenu"
import CampaignTypeBadge from "../CommonComponents/CampaignTypeBadge"
import CampaignStatusBadge from "../CommonComponents/CampaignStatusBadge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  useGetCampaignsListQuery,
  useDeleteCampaignMutation,
} from "@/redux/features/shared/marketing/marketingAPI"
import { getErrorMessage } from "@/lib/auth"
import type { CampaignListItem } from "@/types/CommonPageTypes/MarketingTypes"
import CampaignsTableLoading from "../CommonComponents/CampaignsTableLoading"
import EditCampaignModal from "../CommonComponents/EditCampaignModal"

function formatCampaignDate(dateStr?: string | null): { date: string; time: string } {
  if (!dateStr) return { date: "—", time: "" }
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return { date: dateStr, time: "" }
    return {
      date: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  } catch {
    return { date: dateStr, time: "" }
  }
}

export default function CampaignsTable() {
  const { t } = useTranslation("dashboard")
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [campaignFilters, setCampaignFilters] = useState<Record<string, string[]>>({})

  // Delete modal state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null)
  const [deleteCampaign, { isLoading: isDeleting }] = useDeleteCampaignMutation()

  // Edit modal state
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedCampaignForEdit, setSelectedCampaignForEdit] = useState<CampaignListItem | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const selectedTypes = campaignFilters[t("filterSheet.type", "Type")] || []
  const selectedStatuses = campaignFilters[t("filterSheet.status", "Status")] || []

  const activeTypeParam = useMemo(() => {
    if (selectedTypes.length === 1) {
      return selectedTypes[0].toLowerCase()
    }
    return undefined
  }, [selectedTypes])

  const activeStatusParam = useMemo(() => {
    if (selectedStatuses.length === 1) {
      return selectedStatuses[0].toLowerCase()
    }
    return undefined
  }, [selectedStatuses])

  const {
    data: campaignsResponse,
    isLoading,
    refetch,
  } = useGetCampaignsListQuery({
    search: debouncedSearch || undefined,
    campaign_type: activeTypeParam,
    status: activeStatusParam,
    page: currentPage,
    limit: itemsPerPage,
  })

  const campaigns = campaignsResponse?.data || []
  const totalPages = campaignsResponse?.meta?.totalPage || 1

  const columns = [
    {
      header: t("marketing.columns.campaigns", "Campaigns"),
      accessor: (row: CampaignListItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
            <Megaphone className="w-4 h-4 text-secondary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-primary truncate max-w-[220px]">
              {row.campaign_name}
            </p>
            <p className="text-xs text-secondary truncate max-w-[220px]">
              {row.audience}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: t("marketing.columns.type", "Type"),
      accessor: (row: CampaignListItem) => <CampaignTypeBadge type={row.campaign_type} />,
    },
    {
      header: t("marketing.columns.audience", "Audience"),
      accessor: (row: CampaignListItem) => (
        <div className="text-sm">
          <span className="text-primary font-medium">{row.audience_count}</span>
          <span className="text-xs text-secondary ml-1 block">{row.audience}</span>
        </div>
      ),
    },
    {
      header: t("marketing.columns.scheduled", "Scheduled"),
      accessor: (row: CampaignListItem) => {
        const { date, time } = formatCampaignDate(row.scheduled_at || row.created_at)
        return (
          <div>
            <p className="text-sm text-primary">{date}</p>
            {time && <p className="text-xs text-secondary">{time}</p>}
          </div>
        )
      },
    },
    {
      header: t("marketing.columns.booking", "Booking"),
      accessor: (row: CampaignListItem) => (
        <div>
          <p className="text-sm font-medium text-primary">{row.bookings}</p>
        </div>
      ),
    },
    {
      header: t("marketing.columns.revenue", "Revenue"),
      accessor: (row: CampaignListItem) => (
        <span className="text-sm font-medium text-primary">€{row.revenue}</span>
      ),
    },
    {
      header: t("marketing.columns.status", "Status"),
      accessor: (row: CampaignListItem) => <CampaignStatusBadge status={row.status} />,
    },
  ]

  const handleDeleteClick = (id: number) => {
    setSelectedCampaignId(id)
    setDeleteDialogOpen(true)
  }

  const handleEditClick = (campaign: CampaignListItem) => {
    setSelectedCampaignForEdit(campaign)
    setEditDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedCampaignId) return
    try {
      await deleteCampaign(selectedCampaignId).unwrap()
      toast.success(t("marketing.campaignDeletedSuccess", "Campaign deleted successfully"))
      setDeleteDialogOpen(false)
      setSelectedCampaignId(null)
      refetch()
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete campaign"))
    }
  }

  if (isLoading && !campaignsResponse) {
    return (
      <CampaignsTableLoading
        title={t("marketing.allCampaigns", "All Campaigns")}
        hasFilterButton={true}
        hasTypeColumn={true}
      />
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {t("marketing.allCampaigns", "All Campaigns")}
        </h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input
              type="text"
              placeholder={t("common.search", "Search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>
          <button
            onClick={() => setFilterSheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            {t("common.filter", "Filter")}
          </button>
        </div>
      </div>

      <CustomTable
        data={campaigns as unknown as Record<string, unknown>[]}
        columns={columns as never}
        serverPagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        actionRenderer={(row) => (
          <CampaignActionMenu
            campaign={row as unknown as CampaignListItem}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick as never}
          />
        )}
      />

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter", "Filter")}
        filterGroups={[
          {
            title: t("filterSheet.type", "Type"),
            options: [
              { label: "Email", value: "email" },
              { label: "Push", value: "push" },
              { label: "SMS", value: "sms" },
            ],
          },
          {
            title: t("filterSheet.status", "Status"),
            options: [
              { label: "Sent", value: "sent" },
              { label: "Scheduled", value: "scheduled" },
              { label: "Draft", value: "draft" },
              { label: "Failed", value: "failed" },
            ],
          },
        ]}
        selectedFilters={campaignFilters}
        onFilterChange={(filters) => {
          setCampaignFilters(filters)
          setCurrentPage(1)
        }}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[420px] bg-root-bg border-white/10 text-primary">
          <DialogHeader>
            <DialogTitle>
              {t("marketing.deleteCampaignTitle", "Delete Campaign")}
            </DialogTitle>
            <DialogDescription className="text-secondary text-sm">
              {t(
                "marketing.deleteCampaignDescription",
                "Are you sure you want to delete this campaign? This action cannot be undone."
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <button
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-primary text-sm transition-colors cursor-pointer"
            >
              {t("common.cancel", "Cancel")}
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
            >
              {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("common.delete", "Delete")}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Modal */}
      <EditCampaignModal
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        campaign={selectedCampaignForEdit}
        onSuccess={refetch}
      />
    </div>
  )
}
