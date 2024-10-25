import Navbar from "../components/Layout/Navbar/Navbar"
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../features/app/store"
import OrderDetails from "../components/Layout/Order/OrderDetails"
import { useEffect } from "react"
import { setOrderDisplayType } from "../features/UI/UI"

function OrdersRoute() {
    const { user, loading } = useAuth()
    const { orders } = useSelector((state: RootState) => state.orders)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(setOrderDisplayType('checkout'))
    }, [])

    if (!loading && !user) return <Navigate to="/" />

    return (
        <div className="h-full flex flex-col">
            <Navbar />
            <div className="p-4 w-full">
                <h1 className="mx-auto w-full text-2xl text-center font-semibold">Your Orders</h1>
                <div className="flex flex-col p-4 font-bold gap-2">
                    {
                        orders.length === 0 ? <p className="text-center text-lg">No orders available</p> :
                        orders.map((order) => (
                            <OrderDetails key={order.id} order={order} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default OrdersRoute