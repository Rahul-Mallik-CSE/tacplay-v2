"use client"

import React, { useRef } from "react"
import { useTranslation } from "react-i18next"
import { Upload, FileImage, CheckCircle } from "lucide-react"
import type { FileUploadProps } from "@/types/DashboardTypes/HelpSupportTypes"

function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
  const { t } = useTranslation("dashboard")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onFileSelect(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0] || null
    onFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-primary">
        {t("helpSupport.submit.attachment")}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-white/20 transition-colors cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <Upload className="w-8 h-8 text-secondary" />
          <div>
            <p className="text-sm text-primary">
              {t("helpSupport.submit.chooseFile")}
            </p>
            <p className="text-xs text-secondary mt-1">
              {t("helpSupport.submit.attachmentDesc")}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              fileInputRef.current?.click()
            }}
            className="px-4 py-2 border border-white/10 rounded-lg text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t("helpSupport.submit.uploadButton")}
          </button>
        </div>
      </div>

      {/* Selected file preview */}
      {selectedFile && (
        <div className="flex items-center gap-3 p-3 bg-muted/50 border border-white/5 rounded-lg">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <FileImage className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-primary truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-secondary">
              {formatFileSize(selectedFile.size)}{" "}
              <span className="text-secondary">•</span>{" "}
              <span className="text-emerald-400">
                {t("helpSupport.submit.uploadComplete")}
              </span>
            </p>
          </div>
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        </div>
      )}
    </div>
  )
}

export default FileUpload
