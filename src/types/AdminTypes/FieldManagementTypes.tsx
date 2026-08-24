"use client"

export interface Field {
  id: number
  fieldName: string
  fieldId: string
  description: string
  ownerName: string
  ownerEmail: string
  plan: "Gold" | "Sliver" | "Bronze"
  countryCode: string
  createdDate: string
  createdTime: string
  booking: number
  bookingChange: number
  revenue: string
  image: string
  location: string
  rating: number
  totalBookings: number
  totalRevenue: string
  checkInRate: number
  contactNumber: string
  memberSince: string
}

export interface Session {
  id: number
  sessionName: string
  date: string
  time: string
  assignStaff: string
  matchType: string
  matchTypeColor: string
  player: string
  booked: string
  price: string
  status: "Failed" | "Booking" | "Full" | "Ongoing" | "Open"
}

export interface SessionDetail {
  id: number
  status: "Failed" | "Booking" | "Full" | "Ongoing" | "Open"
  fieldInfo: {
    fieldId: string
    fieldName: string
    location: string
    contactNumber: string
  }
  sessionInfo: {
    sessionId: string
    sessionName: string
    matchType: string
    matchTypeColor: string
    sessionDate: string
    time: string
    sessionType: string
    team: number
    playerPerTeam: string
    packages: string
  }
  teamInfo: {
    teamAName: string
    teamAScore: number
    teamBName: string
    teamBScore: number
    champion: string
  }
}

export interface FieldSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export interface FieldPlanBadgeProps {
  plan: "Gold" | "Sliver" | "Bronze"
  size?: "sm" | "md"
}

export interface FieldCountryFlagProps {
  countryCode: string
}

export interface FieldActionDropdownProps {
  field: Field
  onViewDetails: (field: Field) => void
  onSuspendField: (field: Field) => void
}

export interface FieldDetailsSheetProps {
  field: Field | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onBlockField: (field: Field) => void
  onUpgradePlan: (field: Field) => void
  onViewAllSession: () => void
}

export interface UpgradeFieldPlanModalProps {
  field: Field | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (plan: string) => void
}

export interface SessionSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export interface SessionStatusBadgeProps {
  status: "Failed" | "Booking" | "Full" | "Ongoing" | "Open"
  size?: "sm" | "md"
}

export interface SessionActionDropdownProps {
  session: Session
  onViewDetails: (session: Session) => void
}

export interface SessionDetailsSheetProps {
  session: SessionDetail | null
  open: boolean
  onOpenChange: (open: boolean) => void
}
