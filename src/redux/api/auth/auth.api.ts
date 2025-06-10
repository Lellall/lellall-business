import { toast } from "react-toastify";
import { LoginRequest, LoginResponse } from "./typings";
import { setAuthState, logout } from "./auth.slice";
import { baseApi } from "../baseApi";
import { ErrorHandler } from "@/utils/error-handler";

// Define types for the inquiry request and response
interface InquiryRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

interface InquiryResponse {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    message: string;
    createdAt: string;
    updatedAt: string;
  };
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoints
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled: qf }) {
        qf.then((data) => {
          localStorage.setItem('access_token', data.data.access_token);
          localStorage.setItem('user', JSON.stringify(data.data.user)); // Stringify user object
          localStorage.setItem('refresh_token', data.data.refresh_token);
          dispatch(
            setAuthState({
              isAuthenticated: true,
              accessToken: data.data.access_token,
              refreshToken: data.data.refresh_token,
              user: data.data.user,
            })
          );
        }).catch((err) => {
          ErrorHandler(err);
        });
      },
    }),
    getProducts: builder.query({
      query: (params) => ({
        url: `/products`,
        params,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setAuthState({
              isAuthenticated: true,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              user: data.user,
            })
          );
          return data;
        } catch (err) {
          ErrorHandler(err);
          throw err;
        }
      },
    }),
    requestPasswordReset: builder.mutation<EmailResponse, EmailRequest>({
      query: (params: EmailRequest) => ({
        url: `/auth/password-reset/request`,
        method: "POST",
        params: { email: params.email, role: "ADMIN" },
      }),
      async onQueryStarted(_args, { queryFulfilled: qf }) {
        qf.then((res) =>
          toast.success(`${res.data.content}`, {
            position: "top-right",
          })
        ).catch((err) =>
          toast.error(`${err?.status?.message || 'An error occurred'}`, {
            position: "top-right",
          })
        );
      },
    }),
    resetPassword: builder.mutation({
      query: ({ email, token, newPassword, confirmPassword, role }) => ({
        url: `/auth/password-reset`,
        method: "PUT",
        params: { email, token, role },
        headers: { "Content-Type": "application/json" },
        body: { newPassword, confirmPassword },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch }) {
        dispatch(logout());
      },
    }),
    // New inquiry endpoint
    createInquiry: builder.mutation<InquiryResponse, InquiryRequest>({
      query: (data) => ({
        url: "/inquiries",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success("Inquiry submitted successfully!", {
            position: "top-right",
          });
        } catch (err) {
          toast.error("Failed to submit inquiry. Please try again.", {
            position: "top-right",
          });
          ErrorHandler(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useRequestPasswordResetMutation,
  useCreateInquiryMutation, // Export the new hook
} = authApi;