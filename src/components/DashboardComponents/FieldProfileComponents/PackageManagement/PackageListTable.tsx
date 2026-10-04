"use client"

/**
 * PackageListTable.tsx
 * Package management table using CustomTable component.
 * Shows packages with image, package name, type, price, paint, booking, status, and action columns.
 */

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { Search, Funnel, SlidersHorizontal } from "lucide-react"
import FilterSheet from "@/components/SharedComponents/FilterSheet"
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
  const [search, setSearch] = useState("")
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [packageFilters, setPackageFilters] = useState<Record<string, string[]>>({})

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = !search.trim() || pkg.package_name.toLowerCase().includes(search.toLowerCase())
    const statusFilters = packageFilters[t("filterSheet.status", "Status")] || []
    const matchesStatus = statusFilters.length === 0 ||
      statusFilters.includes(pkg.is_active ? "Active" : "Inactive")
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (isActive: boolean) => {
    return isActive
      ? "bg-[#181F44] text-[#4868EE] border border-none"
      : "bg-[#3A121F] text-[#DF1C41] border border-none"
  }

  const columns = [
    {
      header: t("arena.packagesTab.packageName"),
      accessor: (row: PackageRow) => (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-primary">{row.package_name as string}</p>
          {row.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 max-w-sm">
              {row.description as string}
            </p>
          )}
          {Array.isArray(row.include_items) && row.include_items.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {row.include_items.slice(0, 3).map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-secondary border border-white/10"
                >
                  {item}
                </span>
              ))}
              {row.include_items.length > 3 && (
                <span className="text-[10px] text-muted-foreground px-1 self-center">
                  +{row.include_items.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      header: t("arena.packagesTab.price"),
      accessor: (row: PackageRow) => (
        <span className="text-sm text-primary font-medium">€ {row.package_fee as string}</span>
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("arena.packagesTab.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
            />
          </div>
          <button
            onClick={() => setFilterSheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-primary rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors cursor-pointer border border-white/10"
          >
            <Funnel className="w-4 h-4" />
            {t("arena.packagesTab.filter")}
          </button>
          <button
            onClick={onCreatePackage}
            className="flex items-center gap-2 px-4 py-2 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/90 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
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
            {filteredPackages.map((pkg, index) => (
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

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter")}
        filterGroups={[
          {
            title: t("filterSheet.status", "Status"),
            options: [
              { label: t("arena.packagesTab.activeStatus"), value: "Active" },
              { label: t("arena.packagesTab.inactiveStatus"), value: "Inactive" },
            ],
          },
        ]}
        selectedFilters={packageFilters}
        onFilterChange={setPackageFilters}
      />
    </div>
  )
}
