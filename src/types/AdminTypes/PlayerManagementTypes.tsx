"use client"

export interface Player {
  id: number
  name: string
  email: string
  userId: string
  countryCode: string
  membership: "Premium" | "Free"
  rank: number
  joined: string
  lastActive: string
  status: "Active" | "Block"
  avatar: string
  username: string
  location: string
  bookings: number
  points: number
  teams: number
  playerId: string
  ownerName: string
  contactNumber: string
  memberSince: string
}

export interface PlayerSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export interface PlayerMembershipBadgeProps {
  membership: "Premium" | "Free"
  size?: "sm" | "md"
}

export interface PlayerStatusBadgeProps {
  status: "Active" | "Block"
  size?: "sm" | "md"
}

export interface PlayerCountryFlagProps {
  countryCode: string
  size?: "sm" | "md"
}

export interface PlayerActionDropdownProps {
  player: Player
  onViewDetails: (player: Player) => void
  onBlockPlayer: (player: Player) => void
}

export interface PlayerDetailsSheetProps {
  player: Player | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onBlockPlayer: (player: Player) => void
  onUpgradePlan: (player: Player) => void
}

export interface UpgradePlanModalProps {
  player: Player | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}
