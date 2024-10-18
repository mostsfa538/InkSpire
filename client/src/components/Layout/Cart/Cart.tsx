import CartItem from "./CartItem"
import { useState } from "react"
import { CartType } from "../../../types/data"
import { PiEmpty } from "react-icons/pi"
import { TbTrash } from "react-icons/tb"
import { useDispatch } from "react-redux"
import useAuth from "../../../hooks/useAuth"
import { deleteCart, emptyCart, updateCartName } from "../../../features/cart/cart"
import { AppDispatch } from "../../../features/app/store"

function Cart({ cart }: { cart: CartType }) {
    const { user } = useAuth();
    const [cartName, setCartName] = useState(cart.name);
    const [displayCartItems, setDisplayCartItems] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleEmptyCart = async (userId: string, cartId: number) => {
        dispatch(emptyCart({ userId, cartId }));
    }

    const handleDeleteCart = async (userId: string, cartId: number) => {
        dispatch(deleteCart({ userId, cartId }));
    }

    return (
        <>
            <div className="flex justify-between cursor-pointer font-semibold transition-all p-2 rounded-md hover:bg-slate-100">
                <div className="flex-1" onClick={() => setDisplayCartItems(!displayCartItems)}>
                    <input className="text-sm h-full w-autol outline-none bg-transparent"
                    onBlur={() => {
                        if (cartName === cart.name) return;
                        dispatch(updateCartName({ userId: user?.id!, cartId: cart.id, cartName }))
                    }}
                    onChange={(e) => setCartName(e.target.value)}
                    maxLength={20} 
                    size={cartName.length} 
                    defaultValue={cart.name} />
                </div>
                <span className="bg-gray-200 rounded-md overflow-hidden flex [&>*]:p-2">
                    <button className="text-gray-400" onClick={() => handleEmptyCart(user?.id!, cart.id)}><PiEmpty /></button>
                    <button className="bg-error-background text-error-text" onClick={() => handleDeleteCart(user?.id!, cart.id)}><TbTrash /></button>
                    <span className="bg-black text-white text-xs">Add To Orders</span>
                </span>
            </div>
            <div className={`bg-gray-200 px-2 rounded-md ${!displayCartItems ? 'h-0 py-0' : 'h-96 py-2'} max-h-fit overflow-hidden transition-all ease-in-out duration-500`}>
                <div className="flex flex-col gap-2 p-2 overflow-y-auto overflow-x-hidden max-h-40 scroll-">
                    {
                        cart.items.length === 0 ? <p className="text-center text-xs">No items in cart</p> : 
                        cart.items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Cart