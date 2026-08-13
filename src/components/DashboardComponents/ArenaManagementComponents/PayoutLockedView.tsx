"use client"

/**
 * PayoutLockedView.tsx
 * Displays a locked/upgrade prompt when the user's subscription plan
 * does not include access to payout details. Shows an upgrade CTA
 * with a crown icon to encourage plan upgrade.
 */

import React from "react"
import { Crown } from "lucide-react"
import { useTranslation } from "react-i18next"

/** Locked view component shown when payout access is restricted by plan tier */
function PayoutLockedView() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-card border border-white/5 rounded-2xl shadow-xl min-h-[300px]">
      <div className="w-16 h-16 rounded-full bg-custom-red/10 border border-custom-red/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(152,0,9,0.3)] animate-pulse">
        <span className="w-6 h-6 text-custom-red">&#128274;</span>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
        {t("arena.payoutTab.unlockTitle", "Unlock Payout Details")}
      </h3>
      <p className="text-sm text-secondary max-w-[420px] mb-6 leading-relaxed">
        {t(
          "arena.payoutTab.unlockDesc",
          "Upgrade your plan to Essential for Field Growth or Gold to view and edit your payout accounts, bank credentials, and manage business details.",
        )}
      </p>
      <button className="flex items-center gap-2 bg-linear-to-r from-[#980009] via-[#C00069] to-[#980009] text-white text-sm font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-[0_0_15px_rgba(192,0,105,0.4)] hover:scale-105 active:scale-95 cursor-pointer">
        <Crown className="w-4 h-4 text-[#cdba20]" />
        {t("sidebar.upgrade", "Upgrade")}
      </button>
    </div>
  )
}

export default PayoutLockedView
