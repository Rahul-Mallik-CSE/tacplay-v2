"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import type { ActiveVouchersSection } from "@/types/CommonPageTypes/MarketingTypes"

function truncateCode(code: string, maxLen = 10): string {
  if (code.length > maxLen) {
    return code.slice(0, maxLen) + ".."
  }
  return code
}

function formatExpiryDate(expires?: string | null, endDate?: string | null): string {
  const dateStr = expires || endDate
  if (!dateStr) return "No expiry"
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

interface ActiveVouchersProps {
  data?: ActiveVouchersSection
}

export default function ActiveVouchers({ data }: ActiveVouchersProps) {
  const { t } = useTranslation("dashboard")

  const title = data?.title || t("marketing.activeVoucher", "Active Voucher")
  const items = data?.items || []
  const hasItems = items.length > 0

  return (
    <div className="bg-card border border-white/5 rounded-xl p-4 md:p-5 flex flex-col h-[360px]">
      <div className="flex-shrink-0 mb-4">
        <h3 className="text-base md:text-lg font-semibold text-primary">{title}</h3>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-auto pr-1">
        {!hasItems ? (
          <div className="h-full flex items-center justify-center text-sm text-secondary py-8">
            {t("marketing.noActiveVouchers", "No active vouchers found")}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card z-10">
              <tr className="border-b border-white/5">
                <th className="text-left py-2 text-secondary font-medium">
                  {t("marketing.columns.voucher", "Voucher")}
                </th>
                <th className="text-left py-2 text-secondary font-medium">
                  {t("marketing.columns.discount", "Discount")}
                </th>
                <th className="text-left py-2 text-secondary font-medium">
                  {t("marketing.columns.used", "Used")}
                </th>
                <th className="text-left py-2 text-secondary font-medium">
                  {t("marketing.columns.expires", "Expires")}
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((voucher) => {
                const usedFormatted =
                  voucher.used_display ??
                  (voucher.usage_limit
                    ? `${voucher.used_count}/${voucher.usage_limit}`
                    : `${voucher.used_count}`)

                const discountFormatted =
                  voucher.discount_display || `${voucher.discount_percentage}% OFF`

                return (
                  <tr
                    key={voucher.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td
                      className="py-2.5 text-custom-yellow font-medium"
                      title={voucher.voucher_code}
                    >
                      {truncateCode(voucher.voucher_code)}
                    </td>
                    <td className="py-2.5 text-primary">{discountFormatted}</td>
                    <td className="py-2.5 text-primary">{usedFormatted}</td>
                    <td className="py-2.5 text-secondary text-xs">
                      {formatExpiryDate(voucher.expires, voucher.end_date)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
