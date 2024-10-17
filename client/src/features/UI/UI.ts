import { createSlice } from '@reduxjs/toolkit'

export const UISlice = createSlice({
    name: 'UI',
    initialState: {
        displaySideMenu: false,
        displayCarts: false,
        displayCartItems: false,
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
    },
})

export const { toggleSideMenu, toggleCart, toggleCartItems } = UISlice.actions

export default UISlice.reducer