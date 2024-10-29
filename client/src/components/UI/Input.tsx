import { InputComponentProps } from "../../types/props";

function Input({
	onChange,
	label,
	type,
	size,
	defaultValue,
	styles,
	placeHolder,
	min,
	max,
	horizontal,
}: InputComponentProps) {
	return (
		<div className={`w-full ${horizontal && "flex gap-2 items-center"}`}>
			{label && (
				<label className="text-sm font-semibold text-secondary">{label}</label>
			)}
			<input
				min={min}
				max={max}
				size={size}
				minLength={min}
				maxLength={max}
				className={`${
					styles
						? styles
						: "w-full outline-none text-sm p-2 border-2 rounded-md transition-all focus:border-tertiary"
				}`}
				placeholder={placeHolder}
				type={type}
				defaultValue={defaultValue}
				onChange={(e) => onChange!(e.target.value)}
			/>
		</div>
	);
}

export default Input;
