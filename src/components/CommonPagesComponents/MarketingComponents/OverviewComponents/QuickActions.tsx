"use client"

import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { Mail, MessageSquare, Bell, Tag } from "lucide-react"
import { mockQuickActions } from "@/mock-data/DashboardMockData/marketing-mock-data"

const iconMap: Record<string, React.ReactNode> = {
  email: <Mail className="w-5 h-5 text-blue-400" />,
  sms: <MessageSquare className="w-5 h-5 text-green-400" />,
  push: <Bell className="w-5 h-5 text-purple-400" />,
  voucher: <Tag className="w-5 h-5 text-orange-400" />,
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10",
  green: "bg-green-500/10",
  purple: "bg-purple-500/10",
  orange: "bg-orange-500/10",
}

export default function QuickActions() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  return (
    <div className="bg-card border border-white/5 rounded-xl p-4 md:p-5">
      <h3 className="text-base md:text-lg font-semibold text-primary mb-4">
        {t("marketing.quickActions")}
      </h3>
      <div className="space-y-3">
        {mockQuickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => router.push(action.href)}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className={`p-2.5 rounded-full ${colorMap[action.color]}`}>
              {iconMap[action.icon]}
            </span>
            <span className="text-sm font-medium text-primary">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
