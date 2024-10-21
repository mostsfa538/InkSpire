import { useState } from "react";
import { OrderType } from "../../../types/data"
import { AppDispatch, RootState } from "../../../features/app/store";
import { useDispatch, useSelector } from "react-redux";
import { BsCash } from "react-icons/bs";
import { PiPaypalLogoBold } from "react-icons/pi";
import { RiVisaFill } from "react-icons/ri";
import { addCartToOrder, deleteOrder, removeCartFromOrder } from "../../../features/orders/orders";
import { CgClose } from "react-icons/cg";
import { TbTrash } from "react-icons/tb";

function OrderDetails({ order }: { order: OrderType }) {
    const { displayViewOrder } = useSelector((state: RootState) => state.UI);
    const { cartToOrder } = useSelector((state: RootState) => state.cart);

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

    const handleDeleteOrder = async (userId: number, orderId: number) => {
        dispatch(deleteOrder({ userId, orderId }));
    }

    const handleRemoveCartFromOrder = async (userId: number, cartId: number, orderId: number) => {
        dispatch(removeCartFromOrder({ userId, cartId, orderId }));
    }

    return (
        <>
            <div className="flex gap-2 cursor-pointer justify-between p-2 text-nowrap transition-all hover:bg-gray-200" onClick={() => setDisplayOrder(!displayOrder)}>
                <span className="w-full h-full my-auto">
                    Order Id: #<span className="text-info-text">{order.id}</span>
                </span>
            <div className="flex gap-1 items-center">
                <span className="p-1 bg-info-background">
                    {displayPaymentMethod(order.payementMethod!)}
                </span>
                <span>Total: {' '}
                    <span className="font-extrabold text-success-text">
                        {order.total_price}$
                    </span>
                </span>
            </div>
            <div className="flex gap-1">
                {displayViewOrder.type === 'add' &&
                    <button 
                    disabled={
                        order.order_status === 'delivered' || 
                        order.payementMethod !== 'cash' ||
                        order.carts?.map(cart => cart.id).includes(cartToOrder!.id)
                    }
                    onClick={() => dispatch(addCartToOrder({ userId: order.user_id!, cartId: cartToOrder!.id, orderId: order.id! })) }
                    className={`px-4 py-1 rounded-md bg-success-background text-success-text font-light disabled:opacity-50`}>
                        Add
                    </button>
                }
                <button 
                    disabled={
                        order.order_status === 'delivered' || 
                        order.payementMethod !== 'cash'
                    }
                onClick={() => handleDeleteOrder(order.user_id!, order.id!)}
                className="rounded-full p-2 bg-error-background text-error-text disabled:opacity-50">
                    <TbTrash />
                </button>
            </div>
            </div>
            <div className={`flex flex-col text-sm ${!displayOrder ? 'h-0 py-0' : 'h-96 py-2'} bg-gray-200 px-2 max-h-fit overflow-hidden gap-1 transition-all ease-in-out duration-500 [&>*>span]:underline max-lg:text-xs`}>
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
                            <span>{cart.name}</span>
                            {order.payementMethod === 'cash' && <button onClick={() => handleRemoveCartFromOrder(order.user_id!, cart.id, order.id!)}><CgClose /></button>}
                        </span>
                        ))
                    }   
                </div>
            </div>
        </div>
        </>
    )
}

export default OrderDetails