/**
 * settings-mock-data.ts
 * Mock data for the Settings feature.
 * Contains sample profile data for frontend demonstration
 * without API integration.
 */

import type { FieldOwnerProfile } from "@/types/DashboardTypes/SettingsTypes"

/** Mock field owner profile data */
export const mockFieldOwnerProfile: FieldOwnerProfile = {
  id: 1,
  full_name: "John Smith",
  email_address: "john.smith@tacplay.com",
  contact_number: "+1 555-0123",
  password: "********",
  profile_image: null,
}
