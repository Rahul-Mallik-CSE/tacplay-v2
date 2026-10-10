"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { Sparkles, ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import FieldPlanBadge from "./FieldPlanBadge"
import { useUpgradeFieldOwnerPlanMutation } from "@/redux/features/admin/fieldManagement/fieldManagementAPI"
import type {
  UpgradeFieldPlanModalProps,
  FieldOwnerItem,
  FieldOwnerDetailData,
} from "@/types/AdminTypes/FieldManagementTypes"

export default function UpgradeFieldPlanModal({
  field,
  userId,
  targetPlan,
  currentPlanName,
  open,
  onOpenChange,
  onConfirm,
  onSuccess,
}: UpgradeFieldPlanModalProps) {
  const { t } = useTranslation("dashboard")
  const [upgradeFieldOwnerPlan, { isLoading }] = useUpgradeFieldOwnerPlanMutation()

  const resolvedUserId =
    userId ||
    (field as FieldOwnerDetailData)?.user?.id ||
    (field as FieldOwnerItem)?.user_id ||
    (field as FieldOwnerDetailData)?.field?.id

  const fieldName =
    (field as FieldOwnerDetailData)?.field_summary?.field_name ||
    (field as FieldOwnerDetailData)?.field?.field_name ||
    (field as FieldOwnerItem)?.field_name ||
    "Field Owner"

  const ownerName =
    (field as FieldOwnerDetailData)?.user?.full_name ||
    (field as FieldOwnerItem)?.owner_name ||
    ""

  const displayUserId =
    (field as FieldOwnerDetailData)?.user?.display_id ||
    (field as FieldOwnerItem)?.display_id ||
    (resolvedUserId ? `#CN ${resolvedUserId}` : "")

  const handleConfirm = async () => {
    if (!resolvedUserId || !targetPlan) {
      if (targetPlan && onConfirm) {
        onConfirm(targetPlan.plan_name || targetPlan.plan_code)
        onOpenChange(false)
      }
      return
    }

    try {
      const res = await upgradeFieldOwnerPlan({
        id: resolvedUserId,
        data: { plan_code: targetPlan.plan_code },
      }).unwrap()

      toast.success(
        res?.message ||
          t("fieldManagement.toast.upgradeSuccess", "Field owner plan upgraded successfully by admin.")
      )

      if (onConfirm) {
        onConfirm(targetPlan.plan_name || targetPlan.plan_code)
      }
      if (onSuccess) {
        onSuccess()
      }
      onOpenChange(false)
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to upgrade field owner plan. Please try again."
      toast.error(errorMsg)
    }
  }

  const currencySymbol =
    targetPlan?.currency === "EUR"
      ? "€"
      : targetPlan?.currency
      ? `${targetPlan.currency} `
      : "€"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border-white/10 max-w-md p-6"
        showCloseButton={!isLoading}
      >
        <DialogHeader className="items-center text-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <DialogTitle className="text-xl font-bold text-primary">
            {t("fieldManagement.upgradeModal.title", "Upgrade Field Plan")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs mt-1">
            Assign a new subscription tier to this field owner.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Target Account Summary */}
          <div className="p-3 rounded-lg bg-muted/40 border border-white/5 flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-primary">{fieldName}</p>
              {ownerName && <p className="text-muted-foreground mt-0.5">{ownerName}</p>}
            </div>
            {displayUserId && (
              <span className="font-mono text-emerald-400 font-medium">
                {displayUserId}
              </span>
            )}
          </div>

          {/* Plan Comparison Card */}
          {targetPlan && (
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/5">
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-[11px]">Current Plan</span>
                  <FieldPlanBadge plan={currentPlanName || "Current"} size="sm" />
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mx-2" />
                <div className="space-y-1 text-right">
                  <span className="text-muted-foreground block text-[11px]">New Plan</span>
                  <FieldPlanBadge plan={targetPlan.plan_name} size="sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="text-muted-foreground">New Price</span>
                  <p className="text-primary font-bold text-sm mt-0.5">
                    {currencySymbol}
                    {targetPlan.price}
                    <span className="text-xs font-normal text-muted-foreground capitalize">
                      {" "}/ {targetPlan.billing_cycle}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">Duration</span>
                  <p className="text-primary font-medium mt-0.5">
                    {targetPlan.duration_days} Days
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Admin Note */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
            <p>
              This plan will be assigned by admin with manual payment verification. The field owner will receive immediate access.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-row gap-3 sm:gap-3 mt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
            className="flex-1 px-4 py-2.5 bg-muted border border-white/10 text-primary rounded-lg text-xs sm:text-sm font-medium hover:bg-muted/80 transition-colors cursor-pointer disabled:opacity-50"
          >
            {t("common.cancel", "Cancel")}
          </button>
          <button
            type="button"
            disabled={isLoading || !targetPlan}
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-custom-red text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-custom-red/90 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Upgrading...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{t("fieldManagement.upgradeModal.confirm", "Confirm Upgrade")}</span>
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
