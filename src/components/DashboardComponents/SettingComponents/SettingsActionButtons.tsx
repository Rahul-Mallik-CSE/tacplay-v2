"use client"

/**
 * SettingsActionButtons.tsx
 * Action buttons for settings page - Password Change and Edit Profile.
 * Styled with appropriate hover and transition effects.
 */

import React from "react"
import { Pen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import type { SettingsActionButtonsProps } from "@/types/DashboardTypes/SettingsTypes"

function SettingsActionButtons({
  onPasswordChange,
  onEditProfile,
}: SettingsActionButtonsProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        onClick={onPasswordChange}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border bg-transparent border-white/10 text-sm text-primary font-medium hover:bg-white/5 transition-colors cursor-pointer"
      >
        {t("settingsPage.passwordChange")}
      </Button>
      <Button
        onClick={onEditProfile}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg cursor-pointer"
      >
        <Pen className="w-4 h-4" />
        {t("settingsPage.editProfile")}
      </Button>
    </div>
  )
}

export default SettingsActionButtons
