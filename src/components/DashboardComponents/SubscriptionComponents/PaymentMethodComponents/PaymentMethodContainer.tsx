"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { mockPrimaryPaymentCard, mockOtherPaymentCards } from "@/mock-data/DashboardMockData/subscription-mock-data"
import PrimaryPaymentCard from "./PrimaryPaymentCard"
import OtherPaymentCard from "./OtherPaymentCard"

export default function PaymentMethodContainer() {
  const { t } = useTranslation("dashboard")
  const [otherCards, setOtherCards] = React.useState(mockOtherPaymentCards)

  const handleAddCard = () => {
    // Open add card modal
  }

  const handleUpdateCard = () => {
    // Open update card modal
  }

  const handleSetDefault = (id: string) => {
    // Set card as default
  }

  const handleRemoveCard = (id: string) => {
    setOtherCards((prev) => prev.filter((card) => card.id !== id))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-primary">
        {t("subscription.paymentMethod.title")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PrimaryPaymentCard
          card={mockPrimaryPaymentCard}
          onUpdateCard={handleUpdateCard}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            {t("subscription.paymentMethod.other")}
          </h3>

          {otherCards.map((card) => (
            <OtherPaymentCard
              key={card.id}
              card={card}
              onSetDefault={handleSetDefault}
              onRemove={handleRemoveCard}
            />
          ))}

          <button
            onClick={handleAddCard}
            className="w-full py-3 rounded-xl border border-custom-yellow text-custom-yellow text-sm font-semibold hover:bg-custom-yellow/10 transition-colors cursor-pointer"
          >
            {t("subscription.paymentMethod.addNewCard")}
          </button>
        </div>
      </div>
    </div>
  )
}
