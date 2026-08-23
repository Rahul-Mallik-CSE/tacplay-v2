"use client"

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import CustomTable from "@/components/SharedComponents/CustomTable"
import SubscriptionSearchBar from "./SubscriptionSearchBar"
import SubscriptionStatusBadge from "./SubscriptionStatusBadge"
import SubscriptionTypeBadge from "./SubscriptionTypeBadge"
import SubscriptionPlanBadge from "./SubscriptionPlanBadge"
import SubscriptionCountryFlag from "./SubscriptionCountryFlag"
import SubscriptionActionDropdown from "./SubscriptionActionDropdown"
import { mockSubscriptionData } from "../../../mock-data/AdminMockData/subscription-management-mock-data"
import type { Subscription } from "@/types/AdminTypes/SubscriptionManagementTypes"

function SubscriptionListTable() {
  const { t } = useTranslation("dashboard")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockSubscriptionData
    const normalizedSearch = search.trim().toLowerCase()
    return mockSubscriptionData.filter((item) =>
      [
        item.subscriber_name,
        item.subscriber_id,
        item.type,
        item.plan,
        item.status,
        item.billing_cycle,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch)),
    )
  }, [search])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleViewDetails = (_subscription: Subscription) => {
    // Handle view details
  }

  const columns: {
    header: string
    accessor: keyof Subscription | ((row: Subscription) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("subscriptionManagement.columns.subscriber"),
      accessor: (row: Subscription) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-secondary text-sm font-medium shrink-0">
            {row.subscriber_name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-primary">{row.subscriber_name}</p>
            <p className="text-xs text-secondary">ID: {row.subscriber_id}</p>
          </div>
        </div>
      ),
    },
    {
      header: t("subscriptionManagement.columns.type"),
      accessor: (row: Subscription) => (
        <SubscriptionTypeBadge type={row.type} size="sm" />
      ),
    },
    {
      header: t("subscriptionManagement.columns.plan"),
      accessor: (row: Subscription) => (
        <SubscriptionPlanBadge plan={row.plan} size="sm" />
      ),
    },
    {
      header: t("subscriptionManagement.columns.country"),
      accessor: (row: Subscription) => (
        <SubscriptionCountryFlag countryCode={row.country_code} />
      ),
    },
    {
      header: t("subscriptionManagement.columns.amount"),
      accessor: (row: Subscription) => (
        <span className="text-sm font-medium text-primary">
          {"\u20AC"}{row.amount.toLocaleString()}
        </span>
      ),
    },
    {
      header: t("subscriptionManagement.columns.billingCycle"),
      accessor: "billing_cycle",
    },
    {
      header: t("subscriptionManagement.columns.status"),
      accessor: (row: Subscription) => (
        <SubscriptionStatusBadge status={row.status} size="sm" />
      ),
    },
    {
      header: t("subscriptionManagement.columns.nextBillingDate"),
      accessor: "next_billing_date",
    },
  ]

  const actionRenderer = (row: Subscription) => (
    <SubscriptionActionDropdown subscription={row} onViewDetails={handleViewDetails} />
  )

  type TableRow = Subscription & Record<string, unknown>

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("subscriptionManagement.title")}
          </h1>
        </div>
        <SubscriptionSearchBar value={search} onChange={handleSearchChange} />
      </div>

      <CustomTable
        data={filteredData as unknown as TableRow[]}
        columns={columns as { header: string; accessor: keyof TableRow | ((row: TableRow) => React.ReactNode); className?: string }[]}
        actionRenderer={(row) => actionRenderer(row as Subscription)}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(size) => {
          setItemsPerPage(size)
          setCurrentPage(1)
        }}
        minTableWidth="min-w-[900px]"
      />
    </div>
  )
}

export default SubscriptionListTable
