import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReviewType } from "../../types/data";
import { SERVER_URL } from "../../constants/values";

const baseURL = `${SERVER_URL}/api/user/reviews`;

export const getReviewsByUserId = createAsyncThunk('reviews/getReviewsByUserId', async (userId: number) => {
    const response = await axios.get(`${baseURL}/${userId}`, { withCredentials: true });
    return response.data.reviews as ReviewType[];
});

export const getReviewsByBookId = createAsyncThunk('reviews/getReviewsByBookId', async (bookId: string) => {
    const response = await axios.get(`${SERVER_URL}/reviews/${bookId}`);
    return response.data as ReviewType[];
});

export const createReview = createAsyncThunk('reviews/createReview', async ({ userId, bookId, rating, body }: {
    userId: number,
    bookId: number,
    rating: number,
    body: string
}) => {
    const response = await axios.post(`${baseURL}/${userId}/create`, { userId, bookId, rating, body }, { withCredentials: true });
    return response.data.reviews as ReviewType;
});


export const deleteReview = createAsyncThunk('reviews/deleteReview', async ({ userId, reviewId }: { userId: number, reviewId: number }) => {
    const response = await axios.delete(`${baseURL}/${userId}/delete/${reviewId}`, { withCredentials: true });
    return response.data.reviews as ReviewType;
});

export const updateReview = createAsyncThunk('reviews/updateReview', async ({ userId, bookId, reviewId, rating, body }: {
    userId: number,
    bookId: number,
    reviewId: number,
    rating: number,
    body: string
}) => {
    const response = await axios.put(`${baseURL}/${userId}/update/${reviewId}`, { bookId, rating, body }, { withCredentials: true });
    return response.data.reviews as ReviewType;
});

type ReviewState = {
    reviews: ReviewType[];
}

const initialState = {
    reviews: [],
} as ReviewState;

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews(state, action) {
        state.reviews = action.payload;
    },
  },
    extraReducers: (builder) => {
        builder.addCase(getReviewsByBookId.fulfilled, (state, action) => {
            state.reviews = action.payload;
        });
    },
});

export const { setReviews } = reviewsSlice.actions;

export default reviewsSlice.reducer;