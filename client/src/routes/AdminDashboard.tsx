import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Layout/Navbar/Navbar";
import { AppDispatch, RootState } from "../features/app/store";
import { useEffect, useState } from "react";
import { getAllUsers, makeAdmin } from "../features/admin/admin";
import UserDetails from "../components/Dashboard/UserDetails";
import { User } from "../types/data";

function AdminDashboard() {
	const { users } = useSelector((state: RootState) => state.admin);
	const [showUser, setShowUser] = useState(false);
	const [displayedUsers, setDisplayedUsers] = useState<User[]>(users);
	const dispatch = useDispatch<AppDispatch>();

	const handleMakeAdmin = (id: number) => {
		dispatch(makeAdmin(id));

		const updatedUsers = users.filter((user) => user.id !== id);
		setDisplayedUsers(updatedUsers);
	};

	useEffect(() => {
		dispatch(getAllUsers());
	}, []);

	useEffect(() => {
		setDisplayedUsers(users);
	}, [users]);

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
				)}
			</div>
		</div>
	);
}

export default AdminDashboard;
