import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../constants/values";
import axios from "axios";
import { BookType, User } from "../../types/data";

const baseUrl = `${SERVER_URL}/api/admin`;

type AdminState = {
	users: User[];
	books: BookType[];
};

const initialState = {
	users: [],
	books: [],
} as AdminState;

export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
	const response = await axios.get(`${baseUrl}/users`, {
		withCredentials: true,
	});
	return response.data;
});

export const makeAdmin = createAsyncThunk(
	"admin/makeAdmin",
	async (id: number) => {
		const response = await axios.put(
			`${baseUrl}/create`,
			{
				id,
			},
			{ withCredentials: true }
		);
		return response.data;
	}
);

export const addBook = createAsyncThunk(
	"admin/addBook",
	async (book: BookType) => {
		const response = await axios.post(`${baseUrl}/create`, book, {
			withCredentials: true,
		});
		return response.data;
	}
);

export const updateBook = createAsyncThunk(
	"admin/updateBook",
	async (book: BookType) => {
		const title = book.title;
		const author = book.author;
		const description = book.description;
		const price = book.price;
		const category = book.category;
		const available = book.available;
		const image = book.image;

		const response = await axios.put(
			`${baseUrl}/update/${book.id}`,
			{
				title,
				author,
				description,
				price,
				category,
				available,
				image,
			},
			{
				withCredentials: true,
			}
		);
		return response.data;
	}
);

export const deleteBook = createAsyncThunk(
	"admin/deleteBook",
	async (id: number) => {
		const response = await axios.delete(`${baseUrl}/delete/${id}`, {
			withCredentials: true,
		});
		return response.data;
	}
);

export const updateOrderStatus = createAsyncThunk(
	"admin/updateOrderStatus",
	async ({ id, status }: { id: number; status: string }) => {
		const response = await axios.put(
			`${baseUrl}/orders/update/${id}`,
			{ status },
			{ withCredentials: true }
		);
		return response.data;
	}
);

export const deleteOrder = createAsyncThunk(
	"admin/deleteOrder",
	async (id: number) => {
		const response = await axios.delete(`${baseUrl}/orders/delete/${id}`, {
			withCredentials: true,
		});
		return response.data;
	}
);

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllUsers.fulfilled, (state, action) => {
			state.users = action.payload;
		});
	},
});

export default adminSlice.reducer;
