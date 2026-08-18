"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { PaymentMethodCard } from "@/types/DashboardTypes/SubscriptionTypes"

interface PrimaryPaymentCardProps {
  card: PaymentMethodCard
  onUpdateCard: () => void
}

const getCardBrandStyle = (cardType: string) => {
  switch (cardType) {
    case "visa":
      return "bg-blue-600 text-white"
    case "mastercard":
      return "bg-red-500 text-white"
    case "amex":
      return "bg-blue-400 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

const getCardBrandLabel = (cardType: string) => {
  switch (cardType) {
    case "visa":
      return "VISA"
    case "mastercard":
      return "MC"
    case "amex":
      return "AMEX"
    default:
      return cardType.toUpperCase()
  }
}

export default function PrimaryPaymentCard({
  card,
  onUpdateCard,
}: PrimaryPaymentCardProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="rounded-xl border border-white/10 bg-[#1a1a24] p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">
        {t("subscription.paymentMethod.primary")}
      </h3>

      <div className="rounded-xl border border-white/10 bg-[#1a1a24] p-4 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-6 rounded flex items-center justify-center text-[10px] font-bold",
              getCardBrandStyle(card.card_type)
            )}
          >
            {getCardBrandLabel(card.card_type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-primary text-sm font-medium">
                {card.card_type.charAt(0).toUpperCase() + card.card_type.slice(1)} ending in {card.last_four}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {t("subscription.paymentMethod.default")}
              </span>
            </div>
            <p className="text-secondary text-xs mt-0.5">
              {t("subscription.paymentMethod.expires", {
                date: `${card.expiry_month}/${card.expiry_year}`,
              })}
            </p>
          </div>
        </div>
      </div>

      {card.cardholder_name && (
        <div className="mb-3">
          <p className="text-primary text-sm font-medium">
            {t("subscription.paymentMethod.billingName")}
          </p>
          <p className="text-secondary text-sm">{card.cardholder_name}</p>
        </div>
      )}

      {card.billing_address && (
        <div className="mb-4">
          <p className="text-primary text-sm font-medium">
            {t("subscription.paymentMethod.billingAddress")}
          </p>
          <p className="text-secondary text-sm whitespace-pre-line">
            {card.billing_address}
          </p>
        </div>
      )}

      <button
        onClick={onUpdateCard}
        className="w-full py-2.5 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-primary hover:bg-white/10 transition-colors cursor-pointer"
      >
        {t("subscription.paymentMethod.updateCard")}
      </button>
    </div>
  )
}
