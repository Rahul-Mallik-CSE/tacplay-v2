"use client"

import { useRef, useEffect } from "react"
import ChatHeader from "./ChatHeader"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"
import type { ChatWindowProps } from "@/types/DashboardTypes/ChatTypes"

export default function ChatWindow({ user, messages, onSend }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      <ChatHeader user={user} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {/* Date separator */}
        <div className="flex justify-center mb-4">
          <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-secondary">
            Yesterday
          </span>
        </div>

        {messages.map((message) => (
          <MessageBubble key={message.message_id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={onSend} />
    </div>
  )
}
