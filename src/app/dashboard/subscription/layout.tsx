"use client"

import SubscriptionLayout from "@/components/DashboardComponents/SubscriptionComponents/SubscriptionLayout"

export default function SubscriptionLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <SubscriptionLayout>{children}</SubscriptionLayout>
}
