"use client"

import { useState, useRef, useEffect } from "react"
import { MoreVertical, Trash2, Pencil, Copy } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { VoucherActionMenuProps } from "@/types/CommonPageTypes/MarketingTypes"

export default function VoucherActionMenu({ voucher, onDelete, onEdit }: VoucherActionMenuProps) {
  const { t } = useTranslation("dashboard")
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const voucherId = "id" in voucher ? voucher.id : voucher.voucher_id

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
        className="p-1.5 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
      >
        <MoreVertical className="w-4 h-4 text-secondary" />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-50 w-36 bg-card border border-white/10 rounded-lg shadow-lg py-1">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(voucher)
                setOpen(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Pencil className="w-4 h-4 text-secondary" />
              {t("marketing.actions.edit", "Edit")}
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(voucherId)
              setOpen(false)
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            {t("marketing.actions.delete", "Delete")}
          </button>
          {/* Duplicate button removed as requested */}
        </div>
      )}
    </div>
  )
}
