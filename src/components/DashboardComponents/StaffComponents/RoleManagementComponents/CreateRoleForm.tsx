"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import PermissionCategorySection from "./PermissionCategorySection"
import RoleCreatedSuccessModal from "./RoleCreatedSuccessModal"
import { mockPermissionCategories } from "../../../../mock-data/DashboardMockData/staff-mock-data"
import type { PermissionCategory } from "@/types/DashboardTypes/StaffTypes"

function CreateRoleForm() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  const [roleName, setRoleName] = useState("")
  const [categories, setCategories] = useState<PermissionCategory[]>(mockPermissionCategories)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [error, setError] = useState("")

  const handleCategoryToggle = (categoryId: string, enabled: boolean) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              enabled,
              permissions: cat.permissions.map((p) => ({ ...p, enabled })),
            }
          : cat
      )
    )
  }

  const handlePermissionToggle = (
    categoryId: string,
    permissionId: string,
    enabled: boolean
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              permissions: cat.permissions.map((p) =>
                p.id === permissionId ? { ...p, enabled } : p
              ),
            }
          : cat
      )
    )
  }

  const handleSave = () => {
    if (!roleName.trim()) {
      setError(t("staff.validation.roleNameRequired"))
      return
    }
    setError("")
    setSuccessModalOpen(true)
  }

  const handleCreateAnother = () => {
    setSuccessModalOpen(false)
    setRoleName("")
    setCategories(mockPermissionCategories)
  }

  const handleAssignStaff = () => {
    setSuccessModalOpen(false)
    router.push("/dashboard/staff/staff-management/add-staff")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {t("staff.createRoleTitle")}
        </h1>
        <p className="text-secondary text-sm mt-1">
          {t("staff.createRoleSubtitle")}
        </p>
        <div className="h-px bg-white/10 mt-4" />
      </div>

      <div className="space-y-6 max-w-4xl">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            {t("staff.roleName")}
          </label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => {
              setRoleName(e.target.value)
              if (error) setError("")
            }}
            placeholder={t("staff.roleNamePlaceholder")}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
          {error && (
            <p className="text-xs text-custom-red mt-1">{error}</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-primary mb-1">
            {t("staff.permissionAndAccess", { roleName: roleName || "..." })}
          </h2>
          <p className="text-secondary text-sm mb-4">
            {t("staff.permissionSubtitle")}
          </p>

          <div className="space-y-4">
            {categories.map((category) => (
              <PermissionCategorySection
                key={category.id}
                category={category}
                onCategoryToggle={handleCategoryToggle}
                onPermissionToggle={handlePermissionToggle}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="px-8 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer"
          >
            {t("common.save")}
          </button>
        </div>
      </div>

      <RoleCreatedSuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        onCreateAnother={handleCreateAnother}
        onAssignStaff={handleAssignStaff}
      />
    </div>
  )
}

export default CreateRoleForm
