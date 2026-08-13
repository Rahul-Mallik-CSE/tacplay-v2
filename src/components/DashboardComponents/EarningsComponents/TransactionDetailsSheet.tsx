"use client"

/**
 * TransactionDetailsSheet.tsx
 * Slide-out sheet component that displays detailed transaction information.
 * Shows two sections: Player Info and Payment Info.
 * Includes a PDF download feature using @react-pdf/renderer.
 * Uses local mock data instead of API calls.
 */

import React, { useState } from "react"
import { ArrowLeft, Download } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { useTranslation } from "react-i18next"
import { pdf } from "@react-pdf/renderer"
import EarningInfoRow from "./EarningInfoRow"
import EarningPaymentBadge from "./EarningPaymentBadge"
import TransactionDetailsPdfDocument from "./EarningTransactionPdf"
import { mockTransactionDetails } from "../../../mock-data/DashboardMockData/earnings-mock-data"
import type { TransactionDetailsSheetProps } from "@/types/DashboardTypes/EarningsTypes"

function TransactionDetailsSheet({
  open,
  onOpenChange,
  transactionId,
}: TransactionDetailsSheetProps) {
  const { t } = useTranslation("dashboard")
  const [isDownloading, setIsDownloading] = useState(false)

  // Use mock data for demonstration (no API integration)
  const details = transactionId
    ? mockTransactionDetails.data.transaction_details
    : null

  /** Handle PDF download */
  const handleDownload = async () => {
    if (!details || !details.actions.can_download || isDownloading) return

    setIsDownloading(true)

    try {
      const blob = await pdf(
        <TransactionDetailsPdfDocument
          details={details}
          footerText={t("earnings.details.pdfFooter")}
        />,
      ).toBlob()

      const objectUrl = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = objectUrl
      anchor.download = `${details.payment_info.display_transaction_id.replace(/[^a-zA-Z0-9_-]+/g, "-")}.pdf`
      anchor.click()
      URL.revokeObjectURL(objectUrl)
    } finally {
      setIsDownloading(false)
    }
  }

  if (!open) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
      >
        {/* Header with back button and title */}
        <SheetHeader className="p-5 pb-0">
          <div className="flex items-center">
            <button
              onClick={() => onOpenChange(false)}
              className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          </div>
          <SheetTitle className="text-xl font-bold text-primary">
            {details?.title ?? t("earnings.details.title")}
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            {details?.subtitle ?? t("earnings.details.subtitle")}
          </SheetDescription>
        </SheetHeader>

        {/* Details content */}
        <div className="px-5 pb-5">
          {details ? (
            <>
              {/* Player Info Section */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {t("earnings.details.playerInfo")}
                </h3>
                <div>
                  <EarningInfoRow
                    label="Player ID"
                    value={details.player_info.display_player_id}
                  />
                  <EarningInfoRow
                    label="Player Name"
                    value={details.player_info.player_name}
                  />
                  <EarningInfoRow
                    label="Email"
                    value={details.player_info.email}
                  />
                  <EarningInfoRow
                    label="Booking ID"
                    value={details.player_info.display_booking_id}
                  />
                  <EarningInfoRow
                    label="Session ID"
                    value={details.player_info.display_session_id}
                  />
                </div>
              </div>

              {/* Payment Info Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {t("earnings.details.paymentInfo")}
                </h3>
                <div>
                  <EarningInfoRow
                    label="Transaction ID"
                    value={details.payment_info.display_transaction_id}
                  />
                  <EarningInfoRow
                    label="Amount"
                    value={details.payment_info.amount_display}
                  />
                  <EarningInfoRow
                    label="Platform Fee"
                    value={details.payment_info.platform_fee_display}
                  />
                  <EarningInfoRow
                    label="Net Profit"
                    value={details.payment_info.net_profit_display}
                  />
                  <EarningInfoRow
                    label="Payment Method"
                    value={
                      <EarningPaymentBadge
                        method={details.payment_info.payment_method_display}
                      />
                    }
                  />
                  <EarningInfoRow
                    label="Date & Time"
                    value={details.payment_info.date_time_display}
                  />
                  <EarningInfoRow
                    label="Payment Status"
                    value={
                      <span className="px-3 py-0.5 text-xs font-medium rounded-md border bg-teal-500/20 text-teal-400 border-teal-500/30">
                        {details.status_display}
                      </span>
                    }
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer with action buttons */}
        <SheetFooter className="px-5 pb-5 pt-2 flex-row gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="cursor-pointer flex-1 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors"
          >
            {t("earnings.details.cancel")}
          </button>
          <button
            onClick={handleDownload}
            disabled={!details?.actions.can_download || isDownloading}
            className="cursor-pointer flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {isDownloading
              ? t("earnings.details.generating")
              : t("earnings.details.download")}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default TransactionDetailsSheet
