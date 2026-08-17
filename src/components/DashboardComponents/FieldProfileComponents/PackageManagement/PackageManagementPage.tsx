"use client"

/**
 * PackageManagementPage.tsx
 * Main page for package management with table view.
 */

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import type { PackageItem } from "@/types/DashboardTypes/ArenaManagementTypes"
import { mockPackageManagement } from "../../../../mock-data/DashboardMockData/arena-management-mock-data"
import PackageListTable from "./PackageListTable"

export default function PackageManagementPage() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const [packages, setPackages] = useState<PackageItem[]>(mockPackageManagement.packages)

  const handleCreatePackage = () => {
    router.push("/dashboard/field-profile/package-management/create")
  }

  const handleEdit = (pkg: PackageItem) => {
    router.push(`/dashboard/field-profile/package-management/edit/${pkg.id}`)
  }

  const handleDelete = (pkg: PackageItem) => {
    if (confirm(t("arena.packagesTab.confirmDelete"))) {
      setPackages((prev) => prev.filter((p) => p.id !== pkg.id))
      toast.success(t("arena.packagesTab.packageDeleted"))
    }
  }

  const handleDuplicate = (pkg: PackageItem) => {
    const newPkg: PackageItem = {
      ...pkg,
      id: Math.max(...packages.map((p) => p.id), 0) + 1,
      package_name: `${pkg.package_name} (Copy)`,
    }
    setPackages((prev) => [...prev, newPkg])
    toast.success(t("arena.packagesTab.packageCreated"))
  }

  const handleDeactivate = (pkg: PackageItem) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === pkg.id ? { ...p, is_active: !p.is_active } : p))
    )
    toast.success(t("arena.packagesTab.packageUpdated"))
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
