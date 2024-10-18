import { TbTrash } from 'react-icons/tb'
import { CartItemType } from '../../../types/data'
import Book from '../../Misc/Book'
import { deleteCartItem } from '../../../features/cart/cart';
import useAuth from '../../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../features/app/store';

function CartItem({ item }: { item: CartItemType }) {
    const { user } = useAuth();
    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteItem = async (userId: string, cartId: number, itemId: number) => {
        dispatch(deleteCartItem({ userId, cartId, itemId }));
    }

    return (
        <div key={item.id} className="flex justify-between items-center gap-2">
            <div className='flex flex-col'>
                <Book book={item.book} style='w-16' direction='flex-row' />
                <p className="text-xs max-md:text-xs">Quantity: {item.quantity}</p>
            </div>
            <button className="bg-error-background text-error-text rounded-md p-2 max-md:text-xs" onClick={() => handleDeleteItem(user?.id!, item.cart_id, item.id)}>
                <TbTrash />
            </button>
        </div>
    )
}

export default CartItem