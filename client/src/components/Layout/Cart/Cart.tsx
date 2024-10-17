import axios from "axios"
import CartItem from "./CartItem"
import { useEffect, useState } from "react"
import { CartItemType, CartType } from "../../../types/data"

const getBook = async (id: number) => {
    const allBooks = (await axios.get("http://localhost:3000/api/admin")).data
    return allBooks.find((book: any) => book.id === id)
}

const getCartBooks = async (items: CartItemType[]) => {
    let itemsWithBooks = []

    for (let item of items) {
        let book = await getBook(item.book_id)
        itemsWithBooks.push({ ...item, book })
    }

    return itemsWithBooks
}

function Cart({ cart }: { cart: CartType }) {
    const [displayCartItems, setDisplayCartItems] = useState(false)
    const [cartItems, setCartItems] = useState<CartItemType[]>([])

    useEffect(() => {
        getCartBooks(cart.items).then((items) => setCartItems(items))
    }, [])

    return (
        <>
            <div className="cursor-pointer p-2 rounded-md hover:bg-slate-100s" onClick={() => setDisplayCartItems(!displayCartItems)}>
                <h3 className="text-sm font-semibold">{cart.name}</h3>
            </div>
            <div className={`bg-gray-200 px-2 rounded-md ${!displayCartItems ? 'h-0 py-0' : 'h-96 py-2'} max-h-fit overflow-hidden transition-all ease-in-out duration-500`}>
                <div className="flex flex-col gap-2 p-2">
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cart