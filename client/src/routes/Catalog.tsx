import Navbar from "../components/Layout/Navbar/Navbar";
import { api } from "../features/api/api";
import Book from "../components/Misc/Book";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/app/store";
import { BookType } from "../types/data";
import { useEffect, useState } from "react";

function Catalog() {
	const [data, setData] = useState<BookType[] | undefined>(undefined);

	const [searchParams] = useSearchParams();
	const query = searchParams.has("search") ? searchParams.get("search") : null;
	const dispatch = useDispatch<AppDispatch>();

	const fetchData = async () => {
		if (query) {
			const res = await dispatch(
				api.endpoints.search.initiate({ searchTerm: query })
			);
			setData(res.data);
		} else {
			const res = await dispatch(api.endpoints.getAllBooks.initiate());
			setData(res.data);
		}
	};

	useEffect(() => {
		fetchData();
		return () => setData(undefined);
	}, [query]);

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			{data?.length === 0 ? (
				<div className="w-full h-full flex justify-center items-center mt-5">
					<span className="opacity-50">No books were found</span>
				</div>
			) : (
				<div className="container mx-auto p-5">
					<div className="grid grid-cols-4 gap-4 justify-items-center text-center max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
						{data?.map((book) => (
							<div key={book.title}>
								<Book book={book} style="h-80 w-60" direction="flex-col" />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Catalog;
