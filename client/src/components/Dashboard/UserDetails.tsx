import { useState } from "react";
import { OrderType, User } from "../../types/data";
import { AppDispatch } from "../../features/app/store";
import { useDispatch } from "react-redux";
import {
	deleteOrder,
	makeAdmin,
	updateOrderStatus,
} from "../../features/admin/admin";
import { TbTrash } from "react-icons/tb";
import { sendNotfication } from "../../utils/styling";

function UserDetails({
	user,
	allUsers,
	setAllUsers,
}: {
	user: User;
	allUsers: User[];
	setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) {
	const [orders, setOrders] = useState<OrderType[]>(user.orders);
	const dispatch = useDispatch<AppDispatch>();
	const [showUser, setShowUser] = useState(false);

	const handleOrderUpdate = (id: number, status: string) => {
		const order = orders.find((order) => order.id === id);
		if (order) {
			const updatedOrder = { ...order, order_status: status };
			const updatedOrders = orders.map((order) =>
				order.id === id ? updatedOrder : order
			);
			setOrders(updatedOrders);
		}

		dispatch(updateOrderStatus({ id, status }));

		sendNotfication(
			{
				message: "Status Updated",
				type: "success",
			},
			dispatch
		);
	};

	const handleOrderDelete = (id: number) => {
		const updatedOrders = orders.filter((order) => order.id !== id);
		setOrders(updatedOrders);

		dispatch(deleteOrder(id));

		sendNotfication(
			{
				message: "Order Deleted",
				type: "error",
			},
			dispatch
		);
	};

	const handleMakeAdmin = (id: number) => {
		// remove user from allUsers
		const updatedUsers = allUsers.filter((user) => user.id !== id);
		setAllUsers(updatedUsers);

		// make user admin
		dispatch(makeAdmin(id));

		// show notification
		sendNotfication(
			{
				message: "User made admin",
				type: "success",
			},
			dispatch
		);
	};

	return (
		<>
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
			<div
				className={`bg-white flex flex-col gap-1 w-full px-2 rounded-md ${
					!showUser ? "h-0 px-0" : "py-2 h-96"
				} max-h-fit overflow-hidden transition-all ease-in-out duration-300 max-md:text-sm`}>
				<span>ID: {user.id}</span>
				<span>Email: {user.email}</span>
				<span>First Name: {user.f_name}</span>
				<span>Last Name: {user.l_name}</span>
				<div className="flex flex-col">
					<span>Orders:</span>
					<div className="px-2 flex flex-col gap-1">
						{user.orders.length === 0 ? (
							<span className="w-full text-center bg-gray-200 p-1">
								No Orders
							</span>
						) : (
							orders.map((order) => {
								return (
									<div
										key={order.id}
										className="p-2 bg-gray-200 flex flex-col gap-2 rounded-md">
										<span className="flex justify-between">
											<span>Order ID: {order.id}</span>
											<button
												onClick={() => handleOrderDelete(order.id!)}
												className="bg-error-background cursor-pointer text-error-text rounded-full p-2 h-fit w-fit">
												<TbTrash />
											</button>
										</span>
										<span className="flex gap-2 items-center">
											Status:
											<span className="bg-white border border-white cursor-pointer flex rounded-xl text-xs overflow-hidden [&>*]:p-2 [&>*]:border">
												<button
													onClick={() =>
														handleOrderUpdate(order.id!, "pending")
													}
													className={
														order.order_status === "pending"
															? "bg-warning-background text-orange-500"
															: ""
													}>
													Pending
												</button>
												<button
													onClick={() =>
														handleOrderUpdate(order.id!, "delivering")
													}
													className={
														order.order_status === "delivering"
															? "bg-info-background text-info-text"
															: ""
													}>
													Delivering
												</button>
												<button
													onClick={() =>
														handleOrderUpdate(order.id!, "completed")
													}
													className={
														order.order_status === "completed"
															? "bg-success-background text-success-text"
															: ""
													}>
													Completed
												</button>
											</span>
										</span>
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default UserDetails;
