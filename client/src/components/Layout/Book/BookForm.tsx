import { useState } from "react";
import { BookType } from "../../../types/data";
import Input from "../../UI/Input";
import { AppDispatch } from "../../../features/app/store";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "../../../features/admin/admin";

function BookForm({ book, type }: { book?: BookType; type: string }) {
	const [title, setTitle] = useState<string>(book?.title || "");
	const [author, setAuthor] = useState<string>(book?.author || "");
	const [description, setDescription] = useState<string>(
		book?.description || ""
	);
	const [price, setPrice] = useState<number>(book?.price || 0);
	const [category, setCategory] = useState<string>(book?.category || "");
	const [available, setAvailable] = useState<number>(book?.available || 0);
	const [image, setImage] = useState<string>(
		book?.image || "https://placehold.co/400"
	);

	const dispatch = useDispatch<AppDispatch>();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const updatedBook = {
			id: book?.id,
			title,
			author,
			description,
			price: parseInt(price.toString()),
			category,
			available: parseInt(available.toString()),
			image,
		} as BookType;

		if (image.length === 0) updatedBook.image = "https://placehold.co/400";

		if (type === "add") dispatch(addBook(updatedBook));
		if (type === "update") dispatch(updateBook(updatedBook));

		window.location.href = `/catalog/item/${updatedBook.id}`;
	};

	return (
		<form className="flex flex-col gap-2">
			<div className="flex gap-2 max-md:flex-col">
				<div className="flex flex-col gap-2">
					<img src={image} alt={title} className="w-80 h-80 mx-auto" />
					<Input
						type="text"
						defaultValue={image}
						onChange={setImage}
						placeHolder="Image URL"
					/>
				</div>
				<div className="flex flex-col gap-2 w-full text text-black">
					<Input
						type="text"
						defaultValue={title}
						onChange={setTitle}
						placeHolder="Title"
					/>
					<Input
						type="text"
						defaultValue={author}
						onChange={setAuthor}
						placeHolder="Author"
					/>
					<textarea
						className="w-full p-2 rounded-md outline-none border-2 border-gray-200"
						defaultValue={description}
						maxLength={200}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Input
						min={0}
						type="number"
						defaultValue={price}
						onChange={setPrice}
						placeHolder="Price"
					/>
					<Input
						type="text"
						defaultValue={category}
						onChange={setCategory}
						placeHolder="Categories separated by commas (,)"
					/>
					<Input
						min={0}
						type="number"
						defaultValue={available}
						onChange={setAvailable}
						placeHolder="Available"
					/>
					<button
						onClick={handleSubmit}
						className="bg-gradient-to-t text-white from-black to-transparent p-2 rounded-md transition-all hover:bg-black">
						{type === "add" ? "Add" : "Update"}
					</button>
				</div>
			</div>
		</form>
	);
}

export default BookForm;
