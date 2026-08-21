/**
 * ChatTypes.tsx
 * TypeScript types and interfaces for the Chat feature.
 */

// ============================================================================
// Chat Types
// ============================================================================

/** A chat conversation in the list */
export interface ChatConversation {
  conversation_id: number
  name: string
  avatar: string
  last_message: string
  last_message_time: string
  unread_count: number
  is_online: boolean
}

/** A single chat message */
export interface ChatMessage {
  message_id: number
  sender_id: number
  sender_name: string
  text: string
  time: string
  is_sent: boolean
  is_read: boolean
}

/** Active chat user info */
export interface ChatUser {
  user_id: number
  name: string
  avatar: string
  status: string
  is_online: boolean
}

// ============================================================================
// Component Props Types
// ============================================================================

/** Props for ChatItem component */
export interface ChatItemProps {
  conversation: ChatConversation
  isActive: boolean
  onClick: () => void
}

/** Props for ChatList component */
export interface ChatListProps {
  conversations: ChatConversation[]
  activeId: number | null
  onSelect: (id: number) => void
  search: string
  onSearchChange: (value: string) => void
}

/** Props for ChatHeader component */
export interface ChatHeaderProps {
  user: ChatUser
}

/** Props for MessageBubble component */
export interface MessageBubbleProps {
  message: ChatMessage
}

/** Props for MessageInput component */
export interface MessageInputProps {
  onSend: (text: string) => void
}

/** Props for ChatWindow component */
export interface ChatWindowProps {
  user: ChatUser
  messages: ChatMessage[]
  onSend: (text: string) => void
}
