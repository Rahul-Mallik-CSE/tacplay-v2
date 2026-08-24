"use client"

import { useTranslation } from "react-i18next"

interface ErrorContentProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorContent({ error, reset }: ErrorContentProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[160px] font-bold text-custom-red/20 leading-none select-none">
            500
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
          {t("error.somethingWentWrong")}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-sm mx-auto">
          {t("error.errorDesc")}
        </p>

        {error?.digest && (
          <p className="text-xs text-muted-foreground/50 mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="w-full sm:w-auto px-6 py-3 bg-custom-red text-white rounded-lg text-sm font-semibold hover:bg-custom-red/90 transition-colors cursor-pointer"
          >
            {t("error.tryAgain")}
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full sm:w-auto px-6 py-3 bg-muted border border-white/10 text-primary rounded-lg text-sm font-semibold hover:bg-muted/80 transition-colors cursor-pointer"
          >
            {t("error.goHome")}
          </button>
        </div>
      </div>
    </div>
  )
}
