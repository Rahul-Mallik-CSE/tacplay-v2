"use client"

import StaffLayout from "@/components/CommonPagesComponents/StaffComponents/StaffLayout"



export default function AdminStaffLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <StaffLayout>{children}</StaffLayout>
}
