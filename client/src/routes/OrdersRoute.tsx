import Navbar from "../components/Layout/Navbar/Navbar"
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useSelector } from "react-redux"
import { RootState } from "../features/app/store"
import OrderDetails from "../components/Layout/Order/OrderDetails"

function OrdersRoute() {
    const { orders } = useSelector((state: RootState) => state.orders)
    const { user } = useAuth()

    if (!user) return <Navigate to="/signin" />

    return (
        <div className="h-full flex flex-col">
            <Navbar />
            <div className="p-4 w-full">
                <h1 className="mx-auto w-full text-2xl text-center font-semibold">Your Orders</h1>
                <div className="flex flex-col gap-2 p-4">
                    {
                        orders.length === 0 ? <p className="text-center text-lg">No orders available</p> :
                        orders.map((order) => (
                            <div className="bg-white p-2 rounded-lg">
                                <OrderDetails order={order} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default OrdersRoute