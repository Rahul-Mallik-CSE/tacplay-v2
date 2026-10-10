"use client"

import React from "react"
import { Sparkles, Shield, Zap, Award } from "lucide-react"
import type { SubscriptionPlanBadgeProps } from "@/types/AdminTypes/SubscriptionManagementTypes"

function getPlanDetails(plan: string) {
  const p = (plan || "").toLowerCase()
  if (p.includes("gold")) {
    return {
      colors: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      icon: <Award className="w-3 h-3 text-amber-400 shrink-0" />,
    }
  }
  if (p.includes("silver")) {
    return {
      colors: "bg-slate-400/15 text-slate-300 border-slate-400/30",
      icon: <Shield className="w-3 h-3 text-slate-300 shrink-0" />,
    }
  }
  if (p.includes("bronze")) {
    return {
      colors: "bg-orange-700/15 text-orange-400 border-orange-700/30",
      icon: <Shield className="w-3 h-3 text-orange-400 shrink-0" />,
    }
  }
  if (p.includes("premium")) {
    return {
      colors: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      icon: <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />,
    }
  }
  return {
    colors: "bg-secondary/20 text-secondary border-secondary/30",
    icon: <Zap className="w-3 h-3 text-secondary shrink-0" />,
  }
}

function SubscriptionPlanBadge({
  plan,
  size = "md",
}: SubscriptionPlanBadgeProps) {
  const { colors, icon } = getPlanDetails(plan)
  const sizeClasses =
    size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-xs"

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${sizeClasses} font-medium rounded-full border ${colors}`}
    >
      {icon}
      <span>{plan}</span>
    </span>
  )
}

export default SubscriptionPlanBadge
