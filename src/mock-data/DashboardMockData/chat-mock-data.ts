/**
 * chat-mock-data.ts
 * Mock data for the Chat feature.
 */

import type {
  ChatConversation,
  ChatMessage,
  ChatUser,
} from "@/types/DashboardTypes/ChatTypes"

// ============================================================================
// Chat Conversations
// ============================================================================

export const mockConversations: ChatConversation[] = [
  {
    conversation_id: 1,
    name: "Barcelona Players",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    last_message: "Carlos: Anyone Up for a...",
    last_message_time: "2:20 AM",
    unread_count: 5,
    is_online: true,
  },
  {
    conversation_id: 2,
    name: "Barcelona Players",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    last_message: "Carlos: Anyone Up for a...",
    last_message_time: "2:20 AM",
    unread_count: 5,
    is_online: true,
  },
  {
    conversation_id: 3,
    name: "Barcelona Players",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    last_message: "Carlos: Anyone Up for a...",
    last_message_time: "2:20 AM",
    unread_count: 5,
    is_online: true,
  },
  {
    conversation_id: 4,
    name: "Barcelona Players",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    last_message: "Carlos: Anyone Up for a...",
    last_message_time: "2:20 AM",
    unread_count: 5,
    is_online: true,
  },
  {
    conversation_id: 5,
    name: "Barcelona Players",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    last_message: "Carlos: Anyone Up for a...",
    last_message_time: "2:20 AM",
    unread_count: 5,
    is_online: true,
  },
  {
    conversation_id: 6,
    name: "Barcelona Players",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    last_message: "Carlos: Anyone Up for a...",
    last_message_time: "2:20 AM",
    unread_count: 5,
    is_online: true,
  },
  {
    conversation_id: 7,
    name: "Barcelona Players",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    last_message: "Carlos: Anyone Up for a...",
    last_message_time: "2:20 AM",
    unread_count: 5,
    is_online: true,
  },
  {
    conversation_id: 8,
    name: "Barcelona Players",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
    last_message: "Carlos: Anyone Up for a...",
    last_message_time: "2:20 AM",
    unread_count: 5,
    is_online: true,
  },
  {
    conversation_id: 9,
    name: "Barcelona Players",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    last_message: "Carlos: Anyone Up for a...",
    last_message_time: "2:20 AM",
    unread_count: 5,
    is_online: true,
  },
  {
    conversation_id: 10,
    name: "Barcelona Players",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    last_message: "Carlos: Anyone Up for a...",
    last_message_time: "2:20 AM",
    unread_count: 5,
    is_online: true,
  },
]

// ============================================================================
// Active Chat User
// ============================================================================

export const mockChatUser: ChatUser = {
  user_id: 1,
  name: "John Dsviod",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  status: "Active 2 mints",
  is_online: true,
}

// ============================================================================
// Chat Messages
// ============================================================================

export const mockMessages: ChatMessage[] = [
  {
    message_id: 1,
    sender_id: 1,
    sender_name: "John Dsviod",
    text: "Hey! Just checking in—are we still good for the practice session later today?",
    time: "9:30 AM",
    is_sent: false,
    is_read: true,
  },
  {
    message_id: 2,
    sender_id: 0,
    sender_name: "Me",
    text: "Absolutely! Let's meet at Eite Park at 6 PM. I can't wait to catch up and discuss our plans! It's been a while since we last met, and I'm really looking forward to it! Let me know if anything changes.",
    time: "9:30 AM",
    is_sent: true,
    is_read: true,
  },
  {
    message_id: 3,
    sender_id: 1,
    sender_name: "John Dsviod",
    text: "Hey! Just checking in—are we still good for the practice session later today?",
    time: "9:30 AM",
    is_sent: false,
    is_read: true,
  },
  {
    message_id: 4,
    sender_id: 0,
    sender_name: "Me",
    text: "Count me in! I'll see you at Eite Park at 6 PM. I'm excited to hear about your recent adventures and share some updates of my own. It's going to be great to reconnect!",
    time: "9:30 AM",
    is_sent: true,
    is_read: true,
  },
  {
    message_id: 5,
    sender_id: 1,
    sender_name: "John Dsviod",
    text: "Hey! Just checking in—are we still good for the practice session later today?",
    time: "9:30 AM",
    is_sent: false,
    is_read: true,
  },
  {
    message_id: 6,
    sender_id: 0,
    sender_name: "Me",
    text: "Sounds great! I'll be at Eite Park by 6 PM. Looking forward to our chat and maybe grabbing a bite afterward. It's always nice to unwind and catch up with you! See you then!",
    time: "9:30 AM",
    is_sent: true,
    is_read: true,
  },
]
