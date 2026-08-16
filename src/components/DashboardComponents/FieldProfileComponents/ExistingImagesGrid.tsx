"use client"

import { Trash2, RotateCcw } from "lucide-react"
import { useTranslation } from "react-i18next"
import Image from "next/image"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import type { ArenaMedia } from "@/types/DashboardTypes/ArenaManagementTypes"

interface ExistingImagesGridProps {
  media: ArenaMedia[]
  deletedIds: number[]
  isSaving: boolean
  onToggleDelete: (id: number) => void
}

export default function ExistingImagesGrid({
  media,
  deletedIds,
  isSaving,
  onToggleDelete,
}: ExistingImagesGridProps) {
  const { t } = useTranslation("dashboard")

  if (media.length === 0) {
    return (
      <div className="text-center py-6 border border-dashed border-[#2C2740] rounded-xl text-muted-foreground text-xs">
        {t("arena.noExistingImages", "No custom cover images uploaded yet.")}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {media.map((mediaItem) => {
        const isMarkedForDelete = deletedIds.includes(mediaItem.id)
        const absoluteUrl = toAbsoluteMediaUrl(mediaItem.file_url)

        return (
          <div
            key={mediaItem.id}
            className={`relative aspect-video rounded-lg overflow-hidden border transition-all duration-300 ${
              isMarkedForDelete
                ? "border-destructive scale-98 brightness-75"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            <Image
              src={absoluteUrl || ""}
              alt="Arena Cover"
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className={`object-cover transition-all duration-300 ${
                isMarkedForDelete ? "blur-[2px]" : ""
              }`}
            />

            {mediaItem.is_primary && !isMarkedForDelete && (
              <div className="absolute top-2 left-2 bg-custom-yellow/90 backdrop-blur-xs text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                {t("arena.primaryImage", "Primary")}
              </div>
            )}

            {isMarkedForDelete && (
              <div className="absolute inset-0 bg-destructive/40 flex flex-col items-center justify-center text-white p-2 z-10">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-black/60 px-2 py-1 rounded">
                  {t("arena.markedForDeletion", "To Delete")}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => onToggleDelete(mediaItem.id)}
              disabled={isSaving}
              className={`absolute top-2 right-2 p-1.5 rounded-md backdrop-blur-md transition-all shadow-md cursor-pointer border z-10 ${
                isMarkedForDelete
                  ? "bg-emerald-500/80 border-emerald-400 text-white hover:bg-emerald-600"
                  : "bg-black/50 border-white/10 text-[#d1cfe8] hover:text-white hover:bg-red-500/80 hover:border-red-400"
              }`}
              title={
                isMarkedForDelete
                  ? t("arena.undoDelete", "Undo Delete")
                  : t("arena.deleteImage", "Delete Image")
              }
            >
              {isMarkedForDelete ? (
                <RotateCcw className="w-3.5 h-3.5" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
