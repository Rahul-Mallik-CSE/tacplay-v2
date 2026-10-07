"use client"

import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Loader2, ChevronRight } from "lucide-react"
import { toast } from "react-toastify"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useUpdateCampaignMutation } from "@/redux/features/shared/marketing/marketingAPI"
import { getErrorMessage } from "@/lib/auth"
import type {
  CampaignListItem,
  RecentCampaignItem,
  Campaign,
} from "@/types/CommonPageTypes/MarketingTypes"

interface EditCampaignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  campaign: CampaignListItem | RecentCampaignItem | Campaign | null
  onSuccess?: () => void
}

export default function EditCampaignModal({
  open,
  onOpenChange,
  campaign,
  onSuccess,
}: EditCampaignModalProps) {
  const { t } = useTranslation("dashboard")
  const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation()

  const [formData, setFormData] = useState({
    campaign_name: "",
    audience: "all_players",
  })

  useEffect(() => {
    if (campaign) {
      const name =
        "campaign_name" in campaign
          ? campaign.campaign_name
          : "name" in campaign
          ? campaign.name
          : ""
      const aud =
        ("audience" in campaign ? campaign.audience : "all_players") || "all_players"

      const normalizedAudience = String(aud).toLowerCase().includes("active")
        ? "active_players"
        : "all_players"

      setFormData({
        campaign_name: name || "",
        audience: normalizedAudience,
      })
    }
  }, [campaign])

  const campaignId = campaign
    ? "id" in campaign
      ? campaign.id
      : "campaign_id" in campaign
      ? campaign.campaign_id
      : null
    : null

  const campaignType = campaign
    ? "campaign_type" in campaign
      ? campaign.campaign_type
      : "type" in campaign
      ? campaign.type
      : ""
    : ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!campaignId) return

    if (!formData.campaign_name.trim()) {
      toast.error(t("marketing.validation.campaignNameRequired", "Campaign name is required"))
      return
    }

    try {
      const res = await updateCampaign({
        id: campaignId,
        body: {
          campaign_name: formData.campaign_name.trim(),
          audience: formData.audience,
        },
      }).unwrap()

      toast.success(
        res.message || t("marketing.campaignUpdatedSuccess", "Campaign updated successfully.")
      )
      onOpenChange(false)
      onSuccess?.()
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update campaign"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-root-bg border-white/10 text-primary">
        <DialogHeader>
          <DialogTitle>
            {t("marketing.editCampaignTitle", "Edit Campaign")}
          </DialogTitle>
          <DialogDescription className="text-secondary text-sm">
            {t(
              "marketing.editCampaignDescription",
              "Update the campaign name and target audience."
            )}
          </DialogDescription>
        </DialogHeader>

        {campaign && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {campaignType && (
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-secondary uppercase block">
                    {t("marketing.columns.type", "Campaign Type")}
                  </span>
                  <span className="text-sm font-semibold text-primary uppercase">
                    {String(campaignType)}
                  </span>
                </div>
                {"status" in campaign && campaign.status && (
                  <span className="text-xs bg-white/10 px-2.5 py-1 rounded-md text-primary capitalize">
                    {String(campaign.status)}
                  </span>
                )}
              </div>
            )}

            {/* Campaign Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary">
                {t("marketing.form.campaignName", "Campaign Name")} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.campaign_name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, campaign_name: e.target.value }))
                }
                className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
                placeholder="e.g. Weekend Warrior Special"
              />
            </div>

            {/* Audience */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary">
                {t("marketing.form.audience", "Target Audience")} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.audience}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, audience: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary focus:outline-none focus:border-white/20 appearance-none"
                >
                  <option value="all_players" className="bg-[#121316] text-primary">
                    {t("marketing.form.allPlayers", "All Players")}
                  </option>
                  <option value="active_players" className="bg-[#121316] text-primary">
                    {t("marketing.form.activePlayers", "Active Players")}
                  </option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary rotate-90 pointer-events-none" />
              </div>
            </div>

            <DialogFooter className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
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
  )
}
