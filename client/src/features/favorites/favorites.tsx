import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../constants/values";
import { FavoritesType } from "../../types/data";

const baseURL = `${SERVER_URL}/api/user`

export const getUserFavorites = createAsyncThunk("favorites/getUserFavorites", async (userId: number) => {
    const response = await axios.get(`${baseURL}/favorites/${userId}`, { withCredentials: true });
    return response.data.updatedUser.Favorites;
});

export const addFavorite = createAsyncThunk("favorites/addFavorite", async ({ userId, itemId }: { userId: number, itemId: number }) => {
    const response = await axios.post(`${baseURL}/${userId}/favorites/${itemId}/add`, {}, { withCredentials: true });
    return response.data.updatedUser.Favorites;
});

export const removeFavorite = createAsyncThunk("favorites/removeFavorite", async ({ userId, id }: { userId: number ,id: number }) => {
    const response = await axios.delete(`${baseURL}/${userId}/favorites/${id}/delete`, { withCredentials: true });
    return response.data.updatedUser.Favorites;
});

type FavoritesState = {
    favorites: FavoritesType[]
}

const initialState = {
    favorites: [],
} as FavoritesState;

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload;
        })
        builder.addCase(addFavorite.fulfilled, (state, action) => {
            state.favorites = action.payload;
        })
        builder.addCase(removeFavorite.fulfilled, (state, action) => {
            state.favorites = action.payload;
        })
    }
});

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;