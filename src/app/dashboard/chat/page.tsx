"use client"

import ChatContainer from "@/components/DashboardComponents/ChatComponents"

export default function ChatPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <ChatContainer />
      </div>
    </div>
  )
}
