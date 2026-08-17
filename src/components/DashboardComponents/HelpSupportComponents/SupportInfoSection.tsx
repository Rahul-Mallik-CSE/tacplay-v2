"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { Clock, CalendarClock, Crown, Users } from "lucide-react"
import type { SupportInfoSectionProps } from "@/types/DashboardTypes/HelpSupportTypes"

const infoIcons = {
  clock: Clock,
  hours: CalendarClock,
  priority: Crown,
  escalation: Users,
}

const infoIconBgColors = {
  clock: "bg-red-500/20",
  hours: "bg-red-500/20",
  priority: "bg-red-500/20",
  escalation: "bg-red-500/20",
}

const infoIconTextColors = {
  clock: "text-red-400",
  hours: "text-red-400",
  priority: "text-red-400",
  escalation: "text-red-400",
}

function SupportInfoSection({ items }: SupportInfoSectionProps) {
  const { t } = useTranslation("dashboard")

  const getInfoTitle = (icon: string) => {
    switch (icon) {
      case "clock":
        return t("helpSupport.info.responseTime")
      case "hours":
        return t("helpSupport.info.supportHours")
      case "priority":
        return t("helpSupport.info.prioritySupport")
      case "escalation":
        return t("helpSupport.info.escalationProcess")
      default:
        return ""
    }
  }

  const getInfoDescription = (icon: string) => {
    switch (icon) {
      case "clock":
        return t("helpSupport.info.responseTimeDesc")
      case "hours":
        return t("helpSupport.info.supportHoursDesc")
      case "priority":
        return t("helpSupport.info.prioritySupportDesc")
      case "escalation":
        return t("helpSupport.info.escalationProcessDesc")
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">
        {t("helpSupport.supportInfo")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const Icon = infoIcons[item.icon as keyof typeof infoIcons]
          return (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl border border-white/5 bg-muted/30"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${infoIconBgColors[item.icon as keyof typeof infoIconBgColors]} mb-3`}
              >
                {Icon && (
                  <Icon
                    className={`w-5 h-5 ${infoIconTextColors[item.icon as keyof typeof infoIconTextColors]}`}
                  />
                )}
              </div>
              <h3 className="text-sm font-semibold text-primary mb-1">
                {getInfoTitle(item.icon)}
              </h3>
              <p className="text-xs text-secondary whitespace-pre-line">
                {getInfoDescription(item.icon)}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SupportInfoSection
