import { createSlice } from '@reduxjs/toolkit'

export const UISlice = createSlice({
    name: 'UI',
    initialState: {
        displaySideMenu: false,
        displayCarts: false,
        displayCartItems: false,
        displayAddToCart: false,
    },
    reducers: {
        toggleSideMenu: (state) => {
            if (state.displayCarts) state.displayCarts = false
            state.displaySideMenu = !state.displaySideMenu
        },
        toggleCart: (state) => {
            if (state.displaySideMenu) state.displaySideMenu = false
            state.displayCarts = !state.displayCarts
        },
        toggleCartItems: (state) => {
            state.displayCartItems = !state.displayCartItems
        },
        toggleAddToCart: (state, action) => {
            state.displayAddToCart = action.payload
        },
    },
})

export const { toggleSideMenu, toggleCart, toggleCartItems, toggleAddToCart } = UISlice.actions

export default UISlice.reducer