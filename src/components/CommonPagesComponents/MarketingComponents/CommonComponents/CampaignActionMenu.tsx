"use client"

import { useState, useRef, useEffect } from "react"
import { MoreVertical, Trash2, Pencil, Copy } from "lucide-react"
import { useTranslation } from "react-i18next"
import type {
  Campaign,
  RecentCampaignItem,
  CampaignListItem,
} from "@/types/CommonPageTypes/MarketingTypes"

interface CampaignActionMenuProps {
  campaign: Campaign | RecentCampaignItem | CampaignListItem
  onDelete?: (id: number) => void
  onEdit?: (id: number) => void
  onDuplicate?: (id: number) => void
}

export default function CampaignActionMenu({
  campaign,
  onDelete,
  onEdit,
  onDuplicate,
}: CampaignActionMenuProps) {
  const { t } = useTranslation("dashboard")
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const campaignId = "id" in campaign ? campaign.id : campaign.campaign_id
  const canEdit = "actions" in campaign ? campaign.actions?.can_edit !== false : true
  const canDelete = "actions" in campaign ? campaign.actions?.can_delete !== false : true
  const canDuplicate = "actions" in campaign ? campaign.actions?.can_duplicate !== false : true

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
        aria-label="Actions"
      >
        <MoreVertical className="w-4 h-4 text-secondary" />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-50 w-40 bg-card border border-white/10 rounded-lg shadow-lg py-1">
          {/* Edit button commented out */}
          {/* {canEdit && onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(campaignId)
                setOpen(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              {t("marketing.actions.edit", "Edit")}
            </button>
          )} */}

          {/* Duplicate button commented out */}
          {/* {canDuplicate && onDuplicate && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDuplicate(campaignId)
                setOpen(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              {t("marketing.actions.duplicate", "Duplicate")}
            </button>
          )} */}
          {canDelete && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(campaignId)
                setOpen(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              {t("marketing.actions.delete", "Delete")}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
