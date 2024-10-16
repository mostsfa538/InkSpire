import { TbTrash } from 'react-icons/tb'
import { CartItemType } from '../../../types/data'

function CartItem({ item }: { item: CartItemType }) {
    return (
        <div key={item.id} className="flex justify-between items-center gap-2">
            <div className="flex gap-2">
                <img src={item.book.image} alt={item.book.title} className="h-16" />
                <div>
                    <h4 className="text-sm font-bold text-secondary">{item.book.title}</h4>
                    <p className="text-xs font-semibold">{item.book.author}</p>
                    <p className="text-xs max-md:text-xs">Price: ${item.book.price}</p>
                    <p className="text-xs max-md:text-xs">Quantity: {item.quantity}</p>
                </div>
            </div>
            <button className="bg-error-background text-error-text rounded-md p-2 max-md:text-xs" onClick={() => console.log("TODO: Delete Cart Item")}>
                <TbTrash />
            </button>
        </div>
    )
}

export default CartItem