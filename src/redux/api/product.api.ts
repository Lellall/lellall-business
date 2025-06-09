// productsApi.js
import { BaseUrl } from "@/utils/config";
import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, size, filter, categoryId }) => ({
        url: `${BaseUrl}/products`,
        params: {
          page,
          size,
          ...(filter && { filter }), // Include filter if provided
          ...(categoryId && { categoryId }), // Include categoryId if provided
        },
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: `${BaseUrl}/categories/all-categories`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = productsApi;