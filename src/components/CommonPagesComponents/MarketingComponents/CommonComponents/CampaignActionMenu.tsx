"use client"

import { MoreVertical, Trash2, Pencil } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import type {
  Campaign,
  RecentCampaignItem,
  CampaignListItem,
} from "@/types/CommonPageTypes/MarketingTypes"

interface CampaignActionMenuProps {
  campaign: Campaign | RecentCampaignItem | CampaignListItem
  onDelete?: (id: number) => void
  onEdit?: (campaign: Campaign | RecentCampaignItem | CampaignListItem) => void
  onDuplicate?: (id: number) => void
}

export default function CampaignActionMenu({
  campaign,
  onDelete,
  onEdit,
}: CampaignActionMenuProps) {
  const { t } = useTranslation("dashboard")

  const campaignId = "id" in campaign ? campaign.id : campaign.campaign_id
  const canEdit = "actions" in campaign ? campaign.actions?.can_edit !== false : true
  const canDelete = "actions" in campaign ? campaign.actions?.can_delete !== false : true

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 hover:bg-white/5 rounded-full transition-colors cursor-pointer outline-none inline-flex items-center justify-center text-secondary hover:text-primary"
          aria-label="Campaign Actions"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="w-40 bg-card border border-white/10 rounded-lg shadow-xl z-50 py-1 backdrop-blur-md"
      >
        {canEdit && onEdit && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onEdit(campaign)
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-primary cursor-pointer focus:bg-white/5 outline-none"
          >
            <Pencil className="w-4 h-4 text-secondary" />
            <span>{t("marketing.actions.edit", "Edit")}</span>
          </DropdownMenuItem>
        )}

        {canDelete && onDelete && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onDelete(campaignId)
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-red-400 hover:bg-red-500/10 cursor-pointer focus:bg-red-500/10 outline-none"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>{t("marketing.actions.delete", "Delete")}</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
