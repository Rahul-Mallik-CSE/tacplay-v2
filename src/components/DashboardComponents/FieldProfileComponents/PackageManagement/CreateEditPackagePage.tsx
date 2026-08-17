"use client"

/**
 * CreateEditPackagePage.tsx
 * Page for creating or editing a package.
 * Reuses the same form layout as the design.
 */

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
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

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success(isEdit ? t("arena.packagesTab.packageUpdated") : t("arena.packagesTab.packageCreated"))
      router.push("/dashboard/field-profile/package-management")
    } catch {
      toast.error("Failed to save package.")
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
          {isEdit ? t("arena.packagesTab.editTitle") : t("arena.packagesTab.createTitle")}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {isEdit ? t("arena.packagesTab.editSubtitle") : t("arena.packagesTab.createSubtitle")}
        </p>
      </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.packageFee")}
            </label>
            <Input
              type="number"
              inputMode="decimal"
              step="0.01"
              value={form.package_fee}
              onChange={(e) => updateField("package_fee", e.target.value)}
              placeholder="€0.00"
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.packageType")}
            </label>
            <Select
              value={form.type}
              onValueChange={(val) => updateField("type", val as "Public" | "Private" | "Ranked")}
            >
              <SelectTrigger className="bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder={t("arena.packagesTab.selectType")} />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="Public">{t("arena.packagesTab.public")}</SelectItem>
                <SelectItem value="Private">{t("arena.packagesTab.private")}</SelectItem>
                <SelectItem value="Ranked">{t("arena.packagesTab.ranked")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.paintballsIncluded")}
            </label>
            <Input
              value={form.paint_count}
              onChange={(e) => updateField("paint_count", e.target.value)}
              placeholder={t("arena.packagesTab.paintballsPlaceholder")}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("arena.packagesTab.bookingCount")}
            </label>
            <Input
              type="number"
              value={form.booking_count}
              onChange={(e) => updateField("booking_count", Number(e.target.value))}
              placeholder={t("arena.packagesTab.bookingCountPlaceholder")}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-white/5">
          <label className="text-sm font-medium text-primary">
            {t("arena.packagesTab.active")}
          </label>
          <div className="flex items-center gap-3">
            <Switch
              checked={form.is_active}
              onCheckedChange={(checked) => updateField("is_active", checked)}
              className="data-[state=checked]:bg-custom-yellow"
            />
            <span className="text-sm text-muted-foreground">
              {form.is_active ? t("arena.on") : t("arena.off")}
            </span>
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
          {t("arena.save")}
        </Button>
      </div>
    </div>
  )
}
