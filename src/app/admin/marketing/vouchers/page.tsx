"use client"

import VouchersTable from "@/components/CommonPagesComponents/MarketingComponents/VoucherComponents"

export default function AdminVouchersPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <VouchersTable />
      </div>
    </div>
  )
}
