"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import CustomTable from "@/components/SharedComponents/CustomTable"
import VoucherActionMenu from "../CommonComponents/VoucherActionMenu"
import VoucherStatusBadge from "../CommonComponents/VoucherStatusBadge"
import { mockVouchers } from "@/mock-data/DashboardMockData/marketing-mock-data"
import type { Voucher } from "@/types/DashboardTypes/MarketingTypes"

export default function VouchersTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const [search, setSearch] = useState("")

  const filteredVouchers = mockVouchers.filter(
    (v) => v.code.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    {
      header: t("marketing.columns.voucher"),
      accessor: (row: Voucher) => (
        <span className="text-custom-yellow font-medium">{row.code}</span>
      ),
    },
    {
      header: t("marketing.columns.discount"),
      accessor: (row: Voucher) => <span>{row.discount}</span>,
    },
    {
      header: t("marketing.columns.used"),
      accessor: (row: Voucher) => <span>{row.used}/{row.total}</span>,
    },
    {
      header: t("marketing.columns.expires"),
      accessor: (row: Voucher) => <span>{row.expires}</span>,
    },
    {
      header: t("marketing.columns.revenue"),
      accessor: (row: Voucher) => <span>${row.revenue}</span>,
    },
    {
      header: t("marketing.columns.status"),
      accessor: (row: Voucher) => <VoucherStatusBadge status={row.status} />,
    },
  ]

  const handleDelete = (id: number) => console.log("Delete", id)
  const handleEdit = (id: number) => console.log("Edit", id)
  const handleDuplicate = (id: number) => console.log("Duplicate", id)

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {t("marketing.voucherTitle")}
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input
              type="text"
              placeholder={t("common.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>
          <button
            onClick={() => router.push("/dashboard/marketing/overview/create-voucher")}
            className="px-4 py-2 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t("marketing.createNewVoucher")}
          </button>
        </div>
      </div>
      <CustomTable
        data={filteredVouchers as unknown as Record<string, unknown>[]}
        columns={columns as never}
        actionRenderer={(row) => (
          <VoucherActionMenu
            voucher={row as unknown as Voucher}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
          />
        )}
      />
    </div>
  )
}
