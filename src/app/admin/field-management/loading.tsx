"use client"

import FieldTableSkeleton from "@/components/AdminComponents/FieldManagementComponents/FieldTableSkeleton"

export default function Loading() {
  return <FieldTableSkeleton showControls={true} rowCount={10} />
}
