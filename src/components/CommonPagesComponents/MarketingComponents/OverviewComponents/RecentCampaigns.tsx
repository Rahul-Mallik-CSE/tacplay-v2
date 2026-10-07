"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { Filter, Megaphone, Loader2 } from "lucide-react"
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
  useDeleteCampaignMutation,
  useDuplicateCampaignMutation,
} from "@/redux/features/shared/marketing/marketingAPI"
import { getErrorMessage } from "@/lib/auth"
import type {
  RecentCampaignsSection,
  RecentCampaignItem,
  MarketingHeaderFilters,
} from "@/types/CommonPageTypes/MarketingTypes"

interface RecentCampaignsProps {
  data?: RecentCampaignsSection
  filters?: MarketingHeaderFilters
  onRefetch?: () => void
}

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

export default function RecentCampaigns({ data, filters, onRefetch }: RecentCampaignsProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [campaignFilters, setCampaignFilters] = useState<Record<string, string[]>>({})

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null)

  const [deleteCampaign, { isLoading: isDeleting }] = useDeleteCampaignMutation()
  const [duplicateCampaign, { isLoading: isDuplicating }] = useDuplicateCampaignMutation()

  const rawCampaigns = data?.items || []

  // Dynamic filter options from API with sensible fallbacks
  const typeFilterOptions = filters?.campaign_types?.length
    ? filters.campaign_types.map((opt) => ({
        label: opt.label,
        value: opt.value.toLowerCase(),
      }))
    : [
        { label: "Email", value: "email" },
        { label: "SMS", value: "sms" },
        { label: "Push", value: "push" },
      ]

  const statusFilterOptions = filters?.statuses?.length
    ? filters.statuses.map((opt) => ({
        label: opt.label,
        value: opt.value.toLowerCase(),
      }))
    : [
        { label: "Draft", value: "draft" },
        { label: "Scheduled", value: "scheduled" },
        { label: "Sent", value: "sent" },
        { label: "Failed", value: "failed" },
      ]

  const typeFilterKey = t("filterSheet.type", "Type")
  const statusFilterKey = t("filterSheet.status", "Status")

  const filteredCampaigns = rawCampaigns.filter((c) => {
    const typeFilters = (campaignFilters[typeFilterKey] || []).map((v) => v.toLowerCase())
    const statusFilters = (campaignFilters[statusFilterKey] || []).map((v) => v.toLowerCase())

    const campaignType = (c.campaign_type || "").toLowerCase()
    const campaignStatus = (c.status || "").toLowerCase()

    const matchesType = typeFilters.length === 0 || typeFilters.includes(campaignType)
    const matchesStatus = statusFilters.length === 0 || statusFilters.includes(campaignStatus)

    return matchesType && matchesStatus
  })

  const columns = [
    {
      header: t("marketing.columns.campaigns", "Campaigns"),
      accessor: (row: RecentCampaignItem) => (
        <div className="flex items-center gap-3">
          {row.image ? (
            <img
              src={row.image}
              alt={row.campaign_name}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-white/5 border border-white/5"
            />
          ) : (
            <div className="w-10 h-10 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
              <Megaphone className="w-4 h-4 text-secondary" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-primary truncate max-w-[200px]">
              {row.campaign_name}
            </p>
            <p className="text-xs text-secondary truncate max-w-[200px]">
              {row.audience_display || row.audience}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: t("marketing.columns.type", "Type"),
      accessor: (row: RecentCampaignItem) => (
        <CampaignTypeBadge type={row.campaign_type_display || row.campaign_type} />
      ),
    },
    {
      header: t("marketing.columns.audience", "Audience"),
      accessor: (row: RecentCampaignItem) => (
        <div className="text-sm">
          <span className="text-primary font-medium">{row.audience_count}</span>
          <span className="text-xs text-secondary ml-1 block">
            {row.audience_display || row.audience}
          </span>
        </div>
      ),
    },
    {
      header: t("marketing.columns.scheduled", "Scheduled"),
      accessor: (row: RecentCampaignItem) => {
        const { date, time } = formatCampaignDate(row.scheduled_at || row.display_date)
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
      accessor: (row: RecentCampaignItem) => (
        <div>
          <p className="text-sm font-medium text-primary">{row.bookings}</p>
          {row.booking_change?.display && (
            <p
              className={`text-xs ${
                row.booking_change.is_positive ? "text-green-400" : "text-red-400"
              }`}
            >
              {row.booking_change.display}
            </p>
          )}
        </div>
      ),
    },
    {
      header: t("marketing.columns.revenue", "Revenue"),
      accessor: (row: RecentCampaignItem) => {
        const symbol = row.currency === "EUR" ? "€" : row.currency || "€"
        return (
          <span className="text-sm font-medium text-primary">
            {symbol}
            {row.revenue}
          </span>
        )
      },
    },
    {
      header: t("marketing.columns.status", "Status"),
      accessor: (row: RecentCampaignItem) => (
        <CampaignStatusBadge status={row.status_display || row.status} />
      ),
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
      onRefetch?.()
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete campaign"))
    }
  }

  const handleEdit = (id: number) => {
    router.push(`${basePath}/marketing/campaigns`)
  }

  const handleDuplicate = async (id: number) => {
    try {
      await duplicateCampaign(id).unwrap()
      toast.success(t("marketing.campaignDuplicatedSuccess", "Campaign duplicated successfully"))
      onRefetch?.()
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to duplicate campaign"))
    }
  }

  const title = data?.title || t("marketing.recentCampaigns", "Recent Campaigns")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-primary">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`${basePath}/marketing/campaigns`)}
            className="text-sm text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            {t("marketing.viewAllCampaigns", "View All")}
          </button>

          <button
            onClick={() => setFilterSheetOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-secondary hover:text-primary bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer border border-white/5"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">{t("common.filter", "Filter")}</span>
          </button>
        </div>
      </div>

      <CustomTable
        data={filteredCampaigns as unknown as Record<string, unknown>[]}
        columns={columns as never}
        actionRenderer={(row) => (
          <CampaignActionMenu
            campaign={row as unknown as RecentCampaignItem}
            onDelete={handleDeleteClick}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
          />
        )}
      />

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter", "Filter")}
        filterGroups={[
          {
            title: typeFilterKey,
            options: typeFilterOptions,
          },
          {
            title: statusFilterKey,
            options: statusFilterOptions,
          },
        ]}
        selectedFilters={campaignFilters}
        onFilterChange={setCampaignFilters}
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
