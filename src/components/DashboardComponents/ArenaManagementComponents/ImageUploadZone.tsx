"use client"

import { useRef } from "react"
import { Upload } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ImageUploadZoneProps {
  isSaving: boolean
  onFileSelect: (files: File[]) => void
}

export default function ImageUploadZone({
  isSaving,
  onFileSelect,
}: ImageUploadZoneProps) {
  const { t } = useTranslation("dashboard")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(Array.from(e.target.files))
    }
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="hidden"
        disabled={isSaving}
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`group/upload border-2 border-dashed border-[#2C2740] hover:border-custom-yellow/40 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 bg-[#0c0c11]/50 hover:bg-[#12121c]/30 flex flex-col items-center justify-center gap-2 ${
          isSaving ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-white/5 group-hover/upload:bg-custom-yellow/10 flex items-center justify-center text-white/60 group-hover/upload:text-custom-yellow transition-all duration-300 shadow-inner">
          <Upload className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-semibold text-white/90 group-hover/upload:text-white transition-colors">
            {t("arena.dragAndDropClick", "Click to select cover photos")}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {t("arena.uploadLimits", "PNG, JPG or JPEG formats up to 10MB")}
          </p>
        </div>
      </div>
    </>
  )
}
