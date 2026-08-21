"use client"

import Image from "next/image"
import { MoreVertical } from "lucide-react"
import type { ChatHeaderProps } from "@/types/DashboardTypes/ChatTypes"

export default function ChatHeader({ user }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={user.avatar}
              alt={user.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          {user.is_online && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-background" />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-primary">{user.name}</h3>
          <p className="text-xs text-secondary">{user.status}</p>
        </div>
      </div>
      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
        <MoreVertical className="w-5 h-5 text-secondary" />
      </button>
    </div>
  )
}
