export type User = {
	id?: number;
	email: string;
	password: string;
	f_name?: string;
	l_name?: string;
	image?: string;
	createdAt?: string;
	updatedAt?: string;
	carts: any[];
	orders: OrderType[];
	reviews: ReviewType[];
	onHold: any[];
	isAdmin: boolean;
	Favorites: FavoritesType[];
};

export type AuthError = {
	status: number;
	msg: string;
};

export type BookType = {
	id: number;
	title: string;
	author: string;
	image: string;
	description: string;
	price: number;
	category: string;
	available: number;
	createdAt: string;
	updatedAt: string;
	sold: number;
};

export type CartType = {
	id: number;
	name: string;
	order_id?: number | null;
	Order: OrderType | null;
	createdAt: string;
	updatedAt: string;
	user_id: number;
	items: CartItemType[];
};

export type CartItemType = {
	id: number;
	book_id: number;
	cart_id: number;
	book: BookType;
	quantity: number;
	createdAt: string;
	updatedAt: string;
};

export type OrderType = {
	id?: number;
	user_id?: number;
	carts?: CartType[];
	total_price?: number;
	createdAt?: string;
	updatedAt?: string;
	address?: string;
	phone_number?: string;
	order_status?: string;
	pendingTime?: string;
	deliveryDate?: string;
	payementMethod?: string;
};

export type FavoritesType = {
	id?: number;
	id_user: number;
	id_book: number;
	book: BookType;
};

export type ReviewType = {
	id: number;
	id_user: number;
	id_book: number;
	rating: number;
	body: string;
	createdAt: string;
	updatedAt: string;
	user: User;
	book: BookType;
};
