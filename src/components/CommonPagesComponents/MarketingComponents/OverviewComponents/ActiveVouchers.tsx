"use client"

import { useTranslation } from "react-i18next"
import { mockActiveVouchers } from "@/mock-data/DashboardMockData/marketing-mock-data"

function truncateCode(code: string, maxLen = 8): string {
  if (code.length > maxLen) {
    return code.slice(0, maxLen) + ".."
  }
  return code
}

export default function ActiveVouchers() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="bg-card border border-white/5 rounded-xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-primary">
          {t("marketing.activeVoucher")}
        </h3>
        <button className="text-sm text-red-400 hover:text-red-300 transition-colors cursor-pointer">
          {t("marketing.viewAll")}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left py-2 text-secondary font-medium">{t("marketing.columns.voucher")}</th>
              <th className="text-left py-2 text-secondary font-medium">{t("marketing.columns.discount")}</th>
              <th className="text-left py-2 text-secondary font-medium">{t("marketing.columns.used")}</th>
              <th className="text-left py-2 text-secondary font-medium">{t("marketing.columns.expires")}</th>
            </tr>
          </thead>
          <tbody>
            {mockActiveVouchers.map((voucher, index) => (
              <tr key={index} className="border-b border-white/5 last:border-0">
                <td className="py-2.5 text-custom-yellow font-medium" title={voucher.code}>
                  {truncateCode(voucher.code)}
                </td>
                <td className="py-2.5 text-primary">{voucher.discount}</td>
                <td className="py-2.5 text-primary">{voucher.used}/{voucher.total}</td>
                <td className="py-2.5 text-secondary">{voucher.expires}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
