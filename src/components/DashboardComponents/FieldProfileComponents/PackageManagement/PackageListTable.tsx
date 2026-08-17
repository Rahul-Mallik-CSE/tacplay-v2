"use client"

/**
 * PackageListTable.tsx
 * Package management table using CustomTable component.
 * Shows packages with date/time, type, price, paint, booking, status, and action columns.
 */

import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import type { PackageItem, PackageListTableProps } from "@/types/DashboardTypes/ArenaManagementTypes"
import PackageActionDropdown from "./PackageActionDropdown"

type PackageRow = PackageItem & Record<string, unknown>

export default function PackageListTable({
  packages,
  onEdit,
  onDelete,
  onDuplicate,
  onDeactivate,
  onCreatePackage,
}: PackageListTableProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  const getTypeBadge = (type?: string) => {
    switch (type) {
      case "Public":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      case "Private":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      case "Ranked":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      default:
        return "bg-secondary/20 text-secondary border border-secondary/30"
    }
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive
      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      : "bg-custom-red/20 text-red-400 border border-custom-red/30"
  }

  const columns = [
    {
      header: t("arena.packagesTab.dateTime"),
      accessor: (row: PackageRow) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted/50 rounded-md shrink-0" />
          <div>
            <p className="text-sm font-medium text-primary">{row.package_name as string}</p>
            <p className="text-xs text-muted-foreground">{row.description as string}</p>
          </div>
        </div>
      ),
    },
    {
      header: t("arena.packagesTab.typeLabel"),
      accessor: (row: PackageRow) => {
        const type = row.type as string
        return (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTypeBadge(type)}`}>
            {type}
          </span>
        )
      },
    },
    {
      header: t("arena.packagesTab.price"),
      accessor: (row: PackageRow) => (
        <span className="text-sm text-primary font-medium">€ {row.package_fee as string}</span>
      ),
    },
    {
      header: t("arena.packagesTab.paint"),
      accessor: (row: PackageRow) => (
        <span className="text-sm text-primary">{row.paint_count as string}</span>
      ),
    },
    {
      header: t("arena.packagesTab.booking"),
      accessor: (row: PackageRow) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-primary">{row.booking_count as number}</span>
          <span className={`text-xs ${(row.booking_change as number) >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            ↑ {(row.booking_change as number)}%
          </span>
        </div>
      ),
    },
    {
      header: t("common.status"),
      accessor: (row: PackageRow) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(row.is_active as boolean)}`}>
          {row.is_active ? t("arena.packagesTab.activeStatus") : t("arena.packagesTab.inactiveStatus")}
        </span>
      ),
    },
  ]

  const handleEdit = (pkg: PackageItem) => {
    router.push(`/dashboard/field-profile/package-management/edit/${pkg.id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          {t("arena.packagesTab.packageList")}
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder={t("arena.packagesTab.searchPlaceholder")}
              className="w-full sm:w-56 pl-4 pr-4 py-2 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
            />
          </div>
          <button
            onClick={onCreatePackage}
            className="flex items-center gap-2 px-4 py-2 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/90 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t("arena.packagesTab.createPackage")}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-white/5">
              {columns.map((col, idx) => (
                <th key={idx} className="p-3 text-left font-medium text-secondary text-xs sm:text-sm">
                  {col.header}
                </th>
              ))}
              <th className="p-3 text-left font-medium text-secondary text-xs sm:text-sm">
                {t("common.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr
                key={pkg.id}
                className="border-b border-white/5 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => handleEdit(pkg)}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="p-3 text-primary/80 text-xs sm:text-sm whitespace-nowrap">
                    {col.accessor(pkg as PackageRow)}
                  </td>
                ))}
                <td className="p-3 text-right">
                  <PackageActionDropdown
                    pkg={pkg}
                    onEdit={handleEdit}
                    onDelete={onDelete}
                    onDuplicate={onDuplicate}
                    onDeactivate={onDeactivate}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
