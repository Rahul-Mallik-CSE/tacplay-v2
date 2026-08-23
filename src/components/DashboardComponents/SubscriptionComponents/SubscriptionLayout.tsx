"use client"

import React from "react"
import { useTranslation } from "react-i18next"

interface SubscriptionLayoutProps {
  children: React.ReactNode
}

export default function SubscriptionLayout({ children }: SubscriptionLayoutProps) {
  const { t } = useTranslation("dashboard")

  return (

      <div className=" space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("subscription.title")}
          </h1>
          <p className="text-secondary text-sm mt-1">
            {t("subscription.subtitle")}
          </p>
        </div>
        {children}
      </div>

  )
}
