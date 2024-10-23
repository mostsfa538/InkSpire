import AddCart from "../Layout/Cart/AddCart"

import { BsStarFill } from "react-icons/bs";
import { BiShoppingBag, BiStar } from "react-icons/bi"

import { useDispatch, useSelector } from "react-redux";

import { BookType } from "../../types/data"

import { toggleAddToCart } from "../../features/UI/UI";
import { AppDispatch, RootState } from "../../features/app/store";
import { addFavorite, removeFavorite } from "../../features/favorites/favorites";
import useAuth from "../../hooks/useAuth";

function Book({ book, style, direction }: { book: BookType, style?: string, direction: string }) {
    const { user } = useAuth();
    const { displayAddToCart } = useSelector((state: RootState) => state.UI);
    const { favorites } = useSelector((state: RootState) => state.favorites);
    const dispatch = useDispatch<AppDispatch>();

    const checkFavorite = (book: BookType) => {
        // return the favorite if it exists
        return favorites.find(fav => fav.id_book === book.id);
    }

    const handleToggleFavorite = (userId: number, book: BookType) => {
        const fav = checkFavorite(book);
        if (fav) {
            dispatch(removeFavorite({ userId: fav.id_user ,id: fav.id! }));
        } else {
            dispatch(addFavorite({ userId, itemId: book.id }));
        }
    }

    return (
        <div className={`flex ${direction} items-center gap-2`}>
            <div className={`${style} bg-white z-20 relative`}>
                <img src={book.image} alt={book.title} className="w-full h-full"/>
                { user &&
                    <div onMouseLeave={() => dispatch(toggleAddToCart(false))} className="absolute flex flex-col text-white w-full h-full top-0 opacity-0 transition-all hover:opacity-100">
                        <div className="justify-between text-sm flex transition-all [&>*]:rounded-full [&>*]:bg-black [&>*]:bg-opacity-50 [&>*]:p-2 [&>*]:h-full [&>*]:flex [&>*]:justify-center">
                            <button onClick={() => handleToggleFavorite(user?.id!, book)}>
                                { checkFavorite(book) ? <BsStarFill className="text-yellow-400" /> : <BiStar /> }
                            </button>
                            <button onClick={() => dispatch(toggleAddToCart(!displayAddToCart))}>
                                <BiShoppingBag />
                            </button>
                        </div>
                        <div className="flex-1 p-3">
                        { displayAddToCart &&
                            <div className="bg-black bg-opacity-50 rounded-lg h-full">
                                <AddCart book={book} />
                            </div>
                        }
                        </div>
                    </div>
                }
            </div>
            <div>
                <h4 className="text-sm font-bold text-secondary max-w-48 overflow-hidden text-ellipsis mx-auto">{book.title}</h4>
                <p className="text-xs font-semibold">{book.author}</p>
                <p className="text-xs max-md:text-xs">Price: ${book.price}</p>
            </div>
        </div>
    )
}

export default Book