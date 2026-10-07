"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { Mail, MessageSquare, Bell, Tag } from "lucide-react"
import type { QuickActionsSection, QuickActionItem } from "@/types/CommonPageTypes/MarketingTypes"

interface QuickActionsProps {
  data?: QuickActionsSection
}

interface ActionConfig {
  key: string
  label: string
  icon: React.ReactNode
  colorClass: string
  href: string
}

export default function QuickActions({ data }: QuickActionsProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const title = data?.title || t("marketing.quickActions", "Quick Actions")

  const resolveActionConfig = (item: QuickActionItem): ActionConfig => {
    const type = (item.campaign_type || item.key || "").toLowerCase()

    if (type.includes("email")) {
      return {
        key: item.key,
        label: item.label || t("marketing.createEmailCampaign", "Create Email Campaign"),
        icon: <Mail className="w-5 h-5 text-blue-400" />,
        colorClass: "bg-blue-500/10",
        href: `${basePath}/marketing/email/create-email`,
      }
    }

    if (type.includes("sms")) {
      return {
        key: item.key,
        label: item.label || t("marketing.createSmsCampaign", "Create SMS Campaign"),
        icon: <MessageSquare className="w-5 h-5 text-green-400" />,
        colorClass: "bg-green-500/10",
        href: `${basePath}/marketing/sms/create-sms`,
      }
    }

    if (type.includes("push")) {
      return {
        key: item.key,
        label: item.label || t("marketing.createPushCampaign", "Create Push Campaign"),
        icon: <Bell className="w-5 h-5 text-purple-400" />,
        colorClass: "bg-purple-500/10",
        href: `${basePath}/marketing/push-notification/create-push`,
      }
    }

    return {
      key: item.key,
      label: item.label || t("marketing.createVoucherDiscount", "Create Voucher/Discount"),
      icon: <Tag className="w-5 h-5 text-orange-400" />,
      colorClass: "bg-orange-500/10",
      href: `${basePath}/marketing/vouchers/create-voucher`,
    }
  }

  // Fallback defaults if no API data supplied
  const defaultItems: QuickActionItem[] = [
    { key: "create_email_campaign", label: "Create Email Campaign", campaign_type: "email", method: "POST", endpoint: "" },
    { key: "create_sms_campaign", label: "Create SMS Campaign", campaign_type: "sms", method: "POST", endpoint: "" },
    { key: "create_push_campaign", label: "Create Push Campaign", campaign_type: "push", method: "POST", endpoint: "" },
    { key: "create_voucher", label: "Create Voucher/Discount", method: "POST", endpoint: "" },
  ]

  const items = data?.items?.length ? data.items : defaultItems

  return (
    <div className="bg-card border border-white/5 rounded-xl p-4 md:p-5 flex flex-col h-[360px]">
      <div className="flex-shrink-0 mb-4">
        <h3 className="text-base md:text-lg font-semibold text-primary">{title}</h3>
      </div>
      <div className="flex-1 overflow-y-auto pr-1 space-y-3">
        {items.map((item, index) => {
          const config = resolveActionConfig(item)
          return (
            <button
              key={config.key || index}
              onClick={() => router.push(config.href)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:bg-white/5 hover:border-white/10 transition-colors cursor-pointer text-left"
            >
              <span className={`p-2.5 rounded-full ${config.colorClass}`}>
                {config.icon}
              </span>
              <span className="text-sm font-medium text-primary">{config.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
