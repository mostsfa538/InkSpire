import { useSelector } from "react-redux"
import { RootState } from "../features/app/store"
import Navbar from "../components/Layout/Navbar/Navbar"
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Orders() {
    const { user } = useAuth()

    if (!user) return <Navigate to="/signin" />

    const { orders } = useSelector((state: RootState) => state.orders)
    return (
        <div className="h-full flex flex-col">
            <Navbar />
            {
                orders.length === 0 ? <h1 className="flex-1 flex text-lg justify-center items-center">No orders</h1> :
                (
                    <div>
                        <h1>Orders</h1>
                        <ul>
                            {
                                orders.map((order) => (
                                    <li key={order.id}>
                                        <h3>Order ID: {order.id}</h3>
                                        <p>Order Total: ${order.total}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default Orders