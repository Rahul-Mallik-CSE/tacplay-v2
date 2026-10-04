"use client"

/**
 * PackageManagementPage.tsx
 * Main page for package management with table view.
 * Connected to live GET /api/arena/package-management/
 */

import React from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { Loader2 } from "lucide-react"
import type { PackageItem } from "@/types/DashboardTypes/ArenaManagementTypes"
import { useGetPackagesQuery } from "@/redux/features/dashboard/field-profile/fieldProfileAPI"
import PackageListTable from "./PackageListTable"

export default function PackageManagementPage() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const { data: packagesData, isLoading, isError, refetch } = useGetPackagesQuery()

  const packages = packagesData?.data?.packages || []

  const handleCreatePackage = () => {
    router.push("/dashboard/field-profile/package-management/create")
  }

  const handleEdit = (pkg: PackageItem) => {
    router.push(`/dashboard/field-profile/package-management/edit/${pkg.id}`)
  }

  const handleDelete = (_pkg: PackageItem) => {
    toast.info("Delete functionality is currently disabled")
  }

  const handleDuplicate = (_pkg: PackageItem) => {
    toast.info("Duplicate functionality is currently disabled")
  }

  const handleDeactivate = (_pkg: PackageItem) => {
    toast.info("Deactivate functionality is currently disabled")
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-muted/60 rounded-md animate-pulse" />
          <div className="h-10 w-36 bg-muted/60 rounded-lg animate-pulse" />
        </div>
        <div className="rounded-xl border border-white/5 p-8 flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 text-custom-red animate-spin mb-2" />
          <p className="text-sm text-muted-foreground">{t("common.loading", "Loading packages...")}</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-white/5 p-8 text-center space-y-3">
        <p className="text-sm text-destructive">{t("common.errorLoading", "Failed to load packages")}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-custom-red text-white text-xs rounded-lg hover:bg-custom-red/80 transition-colors cursor-pointer"
        >
          {t("common.retry", "Retry")}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PackageListTable
        packages={packages}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onDeactivate={handleDeactivate}
        onCreatePackage={handleCreatePackage}
      />
    </div>
  )
}

