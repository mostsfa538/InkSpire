import { PiPlus } from "react-icons/pi"
import Order from "./Order"
import { OrderType } from "../../../types/data"
import Input from "../../UI/Input"
import { useState } from "react";
import { BsCash } from "react-icons/bs";
import { PiPaypalLogoBold } from "react-icons/pi";
import { RiVisaFill } from "react-icons/ri";

function AddOrder({ orders }: { orders: OrderType[] }) {
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [phone, setPhone] = useState('');
    return (
        <div className="flex flex-col gap-2">
            <div className={`p-2`}>
                {
                    orders.length === 0 ? <h1 className="text-xs text-center p-2 bg-gray-200">No Orders</h1> : orders.map(order => <Order order={order} />)
                }
            </div>
            <form action='none' className="flex flex-col gap-2 font-semibold p-2">
                <h1>New Order</h1>
                <Input type="text" placeHolder="Address" defaultValue="" label="Address" onChange={setAddress} />
                <Input type="text" placeHolder="Phone" defaultValue="" label="Phone" onChange={setPhone} />
                <div className="flex w-full justify-center gap-2 [&>*]:text-2xl [&>*]:p-1 [&>*]:rounded-md [&>*]:cursor-pointer [&>*]:transition-all">
                    <span title='Cash' onClick={() => setPaymentMethod('cash')} className={`${paymentMethod === 'cash' ? 'bg-info-background' : 'bg-transparent' }`}><BsCash/></span>
                    <span title='PayPal' onClick={() => setPaymentMethod('paypal')} className={`${paymentMethod === 'paypal' ? 'bg-info-background' : 'bg-transparent'}`}><PiPaypalLogoBold/></span>
                    <span title='Visa' onClick={() => setPaymentMethod('visa')} className={`${paymentMethod === 'visa' ? 'bg-info-background' : 'bg-transparent'}`}><RiVisaFill/></span>
                </div>
                <button>Submit</button>
            </form>
            <button className="text-white w-full p-2 text-sm flex items-center rounded-md justify-center gap-2 bg-black transition-all hover:bg-opacity-90">
                <PiPlus />Create New Order
            </button>
        </div>
    )
}

export default AddOrder