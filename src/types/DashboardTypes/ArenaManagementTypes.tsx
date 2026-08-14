/**
 * ArenaManagementTypes.tsx
 * Shared TypeScript types and interfaces for the Arena Management feature.
 * This file centralizes all type definitions used across arena management components
 * to ensure consistency and reduce duplication.
 */

// ============================================================================
// Arena Media & Info Types
// ============================================================================

/** Represents an image item in the arena media gallery */
export interface ArenaMedia {
  id: number
  file_url: string
  is_primary: boolean
}

/** User profile information for arena owner */
export interface ArenaUserInfo {
  full_name: string
  email: string
  profile_image: string | null
}

/** Core arena information including location and media */
export interface ArenaInfo {
  field_name: string
  description: string
  country: { name: string; isoCode: string } | null
  city: { name: string } | null
  full_address: string
  user_info: ArenaUserInfo
  media: ArenaMedia[]
}

// ============================================================================
// Field Setup Types
// ============================================================================

/** Configuration data for field/team setup */
export interface FieldSetupData {
  minimum_players_per_team: number
  maximum_players_per_team: number
  minimum_players_per_session: number
  maximum_players_per_session: number
  default_session_duration: number
  duration_unit: string
  base_price_per_player: string
  allow_social_matches: boolean
  allow_ranked_matches: boolean
}

// ============================================================================
// Package Management Types
// ============================================================================

/** Single package definition with pricing and included items */
export interface PackageItem {
  id: number
  package_name: string
  description: string
  package_fee: string
  include_items: string[]
  is_active: boolean
}

/** Wrapper for package management data */
export interface PackageManagementData {
  packages: PackageItem[]
}

// ============================================================================
// Payout Details Types
// ============================================================================

/** Bank/payout account information for business */
export interface PayoutDetailsData {
  business_name: string
  business_type: string
  contact_phone_number: string
  bank_account_holder_name: string
  bank_name: string
  account_number: string
  iban_routing_number: string
  swift_bic_code: string
}

// ============================================================================
// Billing Types
// ============================================================================

/** Invoice/billing history record */
export interface BillingHistoryItem {
  invoice_id: string
  date: string
  plan: string
  price: string
  currency: string
  payment_status: string
}

/** Current subscription plan status */
export interface SubscriptionStatus {
  plan_name: string
  plan_code: string
}

// ============================================================================
// Component Form Types (Edit/Save patterns)
// ============================================================================

/** Form state type for Arena Info tab editing */
export type ArenaInfoForm = {
  field_name: string
  description: string
  country: string
  state: string
  city: string
  full_address: string
}

/** Props for Arena Info tab component */
export interface ArenaInfoTabProps {
  arenaInfo?: ArenaInfo
}

/** Form state type for Field Setup tab editing */
export type FieldSetupForm = {
  minimum_players_per_team: number
  maximum_players_per_team: number
  minimum_players_per_session: number
  maximum_players_per_session: number
  default_session_duration: number
  duration_unit: string
  base_price_per_player: string
  allow_social_matches: boolean
  allow_ranked_matches: boolean
}

/** Props for Field Setup tab component */
export interface FieldSetupTabProps {
  fieldSetup?: FieldSetupData
}

/** Form state type for package editing (includes optional id for new packages) */
export type PackageForm = {
  id?: number
  package_name: string
  description: string
  package_fee: string
  include_items: string[]
  is_active: boolean
}

/** Props for Package Management tab component */
export interface PackageManagementTabProps {
  packageManagement?: PackageManagementData
}

/** Props for individual Package Card component */
export interface PackageCardProps {
  pkg: PackageForm
  index: number
  isEditing: boolean
  onUpdate: (index: number, patch: Partial<PackageForm>) => void
  onRemove: (index: number) => void
  onAddItem: (index: number, value: string) => void
  onRemoveItem: (index: number, value: string) => void
}

/** Form state type for Payout Details tab editing */
export type PayoutForm = {
  business_name: string
  business_type: string
  contact_phone_number: string
  bank_account_holder_name: string
  bank_name: string
  account_number: string
  iban_routing_number: string
  swift_bic_code: string
}

/** Props for Payout Details tab component */
export interface PayoutDetailsTabProps {
  payoutDetails?: PayoutDetailsData
  showLockedView?: boolean
}

/** Props for Billings tab component */
export interface BillingsTabProps {
  billingHistory?: BillingHistoryItem[]
}

/** Props for Cover Image Slider component */
export interface CoverImageSliderProps {
  imageUrls: string[]
  onOpenLightbox: () => void
  onOpenManageModal: () => void
}

/** Props for Arena Lightbox (fullscreen image viewer) component */
export interface ArenaLightboxProps {
  isOpen: boolean
  imageUrls: string[]
  currentSlide: number
  onClose: () => void
  onSlideChange: (index: number) => void
}

/** Props for Arena Profile Section component */
export interface ArenaProfileSectionProps {
  fullName: string
  email: string
  profileImageUrl: string | null
  showProBadge: boolean
}

/** Props for Billings Header component */
export interface BillingsHeaderProps {
  search: string
  onSearchChange: (value: string) => void
}

/** Props for Billings Table component */
export interface BillingsTableProps {
  data: BillingHistoryItem[]
}

/** Props for Manage Cover Images Modal component */
export interface ManageCoverImagesModalProps {
  isOpen: boolean
  onClose: () => void
  existingMedia?: ArenaMedia[]
}
