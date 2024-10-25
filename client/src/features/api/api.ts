import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookType, CartType, OrderType } from "../../types/data";
import { SERVER_URL } from "../../constants/values";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/` }),
    endpoints: (builder) => ({
        getAllBooks: builder.query<BookType[], void>({
            query: () => ''
        }),
        getBookById: builder.query<BookType, string>({
            query: (id) => `/${id}`
        }),
        getUserCarts: builder.query<{message: string, carts: CartType[]}, string>({
            query: (id) => ({
                url: `/api/user/${id}/carts`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        getUserOrders: builder.query<{message: string, orders: OrderType[]}, string>({
            query: (id) => ({
                url: `/api/user/${id}/orders`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        search: builder.query<BookType[], { searchTerm: string }>({
            query: ({ searchTerm }) => ({
                url: `/search/${searchTerm}`,
                method: 'GET',
                credentials: 'include'
            })
        }),
    }),
});

export const { 
    useGetAllBooksQuery,
    useGetBookByIdQuery,
    useGetUserCartsQuery,
    useGetUserOrdersQuery,
    useSearchQuery
} = api;