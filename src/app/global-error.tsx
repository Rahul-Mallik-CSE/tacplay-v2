"use client"

import ErrorContent from "@/components/SharedComponents/ErrorContent"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorContent error={error} reset={reset} />
}
