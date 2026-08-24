"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowLeft, MapPin, AlertTriangle } from "lucide-react"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import FieldPlanBadge from "./FieldPlanBadge"
import type { FieldDetailsSheetProps } from "@/types/AdminTypes/FieldManagementTypes"

export default function FieldDetailsSheet({
  field,
  open,
  onOpenChange,
  onBlockField,
  onUpgradePlan,
  onViewAllSession,
}: FieldDetailsSheetProps) {
  const { t } = useTranslation("dashboard")
  const [showUpgradeDropdown, setShowUpgradeDropdown] = useState(false)

  if (!field) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-white/10 p-0 overflow-y-auto"
      >
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onOpenChange(false)}
              className="cursor-pointer p-1 hover:bg-white/5 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="text-lg md:text-xl font-bold text-primary">
                Green Valley Sports Arena
              </SheetTitle>
              <SheetDescription className="flex items-center gap-1 mt-1 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {field.location}
              </SheetDescription>
            </div>
            <button
              onClick={onViewAllSession}
              className="shrink-0 px-4 py-2 border border-custom-yellow text-custom-yellow rounded-lg text-sm font-medium hover:bg-custom-yellow/10 transition-colors cursor-pointer"
            >
              {t("fieldManagement.details.viewAllSession")}
            </button>
          </div>
        </SheetHeader>

        <div className="p-6">
          <div className="w-full h-48 bg-muted rounded-xl overflow-hidden mb-6">
            <Image
              src={field.image}
              alt={field.fieldName}
              width={400}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 bg-muted/30 rounded-xl p-4 mb-8">
            <div className="text-center">
              <p className="text-xl font-bold text-primary">{field.rating}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("fieldManagement.details.rating")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-primary">
                {field.totalBookings.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("fieldManagement.details.totalBookings")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-primary">
                {field.totalRevenue}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("fieldManagement.details.totalRevenue")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-primary">
                {field.checkInRate}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("fieldManagement.details.checkInRate")}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-primary mb-4">
            {t("fieldManagement.details.fieldInfo")}
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.details.fieldName")}
              </span>
              <span className="text-sm font-medium text-primary">
                Green Snack Squad
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.details.fieldId")}
              </span>
              <span className="text-sm font-medium text-primary">
                {field.fieldId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.details.fieldOwner")}
              </span>
              <span className="text-sm font-medium text-primary">
                {field.ownerName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.details.plan")}
              </span>
              <FieldPlanBadge plan={field.plan} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.details.email")}
              </span>
              <span className="text-sm font-medium text-primary">
                {field.ownerEmail}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.details.contactNumber")}
              </span>
              <span className="text-sm font-medium text-primary">
                {field.contactNumber}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.details.member")}
              </span>
              <span className="text-sm font-medium text-primary">
                {field.memberSince}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={() => {
                onBlockField(field)
                onOpenChange(false)
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              {t("fieldManagement.actions.blockField")}
            </button>
            <div className="relative flex-1">
              <button
                onClick={() => setShowUpgradeDropdown(!showUpgradeDropdown)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium hover:bg-yellow-500/20 transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                {t("fieldManagement.actions.upgradePlan")}
              </button>
              {showUpgradeDropdown && (
                <div className="absolute bottom-full mb-2 right-0 w-40 bg-card border border-white/10 rounded-lg shadow-lg z-50 py-1">
                  <button
                    onClick={() => {
                      onUpgradePlan(field)
                      setShowUpgradeDropdown(false)
                      onOpenChange(false)
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Image
                      src="/silver.png"
                      alt="Silver"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    Sliver
                  </button>
                  <button
                    onClick={() => {
                      onUpgradePlan(field)
                      setShowUpgradeDropdown(false)
                      onOpenChange(false)
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Image
                      src="/gold.png"
                      alt="Gold"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    Gold
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
