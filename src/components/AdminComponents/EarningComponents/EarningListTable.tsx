"use client"

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import CustomTable from "@/components/SharedComponents/CustomTable"
import EarningSearchBar from "./EarningSearchBar"
import EarningTypeBadge from "./EarningTypeBadge"
import EarningPlanBadge from "./EarningPlanBadge"
import EarningCountryFlag from "./EarningCountryFlag"
import { mockEarningData } from "../../../mock-data/AdminMockData/earning-mock-data"
import type { EarningTransaction } from "@/types/AdminTypes/EarningTypes"

function EarningListTable() {
  const { t } = useTranslation("dashboard")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockEarningData
    const normalizedSearch = search.trim().toLowerCase()
    return mockEarningData.filter((item) =>
      [
        item.transaction_id,
        item.user_name,
        item.user_email,
        item.user_id,
        item.type,
        item.plan,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedSearch)),
    )
  }, [search])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const columns: {
    header: string
    accessor: keyof EarningTransaction | ((row: EarningTransaction) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("earningPage.columns.transactionId"),
      accessor: (row: EarningTransaction) => (
        <span className="text-sm font-medium text-primary">{row.transaction_id}</span>
      ),
    },
    {
      header: t("earningPage.columns.user"),
      accessor: (row: EarningTransaction) => (
        <div>
          <p className="text-sm font-medium text-primary">{row.user_name}</p>
          <p className="text-xs text-secondary">{row.user_email}</p>
        </div>
      ),
    },
    {
      header: t("earningPage.columns.userId"),
      accessor: "user_id",
    },
    {
      header: t("earningPage.columns.type"),
      accessor: (row: EarningTransaction) => (
        <EarningTypeBadge type={row.type} size="sm" />
      ),
    },
    {
      header: t("earningPage.columns.country"),
      accessor: (row: EarningTransaction) => (
        <EarningCountryFlag countryCode={row.country_code} />
      ),
    },
    {
      header: t("earningPage.columns.plan"),
      accessor: (row: EarningTransaction) => (
        <EarningPlanBadge plan={row.plan} size="sm" />
      ),
    },
    {
      header: t("earningPage.columns.amount"),
      accessor: (row: EarningTransaction) => (
        <span className="text-sm font-medium text-primary">
          {"\u20AC"}{row.amount.toLocaleString()}
        </span>
      ),
    },
    {
      header: t("earningPage.columns.date"),
      accessor: "date",
    },
  ]

  type TableRow = EarningTransaction & Record<string, unknown>

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("earningPage.title")}
          </h1>
        </div>
        <EarningSearchBar value={search} onChange={handleSearchChange} />
      </div>

      <CustomTable
        data={filteredData as unknown as TableRow[]}
        columns={columns as { header: string; accessor: keyof TableRow | ((row: TableRow) => React.ReactNode); className?: string }[]}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(size) => {
          setItemsPerPage(size)
          setCurrentPage(1)
        }}
        minTableWidth="min-w-[800px]"
      />
    </div>
  )
}

export default EarningListTable
