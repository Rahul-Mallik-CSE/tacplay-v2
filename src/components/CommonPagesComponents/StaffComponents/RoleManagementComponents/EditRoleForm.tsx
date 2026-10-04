"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, useParams, usePathname } from "next/navigation"
import { ArrowLeft, ListFilter, Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import PermissionCategorySection from "./PermissionCategorySection"
import {
  useGetRolesQuery,
  useGetPermissionsQuery,
  useUpdateRoleMutation,
} from "@/redux/features/shared/staff/staffAPI"
import { getErrorMessage } from "@/lib/auth"
import type { PermissionCategory } from "@/types/CommonPageTypes/StaffTypes"

const PERMISSION_LABEL_KEYS: Record<string, string> = {
  access_dashboard: "staff.permissions.accessDashboard",
  view_field_overview: "staff.permissions.viewFieldOverview",
  view_analytics: "staff.permissions.viewAnalytics",
  view_bookings: "staff.permissions.viewBookings",
  create_bookings: "staff.permissions.createBookings",
  manage_sessions: "staff.permissions.manageSessions",
  view_session_details: "staff.permissions.viewSessionDetails",
  access_scanner_mode: "staff.permissions.accessScannerMode",
  scan_player_qr_codes: "staff.permissions.scanPlayerQrCodes",
  view_attendance: "staff.permissions.viewAttendance",
  mark_no_show: "staff.permissions.markNoShow",
  view_matches: "staff.permissions.viewMatches",
  submit_vet_scores: "staff.permissions.submitVerifyScores",
  submit_verify_scores: "staff.permissions.submitVerifyScores",
  edit_scores: "staff.permissions.editScores",
  staff_management: "staff.permissions.staffManagement",
  role_permission_settings: "staff.permissions.rolePermissionSettings",
  field_settings: "staff.permissions.fieldSettings",
  view_subscription_billing: "staff.permissions.viewSubscriptionBilling",
  manage_payments: "staff.permissions.managePayments",
  access_marketing_tools: "staff.permissions.accessMarketingTools",
  create_campaigns: "staff.permissions.createCampaigns",
  settings_preferences: "staff.permissions.settingsPreferences",
  help_support: "staff.permissions.helpSupport",
}

const CATEGORY_LABEL_KEYS: Record<string, string> = {
  dashboard_overview: "staff.permissions.dashboardOverview",
  booking_session: "staff.permissions.bookingSession",
  scanner_checkin: "staff.permissions.scannerCheckin",
  scores_matches: "staff.permissions.scoresMatches",
  management: "staff.permissions.management",
  billing_subscription: "staff.permissions.billingSubscription",
  marketing_permissions: "staff.permissions.marketingPermissions",
  other: "staff.permissions.other",
}

function EditRoleForm() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const roleId = params.roleId as string
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const { data: rolesResponse, isLoading: rolesLoading } = useGetRolesQuery()
  const { data: permissionsResponse, isLoading: permissionsLoading } = useGetPermissionsQuery()
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation()

  const [roleName, setRoleName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set())
  const [disabledCategories, setDisabledCategories] = useState<Set<string>>(new Set())
  const [error, setError] = useState("")

  const role = rolesResponse?.data?.find((r) => String(r.id) === String(roleId))
  const permissionGroups = permissionsResponse?.data || []

  // Pre-fill existing role details
  useEffect(() => {
    if (role) {
      setRoleName(role.role_name || "")
      if (role.permissions) {
        setSelectedPermissions(new Set(role.permissions))
      }
    }
  }, [role])

  // Build categories with translated labels and code values
  const categories: PermissionCategory[] = useMemo(() => {
    return permissionGroups.map((group) => {
      const categoryLabelKey = CATEGORY_LABEL_KEYS[group.key]
      const categoryDisplayName = categoryLabelKey ? t(categoryLabelKey as never, group.name) : group.name

      const categoryPermissions = group.permissions.map((p) => {
        const permLabelKey = PERMISSION_LABEL_KEYS[p.code]
        const permDisplayName = permLabelKey ? t(permLabelKey as never, p.name) : p.name
        return {
          id: p.code,
          name: permDisplayName,
          enabled: selectedPermissions.has(p.code),
        }
      })

      const isCategoryEnabled = !disabledCategories.has(group.key)

      return {
        id: group.key,
        name: categoryDisplayName,
        icon: group.key,
        enabled: isCategoryEnabled,
        permissions: categoryPermissions,
      }
    })
  }, [permissionGroups, selectedPermissions, disabledCategories, t])

  const handleCategoryToggle = (categoryKey: string, enabled: boolean) => {
    const group = permissionGroups.find((g) => g.key === categoryKey)
    if (!group) return

    setDisabledCategories((prev) => {
      const next = new Set(prev)
      if (enabled) {
        next.delete(categoryKey)
      } else {
        next.add(categoryKey)
      }
      return next
    })

    setSelectedPermissions((prev) => {
      const next = new Set(prev)
      group.permissions.forEach((p) => {
        if (enabled) {
          next.add(p.code)
        } else {
          next.delete(p.code)
        }
      })
      return next
    })
  }

  const handlePermissionToggle = (
    categoryKey: string,
    permissionCode: string,
    enabled: boolean
  ) => {
    setSelectedPermissions((prev) => {
      const next = new Set(prev)
      if (enabled) {
        next.add(permissionCode)
      } else {
        next.delete(permissionCode)
      }
      return next
    })

    if (enabled && disabledCategories.has(categoryKey)) {
      setDisabledCategories((prev) => {
        const next = new Set(prev)
        next.delete(categoryKey)
        return next
      })
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!roleName.trim()) {
      setError(t("staff.validation.roleNameRequired", "Role name is required."))
      return
    }
    if (selectedPermissions.size === 0) {
      toast.error("Please select at least one permission for this role.")
      return
    }

    try {
      const res = await updateRole({
        id: Number(roleId),
        role_name: roleName.trim(),
        permissions: Array.from(selectedPermissions),
      }).unwrap()
      toast.success(res?.message || "Role updated successfully.")
      router.push(`${basePath}/staff/role-management/all-roles`)
    } catch (err: any) {
      const errMsg = getErrorMessage(err, "Failed to update role. Please try again.")
      toast.error(errMsg)
    }
  }

  if (rolesLoading || permissionsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-custom-yellow mb-2" />
        <p className="text-sm text-secondary">Loading role configuration...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(`${basePath}/staff/role-management/all-roles`)}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 text-primary transition-colors cursor-pointer shrink-0"
            aria-label="Back to All Roles"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              Edit Role
            </h1>
            <p className="text-secondary text-sm mt-1">
              Modify role name and permission access.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push(`${basePath}/staff/role-management/all-roles`)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-primary text-sm font-medium transition-colors cursor-pointer shrink-0"
        >
          <ListFilter className="w-4 h-4 text-custom-yellow" />
          See All Roles
        </button>
      </div>

      <div className="h-px bg-white/10" />

      <form onSubmit={handleSave} className="space-y-6">
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
            placeholder={t("staff.roleNamePlaceholder", "Role Name")}
            className="w-full max-w-2xl px-4 py-3 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
          {error && <p className="text-xs text-custom-red mt-1">{error}</p>}
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

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push(`${basePath}/staff/role-management/all-roles`)}
            className="px-6 py-2.5 rounded-lg border border-white/10 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t("staff.cancel", "Cancel")}
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("common.saveChanges", "Save Changes")}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditRoleForm
