import { OrderType } from "../../../types/data"
import OrderDetails from "./OrderDetails";

function Order({ orders }: { orders: OrderType[] }) {
    return (
        orders.map(order => (
            <div key={order.id} className="flex flex-col gap-2 [&>*]:rounded-md max-md:text-xs">
                <OrderDetails order={order} />
                <hr />
            </div>
            )
        )
    )
}

export default Order