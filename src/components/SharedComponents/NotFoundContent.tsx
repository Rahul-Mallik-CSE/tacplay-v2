"use client"

import { useTranslation } from "react-i18next"
import Link from "next/link"

export default function NotFoundContent() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[160px] font-bold text-custom-red/20 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-20 h-20 sm:w-24 sm:h-24 text-custom-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
          {t("error.pageNotFound")}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-sm mx-auto">
          {t("error.notFoundDesc")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-custom-red text-white rounded-lg text-sm font-semibold hover:bg-custom-red/90 transition-colors text-center"
          >
            {t("error.goHome")}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 bg-muted border border-white/10 text-primary rounded-lg text-sm font-semibold hover:bg-muted/80 transition-colors cursor-pointer"
          >
            {t("error.goBack")}
          </button>
        </div>
      </div>
    </div>
  )
}
