import { createSlice } from '@reduxjs/toolkit'

type UIState = {
    displaySideMenu: boolean;
    displayCarts: boolean;
    displayCartItems: boolean;
    displayAddToCart: boolean;
    displayViewOrder: {
        display: boolean;
        type: 'view' | 'add';
    };
}

export const UISlice = createSlice({
    name: 'UI',
    initialState: {
        displaySideMenu: false,
        displayCarts: false,
        displayCartItems: false,
        displayAddToCart: false,
        displayViewOrder: {
            display: false,
            type: 'view'
        },
    } as UIState,
    reducers: {
        toggleSideMenu: (state) => {
            if (state.displayCarts) state.displayCarts = false
            if (state.displayViewOrder.display) state.displayViewOrder.display = false
            state.displaySideMenu = !state.displaySideMenu
        },
        toggleCart: (state) => {
            if (state.displaySideMenu) state.displaySideMenu = false
            if (state.displayViewOrder.display) state.displayViewOrder.display = false
            state.displayCarts = !state.displayCarts
        },
        toggleCartItems: (state) => {
            state.displayCartItems = !state.displayCartItems
        },
        toggleAddToCart: (state, action) => {
            state.displayAddToCart = action.payload
        },
        toggleViewOrder: (state, action) => {
            if (state.displayCarts) state.displayCarts = false
            if (state.displaySideMenu) state.displaySideMenu = false
            state.displayViewOrder.display = action.payload
        },
        setOrderDisplayType: (state, action) => {
            state.displayViewOrder.type = action.payload
        }
    },
})

export const { 
    toggleSideMenu, 
    toggleCart, 
    toggleCartItems, 
    toggleAddToCart, 
    toggleViewOrder,
    setOrderDisplayType
} = UISlice.actions

export default UISlice.reducer