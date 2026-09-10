"use client"

/**
 * CreateEditPackagePage.tsx
 * Page for creating or editing a package.
 * Matches the design with package image upload, name, description, fee, and include items.
 */

import React, { useEffect, useRef, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Camera } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { mockPackageManagement } from "../../../../mock-data/DashboardMockData/arena-management-mock-data"
import type { PackageForm } from "@/types/DashboardTypes/ArenaManagementTypes"

export default function CreateEditPackagePage() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const params = useParams()
  const packageId = params?.id as string | undefined
  const isEdit = Boolean(packageId)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<PackageForm>({
    package_name: "",
    description: "",
    package_fee: "",
    include_items: [],
    is_active: true,
    date_time: "",
    type: "Public",
    paint_count: "",
    booking_count: 0,
    booking_change: 0,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [includeItemsInput, setIncludeItemsInput] = useState("")

  useEffect(() => {
    if (isEdit && packageId) {
      const pkg = mockPackageManagement.packages.find(
        (p) => p.id === Number(packageId)
      )
      if (pkg) {
        setForm({
          id: pkg.id,
          package_name: pkg.package_name,
          description: pkg.description,
          package_fee: pkg.package_fee,
          include_items: pkg.include_items,
          is_active: pkg.is_active,
          date_time: pkg.date_time,
          type: pkg.type,
          paint_count: pkg.paint_count,
          booking_count: pkg.booking_count,
          booking_change: pkg.booking_change,
        })
      }
    }
  }, [isEdit, packageId])

  const updateField = <K extends keyof PackageForm>(key: K, value: PackageForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddItem = () => {
    if (!includeItemsInput.trim()) return
    if (!form.include_items.includes(includeItemsInput.trim())) {
      updateField("include_items", [...form.include_items, includeItemsInput.trim()])
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

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success(isEdit ? t("arena.packagesTab.packageUpdated") : t("arena.packagesTab.packageCreated"))
      router.push("/dashboard/field-profile/package-management")
    } catch {
      toast.error(t("arena.packagesTab.saveFailed"))
    } finally {
      setIsSaving(false)
    }
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
          {t("arena.packagesTab.title")}
        </h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          {t("arena.packagesTab.subtitle")}
        </p>
      </div>

      <div className="h-px bg-white/10" />

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-primary">
          {t("arena.packagesTab.typeHeader", { index: 1 })}
        </h3>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.packageName")}
            </label>
            <Input
              value={form.package_name}
              onChange={(e) => updateField("package_name", e.target.value)}
              placeholder={t("arena.packagesTab.packageNamePlaceholder")}
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
              placeholder={t("arena.packagesTab.packageDescriptionPlaceholder")}
              className="bg-input/30 border-white/10 text-primary min-h-25"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.packageFee")}
            </label>
            <Input
              type="text"
              value={form.package_fee}
              onChange={(e) => updateField("package_fee", e.target.value)}
              placeholder={t("arena.packagesTab.packageFeePlaceholder")}
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
                placeholder={t("arena.packagesTab.selectPackageItems")}
                className="bg-input/30 border-white/10 text-primary h-11"
              />
              <Button
                type="button"
                variant="default"
                size="sm"
                className="h-11 px-4"
                onClick={handleAddItem}
              >
                {t("arena.add")}
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.packageImage")}
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-lg bg-input/20 hover:bg-input/30 transition-colors cursor-pointer"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Package preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Camera className="w-8 h-8" />
                  <span className="text-sm">{t("arena.packagesTab.uploadImage")}</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? (
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : null}
          {t("arena.packagesTab.savePackage")}
        </Button>
      </div>
    </div>
  )
}
