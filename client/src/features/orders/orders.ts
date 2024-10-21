import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderType } from "../../types/data";
import axios from "axios";
import { SERVER_URL } from "../../constants/values";

const baseURL = `${SERVER_URL}/api/user`

type OrderState = {
    orderToView: OrderType | undefined;
    orders: OrderType[];
}

const initialState = {
    orderToView: undefined,
    orders: [],
} as OrderState;

export const getOrderByID = createAsyncThunk('orders/getOrderByID', async ({ userId, orderId }: { userId: string, orderId: number }) => {
    const response = await axios.get(`${baseURL}/${userId}/order/${orderId}`, { withCredentials: true });
    console.log(response.data.orders);
    return response.data.order;
});

export const removeCartFromOrder = createAsyncThunk('orders/removeCartFromOrder', async ({ userId, orderId, cartId }: { userId: number, orderId: number, cartId: number }) => {
    const response = await axios.delete(`${baseURL}/${userId}/order/${orderId}/cart/${cartId}`, { withCredentials: true });
    return response.data.orders;
});

export const addCartToOrder = createAsyncThunk('orders/addCartToOrder', async ({ userId, orderId, cartId }: { userId: number, orderId: number, cartId: number }) => {
    const response = await axios.put(`${baseURL}/${userId}/order/${orderId}/cart/${cartId}`, {}, { withCredentials: true });
    return response.data.orders;
});

export const createNewOrder = createAsyncThunk('orders/createNewOrder', async ({ userId, address, phone, cartsIds, paymentMethod }: { userId: number, address: string, phone: string, cartsIds: number[], paymentMethod: string }) => {
    const response = await axios.post(`${baseURL}/${userId}/order/carts/${address}/${phone}/${paymentMethod}`, { cartsIds }, { withCredentials: true });
    return response.data.orders;
});

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async ({ userId, orderId }: { userId: number, orderId: number }) => {
    const response = await axios.delete(`${baseURL}/${userId}/order/${orderId}`, { withCredentials: true });
    return response.data.orders;
});

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOrderByID.fulfilled, (state, action) => {
            state.orderToView = action.payload;
        });
        builder.addCase(addCartToOrder.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
        builder.addCase(createNewOrder.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
        builder.addCase(removeCartFromOrder.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.orders = action.payload
        });
    }
});

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;