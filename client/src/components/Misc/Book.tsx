import { BiShoppingBag, BiStar } from "react-icons/bi"
import { BookType } from "../../types/data"
import AddCart from "../Layout/Cart/AddCart"
import { AppDispatch, RootState } from "../../features/app/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddToCart } from "../../features/UI/UI";

function Book({ book, style, direction }: { book: BookType, style?: string, direction: string }) {
    const { displayAddToCart } = useSelector((state: RootState) => state.UI);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={`flex ${direction} items-center gap-2`}>
            <div className={`${style} bg-white z-20 relative`}>
                <img src={book.image} alt={book.title} className="w-full h-full"/>
                <div onMouseLeave={() => dispatch(toggleAddToCart(false))} className="absolute flex flex-col text-white w-full h-full top-0 opacity-0 transition-all hover:opacity-100">
                    <div className="justify-between text-sm flex transition-all [&>*]:rounded-full [&>*]:bg-black [&>*]:bg-opacity-50 [&>*]:p-2 [&>*]:h-full [&>*]:flex [&>*]:justify-center">
                        <button>
                            <BiStar />
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