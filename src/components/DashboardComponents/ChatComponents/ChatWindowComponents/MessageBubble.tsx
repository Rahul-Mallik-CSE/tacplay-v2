"use client"

import { Check, CheckCheck } from "lucide-react"
import type { MessageBubbleProps } from "@/types/DashboardTypes/ChatTypes"

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.is_sent ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
          message.is_sent
            ? "bg-custom-red text-white rounded-br-md"
            : "bg-white/10 text-primary rounded-bl-md"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`flex items-center gap-1 mt-1 ${message.is_sent ? "justify-end" : "justify-start"}`}>
          <span className={`text-[10px] ${message.is_sent ? "text-white/70" : "text-secondary"}`}>
            {message.time}
          </span>
          {message.is_sent && (
            message.is_read ? (
              <CheckCheck className="w-3.5 h-3.5 text-white/70" />
            ) : (
              <Check className="w-3.5 h-3.5 text-white/70" />
            )
          )}
        </div>
      </div>
    </div>
  )
}
