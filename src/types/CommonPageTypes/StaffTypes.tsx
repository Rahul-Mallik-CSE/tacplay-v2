/**
 * StaffTypes.tsx
 * TypeScript types and interfaces for the Staff Management feature.
 */

// ============================================================================
// API Response & Data Types
// ============================================================================

export interface StaffItem {
  id: number
  staff_name: string
  email: string
  phone: string
  profile_image: string | null
  role_id: number
  role_name: string
  permissions: string[]
  field_id: number
  field_name: string
  assigned_sessions: number
  checked_in_today: number
  last_login: string | null
  status: "Active" | "Inactive" | string
  is_active: boolean
  must_change_password?: boolean
  created_at?: string
  updated_at?: string
}

export interface AssignedSessionToday {
  session_id: number
  session_name: string
  time: string
  start_time?: string
  booked_players: number
  total_capacity: number
  capacity_display: string
  status: "Ongoing" | "Upcoming" | "Completed" | string
}

export interface StaffDetailData extends StaffItem {
  joined_at?: string
  has_scanner_access?: boolean
  scanner_access?: string
  assigned_sessions_today?: AssignedSessionToday[]
}

export interface StaffPaginationMeta {
  current_page: number
  page_size: number
  total_items: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export interface StaffListResponse {
  success: boolean
  message: string
  data: StaffItem[]
  meta: StaffPaginationMeta
}

export interface StaffDetailResponse {
  success: boolean
  message: string
  data: StaffDetailData
}

export interface RoleItem {
  id: number
  role_name: string
  permissions: string[]
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface RoleListResponse {
  success: boolean
  message: string
  data: RoleItem[]
}

export interface PermissionOption {
  code: string
  name: string
}

export interface PermissionGroup {
  key: string
  name: string
  permissions: PermissionOption[]
}

export interface PermissionsListResponse {
  success: boolean
  message: string
  data: PermissionGroup[]
}

export interface StaffQueryParams {
  search?: string
  role_name?: string
  status?: string // "active" | "inactive"
  sort_by?: string
  sort_order?: "asc" | "desc"
  page?: number
  page_size?: number
}

export interface CreateStaffPayload {
  staff_name: string
  email: string
  phone: string
  role_id: number | string
  profile_image?: File | null
}

export interface UpdateStaffPayload {
  id: number
  data: FormData | Partial<StaffItem> | Record<string, unknown>
}

export interface UpdateStaffStatusPayload {
  id: number
  is_active: boolean
}

export interface CreateRolePayload {
  role_name: string
  permissions: string[]
}

export interface UpdateRolePayload {
  id: number
  role_name?: string
  permissions?: string[]
  is_active?: boolean
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
}

// ============================================================================
// Legacy/UI Compatibility Types
// ============================================================================

/** A staff member displayed in the list table */
export interface StaffMember {
  staff_id: number
  display_staff_id?: string
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
  joined_date?: string
  is_active?: boolean
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
  status: "Ongoing" | "Upcoming" | "Completed" | string
}

// ============================================================================
// Role & Permission Types
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
  onStaffUpdated?: () => void
}

/** Props for StaffSearchBar component */
export interface StaffSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

/** Props for StaffStatusBadge component */
export interface StaffStatusBadgeProps {
  status: "Active" | "Inactive" | string
  size?: "sm" | "md"
}

/** Props for StaffAvatar component */
export interface StaffAvatarProps {
  src?: string | null
  alt: string
  size?: "sm" | "md" | "lg"
  className?: string
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
  onCancel?: () => void
  isLoading?: boolean
}

/** Props for RoleCreatedSuccessModal component */
export interface RoleCreatedSuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateRole?: () => void
  onCreateAndAssignStaff?: () => void
  onCreateAnother?: () => void
  onAssignStaff?: () => void
  roleName?: string
  permissionsCount?: number
  isLoading?: boolean
}

/** Props for SelectRoleDropdown component */
export interface SelectRoleDropdownProps {
  value: string
  onChange: (value: string, roleId?: number) => void
  roles: { id: number; name: string }[]
  onCreateNewRole: () => void
  isLoading?: boolean
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
