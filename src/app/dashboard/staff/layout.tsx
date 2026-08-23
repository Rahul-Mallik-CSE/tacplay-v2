"use client"

import StaffLayout from "@/components/CommonPagesComponents/StaffComponents/StaffLayout"

export default function StaffLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <StaffLayout>{children}</StaffLayout>
}
