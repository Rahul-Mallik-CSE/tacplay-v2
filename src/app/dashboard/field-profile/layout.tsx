"use client"

/**
 * Field Profile Layout
 * Shared layout for all field profile pages.
 * Includes cover photo, profile section, and sidebar navigation.
 */

import FieldProfileLayout from "@/components/DashboardComponents/FieldProfileComponents/FieldProfileLayout"

export default function FieldProfileLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <FieldProfileLayout>{children}</FieldProfileLayout>
}
