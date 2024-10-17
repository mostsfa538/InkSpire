import { configureStore } from '@reduxjs/toolkit'
import UIReducer from '../UI/UI'



export const store = configureStore({
    reducer: {
        UI: UIReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch