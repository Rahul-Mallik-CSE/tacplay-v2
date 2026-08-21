"use client"

import { useTranslation } from "react-i18next"
import { Search, SlidersHorizontal } from "lucide-react"
import ChatItem from "./ChatItem"
import type { ChatListProps } from "@/types/DashboardTypes/ChatTypes"

export default function ChatList({ conversations, activeId, onSelect, search, onSearchChange }: ChatListProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-primary">{t("chat.title")}</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
            <Search className="w-5 h-5 text-secondary" />
          </button>
          <button className="p-2 bg-custom-red rounded-lg transition-colors cursor-pointer">
            <SlidersHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
        <input
          type="text"
          placeholder={t("common.search")}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20"
        />
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {conversations.map((conversation) => (
          <ChatItem
            key={conversation.conversation_id}
            conversation={conversation}
            isActive={activeId === conversation.conversation_id}
            onClick={() => onSelect(conversation.conversation_id)}
          />
        ))}
      </div>
    </div>
  )
}
