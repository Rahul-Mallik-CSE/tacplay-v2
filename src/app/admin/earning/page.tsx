"use client"

import EarningListTable from "@/components/AdminComponents/EarningComponents/EarningListTable"

export default function AdminEarningPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <EarningListTable />
      </div>
    </div>
  )
}
