import { baseApi } from "@/redux/api/baseApi";
import { toast } from "react-toastify";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        orderItems: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(_args, { dispatch, queryFulfilled: qf }) {
                try {
                    const { data } = await qf; // Wait for the mutation to resolve
                    alert("Order placed successfully!");
                } catch (err) {
                    console.log(err, 'err')
                    // Extract error details
                    const errorMessage = err?.error?.data?.message || "An error occurred while placing the order.";
                    toast.error(`${errorMessage}`, { position: "top-right" });

                    console.error("Error details:", data); // Log for debugging
                }
            },
        }),
        getSummary: builder.query({
            query: (id) => ({
                url: `/summary?id=${id}`,
            }),
        }),
    }),
});

export const { useOrderItemsMutation, useGetSummaryQuery } = cartApi;