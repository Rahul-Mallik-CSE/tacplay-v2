"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Mail,
  Building2,
  User,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  Globe,
  Receipt,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import SubscriptionStatusBadge from "./SubscriptionStatusBadge"
import SubscriptionTypeBadge from "./SubscriptionTypeBadge"
import SubscriptionPlanBadge from "./SubscriptionPlanBadge"
import SubscriptionCountryFlag from "./SubscriptionCountryFlag"
import type { SubscriptionDetailsSheetProps } from "@/types/AdminTypes/SubscriptionManagementTypes"

export default function SubscriptionDetailsSheet({
  subscription,
  open,
  onOpenChange,
}: SubscriptionDetailsSheetProps) {
  const { t } = useTranslation("dashboard")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  if (!subscription) return null

  const handleCopy = (text: string, key: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "N/A"
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr
      return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateStr
    }
  }

  const currencySymbol =
    subscription.amount?.currency === "EUR"
      ? "€"
      : subscription.amount?.currency
      ? `${subscription.amount.currency} `
      : "€"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-white/10 p-0 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b border-white/10 sticky top-0 bg-card/95 backdrop-blur-md z-10">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer p-1.5 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-primary"
              aria-label="Close"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <SubscriptionStatusBadge
              status={subscription.status?.display || subscription.status?.value}
              size="sm"
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl sm:text-2xl font-bold text-primary truncate">
                {subscription.subscriber?.name || "Subscription Details"}
              </SheetTitle>
              <SheetDescription className="flex items-center gap-2 mt-1 text-muted-foreground text-xs sm:text-sm">
                <span>ID: {subscription.subscriber?.display_id || `#SUB-${subscription.subscription_id}`}</span>
                <span>•</span>
                <span>Ref #{subscription.subscription_id}</span>
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Subscriber Card */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-lg flex items-center justify-center shrink-0">
                {(subscription.subscriber?.name || "S").charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-primary truncate">
                    {subscription.subscriber?.name}
                  </h3>
                  <SubscriptionTypeBadge
                    type={subscription.type?.display || subscription.type?.value}
                    size="sm"
                  />
                </div>
                {subscription.subscriber?.owner_name && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Owner: <span className="text-primary/90 font-medium">{subscription.subscriber.owner_name}</span>
                  </p>
                )}
                {subscription.subscriber?.email && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{subscription.subscriber.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
              <span className="text-muted-foreground">Country & Region</span>
              <div className="flex items-center gap-1.5">
                <SubscriptionCountryFlag
                  countryCode={subscription.country?.code || ""}
                  countryName={subscription.country?.name}
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                <span>Amount</span>
              </div>
              <p className="text-lg font-bold text-primary">
                {currencySymbol}
                {subscription.amount?.value || "0.00"}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {subscription.billing_cycle?.display || "Recurring"}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Current Plan</span>
              </div>
              <div className="mt-1">
                <SubscriptionPlanBadge
                  plan={subscription.plan?.display_name || subscription.plan?.name}
                  size="sm"
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 truncate">
                {subscription.plan?.name}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                <span>Auto Renew</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    subscription.auto_renew ? "bg-emerald-400" : "bg-muted-foreground"
                  }`}
                />
                <span className="text-sm font-semibold text-primary">
                  {subscription.auto_renew ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Next Billing</span>
              </div>
              <p className="text-xs font-semibold text-primary mt-1 line-clamp-1">
                {subscription.next_billing_date
                  ? formatDate(subscription.next_billing_date)
                  : "Not Scheduled"}
              </p>
            </div>
          </div>

          {/* Plan Information Card */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary pb-2 border-b border-white/5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Plan Details</span>
            </div>

            <div className="grid grid-cols-2 gap-y-2.5 text-xs">
              <div className="text-muted-foreground">Plan Name</div>
              <div className="text-right text-primary font-medium">
                {subscription.plan?.name || "N/A"}
              </div>

              <div className="text-muted-foreground">Plan Code</div>
              <div className="text-right text-primary font-mono text-[11px]">
                {subscription.plan?.code || "N/A"}
              </div>

              <div className="text-muted-foreground">Billing Cycle</div>
              <div className="text-right text-primary font-medium capitalize">
                {subscription.plan?.billing_cycle || subscription.billing_cycle?.display || "N/A"}
              </div>

              <div className="text-muted-foreground">Standard Price</div>
              <div className="text-right text-primary font-medium">
                {subscription.plan?.currency === "EUR" ? "€" : subscription.plan?.currency || ""}{" "}
                {subscription.plan?.price || "0.00"}
              </div>

              <div className="text-muted-foreground">Tier Type</div>
              <div className="text-right text-primary font-medium">
                {subscription.plan?.is_premium ? (
                  <span className="text-emerald-400 font-semibold">Premium Tier</span>
                ) : (
                  <span>Standard Tier</span>
                )}
              </div>
            </div>
          </div>

          {/* Timeline & Schedule */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary pb-2 border-b border-white/5">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Subscription Timeline</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Started On</span>
                <span className="text-primary font-medium">
                  {formatDate(subscription.started_at)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span className="text-primary font-medium">
                  {formatDate(subscription.next_billing_date)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Expires On</span>
                <span className="text-primary font-medium">
                  {formatDate(subscription.expires_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment & Reference */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary pb-2 border-b border-white/5">
              <Receipt className="w-4 h-4 text-purple-400" />
              <span>Payment Details</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Currency</span>
                <span className="text-primary font-medium">
                  {subscription.amount?.currency || "EUR"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Charged</span>
                <span className="text-primary font-semibold text-sm">
                  {currencySymbol}
                  {subscription.amount?.value || "0.00"}
                </span>
              </div>

              {subscription.payment_reference && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-muted-foreground block mb-1">Payment Reference</span>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/10">
                    <span className="text-xs font-mono text-primary truncate max-w-[280px]">
                      {subscription.payment_reference}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(subscription.payment_reference || "", "reference")
                      }
                      className="cursor-pointer p-1 hover:bg-white/10 rounded text-muted-foreground hover:text-primary transition-colors"
                      title="Copy Reference"
                    >
                      {copiedKey === "reference" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
