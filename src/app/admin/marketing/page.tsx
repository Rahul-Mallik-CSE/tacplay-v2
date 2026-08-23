"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminMarketingPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/marketing/overview")
  }, [router])

  return null
}
