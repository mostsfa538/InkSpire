import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookType, CartType } from "../../types/data";
import { SERVER_URL } from "../../constants/values";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/` }),
    endpoints: (builder) => ({
        getAllBooks: builder.query<BookType[], void>({
            query: () => ''
        }),
        getUserCarts: builder.query<{message: string, carts: CartType[]}, string>({
            query: (id) => ({
                url: `/api/user/${id}/carts`,
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
    useGetUserCartsQuery,
    useSearchQuery
} = api;