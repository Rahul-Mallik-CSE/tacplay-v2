"use client"

/**
 * ChangePasswordDialog.tsx
 * Modal dialog for changing the field owner's password.
 * Contains current, new, and confirm password fields with validation.
 * Uses local state for demonstration without API integration.
 */

import React, { useState } from "react"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { useChangePasswordMutation } from "@/redux/features/shared/setting/settingAPI"
import { getErrorMessage } from "@/lib/auth"
import type { ChangePasswordDialogProps } from "@/types/DashboardTypes/SettingsTypes"

function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const { t } = useTranslation("dashboard")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [touched, setTouched] = useState(false)
  const [apiError, setApiError] = useState("")

  const [changePasswordMutation, { isLoading: isChanging }] =
    useChangePasswordMutation()

  /** Reset form fields */
  const resetForm = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setTouched(false)
    setApiError("")
    setShowCurrent(false)
    setShowNew(false)
    setShowConfirm(false)
  }

  // Field validation flags
  const isCurrentEmpty = touched && !currentPassword.trim()
  const isNewSameAsCurrent =
    Boolean(newPassword) &&
    Boolean(currentPassword) &&
    newPassword === currentPassword
  const isNewTooShort = Boolean(newPassword) && newPassword.length < 8
  const isConfirmMismatch =
    Boolean(confirmPassword) && newPassword !== confirmPassword

  /** Handle form submission */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched(true)
    setApiError("")

    if (!currentPassword.trim()) {
      return
    }

    if (newPassword.length < 8) {
      return
    }

    if (newPassword === currentPassword) {
      return
    }

    if (newPassword !== confirmPassword) {
      return
    }

    try {
      const res = await changePasswordMutation({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap()

      let successMsg = "Password changed successfully."
      if (res.message && res.message !== "password_changed_successfully") {
        successMsg = res.message
      }

      toast.success(successMsg)
      onOpenChange(false)
      resetForm()
    } catch (err) {
      const formattedError = getErrorMessage(err, "Failed to change password.")
      setApiError(formattedError)
      toast.error(formattedError)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) resetForm()
        onOpenChange(val)
      }}
    >
      <DialogContent
        className="bg-card border border-white/10 max-w-sm"
      >
        <DialogHeader className="items-center">
          <DialogTitle className="text-xl font-bold text-primary">
            {t("changePassword.title", "Change Password")}
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary text-center">
            {t(
              "changePassword.subtitle",
              "Enter your current password and choose a new secure password.",
            )}
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-secondary font-medium">
              {t("changePassword.current", "Current Password")}
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value)
                  if (apiError) setApiError("")
                }}
                placeholder={t("changePassword.placeholderCurrent", "Enter current password")}
                className="w-full px-4 py-2.5 pr-10 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {isCurrentEmpty && (
              <p className="text-xs text-red-500 font-medium">
                Current password is required
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-secondary font-medium">
              {t("changePassword.new", "New Password")}
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  if (apiError) setApiError("")
                }}
                placeholder={t("changePassword.placeholderNew", "Enter new password")}
                className="w-full px-4 py-2.5 pr-10 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {isNewTooShort && (
              <p className="text-xs text-red-500 font-medium">
                {t("changePassword.minLength", "Password must be at least 8 characters long")}
              </p>
            )}
            {isNewSameAsCurrent && (
              <p className="text-xs text-red-500 font-medium">
                New password cannot be the same as current password
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-secondary font-medium">
              {t("changePassword.confirm", "Confirm Password")}
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (apiError) setApiError("")
                }}
                placeholder={t("changePassword.placeholderConfirm", "Confirm new password")}
                className="w-full px-4 py-2.5 pr-10 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {isConfirmMismatch && (
              <p className="text-xs text-red-500 font-medium">
                Confirm password does not match new password
              </p>
            )}
          </div>

          {/* API Error Message */}
          {apiError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-custom-red/10 border border-custom-red/20">
              <AlertCircle className="w-4 h-4 text-custom-red shrink-0" />
              <p className="text-xs text-red-400">{apiError}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isChanging}
            className="cursor-pointer w-full py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors mt-1"
          >
            {isChanging
              ? t("changePassword.changing", "Changing...")
              : t("changePassword.change", "Change Password")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordDialog
