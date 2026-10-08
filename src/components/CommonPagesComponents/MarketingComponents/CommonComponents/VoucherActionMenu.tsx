"use client"

import { MoreVertical, Trash2, Pencil } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import type { VoucherActionMenuProps } from "@/types/CommonPageTypes/MarketingTypes"

export default function VoucherActionMenu({ voucher, onDelete, onEdit }: VoucherActionMenuProps) {
  const { t } = useTranslation("dashboard")

  const voucherId = "id" in voucher ? voucher.id : voucher.voucher_id

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 hover:bg-white/5 rounded-full transition-colors cursor-pointer outline-none inline-flex items-center justify-center text-secondary hover:text-primary"
          aria-label="Voucher Actions"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="w-40 bg-card border border-white/10 rounded-lg shadow-xl z-50 py-1 backdrop-blur-md"
      >
        {onEdit && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onEdit(voucher)
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-primary cursor-pointer focus:bg-white/5 outline-none"
          >
            <Pencil className="w-4 h-4 text-secondary" />
            <span>{t("marketing.actions.edit", "Edit")}</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onDelete(voucherId)
          }}
          className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-red-400 hover:bg-red-500/10 cursor-pointer focus:bg-red-500/10 outline-none"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
          <span>{t("marketing.actions.delete", "Delete")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
