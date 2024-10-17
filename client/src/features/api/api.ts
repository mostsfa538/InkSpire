import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookType, CartType } from "../../types/data";
import { SERVER_URL } from "../../constants/values";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/api/` }),
    endpoints: (builder) => ({
        getAllBooks: builder.query<BookType[], void>({
            query: () => 'user'
        }),
        getUserCarts: builder.query<{message: string, carts: CartType[]}, string>({
            query: (id) => ({
                url: `user/${id}/carts`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        search: builder.query<BookType[], { id: string, searchTerm: string }>({
            query: ({ id, searchTerm }) => ({
                url: `user/${id}/search/${searchTerm}`,
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