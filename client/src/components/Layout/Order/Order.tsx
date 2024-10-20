import { useEffect, useState } from "react";
import { BsCash } from "react-icons/bs";
import { PiPaypalLogoBold } from "react-icons/pi";
import { RiVisaFill } from "react-icons/ri";
import { OrderType } from "../../../types/data"
import Cart from "../Cart/Cart"

function Order({ order }: { order: OrderType }) {
    const [displayOrder, setDisplayOrder] = useState(false);

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

    useEffect(() => {
        console.log(order);
    }, []);

    return (
        <div key={order.id} className="flex flex-col gap-2 [&>*]:rounded-md">
            <div className="flex cursor-pointer justify-between p-2 transition-all hover:bg-gray-200" onClick={() => setDisplayOrder(!displayOrder)}>
                <span>
                    Order Id: #<span className="font-bold">{order.id}</span>
                </span>
                <div className="flex gap-1 items-center">
                    <span>
                        {displayPaymentMethod(order.payementMethod!)}
                    </span>
                    <span>Total: {' '}
                        <span className="font-extrabold text-success-text">
                            {order.total_price}$
                        </span>
                    </span>
                </div>
            </div>
            <div className={`flex flex-col text-sm ${!displayOrder ? 'h-0 py-0' : 'h-96 py-2'} bg-gray-200 px-2 max-h-fit overflow-hidden gap-1 transition-all ease-in-out duration-500 [&>*>span]:underline [&>*>span]:font-bold`}>
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
                <div>
                    <span>Carts:</span>
                    <div className="px-4">
                    {
                        order.carts?.map((cart) => (
                            <div key={cart.id} className="flex flex-col gap-2">
                                <Cart cart={cart} showControls={false} />
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Order