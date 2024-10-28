import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Layout/Navbar/Navbar";
import { AppDispatch, RootState } from "../features/app/store";
import { useEffect, useState } from "react";
import { getAllUsers, makeAdmin } from "../features/admin/admin";
import UserDetails from "../components/Dashboard/UserDetails";
import { BookType, User } from "../types/data";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PiPlus } from "react-icons/pi";
import BookForm from "../components/Layout/Book/BookForm";
import { api } from "../features/api/api";

function AdminDashboard() {
	const { user, loading } = useAuth();
	const { users } = useSelector((state: RootState) => state.admin);
	const [books, setBooks] = useState<BookType[]>([]);
	const [showUser, setShowUser] = useState(false);
	const [displayBookForm, setDisplayBookForm] = useState(false);
	const [displayedUsers, setDisplayedUsers] = useState<User[]>(users);
	const dispatch = useDispatch<AppDispatch>();

	const handleMakeAdmin = (id: number) => {
		dispatch(makeAdmin(id));

		const updatedUsers = users.filter((user) => user.id !== id);
		setDisplayedUsers(updatedUsers);
	};

	const fetchData = async () => {
		const allBooks = await dispatch(api.endpoints.getAllBooks.initiate());
		setBooks(allBooks.data as BookType[]);
	};

	useEffect(() => {
		dispatch(getAllUsers());
		fetchData();
	}, []);

	useEffect(() => {
		setDisplayedUsers(users);
	}, [users]);

	if (!user && !loading) return <Navigate to="/" />;
	if (user && !user.isAdmin) return <Navigate to="/" />;

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<div className="p-4 h-full">
				<h1 className="w-full text-center text-2xl font-bold">
					Admin Dashboard
				</h1>
				{displayedUsers.length === 0 ? (
					<span>No users</span>
				) : (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h2 className="text-xl underline font-semibold">Users:</h2>
							{users.map((user) => {
								return (
									<div key={user.id} className="flex flex-col gap-2">
										<div className="flex flex-col bg-white items-center p-1 rounded-md transition-all cursor-pointer hover:bg-gray-200">
											<div className="flex items-center h-full w-full">
												<span
													className="p-2 h-full w-full"
													onClick={() => setShowUser(!showUser)}>
													{`${user.f_name} ${user.l_name}`}
												</span>
												<button
													onClick={() => handleMakeAdmin(user.id!)}
													className="text-nowrap bg-black text-white p-2 text-xs rounded-md">
													Make Admin
												</button>
											</div>
										</div>
										<UserDetails user={user} showUser={showUser} />
									</div>
								);
							})}
						</div>
						<div className="flex flex-col gap-2 py-2">
							<div className="flex justify-between">
								<h2 className="text-xl underline font-semibold">Books:</h2>
								<button
									onClick={() => setDisplayBookForm(!displayBookForm)}
									className="flex items-center text-sm gap-2 bg-black text-white p-2 rounded-md">
									<PiPlus /> Add
								</button>
							</div>
							<div
								className={`bg-white px-4 rounded-md ${
									!displayBookForm ? "h-0 px-0" : "py-2 h-96"
								} max-h-fit overflow-hidden transition-all ease-in-out duration-300 max-md:text-sm`}>
								<BookForm type="add" />
							</div>
							<div className="flex flex-col gap-2 max-md:grid-cols-2">
								{books.map((book) => (
									<Link
										to={`/catalog/item/${book.id}`}
										key={book.id}
										className="flex flex-col bg-white p-2 rounded-md transition-all hover:bg-gray-200">
										<span className="font-semibold">{book.title}</span>
									</Link>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default AdminDashboard;