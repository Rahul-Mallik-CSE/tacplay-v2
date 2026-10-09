"use client"

import { useTranslation } from "react-i18next"
import { AlertTriangle, CheckCircle, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import type {
  FieldActionDropdownProps,
  FieldOwnerStatusAction,
} from "@/types/AdminTypes/FieldManagementTypes"

export default function FieldActionDropdown({
  field,
  onViewDetails,
  onStatusAction,
}: FieldActionDropdownProps) {
  const { t } = useTranslation("dashboard")
  const statusStr =
    typeof field?.status === "string"
      ? field.status
      : typeof field?.status === "object" && field?.status !== null
      ? ((field.status as Record<string, unknown>).value as string) ||
        ((field.status as Record<string, unknown>).label as string) ||
        ""
      : String(field?.status || "")

  const status = statusStr.toLowerCase()

  let actionKey: FieldOwnerStatusAction = "suspend"
  let actionLabel = t("fieldManagement.actions.suspendField", "Suspend Field")
  let actionIcon = <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
  let actionClass = "text-yellow-400"

  if (status === "pending") {
    actionKey = "approve"
    actionLabel = t("fieldManagement.actions.approveField", "Approve Field")
    actionIcon = <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
    actionClass = "text-emerald-400"
  } else if (status === "suspended") {
    actionKey = "activate"
    actionLabel = t("fieldManagement.actions.activateField", "Activate Field")
    actionIcon = <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
    actionClass = "text-emerald-400"
  } else {
    actionKey = "suspend"
    actionLabel = t("fieldManagement.actions.suspendField", "Suspend Field")
    actionIcon = <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
    actionClass = "text-yellow-400"
  }

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation()
    onStatusAction(field, actionKey)
  }

  const handleDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    onViewDetails(field)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center text-muted-foreground hover:text-primary outline-none"
          aria-label="Field Actions"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="w-48 bg-card border border-white/10 rounded-lg shadow-xl z-50 py-1 backdrop-blur-md"
      >
        <DropdownMenuItem
          onClick={handleAction}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 text-sm ${actionClass} cursor-pointer focus:bg-white/5 outline-none`}
        >
          {actionIcon}
          <span>{actionLabel}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDetails}
          className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-primary cursor-pointer focus:bg-white/5 outline-none"
        >
          <Eye className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{t("fieldManagement.actions.viewDetails", "View Details")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
