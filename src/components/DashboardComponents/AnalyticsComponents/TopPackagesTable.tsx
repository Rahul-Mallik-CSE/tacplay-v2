"use client"

import React from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { Package, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useRouter } from "next/navigation"
import CustomTable from "@/components/SharedComponents/CustomTable"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import type {
  TopPerformingPackagesSection,
  TopPerformingPackageItem,
} from "@/types/DashboardTypes/AnalyticsTypes"

interface TopPackagesTableProps {
  section?: TopPerformingPackagesSection | null
  currency?: string
  onViewAll?: () => void
}

function getCurrencySymbol(currency?: string): string {
  if (!currency) return "€"
  switch (currency.toUpperCase()) {
    case "EUR":
      return "€"
    case "USD":
      return "$"
    case "GBP":
      return "£"
    default:
      return currency
  }
}

function formatCurrency(val?: string | number, currency?: string): string {
  if (val === undefined || val === null) return "0.00"
  const num = typeof val === "number" ? val : parseFloat(String(val)) || 0
  const symbol = getCurrencySymbol(currency)
  return `${symbol} ${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

type PackageRow = TopPerformingPackageItem & Record<string, unknown>

export default function TopPackagesTable({
  section,
  currency = "EUR",
  onViewAll,
}: TopPackagesTableProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  const items = section?.items || []

  const handleViewAllPackages = () => {
    if (onViewAll) {
      onViewAll()
    } else {
      router.push("/dashboard/field-profile/package-management")
    }
  }

  const columns = [
    {
      header: t("analytics.package", "Package"),
      accessor: (row: PackageRow) => {
        const imageUrl = toAbsoluteMediaUrl(row.image)
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={row.package_name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <Package className="w-5 h-5 text-secondary" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-primary truncate">
                {row.package_name}
              </p>
              <p className="text-xs text-secondary truncate max-w-[240px]">
                {row.description || (row.package_fee ? `Fee: ${formatCurrency(row.package_fee, currency)}` : "No description")}
              </p>
            </div>
          </div>
        )
      },
    },
    {
      header: t("analytics.booking", "Booking"),
      accessor: (row: PackageRow) => {
        const change = row.booking?.change
        const isUp = change?.direction === "up" || change?.is_positive
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary font-semibold">
              {row.booking?.value ?? 0}
            </span>
            {change && (
              <span
                className={`inline-flex items-center text-xs font-medium ${
                  isUp ? "text-emerald-400" : "text-custom-red"
                }`}
              >
                {isUp ? (
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                )}
                {change.display}
              </span>
            )}
          </div>
        )
      },
    },
    {
      header: t("analytics.revenue", "Revenue"),
      accessor: (row: PackageRow) => (
        <span className="text-sm text-primary font-semibold">
          {formatCurrency(row.revenue, currency)}
        </span>
      ),
    },
    {
      header: t("analytics.player", "Player"),
      accessor: (row: PackageRow) => (
        <span className="text-sm text-primary font-medium">
          {row.player ?? 0}
        </span>
      ),
    },
    {
      header: t("analytics.conversionRate", "Conversion Rate"),
      accessor: (row: PackageRow) => {
        const rate = row.conversion_rate?.value ?? 0
        const displayRate = row.conversion_rate?.display || `${rate}%`
        return (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-muted/60 rounded-full overflow-hidden max-w-[120px]">
              <div
                className="h-full bg-custom-yellow rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, rate))}%` }}
              />
            </div>
            <span className="text-xs sm:text-sm text-primary font-medium">
              {displayRate}
            </span>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-primary">
            {section?.title || t("analytics.topPerformingPackages", "Top Performing Packages")}
          </h2>
          <p className="text-xs text-secondary mt-0.5">
            {section?.showing !== undefined && section?.total_packages !== undefined
              ? `Showing ${section.showing} of ${section.total_packages} packages`
              : "Overview of venue package booking conversions"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleViewAllPackages}
          className="text-xs sm:text-sm text-custom-red hover:underline font-medium cursor-pointer"
        >
          {t("analytics.viewAllPackages", "View All Packages")}
        </button>
      </div>

      <div className="rounded-xl overflow-hidden border border-white/5 bg-card/60">
        <CustomTable<PackageRow>
          data={items as PackageRow[]}
          columns={columns}
          serverPagination={false}
          itemsPerPage={10}
          minTableWidth="min-w-[700px]"
        />
      </div>
    </div>
  )
}
