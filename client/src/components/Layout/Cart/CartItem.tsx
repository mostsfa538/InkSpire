import { TbMinus, TbPlus, TbTrash } from 'react-icons/tb'
import { CartItemType } from '../../../types/data'
import Book from '../../Misc/Book'
import { deleteCartItem, updateCartItemQuantity } from '../../../features/cart/cart';
import useAuth from '../../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../features/app/store';

function CartItem({ item }: { item: CartItemType }) {
    const { user } = useAuth();
    const dispatch = useDispatch<AppDispatch>();

    const handleIncrementItem = async (userId: string, cartId: number, itemId: number) => {
        dispatch(updateCartItemQuantity({ userId, cartId, itemId, quantity: item.quantity + 1 }));
    }

    const handleDecrementItem = async (userId: string, cartId: number, itemId: number) => {
        dispatch(updateCartItemQuantity({ userId, cartId, itemId, quantity: item.quantity - 1 }));
    }

    const handleDeleteItem = async (userId: string, cartId: number, itemId: number) => {
        dispatch(deleteCartItem({ userId, cartId, itemId }));
    }

    return (
        <div key={item.id} className="flex justify-between items-center gap-2">
            <div className='flex flex-col'>
                <Book book={item.book} style='w-16' direction='flex-row' />
                <p className="text-xs max-md:text-xs">Quantity: {item.quantity}</p>
            </div>
            <div className='relative rounded-lg overflow-hidden h-full w-fit flex flex-col border border-white'>
                <button className="bg-success-background text-success-text p-2 max-md:text-xs" onClick={() => handleIncrementItem(user?.id!, item.cart_id, item.id)}>
                    <TbPlus />
                </button>
                <button className="bg-error-background text-error-text p-2 max-md:text-xs" onClick={() => handleDeleteItem(user?.id!, item.cart_id, item.id)}>
                    <TbTrash />
                </button>
                <button className="bg-info-background text-info-text p-2 max-md:text-xs" onClick={() => handleDecrementItem(user?.id!, item.cart_id, item.id)}>
                    <TbMinus />
                </button>
            </div>
        </div>
    )
}

export default CartItem