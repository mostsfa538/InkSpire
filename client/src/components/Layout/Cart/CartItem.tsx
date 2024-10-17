import { TbTrash } from 'react-icons/tb'
import { CartItemType } from '../../../types/data'
import Book from '../../Misc/Book'

function CartItem({ item }: { item: CartItemType }) {
    return (
        <div key={item.id} className="flex justify-between items-center gap-2">
            <div className='flex flex-col'>
                <Book book={item.book} style='w-16' direction='flex-row' />
                <p className="text-xs max-md:text-xs">Quantity: {item.quantity}</p>
            </div>
            <button className="bg-error-background text-error-text rounded-md p-2 max-md:text-xs" onClick={() => console.log("TODO: Delete Cart Item")}>
                <TbTrash />
            </button>
        </div>
    )
}

export default CartItem