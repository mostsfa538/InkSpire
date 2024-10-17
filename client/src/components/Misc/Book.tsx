import { BookType } from "../../types/data"

function Book({ book, style, direction }: { book: BookType, style?: string, direction: string }) {
    return (
        <div className={`flex ${direction} items-center gap-2`}>
            <div className={`${style} bg-white z-20`}>
                <img src={book.image} alt={book.title} className="w-full h-full"/>
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