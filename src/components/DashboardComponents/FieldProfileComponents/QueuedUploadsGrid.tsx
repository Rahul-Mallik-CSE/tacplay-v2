"use client"

import { X } from "lucide-react"
import { useTranslation } from "react-i18next"
import Image from "next/image"

interface QueuedUploadsGridProps {
  previews: string[]
  isSaving: boolean
  onRemove: (index: number) => void
}

export default function QueuedUploadsGrid({
  previews,
  isSaving,
  onRemove,
}: QueuedUploadsGridProps) {
  const { t } = useTranslation("dashboard")

  if (previews.length === 0) return null

  return (
    <div className="space-y-2 pt-2">
      <h4 className="text-xs font-semibold text-white/60">
        {t("arena.queuedUploads", "Queued for upload")} ({previews.length})
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {previews.map((preview, index) => (
          <div
            key={preview + index}
            className="relative aspect-video rounded-lg overflow-hidden border border-custom-yellow/20 bg-black/40 group/queued shadow-md"
          >
            <Image
              src={preview}
              alt="Queued Preview"
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute top-2 left-2 bg-emerald-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm uppercase tracking-wider z-10">
              {t("arena.newBadge", "New")}
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              disabled={isSaving}
              className="absolute top-2 right-2 p-1.5 rounded-md bg-black/60 border border-white/10 text-white/80 hover:text-white hover:bg-red-500/80 hover:border-red-400 backdrop-blur-md transition-all shadow-md cursor-pointer disabled:opacity-50 z-10"
              title={t("arena.removeNewImage", "Remove from upload list")}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
