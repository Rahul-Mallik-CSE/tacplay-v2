/**
 * StaffTypes.tsx
 * TypeScript types and interfaces for the Staff Management feature.
 */

// ============================================================================
// Staff Member Types
// ============================================================================

/** A staff member displayed in the list table */
export interface StaffMember {
  staff_id: number
  display_staff_id: string
  full_name: string
  email: string
  phone: string
  avatar: string
  role: string
  assigned_sessions: number
  checked_in_today: number
  last_login: string
  status: "Active" | "Inactive"
  scanner_access?: string
  joined_date: string
}

/** Full staff details for the detail sheet */
export interface StaffDetails {
  staff: StaffMember
  assigned_sessions_today: AssignedSession[]
}

/** A session assigned to a staff member today */
export interface AssignedSession {
  time: string
  session_name: string
  players: string
  status: "Ongoing" | "Upcoming" | "Completed"
}

// ============================================================================
// Role Types
// ============================================================================

/** A staff role definition */
export interface StaffRole {
  id: number
  name: string
}

/** A permission category with its sub-permissions */
export interface PermissionCategory {
  id: string
  name: string
  icon: string
  enabled: boolean
  permissions: Permission[]
}

/** A single permission toggle */
export interface Permission {
  id: string
  name: string
  enabled: boolean
}

// ============================================================================
// Component Props Types
// ============================================================================

/** Props for StaffDetailsSheet component */
export interface StaffDetailsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staffId: number | null
}

/** Props for StaffSearchBar component */
export interface StaffSearchBarProps {
  value: string
  onChange: (value: string) => void
}

/** Props for StaffStatusBadge component */
export interface StaffStatusBadgeProps {
  status: "Active" | "Inactive"
  size?: "sm" | "md"
}

/** Props for StaffAvatar component */
export interface StaffAvatarProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg"
}

/** Props for StaffInfoRow component */
export interface StaffInfoRowProps {
  label: string
  value: React.ReactNode
}

/** Props for AssignRoleConfirmModal component */
export interface AssignRoleConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

/** Props for RoleCreatedSuccessModal component */
export interface RoleCreatedSuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateAnother: () => void
  onAssignStaff: () => void
}

/** Props for SelectRoleDropdown component */
export interface SelectRoleDropdownProps {
  value: string
  onChange: (value: string) => void
  roles: StaffRole[]
  onCreateNewRole: () => void
}

/** Props for PermissionCategorySection component */
export interface PermissionCategorySectionProps {
  category: PermissionCategory
  onCategoryToggle: (categoryId: string, enabled: boolean) => void
  onPermissionToggle: (categoryId: string, permissionId: string, enabled: boolean) => void
}

/** Props for PermissionSwitch component */
export interface PermissionSwitchProps {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}
