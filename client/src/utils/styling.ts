import { AppDispatch } from "../features/app/store";
import { setDisplayNotification } from "../features/UI/UI";
import { NotificationType } from "../types/data";

export const orderBackground = (orderStatus: string) => {
	switch (orderStatus) {
		case "pending":
			return "bg-warning-background border-warning-text";
		case "delivering":
			return "bg-info-background border-info-text";
		case "completed":
			return "bg-success-background border-success-text";
		default:
			return "bg-gray-200";
	}
};

export const orderStatusText = (
	orderStatus: string
): { text: string; color: string } => {
	switch (orderStatus) {
		case "pending":
			return { text: "Pending", color: "text-warning-text" };
		case "delivering":
			return { text: "Delivering", color: "text-info-text" };
		case "completed":
			return { text: "Completed", color: "text-success-text" };
		default:
			return { text: "Unknown", color: "text-gray-500" };
	}
};

export // function that calculates the most frequent color in an image
const calcAvgColor = (img: HTMLImageElement) => {
	if (!img) return;

	img.crossOrigin = "Anonymous";

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	canvas.width = img.width;
	canvas.height = img.height;

	ctx.drawImage(img, 0, 0, img.width, img.height);

	const imageData = ctx.getImageData(0, 0, img.width, img.height);
	const data = imageData.data;

	const colorMap = new Map<string, number>();

	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const a = data[i + 3];

		if (a === 0) continue;

		const key = `${r},${g},${b}`;
		if (colorMap.has(key)) {
			colorMap.set(key, colorMap.get(key)! + 1);
		} else {
			colorMap.set(key, 1);
		}
	}

	let maxColor = "";
	let maxCount = 0;

	for (const [color, count] of colorMap) {
		if (count > maxCount) {
			maxCount = count;
			maxColor = color;
		}
	}

	const [r, g, b] = maxColor.split(",").map(Number);
	return `rgba(${r}, ${g}, ${b}, 1)`;
};

export const getTextContrast = (color: string) => {
	const rgb = color.match(/\d+/g);
	if (!rgb) return "black";
	const brightness =
		(parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
		1000;
	return brightness >= 128 ? "black" : "white";
};

export const sendNotfication = async (
	notfication: NotificationType,
	dispatch: AppDispatch
) => {
	dispatch(setDisplayNotification(notfication));
};
