import { TbMinus, TbPlus, TbTrash } from "react-icons/tb";
import { CartItemType } from "../../../types/data";
import Book from "../../Misc/Book";
import {
	deleteCartItem,
	updateCartItemQuantity,
} from "../../../features/cart/cart";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features/app/store";
import {
	deleteItemFromOrder,
	updateOrderItemQuantity,
} from "../../../features/orders/orders";
import { sendNotfication } from "../../../utils/styling";

function CartItem({
	item,
	showControls = true,
	orderId,
}: {
	item: CartItemType;
	showControls?: boolean;
	orderId?: number;
}) {
	const { user } = useAuth();
	const dispatch = useDispatch<AppDispatch>();

	const handleIncrementItem = async (
		userId: number,
		cartId: number,
		itemId: number
	) => {
		if (orderId) {
			dispatch(
				updateOrderItemQuantity({
					userId: userId,
					orderId,
					cartId,
					itemId,
					quantity: item.quantity + 1,
				})
			);
		} else {
			dispatch(
				updateCartItemQuantity({
					userId,
					cartId,
					itemId,
					quantity: item.quantity + 1,
				})
			);
		}

		sendNotfication(
			{
				message:
					item.quantity + 1 >= item.book.available
						? "Max quantity"
						: "Quantity updated",
				type: item.quantity + 1 >= item.book.available ? "error" : "info",
			},
			dispatch
		);
	};

	const handleDecrementItem = async (
		userId: number,
		cartId: number,
		itemId: number
	) => {
		if (orderId) {
			if (item.quantity === 1) {
				dispatch(
					deleteItemFromOrder({ userId: userId, orderId, cartId, itemId })
				);
				return;
			}
			dispatch(
				updateOrderItemQuantity({
					userId: userId,
					orderId,
					cartId,
					itemId,
					quantity: item.quantity - 1,
				})
			);
		} else {
			if (item.quantity === 1) {
				dispatch(deleteCartItem({ userId, cartId, itemId }));
				return;
			}
			dispatch(
				updateCartItemQuantity({
					userId,
					cartId,
					itemId,
					quantity: item.quantity - 1,
				})
			);
		}

		sendNotfication(
			{
				message: item.quantity - 1 <= 0 ? "Item deleted" : "Quantity updated",
				type: item.quantity - 1 <= 0 ? "error" : "info",
			},
			dispatch
		);
	};

	const handleDeleteItem = async (
		userId: number,
		cartId: number,
		itemId: number
	) => {
		if (orderId) {
			dispatch(
				deleteItemFromOrder({ userId: userId, orderId, cartId, itemId })
			);
		} else {
			dispatch(deleteCartItem({ userId, cartId, itemId }));
		}

		sendNotfication(
			{
				message: "Item deleted",
				type: "error",
			},
			dispatch
		);
	};

	return (
		<div key={item.id} className="flex justify-between items-center gap-2">
			<div className="flex flex-col">
				<Book book={item.book} style="w-16" direction="flex-row" />
				<p className="text-xs max-md:text-xs">Quantity: {item.quantity}</p>
			</div>
			{showControls && (
				<div className="relative rounded-lg overflow-hidden h-full w-fit flex flex-col border border-white">
					<button
						className="bg-success-background text-success-text p-2 max-md:text-xs"
						onClick={() =>
							handleIncrementItem(user?.id!, item.cart_id, item.id)
						}>
						<TbPlus />
					</button>
					<button
						className="bg-error-background text-error-text p-2 max-md:text-xs"
						onClick={() => handleDeleteItem(user?.id!, item.cart_id, item.id)}>
						<TbTrash />
					</button>
					<button
						className="bg-info-background text-info-text p-2 max-md:text-xs"
						onClick={() =>
							handleDecrementItem(user?.id!, item.cart_id, item.id)
						}>
						<TbMinus />
					</button>
				</div>
			)}
		</div>
	);
}

export default CartItem;
