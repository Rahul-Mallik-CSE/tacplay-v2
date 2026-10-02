"use client"

/**
 * SettingsContainer.tsx
 * Main container component for the Settings page.
 * Manages dialog state and renders profile card with read-only fields.
 * Uses mock data for demonstration without API integration.
 */

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import SettingsProfileAvatar from "./SettingsProfileAvatar"
import SettingsProfileField from "./SettingsProfileField"
import SettingsActionButtons from "./SettingsActionButtons"
import SettingsLoading from "./SettingsLoading"
import EditAccountDialog from "./EditAccountDialog"
import ChangePasswordDialog from "./ChangePasswordDialog"
import { useGetProfileQuery } from "@/redux/features/shared/setting/settingAPI"
import { Button } from "@/components/ui/button"

function SettingsContainer() {
  const { t } = useTranslation("dashboard")

  // Local state for dialogs and UI
  const [editOpen, setEditOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Fetch real profile data from backend API
  const { data, isLoading, isError, refetch } = useGetProfileQuery()
  const profile = data?.data

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            {t("settingsPage.title", "Settings")}
          </h1>
          <p className="text-sm text-secondary mt-1">
            {t("settingsPage.subtitle", "Manage your account settings and profile details.")}
          </p>
        </div>
        <div className="rounded-xl border border-white/5 bg-card p-5 sm:p-6">
          <SettingsLoading />
        </div>
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            {t("settingsPage.title", "Settings")}
          </h1>
        </div>
        <div className="rounded-xl border border-white/5 bg-card p-6 text-center space-y-4">
          <p className="text-sm text-destructive">
            {t("settingsPage.loadFailed", "Failed to load profile. Please try again.")}
          </p>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          {t("settingsPage.title")}
        </h1>
        <p className="text-sm text-secondary mt-1">
          {t("settingsPage.subtitle")}
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl border border-white/5 bg-card p-5 sm:p-6 space-y-8">
        {/* Avatar & Name */}
        <div className="flex items-center gap-4">
          <SettingsProfileAvatar
            imageUrl={profile.profile_image}
            fullName={profile.full_name}
          />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-primary">
              {profile.full_name || "-"}
            </h2>
            <p className="text-sm text-secondary">
              {t("settingsPage.arenaOwner")}
            </p>
          </div>
        </div>



        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-5">
            {t("settingsPage.personalInfo")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <SettingsProfileField
              label={t("settingsPage.fullName")}
              value={profile.full_name}
              type="text"
            />

            {/* Email Address */}
            <SettingsProfileField
              label={t("settingsPage.email")}
              value={profile.email_address}
              type="email"
            />

            {/* Password */}
            <SettingsProfileField
              label={t("settingsPage.password")}
              value={profile.password || "••••••••"}
              type="password"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {/* Contact Number */}
            <SettingsProfileField
              label={t("settingsPage.contactNumber")}
              value={profile.contact_number}
              type="number"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <SettingsActionButtons
          onPasswordChange={() => setPasswordOpen(true)}
          onEditProfile={() => setEditOpen(true)}
        />
      </div>

      {/* Dialogs */}
      <EditAccountDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        profile={profile}
      />
      <ChangePasswordDialog
        open={passwordOpen}
        onOpenChange={setPasswordOpen}
      />
    </div>
  )
}

export default SettingsContainer
