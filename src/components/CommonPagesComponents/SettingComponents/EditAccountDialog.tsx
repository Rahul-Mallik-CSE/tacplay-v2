"use client"

/**
 * EditAccountDialog.tsx
 * Modal dialog for editing the field owner's profile.
 * Allows changing full name, contact number, and profile image.
 * Uses local state for demonstration without API integration.
 */

import React, { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Camera } from "lucide-react"
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
import { getInitials } from "./SettingsProfileAvatar"
import type { EditAccountDialogProps } from "@/types/CommonPageTypes/SettingsTypes"

import { useUpdateProfileMutation } from "@/redux/features/shared/setting/settingAPI"
import { getErrorMessage } from "@/lib/auth"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import { useAppDispatch } from "@/redux/hooks"
import { updateAuthUser } from "@/redux/features/auth/authSlice"

function EditAccountDialog({
  open,
  onOpenChange,
  profile,
}: EditAccountDialogProps) {
  const { t } = useTranslation("dashboard")
  const dispatch = useAppDispatch()
  const [fullName, setFullName] = useState(() => profile?.full_name || "")
  const [contactNumber, setContactNumber] = useState(
    () => profile?.contact_number || "",
  )
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageError, setImageError] = useState(false)
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation()

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Create preview URL for selected image
  const previewImageUrl = useMemo(() => {
    if (!selectedImage) return null
    return URL.createObjectURL(selectedImage)
  }, [selectedImage])

  // Cleanup preview URL on unmount
  useEffect(
    () => () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl)
      }
    },
    [previewImageUrl],
  )

  // Reset form when profile changes
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "")
      setContactNumber(profile.contact_number || "")
    }
  }, [profile])

  const displayUrl = previewImageUrl || toAbsoluteMediaUrl(profile?.profile_image)

  useEffect(() => {
    setImageError(false)
  }, [displayUrl])

  /** Handle form submission */
  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error(t("editAccount.fullNameRequired", "Full name is required"))
      return
    }

    if (!contactNumber.trim()) {
      toast.error(t("editAccount.contactRequired", "Contact number is required"))
      return
    }

    try {
      const formData = new FormData()
      formData.append("full_name", fullName.trim())
      formData.append("contact_number", contactNumber.trim())
      if (selectedImage) {
        formData.append("profile_image", selectedImage)
      }

      const res = await updateProfile(formData).unwrap()

      if (res?.data) {
        dispatch(
          updateAuthUser({
            full_name: res.data.full_name,
            email: res.data.email_address,
            profile_image: res.data.profile_image,
          }),
        )
      } else {
        dispatch(
          updateAuthUser({
            full_name: fullName.trim(),
          }),
        )
      }

      toast.success(res.message || t("editAccount.updated", "Profile updated successfully"))
      onOpenChange(false)
      setSelectedImage(null)
    } catch (error) {
      toast.error(getErrorMessage(error, t("editAccount.updateFailed", "Failed to update profile")))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border border-white/10 max-w-sm"
      >
        <DialogHeader className="items-center">
          <DialogTitle className="text-xl font-bold text-primary">
            {t("editAccount.title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary">
            {t("editAccount.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5 mt-2">
          {/* Avatar Upload */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden relative">
              {displayUrl && !imageError ? (
                <Image
                  src={displayUrl}
                  alt={fullName || profile?.full_name || "Profile"}
                  fill
                  unoptimized
                  onError={() => setImageError(true)}
                  className="object-cover rounded-full"
                />
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {getInitials(fullName || profile?.full_name || "U")}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer absolute bottom-0 right-0 w-8 h-8 rounded-full bg-custom-red text-white flex items-center justify-center shadow-lg hover:bg-custom-red/80 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null
                setSelectedImage(file)
                setImageError(false)
              }}
            />
          </div>

          {/* Full Name */}
          <div className="w-full space-y-2">
            <label className="text-sm text-secondary">
              {t("editAccount.fullName")}
            </label>
            <input
              type="text"
              value={fullName ?? ""}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
            />
          </div>

          {/* Contact Number */}
          <div className="w-full space-y-2">
            <label className="text-sm text-secondary">
              {t("editAccount.contactNumber")}
            </label>
            <input
              type="number"
              value={contactNumber ?? ""}
              onChange={(event) => setContactNumber(event.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="cursor-pointer w-full py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors"
          >
            {isSaving
              ? t("editAccount.saving")
              : t("editAccount.saveChanges")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditAccountDialog
