import { createSlice } from "@reduxjs/toolkit";
import { NotificationType } from "../../types/data";

type UIState = {
	displaySideMenu: boolean;
	displayCarts: boolean;
	displayCartItems: boolean;
	displayAddToCart: boolean;
	displayViewOrder: {
		display: boolean;
		type: "view" | "add" | "checkout";
	};
	initialSignUp: boolean;
	displayNotification: NotificationType;
};

export const UISlice = createSlice({
	name: "UI",
	initialState: {
		displaySideMenu: false,
		displayCarts: false,
		displayCartItems: false,
		displayAddToCart: false,
		displayViewOrder: {
			display: false,
			type: "view",
		},
		initialSignUp: false,
		displayNotification: {
			display: false,
			message: "",
			type: "success",
			toggle: false,
		},
	} as UIState,
	reducers: {
		toggleSideMenu: (state) => {
			if (state.displayCarts) state.displayCarts = false;
			if (state.displayViewOrder.display)
				state.displayViewOrder.display = false;
			state.displaySideMenu = !state.displaySideMenu;
		},
		toggleCart: (state) => {
			if (state.displaySideMenu) state.displaySideMenu = false;
			if (state.displayViewOrder.display)
				state.displayViewOrder.display = false;
			state.displayCarts = !state.displayCarts;
		},
		toggleCartItems: (state) => {
			state.displayCartItems = !state.displayCartItems;
		},
		toggleAddToCart: (state, action) => {
			state.displayAddToCart = action.payload;
		},
		toggleViewOrder: (state, action) => {
			if (state.displayCarts) state.displayCarts = false;
			if (state.displaySideMenu) state.displaySideMenu = false;
			state.displayViewOrder.display = action.payload;
		},
		setOrderDisplayType: (state, action) => {
			state.displayViewOrder.type = action.payload;
		},
		setInitialSignUp: (state, action) => {
			state.initialSignUp = action.payload;
		},
		setDisplayNotification: (state, action) => {
			state.displayNotification.display = true;

			state.displayNotification.toggle = !state.displayNotification.toggle;
			state.displayNotification.message = action.payload.message;
			state.displayNotification.type = action.payload.type;
		},
	},
});

export const {
	toggleSideMenu,
	toggleCart,
	toggleCartItems,
	toggleAddToCart,
	toggleViewOrder,
	setOrderDisplayType,
	setInitialSignUp,
	setDisplayNotification,
} = UISlice.actions;

export default UISlice.reducer;
