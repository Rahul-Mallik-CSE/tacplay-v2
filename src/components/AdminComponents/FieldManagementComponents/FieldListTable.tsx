"use client"

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Filter } from "lucide-react"
import CustomTable from "@/components/SharedComponents/CustomTable"
import FilterSheet from "@/components/SharedComponents/FilterSheet"
import FieldSearchBar from "./FieldSearchBar"
import FieldPlanBadge from "./FieldPlanBadge"
import FieldCountryFlag from "./FieldCountryFlag"
import FieldActionDropdown from "./FieldActionDropdown"
import FieldDetailsSheet from "./FieldDetailsSheet"
import UpgradeFieldPlanModal from "./UpgradeFieldPlanModal"
import { mockFieldData } from "../../../mock-data/AdminMockData/field-management-mock-data"
import type { Field } from "@/types/AdminTypes/FieldManagementTypes"

function FieldListTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [upgradeField, setUpgradeField] = useState<Field | null>(null)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [fieldFilters, setFieldFilters] = useState<Record<string, string[]>>({})

  const filteredData = useMemo(() => {
    let result = mockFieldData
    if (search.trim()) {
      const normalizedSearch = search.trim().toLowerCase()
      result = result.filter((item) =>
        [item.fieldName, item.fieldId, item.ownerName, item.ownerEmail]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedSearch)),
      )
    }
    const planFilters = fieldFilters[t("filterSheet.plan", "Plan")] || []
    if (planFilters.length > 0) {
      result = result.filter((item) => planFilters.includes(item.plan))
    }
    return result
  }, [search, fieldFilters, t])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleViewDetails = (field: Field) => {
    setSelectedField(field)
    setIsDetailsSheetOpen(true)
  }

  const handleSuspendField = (_field: Field) => {
    // Handle suspend field
  }

  const handleUpgradePlan = (field: Field) => {
    setUpgradeField(field)
    setIsUpgradeModalOpen(true)
  }

  const handleUpgradeConfirm = (_plan: string) => {
    // Handle upgrade confirm
  }

  const handleViewAllSession = () => {
    setIsDetailsSheetOpen(false)
    router.push("/admin/field-management/sessions")
  }

  const columns: {
    header: string
    accessor: keyof Field | ((row: Field) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("fieldManagement.columns.field"),
      accessor: (row: Field) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-muted rounded-lg shrink-0 overflow-hidden">
            <Image
              src={row.image}
              alt={row.fieldName}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-primary">{row.fieldName}</p>
            <p className="text-xs text-muted-foreground">
              {row.description.includes("first-time") ? `ID: ${row.fieldId}` : row.description}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: t("fieldManagement.columns.owner"),
      accessor: (row: Field) => (
        <div>
          <p className="text-sm font-medium text-primary">{row.ownerName}</p>
          <p className="text-xs text-muted-foreground">{row.ownerEmail}</p>
        </div>
      ),
    },
    {
      header: t("fieldManagement.columns.subscription"),
      accessor: (row: Field) => <FieldPlanBadge plan={row.plan} size="sm" />,
    },
    {
      header: t("fieldManagement.columns.country"),
      accessor: (row: Field) => (
        <FieldCountryFlag countryCode={row.countryCode} />
      ),
    },
    {
      header: t("fieldManagement.columns.created"),
      accessor: (row: Field) => (
        <div>
          <p className="text-sm text-primary">{row.createdDate}</p>
          <p className="text-xs text-muted-foreground">{row.createdTime}</p>
        </div>
      ),
    },
    {
      header: t("fieldManagement.columns.booking"),
      accessor: (row: Field) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-primary font-medium">
            {row.booking}
          </span>
          <span className="text-xs text-emerald-400">
            +{row.bookingChange}%
          </span>
        </div>
      ),
    },
    {
      header: t("fieldManagement.columns.revenue"),
      accessor: (row: Field) => (
        <span className="text-sm text-primary font-medium">{row.revenue}</span>
      ),
    },
  ]

  type TableRow = Field & Record<string, unknown>

  const actionRenderer = (row: Field) => (
    <FieldActionDropdown
      field={row}
      onViewDetails={handleViewDetails}
      onSuspendField={handleSuspendField}
    />
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("fieldManagement.title")}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <FieldSearchBar value={search} onChange={handleSearchChange} />
          <button
            onClick={() => setFilterSheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-muted text-sm text-primary hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            {t("common.filter")}
          </button>
        </div>
      </div>

      <CustomTable
        data={filteredData as unknown as TableRow[]}
        columns={
          columns as {
            header: string
            accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
            className?: string
          }[]
        }
        actionRenderer={(row) => actionRenderer(row as Field)}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(size) => {
          setItemsPerPage(size)
          setCurrentPage(1)
        }}
        minTableWidth="min-w-[900px]"
      />

      <FieldDetailsSheet
        field={selectedField}
        open={isDetailsSheetOpen}
        onOpenChange={setIsDetailsSheetOpen}
        onBlockField={handleSuspendField}
        onUpgradePlan={handleUpgradePlan}
        onViewAllSession={handleViewAllSession}
      />

      <UpgradeFieldPlanModal
        field={upgradeField}
        open={isUpgradeModalOpen}
        onOpenChange={setIsUpgradeModalOpen}
        onConfirm={handleUpgradeConfirm}
      />

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter")}
        filterGroups={[
          {
            title: t("filterSheet.plan", "Plan"),
            options: [
              { label: "Gold", value: "Gold" },
              { label: "Silver", value: "Sliver" },
              { label: "Bronze", value: "Bronze" },
            ],
          },
        ]}
        selectedFilters={fieldFilters}
        onFilterChange={setFieldFilters}
      />
    </div>
  )
}

export default FieldListTable
