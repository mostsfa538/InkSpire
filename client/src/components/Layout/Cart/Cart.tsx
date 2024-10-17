import CartItem from "./CartItem"
import { useState } from "react"
import { CartType } from "../../../types/data"

function Cart({ cart }: { cart: CartType }) {
    const [displayCartItems, setDisplayCartItems] = useState(false)
    return (
        <>
            <div className="cursor-pointer p-2 rounded-md hover:bg-slate-100s" onClick={() => setDisplayCartItems(!displayCartItems)}>
                <h3 className="text-sm font-semibold">{cart.name}</h3>
            </div>
            <div className={`bg-gray-200 px-2 rounded-md ${!displayCartItems ? 'h-0 py-0' : 'h-96 py-2'} max-h-fit overflow-hidden transition-all ease-in-out duration-500`}>
                <div className="flex flex-col gap-2 p-2 overflow-y-auto overflow-x-hidden max-h-40 scroll-">
                    {cart.items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cart