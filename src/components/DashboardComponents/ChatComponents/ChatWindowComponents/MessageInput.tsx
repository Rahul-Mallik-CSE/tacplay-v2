"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Paperclip, Send } from "lucide-react"
import type { MessageInputProps } from "@/types/DashboardTypes/ChatTypes"

export default function MessageInput({ onSend }: MessageInputProps) {
  const { t } = useTranslation("dashboard")
  const [text, setText] = useState("")

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim())
      setText("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-3 p-4 border-t border-white/5">
      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer flex-shrink-0">
        <Paperclip className="w-5 h-5 text-secondary" />
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("chat.placeholder")}
        className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
      />
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className="p-2.5 bg-custom-red rounded-xl transition-colors cursor-pointer flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5 text-white" />
      </button>
    </div>
  )
}
