"use client"

import SessionTableSkeleton from "@/components/AdminComponents/FieldManagementComponents/FieldDetailsComponents/SessionTableSkeleton"

export default function Loading() {
  return <SessionTableSkeleton showControls={true} rowCount={10} />
}
