"use client"

/**
 * EditAccountDialog.tsx
 * Modal dialog for editing the field owner's profile.
 * Allows changing full name, contact number, and profile image.
 * Uses local state for demonstration without API integration.
 */

import React, { useEffect, useMemo, useRef, useState } from "react"
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
import SettingsProfileAvatar from "./SettingsProfileAvatar"
import type { EditAccountDialogProps } from "@/types/DashboardTypes/SettingsTypes"

function EditAccountDialog({
  open,
  onOpenChange,
  profile,
}: EditAccountDialogProps) {
  const { t } = useTranslation("dashboard")
  const [fullName, setFullName] = useState(() => profile?.full_name || "")
  const [contactNumber, setContactNumber] = useState(
    () => profile?.contact_number || "",
  )
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)

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
      setFullName(profile.full_name)
      setContactNumber(profile.contact_number)
    }
  }, [profile])

  const displayImage = previewImageUrl || profile?.profile_image

  /** Handle form submission */
  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error(t("editAccount.fullNameRequired"))
      return
    }

    if (!contactNumber.trim()) {
      toast.error(t("editAccount.contactRequired"))
      return
    }

    setIsSaving(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success(t("editAccount.updated"))
      onOpenChange(false)
    } catch {
      toast.error(t("editAccount.updateFailed"))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
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
            <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden">
              {displayImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={displayImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <SettingsProfileAvatar
                  imageUrl={null}
                  fullName={fullName || profile?.full_name || "U"}
                  size="lg"
                />
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
              onChange={(event) =>
                setSelectedImage(event.target.files?.[0] ?? null)
              }
            />
          </div>

          {/* Full Name */}
          <div className="w-full space-y-2">
            <label className="text-sm text-secondary">
              {t("editAccount.fullName")}
            </label>
            <input
              type="text"
              value={fullName}
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
              value={contactNumber}
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
