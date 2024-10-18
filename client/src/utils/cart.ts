import { CartType } from "../types/data";

export const getCartItem = (cart: CartType, bookId: number) => {
    return cart.items.find(item => item.book_id === bookId);
};