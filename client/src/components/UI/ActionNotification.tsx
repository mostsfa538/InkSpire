import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/app/store";

function ActionNotification() {
	const [client, setClient] = useState({ x: 0, y: 0 });
	const { displayNotification } = useSelector((state: RootState) => state.UI);

	let style = "";

	switch (displayNotification.type) {
		case "success":
			style = "bg-green-400";
			break;
		case "error":
			style = "bg-red-400";
			break;
		case "info":
			style = "bg-blue-400";
			break;
		default:
			style = "bg-green-400";
	}

	const getMousePosition = () => {
		window.addEventListener("mousemove", (event) => {
			if (event.clientX + window.scrollX - 20 > window.innerWidth - 100) {
				setClient({
					x: event.clientX + window.scrollX - 120,
					y: event.clientY + window.scrollY - 30,
				});
			} else {
				setClient({
					x: event.clientX + window.scrollX - 20,
					y: event.clientY + window.scrollY - 30,
				});
			}
		});
	};

	useEffect(() => {
		getMousePosition();
	}, [displayNotification.toggle]);

	return (
		<div
			key={`${displayNotification.toggle}`}
			style={{
				zIndex: 1000,
				top: `${client.y}px`,
				left: `${client.x}px`,
				display: displayNotification.display ? "block" : "none",
			}}
			className={`absolute p-1 ${style} text-xs rounded-md opacity-0 shadow-md animate-notificationFadeInOut`}>
			{displayNotification.message}
		</div>
	);
}

export default ActionNotification;
