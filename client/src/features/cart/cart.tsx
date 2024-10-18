import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartType } from "../../types/data";
import { SERVER_URL } from "../../constants/values";

type CartState = {
    carts: CartType[];
}

const initialState = {
    carts: [],
} as CartState;


export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({userId, cartId, itemId}: { userId: string, cartId: number, itemId: number }) => {
    const response = await axios.delete(`${SERVER_URL}/api/user/${userId}/cart/${cartId}/cartItem/${itemId}`, { withCredentials: true });
    return response.data;
});


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCarts: (state, action) => {
            state.carts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            console.log(action.payload);
        });
    }
});

export const { setCarts } = cartSlice.actions;

export default cartSlice.reducer;