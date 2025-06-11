import { toast } from "react-toastify";
import { ErrorHandler } from "@/utils/error-handler";
import { baseApi } from "@/redux/api/baseApi";

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

const inquiry = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useCreateInquiryMutation, // Export the new hook
} = inquiry;