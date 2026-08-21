"use client"

import Image from "next/image"
import type { ChatItemProps } from "@/types/DashboardTypes/ChatTypes"

export default function ChatItem({ conversation, isActive, onClick }: ChatItemProps) {

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer text-left ${
        isActive
          ? "bg-white/10 border border-white/10"
          : "hover:bg-white/5 border border-transparent"
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={conversation.avatar}
            alt={conversation.name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        {conversation.is_online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary truncate">
            {conversation.name}
          </span>
          <span className="text-xs text-secondary flex-shrink-0 ml-2">
            {conversation.last_message_time}
          </span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-xs text-secondary truncate">
            {conversation.last_message}
          </span>
          {conversation.unread_count > 0 && (
            <span className="flex-shrink-0 ml-2 w-5 h-5 bg-custom-red rounded-full flex items-center justify-center text-[10px] text-white font-medium">
              {conversation.unread_count}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
