"use client"

/**
 * ManageCoverImagesModal.tsx
 * Dialog/modal for managing cover images. Shows existing images with delete toggles,
 * an upload zone, queued uploads preview, and save/cancel buttons.
 * Manages file state and revokes object URLs on cleanup.
 */

import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import type { ArenaMedia, ManageCoverImagesModalProps } from "@/types/DashboardTypes/ArenaManagementTypes"
import ExistingImagesGrid from "./ExistingImagesGrid"
import ImageUploadZone from "./ImageUploadZone"
import QueuedUploadsGrid from "./QueuedUploadsGrid"

export default function ManageCoverImagesModal({
  isOpen,
  onClose,
  existingMedia = [],
}: ManageCoverImagesModalProps) {
  const { t } = useTranslation("dashboard")
  const [deletedIds, setDeletedIds] = useState<number[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [newPreviews, setNewPreviews] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    return () => { newPreviews.forEach((url) => URL.revokeObjectURL(url)) }
  }, [newPreviews])

  useEffect(() => {
    if (isOpen) { setDeletedIds([]); setNewFiles([]); setNewPreviews([]) }
  }, [isOpen])

  const handleFileSelect = (files: File[]) => {
    const urls = files.map((f) => URL.createObjectURL(f))
    setNewFiles((p) => [...p, ...files])
    setNewPreviews((p) => [...p, ...urls])
  }

  const handleRemoveNewImage = (index: number) => {
    URL.revokeObjectURL(newPreviews[index])
    setNewFiles((p) => p.filter((_, i) => i !== index))
    setNewPreviews((p) => p.filter((_, i) => i !== index))
  }

  const toggleDeleteExisting = (id: number) => {
    setDeletedIds((p) => (p.includes(id) ? p.filter((i) => i !== id) : [...p, id]))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((r) => setTimeout(r, 1000))
      toast.success(t("arena.coverImagesUpdated", "Cover images updated successfully."))
      onClose()
    } catch {
      toast.error(t("arena.coverImagesUpdateFailed", "Failed to update cover images."))
    } finally {
      setIsSaving(false)
    }
  }

  const hasChanges = deletedIds.length > 0 || newFiles.length > 0

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSaving && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-[#0b0b0f] border border-[#2C2740] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0 rounded-2xl shadow-2xl"
      >
        <div className="relative px-6 pt-6 pb-4 border-b border-[#2C2740]">
          <DialogClose asChild disabled={isSaving}>
            <button
              onClick={onClose}
              disabled={isSaving}
              className="cursor-pointer absolute top-4 right-4 flex items-center gap-1.5 text-[#9a98b8] hover:text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("common.cancel", "Cancel")}
              <span className="w-6 h-6 rounded-full border border-[#2C2740] flex items-center justify-center">
                <X size={12} />
              </span>
            </button>
          </DialogClose>
          <DialogTitle asChild>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
              {t("arena.manageCoverImagesTitle", "Manage Cover Images")}
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <p className="text-[#9a98b8] text-xs sm:text-sm max-w-md">
              {t("arena.manageCoverImagesDesc", "Add new photos or remove existing ones from your cover slider.")}
            </p>
          </DialogDescription>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/80">
              {t("arena.currentImages", "Current Slider Images")} ({existingMedia.length})
            </h3>
            <ExistingImagesGrid
              media={existingMedia}
              deletedIds={deletedIds}
              isSaving={isSaving}
              onToggleDelete={toggleDeleteExisting}
            />
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-semibold text-white/80">
              {t("arena.uploadNewImages", "Add New Images")}
            </h3>
            <ImageUploadZone isSaving={isSaving} onFileSelect={handleFileSelect} />
            <QueuedUploadsGrid previews={newPreviews} isSaving={isSaving} onRemove={handleRemoveNewImage} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#2C2740] bg-[#0c0c11]/80">
          <DialogClose asChild disabled={isSaving}>
            <Button variant="outline" disabled={isSaving} className="h-10 text-xs sm:text-sm px-4 bg-transparent border-[#2C2740] text-white hover:bg-white/5">
              {t("common.cancel", "Cancel")}
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className="h-10 text-xs sm:text-sm px-5 bg-custom-yellow text-black font-semibold hover:bg-custom-yellow/95 transition-all shadow-md shadow-custom-yellow/10 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {t("common.saving", "Saving...")}
              </>
            ) : (
              t("common.saveChanges", "Save Changes")
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
