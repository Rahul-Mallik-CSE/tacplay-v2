import type {
  ArenaInfo,
  FieldSetupData,
  PackageManagementData,
  PayoutDetailsData,
  BillingHistoryItem,
  SubscriptionStatus,
} from "@/types/DashboardTypes/ArenaManagementTypes"

export const mockArenaInfo: ArenaInfo = {
  field_name: "Arena Pro Complex",
  description:
    "A premium multi-sport arena featuring state-of-the-art facilities, professional-grade lighting, and climate-controlled playing surfaces.",
  country: { name: "United States", isoCode: "US" },
  city: { name: "Los Angeles" },
  full_address: "1234 Sports Blvd, Los Angeles, CA 90001",
  user_info: {
    full_name: "John Smith",
    email: "john.smith@arenapro.com",
    profile_image: null,
  },
  media: [
    { id: 1, file_url: "/profile-cover.png", is_primary: true },
  ],
}

export const mockFieldSetup: FieldSetupData = {
  minimum_players_per_team: 5,
  maximum_players_per_team: 11,
  minimum_players_per_session: 10,
  maximum_players_per_session: 22,
  default_session_duration: 60,
  duration_unit: "minute",
  base_price_per_player: "15.00",
  allow_social_matches: true,
  allow_ranked_matches: false,
}

export const mockPackageManagement: PackageManagementData = {
  packages: [
    {
      id: 1,
      package_name: "Beginner Package",
      description: "Perfect for first-time players",
      package_fee: "35.00",
      include_items: ["Field rental", "Basic equipment", "100 Paintballs"],
      is_active: true,
      date_time: "26 Jan 2026, 10:00 AM",
      type: "Public",
      paint_count: "100 Paintballs",
      booking_count: 86,
      booking_change: 38,
    },
    {
      id: 2,
      package_name: "Advanced Package",
      description: "For Experienced Players",
      package_fee: "35.00",
      include_items: ["Field rental", "Premium equipment", "100 Paintballs"],
      is_active: true,
      date_time: "26 Jan 2026, 10:00 AM",
      type: "Private",
      paint_count: "100 Paintballs",
      booking_count: 86,
      booking_change: 38,
    },
    {
      id: 3,
      package_name: "Tournament Package",
      description: "Fore competitive events",
      package_fee: "35.00",
      include_items: ["Field rental", "Premium equipment", "100 Paintballs", "Coaching"],
      is_active: true,
      date_time: "26 Jan 2026, 10:00 AM",
      type: "Ranked",
      paint_count: "100 Paintballs",
      booking_count: 86,
      booking_change: 38,
    },
    {
      id: 4,
      package_name: "Private Group Package",
      description: "For Private group bookings",
      package_fee: "35.00",
      include_items: ["Field rental", "Premium equipment", "100 Paintballs", "Changing rooms"],
      is_active: true,
      date_time: "26 Jan 2026, 10:00 AM",
      type: "Public",
      paint_count: "100 Paintballs",
      booking_count: 86,
      booking_change: 38,
    },
    {
      id: 5,
      package_name: "Advanced Package",
      description: "For Experienced Players",
      package_fee: "35.00",
      include_items: ["Field rental", "Premium equipment", "100 Paintballs"],
      is_active: false,
      date_time: "26 Jan 2026, 10:00 AM",
      type: "Private",
      paint_count: "100 Paintballs",
      booking_count: 86,
      booking_change: 38,
    },
    {
      id: 6,
      package_name: "Birthday Party package",
      description: "Perfect for first-time players",
      package_fee: "35.00",
      include_items: ["Field rental", "Basic equipment", "100 Paintballs", "Party room"],
      is_active: true,
      date_time: "26 Jan 2026, 10:00 AM",
      type: "Public",
      paint_count: "100 Paintballs",
      booking_count: 86,
      booking_change: 38,
    },
  ],
}

export const mockPayoutDetails: PayoutDetailsData = {
  business_name: "Arena Pro LLC",
  business_type: "registered_company",
  contact_phone_number: "+1 (555) 123-4567",
  bank_account_holder_name: "Arena Pro LLC",
  bank_name: "Chase Bank",
  account_number: "****4567",
  iban_routing_number: "021000021",
  swift_bic_code: "CHASUS33",
}

export const mockBillingHistory: BillingHistoryItem[] = [
  {
    invoice_id: "INV-2026-001",
    date: "2026-08-01",
    plan: "Gold Plan",
    price: "299.00",
    currency: "USD",
    payment_status: "paid",
  },
  {
    invoice_id: "INV-2026-002",
    date: "2026-07-01",
    plan: "Gold Plan",
    price: "299.00",
    currency: "USD",
    payment_status: "paid",
  },
  {
    invoice_id: "INV-2026-003",
    date: "2026-06-01",
    plan: "Silver Plan",
    price: "149.00",
    currency: "USD",
    payment_status: "paid",
  },
  {
    invoice_id: "INV-2026-004",
    date: "2026-05-15",
    plan: "Silver Plan",
    price: "149.00",
    currency: "USD",
    payment_status: "pending",
  },
]

export const mockSubscriptionStatus: SubscriptionStatus = {
  plan_name: "Gold Plan",
  plan_code: "field_gold_monthly",
}
