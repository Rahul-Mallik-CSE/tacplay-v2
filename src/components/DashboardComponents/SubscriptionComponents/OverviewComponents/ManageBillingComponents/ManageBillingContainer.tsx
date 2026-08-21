"use client"

import { useTranslation } from "react-i18next"
import CancelSubscriptionInfo from "./CancelSubscriptionInfo"
import CancellationForm from "./CancellationForm"
import WhatHappensNext from "./WhatHappensNext"
import NeedHelp from "./NeedHelp"
import CancelActions from "./CancelActions"

export default function ManageBillingContainer() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="space-y-6">
      

      <h2 className="text-lg md:text-xl font-bold text-primary">
        {t("subscription.manageBilling.cancelSubscription")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <CancelSubscriptionInfo />
          <CancellationForm />
        </div>

        <div className="space-y-4">
          <WhatHappensNext />
          <NeedHelp />
        </div>
      </div>

      <CancelActions />
    </div>
  )
}
