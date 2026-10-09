"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowLeft, MapPin, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import FieldPlanBadge from "./FieldPlanBadge"
import { useGetAdminFieldOwnerDetailQuery } from "@/redux/features/admin/fieldManagement/fieldManagementAPI"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import type {
  FieldDetailsSheetProps,
  FieldOwnerStatusAction,
} from "@/types/AdminTypes/FieldManagementTypes"

export default function FieldDetailsSheet({
  fieldId,
  initialField,
  open,
  onOpenChange,
  onStatusAction,
  onUpgradePlan,
  onViewAllSession,
}: FieldDetailsSheetProps) {
  const { t } = useTranslation("dashboard")
  const [showUpgradeDropdown, setShowUpgradeDropdown] = useState(false)

  const activeId = fieldId || initialField?.user_id || null

  const {
    data: detailResponse,
    isLoading,
    isFetching,
  } = useGetAdminFieldOwnerDetailQuery(activeId!, {
    skip: !activeId || !open,
  })

  const detail = detailResponse?.data

  if (!open && !activeId) return null

  const fieldName =
    detail?.field_summary?.field_name ||
    detail?.field?.field_name ||
    initialField?.field_name ||
    t("fieldManagement.details.field", "Field")

  const location =
    detail?.field_summary?.location ||
    detail?.field?.location_display ||
    detail?.field?.full_address ||
    initialField?.country ||
    "N/A"

  const imageRaw =
    detail?.field_summary?.image ||
    detail?.field?.image ||
    initialField?.field?.image
  const imageUrl = imageRaw ? toAbsoluteMediaUrl(imageRaw) : null

  const rawStatusVal =
    detail?.user?.status ||
    detail?.field?.approval_status ||
    initialField?.status ||
    ""

  const rawStatusStr =
    typeof rawStatusVal === "string"
      ? rawStatusVal
      : typeof rawStatusVal === "object" && rawStatusVal !== null
      ? ((rawStatusVal as Record<string, unknown>).value as string) ||
        ((rawStatusVal as Record<string, unknown>).label as string) ||
        ""
      : String(rawStatusVal || "")

  const rawStatus = rawStatusStr.toLowerCase()

  let statusActionKey: FieldOwnerStatusAction = "suspend"
  let statusActionLabel = t("fieldManagement.actions.suspendField", "Suspend Field")
  let statusActionIcon = <AlertTriangle className="w-4 h-4" />
  let statusActionBtnClass =
    "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20"

  if (rawStatus === "pending") {
    statusActionKey = "approve"
    statusActionLabel = t("fieldManagement.actions.approveField", "Approve Field")
    statusActionIcon = <CheckCircle className="w-4 h-4" />
    statusActionBtnClass =
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
  } else if (rawStatus === "suspended") {
    statusActionKey = "activate"
    statusActionLabel = t("fieldManagement.actions.activateField", "Activate Field")
    statusActionIcon = <CheckCircle className="w-4 h-4" />
    statusActionBtnClass =
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
  } else {
    statusActionKey = "suspend"
    statusActionLabel = t("fieldManagement.actions.suspendField", "Suspend Field")
    statusActionIcon = <AlertTriangle className="w-4 h-4" />
    statusActionBtnClass =
      "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20"
  }

  const handleStatusClick = () => {
    if (activeId) {
      onStatusAction(activeId, statusActionKey)
    }
  }

  const upgradePlans = detail?.actions?.upgrade_plan?.plans || []

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
              className="cursor-pointer p-1.5 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-primary"
              aria-label="Close"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-lg md:text-xl font-bold text-primary truncate">
                {fieldName}
              </SheetTitle>
              <SheetDescription className="flex items-center gap-1 mt-1 text-muted-foreground truncate">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{location}</span>
              </SheetDescription>
            </div>
            <button
              onClick={onViewAllSession}
              className="shrink-0 px-4 py-2 border border-custom-yellow text-custom-yellow rounded-lg text-sm font-medium hover:bg-custom-yellow/10 transition-colors cursor-pointer"
            >
              {t("fieldManagement.details.viewAllSession", "View All Session")}
            </button>
          </div>
        </SheetHeader>

        {isLoading && !detail ? (
          <div className="p-6 space-y-6 animate-pulse">
            <Skeleton className="w-full h-48 rounded-xl bg-white/10" />

            <div className="grid grid-cols-4 gap-2 bg-muted/30 rounded-xl p-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center space-y-2">
                  <Skeleton className="h-6 w-12 bg-white/10 mx-auto" />
                  <Skeleton className="h-3 w-16 bg-white/5 mx-auto" />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Skeleton className="h-5 w-36 bg-white/10 rounded" />
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-28 bg-white/5" />
                  <Skeleton className="h-4 w-36 bg-white/10" />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Skeleton className="h-11 flex-1 bg-white/10 rounded-lg" />
              <Skeleton className="h-11 flex-1 bg-white/10 rounded-lg" />
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Field Image */}
            <div className="w-full h-48 bg-muted rounded-xl overflow-hidden mb-6 relative">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={fieldName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted/60 text-muted-foreground text-sm">
                  {t("fieldManagement.details.noImage", "No field image available")}
                </div>
              )}
              {isFetching && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-xs text-primary flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Updating...</span>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-2 bg-muted/30 rounded-xl p-4 mb-8">
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-primary">
                  {detail?.stats?.rating?.display ??
                    (detail?.stats?.rating?.value !== null &&
                    detail?.stats?.rating?.value !== undefined
                      ? String(detail.stats.rating.value)
                      : "N/A")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("fieldManagement.details.rating", "Rating")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-primary">
                  {detail?.stats?.total_bookings?.value !== undefined
                    ? detail.stats.total_bookings.value.toLocaleString()
                    : initialField?.booking?.count ?? 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("fieldManagement.details.totalBookings", "Total Bookings")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-primary truncate px-1">
                  {detail?.stats?.total_revenue_v2?.display ??
                    (detail?.stats?.total_revenue
                      ? `€${detail.stats.total_revenue}`
                      : initialField?.revenue?.display || "€0.00")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("fieldManagement.details.totalRevenue", "Total Revenue")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-primary">
                  {detail?.stats?.check_in_rate?.display ??
                    (detail?.stats?.check_in_rate?.value !== undefined
                      ? `${detail.stats.check_in_rate.value}%`
                      : "0%")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("fieldManagement.details.checkInRate", "Check-in Rate")}
                </p>
              </div>
            </div>

            {/* Field Info */}
            <h3 className="text-lg font-bold text-primary mb-4">
              {t("fieldManagement.details.fieldInfo", "Field Information")}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("fieldManagement.details.fieldName", "Field Name")}
                </span>
                <span className="text-sm font-medium text-primary">
                  {detail?.field_info?.field_name ||
                    detail?.field?.field_name ||
                    initialField?.field_name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("fieldManagement.details.fieldId", "Field ID")}
                </span>
                <span className="text-sm font-medium text-primary">
                  {detail?.field_info?.field_id ||
                    detail?.field?.display_id ||
                    initialField?.field?.display_id ||
                    initialField?.display_id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("fieldManagement.details.fieldOwner", "Field Owner")}
                </span>
                <span className="text-sm font-medium text-primary">
                  {detail?.field_info?.field_owner ||
                    detail?.user?.full_name ||
                    initialField?.owner_name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("fieldManagement.details.plan", "Plan")}
                </span>
                <FieldPlanBadge
                  plan={
                    detail?.field_info?.plan?.name ||
                    detail?.stats?.subscription_plan ||
                    initialField?.subscription?.name ||
                    "Bronze"
                  }
                  size="sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("fieldManagement.details.email", "Email")}
                </span>
                <span className="text-sm font-medium text-primary">
                  {detail?.field_info?.email ||
                    detail?.user?.email ||
                    initialField?.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("fieldManagement.details.contactNumber", "Contact Number")}
                </span>
                <span className="text-sm font-medium text-primary">
                  {detail?.field_info?.contact_number ||
                    detail?.user?.contact_number ||
                    "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("fieldManagement.details.member", "Member Since")}
                </span>
                <span className="text-sm font-medium text-primary">
                  {detail?.field_info?.member ||
                    detail?.user?.member_display ||
                    "N/A"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-8">
              <button
                type="button"
                onClick={handleStatusClick}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-lg text-sm font-medium transition-colors cursor-pointer ${statusActionBtnClass}`}
              >
                {statusActionIcon}
                <span>{statusActionLabel}</span>
              </button>

              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => {
                    if (upgradePlans.length > 0) {
                      setShowUpgradeDropdown(!showUpgradeDropdown)
                    } else if (onUpgradePlan && (detail || initialField)) {
                      onUpgradePlan(detail || initialField!)
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium hover:bg-yellow-500/20 transition-colors cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>
                    {detail?.actions?.upgrade_plan?.label ||
                      t("fieldManagement.actions.upgradePlan", "Upgrade Plan")}
                  </span>
                </button>

                {showUpgradeDropdown && upgradePlans.length > 0 && (
                  <div className="absolute bottom-full mb-2 right-0 w-48 bg-card border border-white/10 rounded-lg shadow-xl z-50 py-1 backdrop-blur-md">
                    {upgradePlans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => {
                          if (onUpgradePlan && (detail || initialField)) {
                            onUpgradePlan(detail || initialField!)
                          }
                          setShowUpgradeDropdown(false)
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer text-left"
                      >
                        <span className="font-medium">{plan.name}</span>
                        <span className="text-xs text-muted-foreground">
                          €{plan.price}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Session History Preview */}
            {detail?.session_history && detail.session_history.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-primary">
                    {t("fieldManagement.details.recentSessions", "Recent Sessions")}
                  </h4>
                  <button
                    onClick={onViewAllSession}
                    className="text-xs text-custom-yellow hover:underline cursor-pointer"
                  >
                    {t("fieldManagement.details.viewAll", "View all")}
                  </button>
                </div>
                <div className="space-y-2">
                  {detail.session_history.slice(0, 3).map((session) => (
                    <div
                      key={session.session_id}
                      className="p-3 rounded-lg bg-muted/40 border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-medium text-primary">
                          {session.session_name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {session.match_date} • {session.start_time} - {session.end_time}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-primary">
                          €{session.amount}
                        </span>
                        <p className="text-[11px] capitalize text-muted-foreground">
                          {session.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
