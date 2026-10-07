"use client"

import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { Search, Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import CustomTable from "@/components/SharedComponents/CustomTable"
import VoucherActionMenu from "../CommonComponents/VoucherActionMenu"
import VoucherStatusBadge from "../CommonComponents/VoucherStatusBadge"
import VouchersTableLoading from "../CommonComponents/VouchersTableLoading"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  useGetVouchersListQuery,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
} from "@/redux/features/shared/marketing/marketingAPI"
import { getErrorMessage } from "@/lib/auth"
import type { VoucherListItem } from "@/types/CommonPageTypes/MarketingTypes"

function formatVoucherDuration(voucher: VoucherListItem): string {
  if (voucher.schedule_type === "active_now") {
    return "Active Now"
  }
  if (voucher.start_date && voucher.end_date) {
    return `${voucher.start_date} – ${voucher.end_date}`
  }
  if (voucher.start_date) return `From ${voucher.start_date}`
  if (voucher.end_date) return `Until ${voucher.end_date}`
  return "—"
}

export default function VouchersTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Edit modal state
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherListItem | null>(null)
  const [editForm, setEditForm] = useState({
    discount_percentage: "",
    minimum_order_value: "",
    description: "",
  })

  // Delete modal state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedVoucherId, setSelectedVoucherId] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const {
    data: vouchersResponse,
    isLoading,
    refetch,
  } = useGetVouchersListQuery({
    search: debouncedSearch || undefined,
    page: currentPage,
    limit: itemsPerPage,
  })

  const [updateVoucher, { isLoading: isUpdating }] = useUpdateVoucherMutation()
  const [deleteVoucher, { isLoading: isDeleting }] = useDeleteVoucherMutation()

  const vouchers = vouchersResponse?.data || []
  const totalPages = vouchersResponse?.meta?.totalPage || 1

  const columns = [
    {
      header: t("marketing.columns.voucher", "Voucher"),
      accessor: (row: VoucherListItem) => (
        <div className="space-y-0.5">
          <span className="text-custom-yellow font-semibold">{row.voucher_code}</span>
          {row.description && (
            <p className="text-xs text-secondary line-clamp-1 max-w-[220px]" title={row.description}>
              {row.description}
            </p>
          )}
        </div>
      ),
    },
    {
      header: t("marketing.columns.session", "Session"),
      accessor: (row: VoucherListItem) => (
        <span className="text-sm text-primary">{row.session_name || "All Sessions"}</span>
      ),
    },
    {
      header: t("marketing.columns.discount", "Discount"),
      accessor: (row: VoucherListItem) => (
        <span className="text-sm font-semibold text-primary">
          {row.discount_percentage}%
        </span>
      ),
    },
    {
      header: t("marketing.columns.minimumOrder", "Min. Order"),
      accessor: (row: VoucherListItem) => (
        <span className="text-sm text-primary">€{row.minimum_order_value}</span>
      ),
    },
    {
      header: t("marketing.columns.used", "Used"),
      accessor: (row: VoucherListItem) => (
        <span className="text-sm text-primary">
          {row.used_count}
          {row.usage_limit !== null ? `/${row.usage_limit}` : ""}
        </span>
      ),
    },
    {
      header: t("marketing.columns.duration", "Duration"),
      accessor: (row: VoucherListItem) => (
        <span className="text-sm text-secondary whitespace-nowrap">
          {formatVoucherDuration(row)}
        </span>
      ),
    },
    {
      header: t("marketing.columns.status", "Status"),
      accessor: (row: VoucherListItem) => <VoucherStatusBadge status={row.status} />,
    },
  ]

  const handleEditClick = (voucher: VoucherListItem) => {
    setSelectedVoucher(voucher)
    setEditForm({
      discount_percentage: String(voucher.discount_percentage || ""),
      minimum_order_value: String(voucher.minimum_order_value || ""),
      description: voucher.description || "",
    })
    setEditDialogOpen(true)
  }

  const handleDeleteClick = (id: number) => {
    setSelectedVoucherId(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedVoucher) return

    if (!editForm.discount_percentage || isNaN(Number(editForm.discount_percentage))) {
      toast.error(t("marketing.invalidDiscount", "Please enter a valid discount percentage"))
      return
    }

    try {
      await updateVoucher({
        id: selectedVoucher.id,
        body: {
          discount_percentage: Number(editForm.discount_percentage),
          minimum_order_value: editForm.minimum_order_value,
          ...(editForm.description ? { description: editForm.description } : {}),
        },
      }).unwrap()

      toast.success(t("marketing.voucherUpdatedSuccess", "Voucher updated successfully."))
      setEditDialogOpen(false)
      setSelectedVoucher(null)
      refetch()
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update voucher"))
    }
  }

  const handleConfirmDelete = async () => {
    if (!selectedVoucherId) return
    try {
      await deleteVoucher(selectedVoucherId).unwrap()
      toast.success(t("marketing.voucherDeletedSuccess", "Voucher deleted successfully."))
      setDeleteDialogOpen(false)
      setSelectedVoucherId(null)
      refetch()
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete voucher"))
    }
  }

  if (isLoading && !vouchersResponse) {
    return <VouchersTableLoading title={t("marketing.voucherTitle", "Vouchers & Discounts")} />
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("marketing.voucherTitle", "Vouchers & Discounts")}
          </h1>
          <p className="text-sm text-secondary mt-1">
            {t(
              "marketing.voucherSubtitle",
              "Create and manage promotional vouchers and discount codes."
            )}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input
              type="text"
              placeholder={t("common.search", "Search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
            />
          </div>
          <button
            onClick={() => router.push(`${basePath}/marketing/vouchers/create-voucher`)}
            className="px-4 py-2 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t("marketing.createNewVoucher", "Create Voucher")}
          </button>
        </div>
      </div>

      {/* Table */}
      <CustomTable
        data={vouchers as unknown as Record<string, unknown>[]}
        columns={columns as never}
        serverPagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        actionRenderer={(row) => (
          <VoucherActionMenu
            voucher={row as unknown as VoucherListItem}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick as never}
          />
        )}
      />

      {/* Edit Voucher Modal */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[480px] bg-root-bg border-white/10 text-primary">
          <DialogHeader>
            <DialogTitle>
              {t("marketing.editVoucherTitle", "Edit Voucher")}
            </DialogTitle>
            <DialogDescription className="text-secondary text-sm">
              {t(
                "marketing.editVoucherDescription",
                "Update discount percentage, minimum order value, and details for this voucher."
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedVoucher && (
            <form onSubmit={handleConfirmEdit} className="space-y-4 mt-2">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-secondary uppercase block">
                    {t("marketing.form.voucherCode", "Voucher Code")}
                  </span>
                  <span className="text-base font-semibold text-custom-yellow">
                    {selectedVoucher.voucher_code}
                  </span>
                </div>
                {selectedVoucher.session_name && (
                  <span className="text-xs bg-white/10 px-2.5 py-1 rounded-md text-primary">
                    {selectedVoucher.session_name}
                  </span>
                )}
              </div>

              {/* Discount Percentage */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">
                  {t("marketing.form.discountPercentage", "Discount Percentage (%)")}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  value={editForm.discount_percentage}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, discount_percentage: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
                  placeholder="e.g. 25"
                />
              </div>

              {/* Minimum Order Value */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">
                  {t("marketing.form.minimumOrderValue", "Minimum Order Value (€)")}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={editForm.minimum_order_value}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, minimum_order_value: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
                  placeholder="e.g. 50.00"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">
                  {t("marketing.form.description", "Description")}
                </label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20 resize-none"
                  placeholder={t("marketing.form.descriptionPlaceholder", "Optional voucher description...")}
                />
              </div>

              <DialogFooter className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditDialogOpen(false)}
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-primary text-sm transition-colors cursor-pointer"
                >
                  {t("common.cancel", "Cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-lg bg-custom-red hover:bg-custom-red/90 text-white text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
                >
                  {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                  {t("common.save", "Save Changes")}
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[420px] bg-root-bg border-white/10 text-primary">
          <DialogHeader>
            <DialogTitle>
              {t("marketing.deleteVoucherTitle", "Delete Voucher")}
            </DialogTitle>
            <DialogDescription className="text-secondary text-sm">
              {t(
                "marketing.deleteVoucherDescription",
                "Are you sure you want to delete this voucher? This action cannot be undone."
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <button
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-primary text-sm transition-colors cursor-pointer"
            >
              {t("common.cancel", "Cancel")}
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
            >
              {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("common.delete", "Delete")}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
