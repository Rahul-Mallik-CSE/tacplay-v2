/**
 * help-support-mock-data.ts
 * Mock data for the Help & Support feature.
 * Contains sample ticket list items, support channels, info items,
 * and help topics for frontend demonstration without API integration.
 */

import type {
  TicketListItem,
  SupportChannel,
  SupportInfoItem,
  HelpTopic,
  TicketCategory,
} from "@/types/DashboardTypes/HelpSupportTypes"

/** Mock ticket list data for the table */
export const mockTicketListData: TicketListItem[] = [
  {
    ticket_id: 1,
    display_ticket_id: "TKT-2025-0168",
    subject: "Unable to add new time",
    category: "Technical Issue",
    status: "open",
    priority: "high",
    last_update: "May 16, 2026",
    description: "I am unable to add new time slots to my session schedule. The time picker seems unresponsive.",
    created_at: "May 14, 2026",
  },
  {
    ticket_id: 2,
    display_ticket_id: "TKT-2025-0168",
    subject: "Unable to add new time",
    category: "Technical Issue",
    status: "in_progress",
    priority: "medium",
    last_update: "May 16, 2026",
    description: "Booking system not updating after payment confirmation.",
    created_at: "May 13, 2026",
  },
  {
    ticket_id: 3,
    display_ticket_id: "TKT-2025-0168",
    subject: "Unable to add new time",
    category: "Technical Issue",
    status: "resolved",
    priority: "low",
    last_update: "May 16, 2026",
    description: "Session creation form was showing validation errors.",
    created_at: "May 12, 2026",
  },
  {
    ticket_id: 4,
    display_ticket_id: "TKT-2025-0168",
    subject: "Unable to add new time",
    category: "Technical Issue",
    status: "resolved",
    priority: "medium",
    last_update: "May 16, 2026",
    description: "Analytics dashboard not loading correctly.",
    created_at: "May 11, 2026",
  },
  {
    ticket_id: 5,
    display_ticket_id: "TKT-2025-0168",
    subject: "Invoice not generated",
    category: "Billing",
    status: "in_progress",
    priority: "medium",
    last_update: "May 16, 2026",
    description: "Invoice PDF is not being generated for completed bookings.",
    created_at: "May 10, 2026",
  },
]

/** Mock support channels */
export const mockSupportChannels: SupportChannel[] = [
  {
    id: "ch-1",
    type: "email",
    label: "Email Support",
    value: "Support@tacply.com",
  },
  {
    id: "ch-2",
    type: "live_chat",
    label: "Live Chat",
    value: "Available in Portal",
  },
  {
    id: "ch-3",
    type: "phone",
    label: "Phone Support",
    value: "+34 900 123 234",
  },
]

/** Mock support information items */
export const mockSupportInfoItems: SupportInfoItem[] = [
  {
    id: "si-1",
    title: "Response Time",
    description: "We typically respond within 2-3 hours during business hours.",
    icon: "clock",
  },
  {
    id: "si-2",
    title: "Support Hours",
    description: "Monday - Friday\n9:00 AM - 6:00 PM (CET)",
    icon: "hours",
  },
  {
    id: "si-3",
    title: "Priority Support",
    description: "Gold subscribers receive priority handling in our support queue.",
    icon: "priority",
  },
  {
    id: "si-4",
    title: "Escalation Process",
    description: "Complex issues are escalated to senior support managers.",
    icon: "escalation",
  },
]

/** Mock popular help topics */
export const mockHelpTopics: HelpTopic[] = [
  {
    id: "ht-1",
    title: "Booking",
    description: "Manage Bookings, cancellations and schedules.",
    icon: "booking",
  },
  {
    id: "ht-2",
    title: "Billing & Payments",
    description: "Invoices, payments, subscriptions and refunds.",
    icon: "billing",
  },
  {
    id: "ht-3",
    title: "Account Access",
    description: "Manage team access, roles and account security.",
    icon: "account",
  },
  {
    id: "ht-4",
    title: "Field Profile",
    description: "Update field details, photos and amenities.",
    icon: "field",
  },
  {
    id: "ht-5",
    title: "Technical Issues",
    description: "Troubleshoot common problems and errors.",
    icon: "technical",
  },
  {
    id: "ht-6",
    title: "Feature Guides",
    description: "Learn how to use TACPLAY features effectively.",
    icon: "guides",
  },
]

/** Mock ticket categories for the submit form */
export const mockTicketCategories: TicketCategory[] = [
  { value: "technical", label: "Technical Issue" },
  { value: "billing", label: "Billing" },
  { value: "account", label: "Account Access" },
  { value: "booking", label: "Booking" },
  { value: "field", label: "Field Profile" },
  { value: "other", label: "Other" },
]
