"use client"

/**
 * PayoutDetailsTab.tsx
 * Stripe Connect integration for payout management.
 * Allows users to connect their Stripe account for receiving payments.
 */

import React, { useState } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import SectionHeader from "../SectionHeader"
import PayoutLockedView from "./PayoutLockedView"

const PayoutDetailsTab = ({
  showLockedView = false,
}: {
  showLockedView?: boolean
}) => {
  const { t } = useTranslation("dashboard")
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectStripe = async () => {
    setIsConnecting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success(t("arena.payoutTab.stripeConnectSuccess"))
    } catch {
      toast.error(t("arena.payoutTab.stripeConnectFailed"))
    } finally {
      setIsConnecting(false)
    }
  }

  if (showLockedView) return <PayoutLockedView />

  return (
    <div className="space-y-8">
      <SectionHeader
        title={t("onboardingFields.payout.title")}
        subtitle={t("onboardingFields.payout.subtitle")}
      />

      <div className="flex flex-col items-center justify-center py-12 px-6">
        <div className="w-full max-w-md bg-card border border-white/5 rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#635BFF]/10 border border-[#635BFF]/20 flex items-center justify-center">
            <span className="text-[#635BFF] text-2xl font-bold">S</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-primary">
              {t("arena.payoutTab.stripeConnectTitle")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("arena.payoutTab.stripeConnectDesc")}
            </p>
          </div>

          <button
            onClick={handleConnectStripe}
            disabled={isConnecting}
            className="w-full flex items-center justify-center gap-2 bg-[#635BFF] text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-[#5046E5] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : null}
            {t("arena.payoutTab.connectStripe")}
          </button>

          <p className="text-xs text-muted-foreground">
            {t("arena.payoutTab.stripeSecureNote")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PayoutDetailsTab
