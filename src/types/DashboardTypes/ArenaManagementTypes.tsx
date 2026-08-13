export interface ArenaMedia {
  id: number
  file_url: string
  is_primary: boolean
}

export interface ArenaUserInfo {
  full_name: string
  email: string
  profile_image: string | null
}

export interface ArenaInfo {
  field_name: string
  description: string
  country: { name: string; isoCode: string } | null
  city: { name: string } | null
  full_address: string
  user_info: ArenaUserInfo
  media: ArenaMedia[]
}

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

export interface PackageItem {
  id: number
  package_name: string
  description: string
  package_fee: string
  include_items: string[]
  is_active: boolean
}

export interface PackageManagementData {
  packages: PackageItem[]
}

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

export interface BillingHistoryItem {
  invoice_id: string
  date: string
  plan: string
  price: string
  currency: string
  payment_status: string
}

export interface SubscriptionStatus {
  plan_name: string
  plan_code: string
}
