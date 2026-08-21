"use client"

import { useState } from "react"
import { ChatList } from "./ChatListComponents"
import { ChatWindow } from "./ChatWindowComponents"
import { mockConversations, mockChatUser, mockMessages } from "@/mock-data/DashboardMockData/chat-mock-data"
import type { ChatMessage } from "@/types/DashboardTypes/ChatTypes"

export default function ChatContainer() {
  const [activeConversation, setActiveConversation] = useState<number | null>(1)
  const [search, setSearch] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)

  const filteredConversations = mockConversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSend = (text: string) => {
    const newMessage: ChatMessage = {
      message_id: messages.length + 1,
      sender_id: 0,
      sender_name: "Me",
      text,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      is_sent: true,
      is_read: false,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Chat List - Left Panel */}
      <div className="w-full md:w-80 lg:w-96 border-r border-white/5 p-4 flex-shrink-0 overflow-hidden flex flex-col">
        <ChatList
          conversations={filteredConversations}
          activeId={activeConversation}
          onSelect={setActiveConversation}
          search={search}
          onSearchChange={setSearch}
        />
      </div>

      {/* Chat Window - Right Panel */}
      <div className="hidden md:flex flex-1 flex-col min-w-0">
        <ChatWindow
          user={mockChatUser}
          messages={messages}
          onSend={handleSend}
        />
      </div>
    </div>
  )
}
