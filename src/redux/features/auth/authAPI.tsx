/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  SignupRequest,
  SignupResponse,
  OtpRequest,
  ResendOtpRequest,
  VerifySignupOtpResponse,
  ResendOtpResponse,
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyForgotPasswordOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  LogoutResponse,
} from "@/types/AuthTypes";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ── Sign Up ────────────────────────────────────────────────────────
    signUpFieldOwner: builder.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({
        url: "/api/auth/signup/field-owner/",
        method: "POST",
        body,
      }),
    }),

    // ── Verify Signup OTP ─────────────────────────────────────────────
    verifySignupOtp: builder.mutation<VerifySignupOtpResponse, OtpRequest>({
      query: (body) => ({
        url: "/api/auth/verify-otp/",
        method: "POST",
        body,
      }),
    }),

    // ── Resend Signup OTP ─────────────────────────────────────────────
    resendSignupOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: (body) => ({
        url: "/api/auth/resend-otp/",
        method: "POST",
        body,
      }),
    }),

    // ── Login ─────────────────────────────────────────────────────────
    loginFieldOwner: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/api/auth/field-owner-login/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ── Forgot Password ───────────────────────────────────────────────
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/api/auth/forgot-password/",
        method: "POST",
        body,
      }),
    }),

    // ── Verify Forgot-Password OTP ────────────────────────────────────
    verifyForgotPasswordOtp: builder.mutation<
      VerifyForgotPasswordOtpResponse,
      OtpRequest
    >({
      query: (body) => ({
        url: "/api/auth/verify-forgot-password-otp/",
        method: "POST",
        body,
      }),
    }),

    // ── Resend Forgot-Password OTP ────────────────────────────────────
    resendForgotPasswordOtp: builder.mutation<
      ResendOtpResponse,
      ResendOtpRequest
    >({
      query: (body) => ({
        url: "/api/auth/resend-forgot-password-otp/",
        method: "POST",
        body,
      }),
    }),

    // ── Reset Password ────────────────────────────────────────────────
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>(
      {
        query: (body) => ({
          url: "/api/auth/reset-password/",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Auth"],
      },
    ),

    // ── Logout ────────────────────────────────────────────────────────
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/api/auth/logout/",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useSignUpFieldOwnerMutation,
  useVerifySignupOtpMutation,
  useResendSignupOtpMutation,
  useLoginFieldOwnerMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useResendForgotPasswordOtpMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authAPI;

export default authAPI;
