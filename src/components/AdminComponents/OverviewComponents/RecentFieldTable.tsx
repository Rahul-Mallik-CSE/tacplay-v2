"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"
import CustomTable from "@/components/SharedComponents/CustomTable"
import type { RecentFieldApiItem, RecentFieldItem } from "@/types/AdminTypes/OverviewTypes"

interface RecentFieldTableProps {
  fields?: (RecentFieldApiItem | RecentFieldItem)[]
}

type NormalizedField = {
  id: number
  fieldName: string
  fieldId: string
  ownerName: string
  ownerEmail: string
  subscription: string
  countryCode: string
  countryName: string
  createdDate: string
  createdTime: string
  booking: number
  revenue: string
  status: string
} & Record<string, unknown>

export default function RecentFieldTable({ fields = [] }: RecentFieldTableProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  const normalizedData: NormalizedField[] = (fields || []).map((item) => {
    // Check if it's RecentFieldApiItem
    if ("field_name" in item) {
      const apiItem = item as RecentFieldApiItem
      let createdDate = ""
      let createdTime = ""
      if (apiItem.created_at) {
        try {
          const d = new Date(apiItem.created_at)
          createdDate = d.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          createdTime = d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        } catch {
          createdDate = apiItem.created_at
        }
      }

      const currencySymbol = apiItem.currency === "EUR" ? "€" : apiItem.currency ? `${apiItem.currency} ` : "€"

      return {
        id: apiItem.id,
        fieldName: apiItem.field_name,
        fieldId: `#${apiItem.id}`,
        ownerName: apiItem.owner?.name || "N/A",
        ownerEmail: apiItem.owner?.email || "",
        subscription: apiItem.subscription?.name || "None",
        countryCode: apiItem.country?.code || "",
        countryName: apiItem.country?.name || "",
        createdDate,
        createdTime,
        booking: apiItem.booking_count ?? 0,
        revenue: `${currencySymbol}${apiItem.revenue || "0.00"}`,
        status: apiItem.status || "draft",
      }
    }

    // Legacy RecentFieldItem fallback
    const legacyItem = item as RecentFieldItem
    return {
      id: legacyItem.id,
      fieldName: legacyItem.fieldName,
      fieldId: legacyItem.fieldId || `#${legacyItem.id}`,
      ownerName: legacyItem.ownerName,
      ownerEmail: legacyItem.ownerEmail,
      subscription: legacyItem.subscription,
      countryCode: legacyItem.countryCode,
      countryName: legacyItem.countryCode,
      createdDate: legacyItem.createdDate,
      createdTime: legacyItem.createdTime,
      booking: legacyItem.booking,
      revenue: legacyItem.revenue,
      status: legacyItem.status,
    }
  })

  const getSubscriptionColor = (sub: string) => {
    switch (sub?.toLowerCase()) {
      case "gold":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      case "silver":
      case "sliver":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      case "bronze":
        return "bg-custom-yellow/20 text-yellow-400 border border-custom-yellow/30"
      default:
        return "bg-secondary/20 text-secondary border border-secondary/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "active":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      case "pending":
      case "pending_approval":
        return "bg-custom-yellow/20 text-yellow-400 border border-custom-yellow/30"
      case "draft":
        return "bg-slate-500/20 text-slate-300 border border-slate-500/30"
      default:
        return "bg-secondary/20 text-secondary border border-secondary/30"
    }
  }

  const formatStatusDisplay = (status: string) => {
    if (!status) return "Draft"
    return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  }

  const columns = [
    {
      header: t("adminAnalytics.field"),
      accessor: (row: NormalizedField) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted/50 rounded-md shrink-0 flex items-center justify-center font-bold text-xs text-muted-foreground uppercase">
            {row.fieldName.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-primary truncate max-w-[180px]">
              {row.fieldName}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("adminAnalytics.fieldId")}: {row.fieldId}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: t("adminAnalytics.owner"),
      accessor: (row: NormalizedField) => (
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary truncate max-w-[140px]">
            {row.ownerName}
          </p>
          <p className="text-xs text-muted-foreground truncate max-w-[140px]">
            {row.ownerEmail}
          </p>
        </div>
      ),
    },
    {
      header: t("adminAnalytics.subscription"),
      accessor: (row: NormalizedField) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getSubscriptionColor(
            row.subscription
          )}`}
        >
          {row.subscription}
        </span>
      ),
    },
    {
      header: t("adminAnalytics.country"),
      accessor: (row: NormalizedField) => (
        <div className="flex items-center gap-2">
          {row.countryCode ? (
            <ReactCountryFlag
              countryCode={row.countryCode}
              svg
              style={{ width: "1.5em", height: "1.5em" }}
            />
          ) : (
            <span className="text-sm text-muted-foreground">
              {row.countryName || "—"}
            </span>
          )}
        </div>
      ),
    },
    {
      header: t("adminAnalytics.created"),
      accessor: (row: NormalizedField) => (
        <div>
          <p className="text-sm text-primary">{row.createdDate || "—"}</p>
          {row.createdTime && (
            <p className="text-xs text-muted-foreground">{row.createdTime}</p>
          )}
        </div>
      ),
    },
    {
      header: t("adminAnalytics.booking"),
      accessor: (row: NormalizedField) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-primary font-medium">
            {row.booking}
          </span>
        </div>
      ),
    },
    {
      header: t("adminAnalytics.revenue"),
      accessor: (row: NormalizedField) => (
        <span className="text-sm text-primary font-medium">
          {row.revenue}
        </span>
      ),
    },
    {
      header: t("adminAnalytics.status"),
      accessor: (row: NormalizedField) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(
            row.status
          )}`}
        >
          {formatStatusDisplay(row.status)}
        </span>
      ),
    },
  ]

  const actionRenderer = (_row: NormalizedField) => (
    <button
      onClick={() => router.push("/admin/field-management")}
      className="cursor-pointer p-1.5 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
      title="View field details"
    >
      <svg
        className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
      </svg>
    </button>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          {t("adminOverview.recentField")}
        </h2>
        <button
          onClick={() => router.push("/admin/field-management")}
          className="text-sm text-custom-red hover:underline font-medium cursor-pointer"
        >
          {t("adminOverview.viewAllField")}
        </button>
      </div>
      <CustomTable
        data={normalizedData}
        columns={columns}
        actionRenderer={actionRenderer}
        itemsPerPage={5}
        minTableWidth="min-w-[900px]"
      />
    </div>
  )
}
