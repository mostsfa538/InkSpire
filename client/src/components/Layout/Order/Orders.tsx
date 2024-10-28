import { CgClose } from "react-icons/cg"
import { AppDispatch, RootState } from "../../../features/app/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleViewOrder } from "../../../features/UI/UI";
import AddOrder from "./AddOrder";
import Order from "./Order";


function Orders({ type = 'view' }: { type: 'view' | 'add' | 'checkout' }) {
    const { orders, orderToView } = useSelector((state: RootState) => state.orders);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="felx flex-col gap-2 bg-white rounded-md p-2 font-semibold max-h-96 overflow-auto max-lg:text-sm">
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
                type === 'view' ? <Order orders={orderToView ? [orderToView] : orders} /> : <AddOrder orders={orders} />
            }
        </div>
    )
}

export default Orders