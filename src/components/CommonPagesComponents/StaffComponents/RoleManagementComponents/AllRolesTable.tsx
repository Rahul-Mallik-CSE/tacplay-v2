"use client"

import React, { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, Plus, Search, Edit3, Trash2, Loader2, Shield } from "lucide-react"
import { toast } from "react-toastify"
import CustomTable from "@/components/SharedComponents/CustomTable"
import StaffStatusBadge from "../StaffManagementComponents/StaffStatusBadge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  useGetRolesQuery,
  useDeleteRoleMutation,
} from "@/redux/features/shared/staff/staffAPI"
import type { RoleItem } from "@/types/CommonPageTypes/StaffTypes"

function formatDateOnly(dateStr?: string | null): string {
  if (!dateStr) return "N/A"
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

function formatPermissionName(code: string): string {
  return code
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function AllRolesTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const { data: rolesResponse, isLoading, refetch } = useGetRolesQuery()
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation()

  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [deleteTargetRole, setDeleteTargetRole] = useState<RoleItem | null>(null)

  const rolesList = rolesResponse?.data || []

  // Frontend search filter
  const filteredRoles = useMemo(() => {
    if (!search.trim()) return rolesList
    const query = search.toLowerCase().trim()
    return rolesList.filter(
      (role) =>
        role.role_name.toLowerCase().includes(query) ||
        (role.permissions &&
          role.permissions.some((p) => p.toLowerCase().includes(query)))
    )
  }, [rolesList, search])

  const handleEditRole = (role: RoleItem) => {
    router.push(`${basePath}/staff/role-management/edit-role/${role.id}`)
  }

  const handleDeleteRole = async () => {
    if (!deleteTargetRole) return
    try {
      const res = await deleteRole(deleteTargetRole.id).unwrap()
      toast.success(res?.message || "Role deleted successfully.")
      setDeleteTargetRole(null)
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || err?.data?.detail || "Failed to delete role.")
    }
  }

  const columns: {
    header: string
    accessor: keyof RoleItem | ((row: RoleItem) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: "Role Name",
      accessor: (row: RoleItem) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-custom-yellow/10 border border-custom-yellow/20 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-custom-yellow" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">{row.role_name}</p>
            <p className="text-xs text-secondary">ID: #{row.id}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Permissions",
      accessor: (row: RoleItem) => {
        const perms = row.permissions || []
        return (
          <div className="flex items-center gap-1.5 flex-wrap max-w-md py-1">
            <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-primary">
              {perms.length} Permissions
            </span>
            {perms.slice(0, 2).map((perm, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-xs bg-muted border border-white/5 text-secondary truncate max-w-[130px]"
                title={perm}
              >
                {formatPermissionName(perm)}
              </span>
            ))}
            {perms.length > 2 && (
              <span className="text-xs text-secondary">
                +{perms.length - 2} more
              </span>
            )}
          </div>
        )
      },
    },
    {
      header: "Status",
      accessor: (row: RoleItem) => (
        <StaffStatusBadge
          status={row.is_active ? "Active" : "Inactive"}
          size="sm"
        />
      ),
    },
    {
      header: "Created Date",
      accessor: (row: RoleItem) => (
        <span className="text-xs text-secondary">
          {formatDateOnly(row.created_at)}
        </span>
      ),
    },
  ]

  const actionRenderer = (row: RoleItem) => (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={() => handleEditRole(row)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-primary text-xs font-medium transition-colors cursor-pointer"
        title="Edit Role"
      >
        <Edit3 className="w-3.5 h-3.5 text-custom-yellow" />
        Edit
      </button>
      <button
        type="button"
        onClick={() => setDeleteTargetRole(row)}
        className="p-1.5 rounded-lg border border-white/10 hover:border-custom-red/40 hover:bg-custom-red/10 text-secondary hover:text-custom-red transition-colors cursor-pointer"
        title="Delete Role"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )

  type TableRow = RoleItem & Record<string, unknown>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(`${basePath}/staff/role-management`)}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 text-primary transition-colors cursor-pointer shrink-0"
            aria-label="Back to Create Role"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              All Staff Roles
            </h1>
            <p className="text-secondary text-sm mt-1">
              View and manage staff roles and permission configurations.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push(`${basePath}/staff/role-management`)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          {t("staff.createNewRole", "Create New Role")}
        </button>
      </div>

      <div className="h-px bg-white/10" />

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder="Search roles or permissions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
        </div>
        <p className="text-xs text-secondary shrink-0">
          Total: <span className="font-semibold text-primary">{filteredRoles.length}</span> roles
        </p>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-card border border-white/5 rounded-xl">
          <Loader2 className="w-8 h-8 animate-spin text-custom-yellow mb-2" />
          <p className="text-sm text-secondary">Loading roles...</p>
        </div>
      ) : (
        <CustomTable
          data={filteredRoles as unknown as TableRow[]}
          columns={
            columns as {
              header: string
              accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
              className?: string
            }[]
          }
          actionRenderer={(row) => actionRenderer(row as RoleItem)}
          serverPagination={false}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(size) => {
            setItemsPerPage(size)
            setCurrentPage(1)
          }}
          minTableWidth="min-w-[800px]"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteTargetRole)}
        onOpenChange={(open) => !open && setDeleteTargetRole(null)}
      >
        <DialogContent className="sm:max-w-md bg-card border border-white/10 text-center">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">Delete Role</DialogTitle>
            <DialogDescription className="text-center text-secondary mt-2">
              Are you sure you want to delete the role &quot;{deleteTargetRole?.role_name}&quot;?
              Staff assigned to this role may lose their permissions.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-center mt-4">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => setDeleteTargetRole(null)}
              className="px-6 py-2.5 rounded-lg border border-white/10 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
            >
              {t("staff.cancel", "Cancel")}
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteRole}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("staff.deleteStaff", "Delete")}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AllRolesTable
