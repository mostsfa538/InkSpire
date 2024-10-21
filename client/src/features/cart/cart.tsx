import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartType } from "../../types/data";
import { SERVER_URL } from "../../constants/values";

const baseURL = `${SERVER_URL}/api/user`

type CartState = {
    cartToOrder: CartType | undefined;
    carts: CartType[];
}

const initialState = {
    cartToOrder: undefined,
    carts: [],
} as CartState;


export const getCartById = createAsyncThunk('cart/getCartById', async ({userId, cartId}: { userId: string, cartId: number }) => {
    const response = await axios.get(`${baseURL}/${userId}/carts/${cartId}`, { withCredentials: true });
    return response.data;
});

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({userId, cartId, itemId}: { userId: string, cartId: number, itemId: number }) => {
    const response = await axios.delete(`${baseURL}/${userId}/cart/${cartId}/cartItem/${itemId}`, { withCredentials: true });
    return response.data.carts;
});

export const addCartItem = createAsyncThunk('cart/addCartItem', async ({userId, cartId, bookId, quantity}: { userId: string, cartId: number, bookId: number, quantity: number }) => {
    const response = await axios.post(`${baseURL}/${userId}/carts/${cartId}/book/${bookId}/${quantity}`, {}, { withCredentials: true });
    return response.data.carts;
});

export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity', async ({userId, cartId, itemId, quantity}: { userId: string, cartId: number, itemId: number, quantity: number }) => {
    const response = await axios.put(`${baseURL}/${userId}/cart/${cartId}/cartItem/${itemId}/${quantity}`, {}, { withCredentials: true });
    return response.data.carts;
});

export const addNewCart = createAsyncThunk('cart/addNewCart', async ({userId, cartName}: { userId: string, cartName: string }) => {
    const response = await axios.post(`${baseURL}/${userId}/carts/${cartName}/add`, {}, { withCredentials: true });
    return response.data.carts;
});

export const updateCartName = createAsyncThunk('cart/updateCartName', async ({userId, cartId, cartName}: { userId: string, cartId: number, cartName: string }) => {
    const response = await axios.put(`${baseURL}/${userId}/carts/${cartId}/name/${cartName}`, {}, { withCredentials: true });
    return response.data.carts;
});

export const emptyCart = createAsyncThunk('cart/emptyCart', async ({userId, cartId}: { userId: string, cartId: number }) => {
    const response = await axios.put(`${baseURL}/${userId}/cart/${cartId}/empty`, {}, { withCredentials: true });
    return response.data.carts;
});

export const deleteCart = createAsyncThunk('cart/deleteCart', async ({userId, cartId}: { userId: string, cartId: number }) => {
    const response = await axios.delete(`${baseURL}/${userId}/carts/${cartId}`, { withCredentials: true });
    return response.data.carts;
});


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCarts: (state, action) => {
            state.carts = action.payload;
        },
        setCartToOrder: (state, action) => {
            state.cartToOrder = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            state.carts = action.payload;
        });

        builder.addCase(addCartItem.fulfilled, (state, action) => {
            state.carts = action.payload;
        });

        builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.carts = action.payload;
        });

        builder.addCase(emptyCart.fulfilled, (state, action) => {
            state.carts = action.payload;
        });

        builder.addCase(deleteCart.fulfilled, (state, action) => {
            state.carts = action.payload;
        });

        builder.addCase(addNewCart.fulfilled, (state, action) => {
            state.carts = action.payload;
        });
    }
});

export const { setCarts, setCartToOrder } = cartSlice.actions;

export default cartSlice.reducer;