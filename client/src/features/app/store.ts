import { api } from '../api/api';
import { configureStore } from '@reduxjs/toolkit'

import UIReducer from '../UI/UI'
import CartReducer from '../cart/cart'
import OrderReducer from '../orders/orders'
import FavoritesReducer from '../favorites/favorites'



export const store = configureStore({
    reducer: {
        UI: UIReducer,
        cart: CartReducer,
        orders: OrderReducer,
        favorites: FavoritesReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch