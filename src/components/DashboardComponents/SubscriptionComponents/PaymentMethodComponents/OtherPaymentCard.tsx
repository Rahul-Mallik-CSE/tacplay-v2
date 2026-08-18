"use client"

import React from "react"
import { MoreVertical } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { PaymentMethodCard } from "@/types/DashboardTypes/SubscriptionTypes"

interface OtherPaymentCardProps {
  card: PaymentMethodCard
  onSetDefault: (id: string) => void
  onRemove: (id: string) => void
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

export default function OtherPaymentCard({
  card,
  onSetDefault,
  onRemove,
}: OtherPaymentCardProps) {
  const { t } = useTranslation("dashboard")
  const [showMenu, setShowMenu] = React.useState(false)

  return (
    <div className="rounded-xl border border-white/10 bg-[#1a1a24] p-4">
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
          <span className="text-primary text-sm font-medium">
            {card.card_type.charAt(0).toUpperCase() + card.card_type.slice(1)} ending in {card.last_four}
          </span>
          <p className="text-secondary text-xs mt-0.5">
            {t("subscription.paymentMethod.expires", {
              date: `${card.expiry_month}/${card.expiry_year}`,
            })}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="cursor-pointer p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-secondary" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 z-10 bg-[#1a1a24] border border-white/10 rounded-xl shadow-lg py-1 min-w-[140px]">
              <button
                onClick={() => {
                  onSetDefault(card.id)
                  setShowMenu(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-white/5 cursor-pointer"
              >
                {t("subscription.paymentMethod.default")}
              </button>
              <button
                onClick={() => {
                  onRemove(card.id)
                  setShowMenu(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
