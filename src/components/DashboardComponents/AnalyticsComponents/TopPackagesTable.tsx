"use client"

/**
 * TopPackagesTable.tsx
 * Table showing top performing packages with custom conversion rate bar renderer.
 * Uses CustomTable for table rendering with pagination.
 */

import { useTranslation } from "react-i18next"
import type { TopPackageRow } from "@/types/DashboardTypes/ArenaManagementTypes"
import CustomTable from "@/components/SharedComponents/CustomTable"

type PackageTableRow = TopPackageRow & Record<string, unknown>

interface TopPackagesTableProps {
  packages: TopPackageRow[]
}

export default function TopPackagesTable({ packages }: TopPackagesTableProps) {
  const { t } = useTranslation("dashboard")

  const columns = [
    {
      header: t("analytics.package"),
      accessor: (row: PackageTableRow) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted/50 rounded-md shrink-0" />
          <div>
            <p className="text-sm font-medium text-primary">{row.packageName as string}</p>
            <p className="text-xs text-muted-foreground">{row.description as string}</p>
          </div>
        </div>
      ),
    },
    {
      header: t("analytics.booking"),
      accessor: (row: PackageTableRow) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-primary font-medium">{row.booking as number}</span>
          <span className="text-xs text-emerald-400">
            ↑ {row.bookingChange as number}%
          </span>
        </div>
      ),
    },
    {
      header: t("analytics.revenue"),
      accessor: (row: PackageTableRow) => (
        <span className="text-sm text-primary font-medium">{row.revenue as string}</span>
      ),
    },
    {
      header: t("analytics.player"),
      accessor: (row: PackageTableRow) => (
        <span className="text-sm text-primary">{row.player as number}</span>
      ),
    },
    {
      header: t("analytics.conversionRate"),
      accessor: (row: PackageTableRow) => {
        const rate = row.conversionRate as number
        return (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden max-w-[100px]">
              <div
                className="h-full bg-custom-yellow rounded-full"
                style={{ width: `${rate}%` }}
              />
            </div>
            <span className="text-sm text-primary font-medium">{rate}%</span>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          {t("analytics.topPerformingPackages")}
        </h2>
        <button className="text-sm text-custom-red hover:underline font-medium cursor-pointer">
          {t("analytics.viewAllPackages")}
        </button>
      </div>
      <CustomTable<PackageTableRow>
        data={packages as PackageTableRow[]}
        columns={columns}
        itemsPerPage={10}
      />
    </div>
  )
}
