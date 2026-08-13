/**
 * SettingsTypes.tsx
 * Shared TypeScript types and interfaces for the Settings feature.
 * Centralizes all type definitions used across settings components.
 */

/** Field owner profile data */
export type FieldOwnerProfile = {
  id: number
  full_name: string
  email_address: string
  contact_number: string
  password: string
  profile_image: string | null
}

/** API response structure for profile data */
export type FieldOwnerProfileResponse = {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: FieldOwnerProfile
  requestId: string
}

/** Payload for updating profile (FormData) */
export type UpdateFieldOwnerProfilePayload = FormData

/** Payload for changing password */
export type ChangeFieldOwnerPasswordPayload = {
  current_password: string
  new_password: string
  confirm_password: string
}

/** API response structure for password change */
export type ChangeFieldOwnerPasswordResponse = {
  success: boolean
  message: string
  meta?: Record<string, unknown>
  data?: unknown
  requestId?: string
}

/** Props for SettingsProfileAvatar component */
export interface SettingsProfileAvatarProps {
  imageUrl: string | null
  fullName: string
  size?: "sm" | "md" | "lg"
}

/** Props for SettingsProfileField component */
export interface SettingsProfileFieldProps {
  label: string
  value: string
  type?: "text" | "email" | "number" | "password"
  showPasswordToggle?: boolean
  showPassword?: boolean
  onTogglePassword?: () => void
}

/** Props for SettingsActionButtons component */
export interface SettingsActionButtonsProps {
  onPasswordChange: () => void
  onEditProfile: () => void
}

/** Props for EditAccountDialog component */
export interface EditAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: FieldOwnerProfile | null
}

/** Props for ChangePasswordDialog component */
export interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}
