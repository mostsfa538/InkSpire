import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookType } from "../../types/data";
import { SERVER_URL } from "../../constants/values";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/api/` }),
    endpoints: (builder) => ({
        getAllBooks: builder.query<BookType[], void>({
            query: () => 'user'
        }),
    }),
});

export const { 
    useGetAllBooksQuery
} = api;