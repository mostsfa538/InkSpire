import Cart from "./Cart"
import { BiShoppingBag } from 'react-icons/bi'

import { useDispatch, useSelector } from "react-redux"

import { setOrderDisplayType, toggleCart, toggleViewOrder } from "../../../features/UI/UI";
import { RootState } from "../../../features/app/store";
import { Link } from "react-router-dom";

function Carts() {
    const { carts } = useSelector((state: RootState) => state.cart);
    const { displayCarts } = useSelector((state: RootState) => state.UI);
    const dispatch = useDispatch();


    return (
        <div className="flex justify-end z-40">
            <BiShoppingBag className="text-xl text-secondary cursor-pointer max-md:text-sm" onClick={() => dispatch(toggleCart())} />
            <div className="absolute top-full max-w-full max-md:p-2 max-md:left-0">
                <div className={`bg-white py-4 rounded-xl gap-4 ${!displayCarts ? 'w-0 px-0' : 'px-4 w-96 max-w-full'} text-nowrap overflow-hidden transition-all ease-in-out duration-300`}>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-300 underline">Carts</h3>
                        <Link to="/checkout" reloadDocument className="text-xs font-bold text-white text-primary bg-black p-1">Checkout</Link>
                    </div>
                        {
                            carts.length === 0 ? <p className="text-center text-xs">No carts available</p> :
                            (
                                <div className="flex flex-col gap-2">
                                    {
                                        carts.map((cart) => {
                                                if (cart.order_id === null) return <Cart key={cart.id} cart={cart} />
                                            } 
                                        )
                                    }
                                    <div className="flex justify-center text-xs">
                                        <button
                                        onClick={() => {
                                            dispatch(toggleViewOrder(true))
                                            dispatch(setOrderDisplayType('view'))
                                        }}
                                        className="p-2 bg-black font-bold text-white">
                                            View Ordered Carts
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                </div>
            </div>
        </div>
    )
}

export default Carts