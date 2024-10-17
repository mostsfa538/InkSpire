import { configureStore } from '@reduxjs/toolkit'
import UIReducer from '../UI/UI'
import { api } from '../api/api';



export const store = configureStore({
    reducer: {
        UI: UIReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch