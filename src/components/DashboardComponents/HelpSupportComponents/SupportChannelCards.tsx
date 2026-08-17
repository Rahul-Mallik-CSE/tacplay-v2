"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { Mail, MessageCircle, Phone } from "lucide-react"
import type { SupportChannelCardsProps } from "@/types/DashboardTypes/HelpSupportTypes"

const channelIcons = {
  email: Mail,
  live_chat: MessageCircle,
  phone: Phone,
}

const channelBgColors = {
  email: "bg-red-500/20",
  live_chat: "bg-amber-500/20",
  phone: "bg-blue-500/20",
}

const channelTextColors = {
  email: "text-red-400",
  live_chat: "text-amber-400",
  phone: "text-blue-400",
}

function SupportChannelCards({ channels }: SupportChannelCardsProps) {
  const { t } = useTranslation("dashboard")

  const getChannelLabel = (type: string) => {
    switch (type) {
      case "email":
        return t("helpSupport.channels.email")
      case "live_chat":
        return t("helpSupport.channels.liveChat")
      case "phone":
        return t("helpSupport.channels.phone")
      default:
        return type
    }
  }

  const getChannelValue = (type: string) => {
    switch (type) {
      case "email":
        return t("helpSupport.channels.emailValue")
      case "live_chat":
        return t("helpSupport.channels.liveChatValue")
      case "phone":
        return t("helpSupport.channels.phoneValue")
      default:
        return ""
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {channels.map((channel) => {
        const Icon = channelIcons[channel.type]
        return (
          <div
            key={channel.id}
            className="flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-white/5 bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${channelBgColors[channel.type]}`}
            >
              <Icon className={`w-5 h-5 ${channelTextColors[channel.type]}`} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-primary">
                {getChannelLabel(channel.type)}
              </h3>
              <p className="text-xs text-secondary mt-0.5 truncate">
                {getChannelValue(channel.type)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SupportChannelCards
