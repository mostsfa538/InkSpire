import { CgClose } from "react-icons/cg"
import { AppDispatch, RootState } from "../../../features/app/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleViewOrder } from "../../../features/UI/UI";
import AddOrder from "./AddOrder";
import Order from "./Order";
import { useEffect } from "react";


function Orders({ type = 'view' }: { type: 'view' | 'add' }) {
    const { orders, orderToView } = useSelector((state: RootState) => state.orders);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="absolute felx flex-col gap-2 bg-white left-1/4 w-1/2 rounded-md top-full p-2 max-lg:left-[20%] max-lg:w-2/3">
            <div className="w-full flex">
                <span className="flex-1"></span>
                <h1 className="flex-1 text-center font-bold text-lg">Orders</h1>
                <span className="flex-1 flex justify-end" onClick={() => dispatch(toggleViewOrder(false))}>
                    <button className="text-error-text">
                        <CgClose/>
                    </button>
                </span>
            </div>
            {
                type === 'view' ? <Order order={orderToView!} /> : <AddOrder orders={orders}/>
            }
        </div>
    )
}

export default Orders