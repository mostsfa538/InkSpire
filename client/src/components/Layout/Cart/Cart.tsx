import CartItem from "./CartItem";
import { useState } from "react";
import { CartType } from "../../../types/data";
import { PiEmpty } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { useDispatch } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import {
	deleteCart,
	emptyCart,
	setCartToOrder,
	updateCartName,
} from "../../../features/cart/cart";
import { AppDispatch } from "../../../features/app/store";
import { setOrderDisplayType, toggleViewOrder } from "../../../features/UI/UI";
import { getOrderByID } from "../../../features/orders/orders";
import { sendNotfication } from "../../../utils/styling";

function Cart({
	cart,
	showControls = true,
	orderId,
}: {
	cart: CartType;
	showControls?: boolean;
	orderId?: number;
}) {
	const { user } = useAuth();
	const [cartName, setCartName] = useState(cart.name);
	const [displayCartItems, setDisplayCartItems] = useState(false);
	const dispatch = useDispatch<AppDispatch>();

	const handleEmptyCart = async (userId: number, cartId: number) => {
		dispatch(emptyCart({ userId, cartId }));
		setDisplayCartItems(true);
	};

	const handleDeleteCart = async (userId: number, cartId: number) => {
		dispatch(deleteCart({ userId, cartId }));
	};

	const handleAddOrder = async (userId: number, cart: CartType) => {
		if (cart.order_id !== null) {
			dispatch(getOrderByID({ userId, orderId: cart.order_id! })).then(() => {
				dispatch(setOrderDisplayType("view"));
				dispatch(toggleViewOrder(true));
			});
		} else {
			dispatch(setCartToOrder(cart));
			dispatch(setOrderDisplayType("add"));
			dispatch(toggleViewOrder(true));
		}
	};

	return (
		<>
			<div className="flex justify-between cursor-pointer font-semibold transition-all p-2 rounded-md hover:bg-slate-100">
				<div
					className="flex-1"
					onClick={() => setDisplayCartItems(!displayCartItems)}>
					{showControls ? (
						<input
							className="text-sm h-full outline-none bg-transparent"
							onBlur={() => {
								if (cartName === cart.name) return;
								dispatch(
									updateCartName({
										userId: user?.id!,
										cartId: cart.id,
										cartName,
									})
								);
								sendNotfication(
									{
										message: "Cart name updated",
										type: "success",
									},
									dispatch
								);
							}}
							onChange={(e) => setCartName(e.target.value)}
							maxLength={20}
							size={cartName.length}
							defaultValue={cart.name}
						/>
					) : (
						<h1>{cart.name}</h1>
					)}
				</div>
				{showControls && (
					<span className="bg-gray-200 rounded-md overflow-hidden flex [&>*]:p-2">
						<button
							className="text-gray-400"
							onClick={() => handleEmptyCart(user?.id!, cart.id)}>
							<PiEmpty />
						</button>
						<button
							className="bg-error-background text-error-text"
							onClick={() => handleDeleteCart(user?.id!, cart.id)}>
							<TbTrash />
						</button>
						<button
							className="bg-black text-white text-xs"
							onClick={() => handleAddOrder(user?.id!, cart)}>
							Add Order
						</button>
					</span>
				)}
			</div>
			<div
				className={`bg-gray-200 px-2 rounded-md ${
					!displayCartItems ? "h-0 py-0" : "h-96 py-2"
				} max-h-fit overflow-hidden transition-all ease-in-out duration-500`}>
				<div
					className={`flex flex-col gap-2 p-2 overflow-y-auto overflow-x-hidden max-h-40`}>
					{cart.items.length === 0 ? (
						<p className="text-center text-xs">No items in cart</p>
					) : (
						cart.items.map((item) => (
							<CartItem
								key={item.id}
								item={item}
								orderId={orderId}
								showControls={cart.order_id ? false : true}
							/>
						))
					)}
				</div>
			</div>
		</>
	);
}

export default Cart;
