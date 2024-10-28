import { BookType } from "../../../types/data";

type BookCardProps = {
	book: BookType;
	avgRating: number;
	imgRef: React.RefObject<HTMLImageElement>;
};

function BookCard({ book, avgRating, imgRef }: BookCardProps) {
	return (
		<div className="flex gap-2 max-md:flex-col">
			<img
				ref={imgRef}
				src={book?.image}
				alt={book?.title}
				className="w-60 h-80 mx-auto"
			/>
			<div className="[&>*>span]:font-bold [&>*>span]:underline [&>*]:border-b-2 [&>*]:border-gray-400 [&>*]:py-2">
				<h4>
					<span>Rating:</span> {avgRating}/5
				</h4>
				<h4>
					<span>Author:</span> {book?.author}
				</h4>
				<h4>
					<span>Description:</span> {book?.description}
				</h4>
				<h4>
					<span>Price:</span> {book?.price}$
				</h4>
				<h4>
					<span>Sold:</span>{" "}
					{book?.sold! >= book?.available! ? (
						<span className="h4-1 text-sm border-2 text-error-text mx-1 border-error-border ">
							Sold Out!
						</span>
					) : (
						book?.sold
					)}
				</h4>
				<h4>
					<span>Available:</span> {book?.available}
				</h4>
				<h4>
					<span>Categories:</span> {book?.category}
				</h4>
			</div>
		</div>
	);
}

export default BookCard;
