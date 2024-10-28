import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../features/app/store";
import {
	addCartItem,
	addNewCart,
	getCartById,
	updateCartItemQuantity,
} from "../../../features/cart/cart";
import useAuth from "../../../hooks/useAuth";
import { getCartItem } from "../../../utils/cart";
import { BookType, CartType } from "../../../types/data";
import { toggleAddToCart } from "../../../features/UI/UI";
import { PiPlus } from "react-icons/pi";
import { useState } from "react";

function AddCart({ book }: { book: BookType }) {
	const { user } = useAuth();
	const { carts } = useSelector((state: RootState) => state.cart);

	const [newCartName, setNewCartName] = useState("");
	const [displayNewCart, setDisplayNewCart] = useState(false);

	const dispatch = useDispatch<AppDispatch>();

	const handleAddNewCart = async (
		e: React.FormEvent,
		userId: number,
		cartName: string
	) => {
		e.preventDefault();
		const name = cartName === "" ? "New Cart" : cartName.trim();
		const res = await dispatch(addNewCart({ userId, cartName: name }));

		if (res.meta.requestStatus === "fulfilled") {
			setNewCartName("");
		}
	};

	const handleAddCartItem = async (
		userId: number,
		cartId: number,
		bookId: number,
		quantity: number
	) => {
		const cart = (await dispatch(getCartById({ userId, cartId }))).payload
			.cart as CartType;
		if (cart.order_id !== null) return;

		const res = await dispatch(
			addCartItem({ userId, cartId, bookId, quantity })
		);

		if (res.meta.requestStatus === "rejected") {
			const item = getCartItem(cart, bookId);
			dispatch(
				updateCartItemQuantity({
					userId,
					cartId,
					itemId: item!.id,
					quantity: item!.quantity + 1,
				})
			);
		}

		dispatch(toggleAddToCart(false));
	};

	return (
		<div className="flex flex-col gap-2 font-semibold p-2">
			{carts.length === 0 ? (
				<p>No carts available</p>
			) : (
				<div className="flex flex-col gap-1">
					<p>Choose cart to add to</p>
					{carts.map(
						(cart: CartType) =>
							!cart.order_id && (
								<h3
									key={cart.id}
									onClick={() =>
										handleAddCartItem(user?.id!, cart.id, book.id, 1)
									}
									className="p-1 text-white cursor-pointer text-start rounded-md bg-black overflow-hidden text-ellipsis">
									{cart.name}
								</h3>
							)
					)}
				</div>
			)}
			{displayNewCart && (
				<form className="relative flex flex-1 items-center [&>*]:outline-none">
					<input
						className="text-black bg-white bg-opacity-65 flex-1 text-sm py-1 px-4 rounded-full font-normal"
						autoFocus
						maxLength={20}
						type="text"
						value={newCartName}
						onChange={(e) => setNewCartName(e.target.value)}
					/>
					<button
						className="absolute bg-success-background right-0 my-auto text-success-text flex-1 rounded-full p-1"
						onClick={(e) => handleAddNewCart(e, user?.id!, newCartName)}>
						<PiPlus />
					</button>
				</form>
			)}
			<button
				onClick={() => {
					setDisplayNewCart(true);
				}}
				className="bg-gradient-to-b from-transparent to-black p-2 text-sm flex items-center rounded-md justify-center gap-2 transition-all ease-in-out hover:bg-black">
				<PiPlus />
				Add Cart
			</button>
		</div>
	);
}

export default AddCart;
