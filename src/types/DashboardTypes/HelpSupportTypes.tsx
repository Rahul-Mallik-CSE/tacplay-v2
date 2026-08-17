/**
 * HelpSupportTypes.tsx
 * Shared TypeScript types and interfaces for the Help & Support feature.
 * Centralizes all type definitions used across help support components.
 */

/** Ticket status options */
export type TicketStatus = "open" | "in_progress" | "resolved" | "closed"

/** Ticket priority options */
export type TicketPriority = "low" | "medium" | "high"

/** Single ticket item in the list table */
export type TicketListItem = {
  ticket_id: number
  display_ticket_id: string
  subject: string
  category: string
  status: TicketStatus
  priority: TicketPriority
  last_update: string
  description?: string
  created_at: string
}

/** Contact support channel */
export type SupportChannel = {
  id: string
  type: "email" | "live_chat" | "phone"
  label: string
  value: string
}

/** Support information card */
export type SupportInfoItem = {
  id: string
  title: string
  description: string
  icon: string
}

/** Popular help topic */
export type HelpTopic = {
  id: string
  title: string
  description: string
  icon: string
}

/** Ticket category option */
export type TicketCategory = {
  value: string
  label: string
}

/** Submit ticket form data */
export type SubmitTicketFormData = {
  category: string
  subject: string
  description: string
  attachment: File | null
}

/** Props for HelpSupportHeader component */
export interface HelpSupportHeaderProps {
  onSubmitTicket: () => void
}

/** Props for SupportChannelCards component */
export interface SupportChannelCardsProps {
  channels: SupportChannel[]
}

/** Props for RecentTicketsTable component */
export interface RecentTicketsTableProps {
  tickets: TicketListItem[]
  onViewAll: () => void
  onViewTicket: (ticket: TicketListItem) => void
}

/** Props for SupportInfoSection component */
export interface SupportInfoSectionProps {
  items: SupportInfoItem[]
}

/** Props for PopularHelpTopics component */
export interface PopularHelpTopicsProps {
  topics: HelpTopic[]
  onBrowseHelpCenter: () => void
}

/** Props for SubmitTicketForm component */
export interface SubmitTicketFormProps {
  categories: TicketCategory[]
  onSubmit: (data: SubmitTicketFormData) => void
  onCancel: () => void
}

/** Props for FileUpload component */
export interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
}
