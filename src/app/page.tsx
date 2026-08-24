"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AnimatedLoading from "@/components/SharedComponents/AnimatedLoading"

export default function Home() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true)
      router.push("/sign-in")
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  return <AnimatedLoading />
}
