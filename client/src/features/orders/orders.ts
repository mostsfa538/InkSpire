import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderType } from "../../types/data";
import axios from "axios";
import { SERVER_URL } from "../../constants/values";

const baseURL = `${SERVER_URL}/api/user`

type OrderState = {
    orderToView: OrderType | null;
    orders: OrderType[];
}

const initialState = {
    orderToView: null,
    orders: [],
} as OrderState;

export const getOrderByID = createAsyncThunk('orders/getOrderByID', async ({ userId, orderId }: { userId: string, orderId: number }) => {
    const response = await axios.get(`${baseURL}/${userId}/order/${orderId}`, { withCredentials: true });
    return response.data;
});


const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },

        setOrderToView: (state, action) => {
            state.orderToView = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOrderByID.fulfilled, (state, action) => {
            state.orderToView = action.payload;
        });
    }
});

export const { setOrders, setOrderToView } = ordersSlice.actions;

export default ordersSlice.reducer;