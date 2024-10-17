import Cart from "./Cart"

import { CartType } from "../../../types/data"

import { BiShoppingBag } from 'react-icons/bi'

import { useDispatch, useSelector } from "react-redux"
import { toggleCart } from "../../../features/UI/UI";

function Carts({ carts }: { carts: CartType[] }) {
    const { displayCarts } = useSelector((state: any) => state.UI);
    const dispatch = useDispatch();

    return (
        <div className="flex justify-end z-40">
            <BiShoppingBag className="text-xl text-secondary cursor-pointer max-md:text-sm" onClick={() => dispatch(toggleCart())} />
            <div className="absolute top-full max-w-full max-md:p-2 max-md:left-0">
                <div className={`bg-white py-4 rounded-xl gap-4 ${!displayCarts ? 'w-0 px-0' : 'px-4 w-96 max-w-full'} text-nowrap overflow-hidden transition-all ease-in-out duration-300`}>
                    <h3 className="text-lg font-semibold text-gray-300 underline">Carts</h3>
                    <div className="flex flex-col gap-2">
                        {carts.map((cart) => (
                            <Cart key={cart.id} cart={cart} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carts