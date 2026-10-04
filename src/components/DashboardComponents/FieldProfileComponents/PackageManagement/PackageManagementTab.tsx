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
import {
  useGetPackagesQuery,
  useUpdatePackagesMutation,
} from "@/redux/features/dashboard/field-profile/fieldProfileAPI"

const EMPTY_PACKAGE: PackageForm = {
  package_name: "",
  description: "",
  package_fee: "",
  include_items: [],
  is_active: true,
}

const PackageManagementTab = ({
  packageManagement,
}: PackageManagementTabProps) => {
  const { t } = useTranslation("dashboard")
  const { data: apiData } = useGetPackagesQuery()
  const [updatePackagesMutation, { isLoading: isUpdating }] = useUpdatePackagesMutation()

  const [isEditing, setIsEditing] = useState(false)
  const [draftPackages, setDraftPackages] = useState<PackageForm[] | null>(null)

  const livePackages = apiData?.data?.packages ?? packageManagement?.packages ?? mockPackageManagement.packages

  const basePackages = useMemo(
    () =>
      livePackages.map((item) => ({
        id: item.id,
        package_name: item.package_name,
        description: item.description,
        package_fee: item.package_fee,
        include_items: item.include_items,
        is_active: item.is_active,
      })),
    [livePackages],
  )

  const packages = isEditing ? (draftPackages ?? basePackages) : basePackages

  const handleToggleEdit = () => {
    if (isEditing) { setDraftPackages(null); setIsEditing(false); return }
    setDraftPackages(basePackages)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!draftPackages) return
    try {
      const payload = {
        packages: draftPackages.map((p) => ({
          package_name: p.package_name.trim(),
          description: p.description.trim(),
          package_fee: String(p.package_fee).trim(),
          include_items: p.include_items,
          is_active: p.is_active ?? true,
        })),
      }
      const res = await updatePackagesMutation(payload).unwrap()
      toast.success(res?.message || t("arena.packagesTab.updated"))
      setDraftPackages(null)
      setIsEditing(false)
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        t("arena.packagesTab.updateFailed")
      toast.error(errorMsg)
    }
  }

  const isSaving = isUpdating

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
