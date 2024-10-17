export type User = {
    id?: string;
    email: string;
    password: string;
    f_name?: string;
    l_name?: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    carts: any[];
    orders: any[];
    reviews: any[];
    onHold: any[];
    favorites: any[];
};

export type AuthError = {
    status: number;
    msg: string;
}

export type BookType = {
    id: number,
    title: string,
    author: string,
    image: string,
    description: string,
    price: number,
    category: string,
    available: number,
    createdAt: string,
    updatedAt: string,
    sold: number
}

export type CartType = {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string,
    user_id: number,
    items: CartItemType[]
}

export type CartItemType = {
    id: number,
    book_id: number,
    book: BookType,
    quantity: number,
    createdAt: string,
    updatedAt: string,
}