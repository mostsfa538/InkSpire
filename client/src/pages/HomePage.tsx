import { Link } from "react-router-dom";
import Quote from "../components/Misc/Quote";
import Search from "../components/UI/Search";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { AppDispatch } from "../features/app/store";
import { useDispatch } from "react-redux";
import { api } from "../features/api/api";
import { BookType } from "../types/data";

function HomePage() {
	const { user } = useAuth();
	const [popularBooks, setPopularBooks] = useState<BookType[]>([]);
	const dispatch = useDispatch<AppDispatch>();

	const fetchPopularBooks = async () => {
		try {
			const response = await dispatch(api.endpoints.getPopularBooks.initiate());
			const books = response.data?.slice(0, 3);
			setPopularBooks(books!);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchPopularBooks();
	}, []);

	return (
		<section className="h-full flex flex-col justify-center items-center text-black">
			<nav className="w-full flex justify-center items-center">
				<a href="/" className="flex items-center">
					<div className="logo"></div>
					<span className="text-2xl font-extrabold text-black-800">
						I N K S P I R E
					</span>
				</a>
			</nav>
			<div className="flex-1 w-full flex justify-center items-center">
				<div className="text-4xl font-bold max-md:text-2xl">
					{!user ? (
						<>
							<span className="animate-fadeIn opacity-0">Find</span>{" "}
							<span className="animate-fadeInDelay opacity-0">Your</span>{" "}
							<span className="animate-blurIn opacity-0">
								<span className="bg-flower-pattern transition-all font-extrabold bg-[length:200%_auto] animate-animateBackground bg-clip-text text-transparent">
									In
									<span className="text-black italic">k</span>
									spiration
								</span>
							</span>
						</>
					) : (
						<h1>
							Welcome back,{" "}
							<Link
								reloadDocument
								to="/profile"
								className="relative text-secondary transition-all hover:text-info-text">
								{user.f_name ? user.f_name : `User ${user.id}`}
								<span className="absolute bg-tertiary h-1 top-full left-0 animate-widthToFull"></span>
							</Link>{" "}
							🎉
						</h1>
					)}
				</div>
			</div>
			<div className="flex-1 w-full flex flex-col justify-between items-center max-md:px-4">
				<Quote />
				<div className="bg-white p-2 w-1/2 rounded-xl shadow-md font-semibold max-md:w-full">
					<Search
						styling={{
							icon: "text-2xl flex justify-center items-center py-2 px-4 border-r-2 text-gray-400 max-md:text-lg max-md:p-2",
							input: "w-full p-2 outline-none",
							button: "py-2 px-8 m-auto h-fit max-md:p-2",
						}}
					/>
				</div>
			</div>
			<div className="flex-[2] w-full flex flex-col gap-2 justify-center items-center p-2">
				<h1 className="font-semibold">
					Popular Books <span className="text-secondary">🔥</span>
				</h1>
				{popularBooks.length > 0 ? (
					<div className="flex gap-10 justify-center items-start max-md:gap-5">
						{popularBooks.map((book) => (
							<Link
								key={book.id}
								to={`catalog/item/${book.id}`}
								className="flex bg-white shadow-md flex-1 flex-col justify-center rounded-3xl p-2 w-40 h-40 items-center hover:bg-secondary transition-all max-md:w-24 max-md:h-24">
								<img
									src={book.image}
									alt={book.title}
									className="w-20 shadow-md max-md:w-12"
								/>
							</Link>
						))}
					</div>
				) : (
					<div className="flex justify-center items-center space-x-4">
						No popular books found!
					</div>
				)}
			</div>
		</section>
	);
}

export default HomePage;
