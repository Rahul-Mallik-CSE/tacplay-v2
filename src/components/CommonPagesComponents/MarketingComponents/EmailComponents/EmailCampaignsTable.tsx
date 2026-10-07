"use client"

import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { Search, Megaphone, Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import CustomTable from "@/components/SharedComponents/CustomTable"
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

export default function EmailCampaignsTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Delete modal state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null)
  const [deleteCampaign, { isLoading: isDeleting }] = useDeleteCampaignMutation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const {
    data: campaignsResponse,
    isLoading,
    refetch,
  } = useGetCampaignsListQuery({
    search: debouncedSearch || undefined,
    campaign_type: "email",
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

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {t("marketing.emailCampaigns", "Email Campaigns")}
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
            onClick={() => router.push(`${basePath}/marketing/email/create-email`)}
            className="px-4 py-2 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t("marketing.createEmail", "Create Email")}
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
          />
        )}
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
    </div>
  )
}
