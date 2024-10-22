import { OrderType } from "../../../types/data"
import OrderDetails from "./OrderDetails";

function Order({ orders }: { orders: OrderType[] }) {
    return (
        orders.length === 0 ? <h1 className="text-xs text-center p-2 bg-gray-200">No Orders</h1> : orders.map(order => <OrderDetails key={order.id} order={order} />)
    )
}

export default Order