import { useState } from "react";
import { OrderType } from "../../../types/data"
import { AppDispatch, RootState } from "../../../features/app/store";
import { useDispatch, useSelector } from "react-redux";
import { BsCash } from "react-icons/bs";
import { PiPaypalLogoBold } from "react-icons/pi";
import { RiVisaFill } from "react-icons/ri";
import { addCartToOrder, checkoutOrder, deleteOrder, removeCartFromOrder } from "../../../features/orders/orders";
import { CgClose } from "react-icons/cg";
import { TbTrash } from "react-icons/tb";
import Cart from "../Cart/Cart";
import { updateCart } from "../../../features/cart/cart";
import { orderBackground, orderStatusText } from "../../../utils/styling";

function OrderDetails({ order }: { order: OrderType }) {
    const { displayViewOrder } = useSelector((state: RootState) => state.UI);
    const { carts, cartToOrder } = useSelector((state: RootState) => state.cart);

    const [displayOrder, setDisplayOrder] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const displayPaymentMethod = (paymentMethod: string) => {
        switch (paymentMethod) {
            case 'visa':
                return <RiVisaFill />
            case 'paypal':
                return <PiPaypalLogoBold />
            case 'cash':
                return <BsCash />
            default:
                return <BsCash />
        }
    }

    const handleAddCartToOrder = async (userId: number, cartId: number, orderId: number) => {
        dispatch(addCartToOrder({ userId, cartId, orderId }))
        const cart = carts.find(cart => cart.id === cartId);

        // add order_id to cart
        if (cart) {
            const updatedCart = { ...cart, order_id: orderId };
            dispatch(updateCart(updatedCart));
        }
    }

    const handleDeleteOrder = async (userId: number, orderId: number) => {
        dispatch(deleteOrder({ userId, orderId }));
        const orderCarts = order.carts;

        // remove order_id from carts in order
        if (orderCarts) {
            orderCarts.forEach(cart => {
                const updatedCart = { ...cart, order_id: null };
                dispatch(updateCart(updatedCart));
            })
        }
    }

    const handleRemoveCartFromOrder = async (userId: number, cartId: number, orderId: number) => {
        dispatch(removeCartFromOrder({ userId, cartId, orderId }))

        // remove order_id from cart
        const cart = carts.find(cart => cart.id === cartId);
        if (cart) {
            const updatedCart = { ...cart, order_id: null };
            dispatch(updateCart(updatedCart));
        }
    }

    const handleCheckout = async () => {
        const response = await dispatch(checkoutOrder({ userId: order.user_id!, orderId: order.id! }));

        if (response.payload) window.location.href = response.payload.approvalUrl
        else alert('Failed to checkout')
    }

    return (
        <div className="flex flex-col gap-2 overflow-hidden">
            <div className={`relative flex gap-2 rounded-md transition-all ${orderBackground(order.order_status!)} border-2 hover:bg-gray-200 p-2`}>
                <div className="flex w-full h-full my-auto gap-2 cursor-pointer items-center justify-between text-nowrap transition-all rounded-md max-md:text-xs" onClick={() => setDisplayOrder(!displayOrder)}>
                    <span className="h-full my-auto">
                        Order Id: <span className="text-black">#{order.id}</span>
                    </span>
                    <span className={`absolute w-full h-3/5 overflow-hidden left-0 top-1/3 opacity-20 text-center text-5xl ${orderStatusText(order.order_status!).color} italic max-md:hidden`}>
                        {orderStatusText(order.order_status!).text}
                    </span>
                    <div className="flex justify-end">
                        <div className="flex gap-1 rounded-lg w-fit items-center bg-white p-1 text-black ">
                            <span className="p-2 bg-info-background rounded-md">
                                {displayPaymentMethod(order.payementMethod!)}
                            </span>
                            <span className="">Total: {' '}
                                <span className="font-extrabold text-success-text">
                                    {order.total_price}$
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1">
                        { !(order.order_status === 'delivering' || order.order_status === 'completed') &&
                            <>
                                { displayViewOrder.type === 'add' ?
                                (
                                    <button
                                    disabled={order.carts!.find(cart => cart.id === cartToOrder?.id) ? true : false}
                                    onClick={() =>  handleAddCartToOrder(order.user_id!, cartToOrder!.id, order.id!)}
                                    className={`px-4 py-1 rounded-md bg-success-background text-success-text font-light disabled:opacity-50`}>
                                        Add
                                    </button>
                                ): displayViewOrder.type === 'checkout' &&
                                (
                                    <button
                                    disabled={order.carts!.length === 0}
                                    onClick={handleCheckout}
                                    className="bg-black text-white p-2 h-fit my-auto text-xs rounded-md font-semibold disabled:opacity-50">Checkout</button>
                                )
                                }
                                <button onClick={() => handleDeleteOrder(order.user_id!, order.id!)}
                                className="rounded-full p-2 w-fit h-fit my-auto bg-error-background text-error-text disabled:opacity-50">
                                    <TbTrash />
                                </button>
                            </>
                        }
                </div>
            </div>
            <div className={`flex flex-col text-sm ${!displayOrder ? 'h-0 py-0' : 'h-96 py-2'} bg-gray-200 rounded-md px-2 max-h-fit overflow-hidden gap-1 transition-all ease-in-out duration-500 [&>*>span]:underline max-lg:text-xs`}>
                <span>
                    <span>Order Status:</span>
                    {` ${order.order_status}`}
                </span>
                <span>
                    <span>Delivered To:</span>
                    {` ${order.address}`}
                </span>
                <span>
                    <span>Phone:</span>
                    {` ${order.phone_number}`}
                    </span>
                <span>
                    <span>Order Date:</span>
                    {` ${new Date(order.createdAt!).toLocaleDateString()}`}
                </span>
                <span>
                    <span>Delivery Date:</span>
                    {` ${new Date(order.deliveryDate!).toLocaleDateString()}`}
                </span>
                <div className="flex flex-col gap-2">
                    <span>Carts:</span>
                    <div className="px-4 flex flex-col gap-2">
                        {
                        order.carts?.map((cart) => (
                        <span key={cart.id} className="p-2 rounded-md bg-white flex items-center justify-between">
                            <div className="flex-1">
                                <Cart key={cart.id} cart={cart} showControls={false} orderId={order.id} />
                            </div>
                            <button onClick={() => handleRemoveCartFromOrder(order.user_id!, cart.id, order.id!)}><CgClose /></button>
                        </span>
                        ))
                    }   
                </div>
            </div>
        </div>
        </div>
    )
}

export default OrderDetails