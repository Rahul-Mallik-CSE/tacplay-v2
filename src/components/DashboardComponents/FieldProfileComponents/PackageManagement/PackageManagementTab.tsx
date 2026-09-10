"use client"

/**
 * PackageManagementTab.tsx
 * Manages a list of arena packages with edit/save, add new, and remove functionality.
 * Delegates individual package rendering to PackageCard component.
 */

import React, { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import type { PackageManagementData, PackageForm, PackageManagementTabProps } from "@/types/DashboardTypes/ArenaManagementTypes"
import { mockPackageManagement } from "../../../../mock-data/DashboardMockData/arena-management-mock-data"
import SectionHeader from "../SectionHeader"
import EditSaveButton from "../EditSaveButton"
import PackageCard from "./PackageCard"


const EMPTY_PACKAGE: PackageForm = {
  package_name: "",
  description: "",
  package_fee: "",
  include_items: [],
  is_active: true,
}

const PackageManagementTab = ({
  packageManagement = mockPackageManagement,
}: PackageManagementTabProps) => {
  const { t } = useTranslation("dashboard")
  const [isEditing, setIsEditing] = useState(false)
  const [draftPackages, setDraftPackages] = useState<PackageForm[] | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const basePackages = useMemo(
    () =>
      (packageManagement.packages ?? []).map((item) => ({
        id: item.id,
        package_name: item.package_name,
        description: item.description,
        package_fee: item.package_fee,
        include_items: item.include_items,
        is_active: item.is_active,
      })),
    [packageManagement],
  )

  const packages = isEditing ? (draftPackages ?? basePackages) : basePackages

  const handleToggleEdit = () => {
    if (isEditing) { setDraftPackages(null); setIsEditing(false); return }
    setDraftPackages(basePackages)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!draftPackages) return
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success(t("arena.packagesTab.updated"))
      setDraftPackages(null)
      setIsEditing(false)
    } catch {
      toast.error(t("arena.packagesTab.updateFailed"))
    } finally {
      setIsSaving(false)
    }
  }

  const updatePackage = (index: number, patch: Partial<PackageForm>) => {
    setDraftPackages((p) =>
      p ? p.map((item, i) => (i === index ? { ...item, ...patch } : item)) : p,
    )
  }

  const addPackage = () => {
    setDraftPackages((p) => (p ? [...p, { ...EMPTY_PACKAGE }] : [{ ...EMPTY_PACKAGE }]))
  }

  const removePackage = (index: number) => {
    setDraftPackages((p) => (p ? p.filter((_, i) => i !== index) : p))
  }

  const addItem = (index: number, value: string) => {
    setDraftPackages((p) =>
      p?.map((pkg, i) => {
        if (i !== index || pkg.include_items.includes(value)) return pkg
        return { ...pkg, include_items: [...pkg.include_items, value] }
      }) ?? p,
    )
  }

  const removeItem = (index: number, value: string) => {
    setDraftPackages((p) =>
      p?.map((pkg, i) =>
        i === index
          ? { ...pkg, include_items: pkg.include_items.filter((item) => item !== value) }
          : pkg,
      ) ?? p,
    )
  }

  return (
    <div className="space-y-6 mb-8 md:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title={t("onboardingFields.packages.title")}
          subtitle={t("onboardingFields.packages.subtitle")}
        />
        <div className="flex gap-3 flex-wrap">
          {isEditing && (
            <Button variant="default" size="sm" className="flex items-center gap-2" onClick={addPackage}>
              <Plus className="w-4 h-4" />
              {t("arena.packagesTab.addNew")}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {packages.map((pkg, index) => (
          <PackageCard
            key={`${pkg.id ?? "new"}-${index}`}
            pkg={pkg}
            index={index}
            isEditing={isEditing}
            onUpdate={updatePackage}
            onRemove={removePackage}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <EditSaveButton
          isEditing={isEditing}
          isSaving={isSaving}
          onToggleEdit={handleToggleEdit}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default PackageManagementTab
