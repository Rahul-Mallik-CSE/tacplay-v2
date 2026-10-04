"use client"

/**
 * CreateEditPackagePage.tsx
 * Page for creating or editing a package.
 * Connected to live APIs:
 * - Create: POST /api/arena/completion-flow/step-3-package-management/
 * - Edit: PATCH /api/arena/package-management/edit/
 */

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import type {
  PackageForm,
  CreatePackageItemPayload,
  UpdatePackageItemPayload,
} from "@/types/DashboardTypes/ArenaManagementTypes"
import {
  useGetPackagesQuery,
  useCreatePackagesMutation,
  useUpdatePackagesMutation,
} from "@/redux/features/dashboard/field-profile/fieldProfileAPI"

export default function CreateEditPackagePage() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const params = useParams()
  const packageId = params?.id as string | undefined
  const isEdit = Boolean(packageId)

  const { data: packagesData, isLoading: isLoadingPackages } = useGetPackagesQuery()
  const [createPackages, { isLoading: isCreating }] = useCreatePackagesMutation()
  const [updatePackages, { isLoading: isUpdating }] = useUpdatePackagesMutation()

  const [form, setForm] = useState<PackageForm>({
    package_name: "",
    description: "",
    package_fee: "",
    include_items: [],
    is_active: true,
  })
  const [includeItemsInput, setIncludeItemsInput] = useState("")

  useEffect(() => {
    if (isEdit && packageId && packagesData?.data?.packages) {
      const pkg = packagesData.data.packages.find(
        (p) => p.id === Number(packageId)
      )
      if (pkg) {
        setForm({
          id: pkg.id,
          package_name: pkg.package_name,
          description: pkg.description || "",
          package_fee: String(pkg.package_fee),
          include_items: Array.isArray(pkg.include_items) ? pkg.include_items : [],
          is_active: pkg.is_active ?? true,
        })
      }
    }
  }, [isEdit, packageId, packagesData])

  const updateField = <K extends keyof PackageForm>(key: K, value: PackageForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleFeeChange = (val: string) => {
    // Restrict input to digits and at most 2 decimal places after point
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      updateField("package_fee", val)
    }
  }

  const handleAddItem = () => {
    if (!includeItemsInput.trim()) return
    const item = includeItemsInput.trim()
    if (!form.include_items.includes(item)) {
      updateField("include_items", [...form.include_items, item])
    }
    setIncludeItemsInput("")
  }

  const handleRemoveItem = (item: string) => {
    updateField("include_items", form.include_items.filter((i) => i !== item))
  }

  const handleItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddItem()
    }
  }

  const isSaving = isCreating || isUpdating

  const handleSave = async () => {
    if (!form.package_name.trim()) {
      toast.error(t("arena.packagesTab.packageNameRequired", "Package name is required"))
      return
    }
    if (!form.package_fee.trim()) {
      toast.error(t("arena.packagesTab.packageFeeRequired", "Package fee is required"))
      return
    }

    try {
      const existingList = packagesData?.data?.packages || []

      if (isEdit) {
        let updatedList: UpdatePackageItemPayload[]
        if (existingList.length > 0) {
          updatedList = existingList.map((p) =>
            p.id === Number(packageId)
              ? {
                  package_name: form.package_name.trim(),
                  description: form.description.trim(),
                  package_fee: String(form.package_fee).trim(),
                  include_items: form.include_items,
                  is_active: form.is_active ?? true,
                }
              : {
                  package_name: p.package_name,
                  description: p.description,
                  package_fee: String(p.package_fee),
                  include_items: p.include_items || [],
                  is_active: p.is_active ?? true,
                }
          )
        } else {
          updatedList = [
            {
              package_name: form.package_name.trim(),
              description: form.description.trim(),
              package_fee: String(form.package_fee).trim(),
              include_items: form.include_items,
              is_active: form.is_active ?? true,
            },
          ]
        }

        const res = await updatePackages({ packages: updatedList }).unwrap()
        toast.success(res?.message || t("arena.packagesTab.packageUpdated"))
      } else {
        const newPackagesPayload: CreatePackageItemPayload[] = [
          ...existingList.map((p) => ({
            package_name: p.package_name,
            description: p.description,
            package_fee: String(p.package_fee),
            include_items: p.include_items || [],
          })),
          {
            package_name: form.package_name.trim(),
            description: form.description.trim(),
            package_fee: String(form.package_fee).trim(),
            include_items: form.include_items,
          },
        ]

        const res = await createPackages({ packages: newPackagesPayload }).unwrap()
        toast.success(res?.message || t("arena.packagesTab.packageCreated"))
      }

      router.push("/dashboard/field-profile/package-management")
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        t("arena.packagesTab.saveFailed", "Failed to save package")
      toast.error(errorMsg)
    }
  }

  if (isEdit && isLoadingPackages) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-custom-red animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/field-profile/package-management")}
          className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("arena.packagesTab.backToPackages")}
        </button>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          {isEdit ? t("arena.packagesTab.editPackage", "Edit Package") : t("arena.packagesTab.title", "Create Package")}
        </h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          {t("arena.packagesTab.subtitle", "Set up competitive or social packages for players.")}
        </p>
      </div>

      <div className="h-px bg-white/10" />

      <div className="space-y-6">
        <div className="space-y-5 max-w-2xl">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.packageName")}
            </label>
            <Input
              value={form.package_name}
              onChange={(e) => updateField("package_name", e.target.value)}
              placeholder={t("arena.packagesTab.packageNamePlaceholder", "e.g. Basic Package")}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.packageDescription")}
            </label>
            <Textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder={t("arena.packagesTab.packageDescriptionPlaceholder", "e.g. Mask, gun, and 100 paintballs included")}
              className="bg-input/30 border-white/10 text-primary min-h-25"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.packageFee")}
            </label>
            <Input
              type="text"
              inputMode="decimal"
              value={form.package_fee}
              onChange={(e) => handleFeeChange(e.target.value)}
              placeholder={t("arena.packagesTab.packageFeePlaceholder", "e.g. 59.00")}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.includeItems")}
            </label>
            <div className="flex gap-2">
              <Input
                value={includeItemsInput}
                onChange={(e) => setIncludeItemsInput(e.target.value)}
                onKeyDown={handleItemKeyDown}
                placeholder={t("arena.packagesTab.selectPackageItems", "Add item (e.g. Mask, Gun, Vest)")}
                className="bg-input/30 border-white/10 text-primary h-11"
              />
              <Button
                type="button"
                variant="default"
                size="sm"
                className="h-11 px-4 cursor-pointer"
                onClick={handleAddItem}
              >
                {t("arena.add", "Add")}
              </Button>
            </div>
            {form.include_items.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {form.include_items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item)}
                      className="flex items-center justify-center hover:text-destructive transition-colors cursor-pointer"
                      aria-label={`Remove ${item}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 cursor-pointer"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : null}
          {t("arena.packagesTab.savePackage", "Save Package")}
        </Button>
      </div>
    </div>
  )
}

