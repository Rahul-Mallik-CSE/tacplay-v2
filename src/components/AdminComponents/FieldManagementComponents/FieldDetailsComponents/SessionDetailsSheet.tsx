"use client"

import { useTranslation } from "react-i18next"
import { ArrowLeft } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import SessionStatusBadge from "./SessionStatusBadge"
import type { SessionDetailsSheetProps } from "@/types/AdminTypes/FieldManagementTypes"

export default function SessionDetailsSheet({
  session,
  open,
  onOpenChange,
}: SessionDetailsSheetProps) {
  const { t } = useTranslation("dashboard")

  if (!session) return null

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
            <div>
              <SheetTitle className="text-lg md:text-xl font-bold text-primary">
                {t("fieldManagement.sessionDetails.title")}
              </SheetTitle>
              <SheetDescription className="text-muted-foreground text-sm mt-1">
                {t("fieldManagement.sessionDetails.subtitle")}
              </SheetDescription>
            </div>
            <SessionStatusBadge status={session.status} size="md" />
          </div>
        </SheetHeader>

        <div className="p-6">
          <h3 className="text-lg font-bold text-primary mb-4">
            {t("fieldManagement.sessionDetails.fieldInfo")}
          </h3>
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.fieldId")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.fieldInfo.fieldId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.fieldName")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.fieldInfo.fieldName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.location")}
              </span>
              <span className="text-sm font-medium text-primary text-right max-w-[60%]">
                {session.fieldInfo.location}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.contactNumber")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.fieldInfo.contactNumber}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-primary mb-4">
            {t("fieldManagement.sessionDetails.sessionInfo")}
          </h3>
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.sessionId")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.sessionInfo.sessionId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.sessionName")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.sessionInfo.sessionName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.matchType")}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${session.sessionInfo.matchTypeColor}`}
                />
                <span className="text-sm font-medium text-primary">
                  {session.sessionInfo.matchType}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.sessionDate")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.sessionInfo.sessionDate}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.time")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.sessionInfo.time}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.sessionType")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.sessionInfo.sessionType}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.team")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.sessionInfo.team}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.playerPerTeam")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.sessionInfo.playerPerTeam}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.packages")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.sessionInfo.packages}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-primary mb-4">
            {t("fieldManagement.sessionDetails.teamInfo")}
          </h3>
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.teamAName")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.teamInfo.teamAName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.teamAScore")}
              </span>
              <span className="text-sm font-medium text-emerald-400">
                +{session.teamInfo.teamAScore}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.teamBName")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.teamInfo.teamBName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.teamBScore")}
              </span>
              <span className="text-sm font-medium text-red-400">
                {session.teamInfo.teamBScore}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("fieldManagement.sessionDetails.champion")}
              </span>
              <span className="text-sm font-medium text-primary">
                {session.teamInfo.champion}
              </span>
            </div>
          </div>

          <button className="w-full px-4 py-3 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/90 transition-colors cursor-pointer">
            {t("fieldManagement.sessionDetails.submitFinalResult")}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
