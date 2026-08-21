"use client"

import { DollarSign, Mail, MessageSquare, Bell } from "lucide-react"
import { useTranslation } from "react-i18next"

const iconMap: Record<string, React.ReactNode> = {
  dollar: <DollarSign className="w-5 h-5 text-primary" />,
  email: <Mail className="w-5 h-5 text-primary" />,
  sms: <MessageSquare className="w-5 h-5 text-primary" />,
  push: <Bell className="w-5 h-5 text-primary" />,
}

interface StatCard {
  title: string
  value: string | number
  subtitle: string
  change?: string
  icon: string
}

export default function StatsCards() {
  const { t } = useTranslation("dashboard")

  const stats: StatCard[] = [
    { title: t("marketing.totalCampaigns"), value: 18, subtitle: t("marketing.allTime"), icon: "dollar" },
    { title: t("marketing.emailsSent"), value: 1243, subtitle: t("marketing.vsLastMonth"), change: "+18%", icon: "email" },
    { title: t("marketing.smsSent"), value: 9856, subtitle: t("marketing.vsLastMonth"), change: "+18%", icon: "sms" },
    { title: t("marketing.pushSent"), value: 262, subtitle: t("marketing.vsLastMonth"), change: "+18%", icon: "push" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-white/5 rounded-xl p-4 md:p-5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-secondary">{stat.title}</span>
            <span className="p-2 bg-white/5 rounded-lg">{iconMap[stat.icon]}</span>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {stat.change && (
                <span className="text-xs text-green-400">{stat.change}</span>
              )}
              <span className="text-xs text-secondary">{stat.subtitle}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
