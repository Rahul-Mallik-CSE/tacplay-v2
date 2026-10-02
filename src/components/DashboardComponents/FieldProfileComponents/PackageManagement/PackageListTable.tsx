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
import Image from "next/image"

type PackageRow = PackageItem & Record<string, unknown>

const PACKAGE_IMAGES = [
  "https://images.unsplash.com/photo-1544298621-a21e4e4cb0a3?w=120&h=120&fit=crop",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=120&h=120&fit=crop",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=120&h=120&fit=crop",
  "https://images.unsplash.com/photo-1529926706528-db9e5010cd3e?w=120&h=120&fit=crop",
  "https://images.unsplash.com/photo-1461896836934-bd45ba8fcb3b?w=120&h=120&fit=crop",
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=120&h=120&fit=crop",
]

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
    const typeFilters = packageFilters[t("filterSheet.type", "Type")] || []
    const statusFilters = packageFilters[t("filterSheet.status", "Status")] || []
    const matchesType = typeFilters.length === 0 || typeFilters.includes(pkg.type || "")
    const matchesStatus = statusFilters.length === 0 ||
      statusFilters.includes(pkg.is_active ? "Active" : "Inactive")
    return matchesSearch && matchesType && matchesStatus
  })

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
      ? "bg-[#181F44] text-[#4868EE] border border-none"
      : "bg-[#3A121F] text-[#DF1C41] border border-none"
  }

  const columns = [
    {
      header: t("arena.packagesTab.packageName"),
      accessor: (row: PackageRow, index: number) => (
        <div className="flex items-center gap-3">
          <Image
            src={PACKAGE_IMAGES[index % PACKAGE_IMAGES.length]}
            height={40}
            width={40}
            alt={row.package_name as string}
            className="w-10 h-10 rounded-md object-cover shrink-0"
          />
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
                    {col.accessor(pkg as PackageRow, index)}
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
            title: t("filterSheet.type", "Type"),
            options: [
              { label: "Public", value: "Public" },
              { label: "Private", value: "Private" },
              { label: "Ranked", value: "Ranked" },
            ],
          },
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
