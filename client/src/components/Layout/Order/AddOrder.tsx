import { PiPlus } from "react-icons/pi"
import Order from "./Order"
import { OrderType } from "../../../types/data"
import Input from "../../UI/Input"
import { useState } from "react";
import { BsCash } from "react-icons/bs";
import { PiPaypalLogoBold } from "react-icons/pi";
import { RiVisaFill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { AppDispatch, RootState } from "../../../features/app/store";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../../../features/orders/orders";

function AddOrder({ orders }: { orders: OrderType[] }) {
    const { cartToOrder } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [phone, setPhone] = useState('');
    const [displayForm, setDisplayForm] = useState(false);

    const handleCreateOrder = (
        e: React.FormEvent,
        userId: number,
        address: string,
        cartsIds: number[],
        phone: string,
        paymentMethod: string
    ) => {
        e.preventDefault();
        dispatch(createNewOrder({
            userId,
            address,
            cartsIds,
            phone,
            paymentMethod,
        }))
        setAddress('');
        setPhone('');
        setPaymentMethod('cash');
        setDisplayForm(false);
    }

    return (
        <div className="flex flex-col gap-2">
            <div className={`p-2`}>
                {
                    orders.length === 0 ? <h1 className="text-xs text-center p-2 bg-gray-200">No Orders</h1> : orders.map(order => <Order key={order.id} orders={[order]} />)
                }
            </div>
            { displayForm &&
                <form className={`flex flex-col gap-2 p-2`}>
                    <h1 className="text-center">New Order</h1>
                    <Input key="address" min={4} max={20} type="text" placeHolder="Address of delivery" defaultValue="" label="Address" onChange={setAddress} />
                    <Input key="phone" min={5} max={12} type="text" placeHolder="Phone for contact" defaultValue="" label="Phone" onChange={setPhone} />
                    <div className="flex p-1 items-center justify-between text-nowrap">
                        <h3 className="text-secondary text-sm">Payment Method</h3>
                        <div className="flex w-fit justify-center gap-2 [&>*]:text-2xl [&>*]:p-1 [&>*]:rounded-md [&>*]:cursor-pointer [&>*]:transition-all max-lg:[&>*]:text-sm">
                            <span title='Cash' onClick={() => setPaymentMethod('cash')} className={`${paymentMethod === 'cash' ? 'bg-info-background' : 'bg-transparent' }`}><BsCash/></span>
                            <span title='PayPal' onClick={() => setPaymentMethod('paypal')} className={`${paymentMethod === 'paypal' ? 'bg-info-background' : 'bg-transparent'}`}><PiPaypalLogoBold/></span>
                            <span title='Visa' onClick={() => setPaymentMethod('visa')} className={`${paymentMethod === 'visa' ? 'bg-info-background' : 'bg-transparent'}`}><RiVisaFill/></span>
                        </div>
                    </div>
                    <button
                    disabled={ cartToOrder === undefined }
                    onClick={(e) => handleCreateOrder(e, cartToOrder!.user_id, address, [cartToOrder!.id], phone, paymentMethod)}
                    className="w-fit mx-auto p-2 bg-black text-white rounded-sm disabled:opacity-50">
                        Submit
                    </button>
                </form>
            }
            <button onClick={() => setDisplayForm(!displayForm)} className="text-white w-full p-2 text-sm flex items-center rounded-md justify-center gap-2 bg-black transition-all hover:bg-opacity-90">
                {
                    displayForm ? <><CgClose />Close Form</> : <><PiPlus/>Create New Order</>
                }
            </button>
        </div>
    )
}

export default AddOrder