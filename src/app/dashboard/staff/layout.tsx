"use client"

import StaffLayout from "@/components/DashboardComponents/StaffComponents/StaffLayout"

export default function StaffLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <StaffLayout>{children}</StaffLayout>
}
