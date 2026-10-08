/** @format */

// ─── Account Type Constants ─────────────────────────────────────────────────

export const ACCOUNT_TYPE_ADMIN = "admin" as const;
export const ACCOUNT_TYPE_ADMIN_STAFF = "admin_staff" as const;
export const ACCOUNT_TYPE_FIELD_OWNER = "field_owner" as const;

export type AccountType =
  | typeof ACCOUNT_TYPE_ADMIN
  | typeof ACCOUNT_TYPE_ADMIN_STAFF
  | typeof ACCOUNT_TYPE_FIELD_OWNER;

// ─── User ───────────────────────────────────────────────────────────────────

export type AuthUser = {
  id?: number;
  email: string;
  full_name: string;
  profile_image?: string | null;
  account_type?: AccountType;
  /** some endpoints return `role` instead of `account_type` */
  role?: string;
  arena_info_saved?: boolean;
};

// ─── Signup ─────────────────────────────────────────────────────────────────

export type SignupRequest = {
  owner_name: string;
  business_email: string;
  password: string;
  confirm_password: string;
};

export type SignupResponse = {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data: {
    user_id: number;
    business_email: string;
  };
  requestId?: string;
};

// ─── OTP (shared between signup & forgot-password) ──────────────────────────

export type OtpRequest = {
  email_address: string;
  otp_code: string;
};

export type ResendOtpRequest = {
  email_address: string;
};

export type VerifySignupOtpResponse = {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data: {
    user_id: number;
    email_address: string;
    is_email_verified: boolean;
  };
  requestId?: string;
};

export type ResendOtpResponse = {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data: {
    email_address: string;
    purpose?: string;
    account_type?: string;
  };
  requestId?: string;
};

// ─── Login ──────────────────────────────────────────────────────────────────

export type LoginRequest = {
  business_email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data: {
    user: AuthUser;
    tokens: {
      access: string;
      refresh: string;
    };
  };
  requestId?: string;
};

// ─── Forgot Password ───────────────────────────────────────────────────────

export type ForgotPasswordRequest = {
  email_address: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data: {
    email_address: string;
    account_type?: string;
  };
  requestId?: string;
};

// ─── Verify Forgot-Password OTP ─────────────────────────────────────────────
// The response returns tokens at top-level (NOT nested in `data`).

export type VerifyForgotPasswordOtpResponse = {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

// ─── Reset Password ────────────────────────────────────────────────────────
// Two possible response shapes from the backend.

export type ResetPasswordRequest = {
  new_password: string;
  confirm_password: string;
};

/**
 * Backend may return tokens either at top-level or nested in `data.tokens`.
 * We normalise in the consuming code.
 */
export type ResetPasswordResponse = {
  success: boolean;
  message: string;
  /** Top-level (field_owner variant) */
  accessToken?: string;
  refreshToken?: string;
  user?: AuthUser;
  /** Nested (admin variant) */
  data?: {
    user: AuthUser;
    tokens: {
      access: string;
      refresh: string;
    };
  };
  meta?: Record<string, unknown>;
  requestId?: string;
};

// ─── Logout ─────────────────────────────────────────────────────────────────

export type LogoutResponse = {
  success: boolean;
  message: string;
};

// ─── Auth State (Redux) ─────────────────────────────────────────────────────

export type VerificationPurpose = "signup" | "forgot-password" | null;

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  pendingEmail: string;
  verificationPurpose: VerificationPurpose;
};
