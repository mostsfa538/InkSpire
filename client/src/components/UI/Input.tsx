import { InputComponentProps } from "../../types/props";
import { useState } from "react";

function Input({
    onChange,
    placeholder,
    type,
    defaultValue,
}: InputComponentProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!defaultValue);

    return (
        <div className="relative mb-6">
            <label
                className={`absolute left-3 top-2 transition-all duration-300 ${
                    isFocused || hasValue
                        ? "text-xs text-tertiary"
                        : "text-sm text-secondary"
                } ${isFocused || hasValue ? "opacity-0" : "opacity-100"}`}>
                {placeholder}
            </label>
            <input
                className={`w-full outline-none text-sm p-3 border-2 rounded-lg transition-all duration-300 ${
                    isFocused ? "border-tertiary shadow-lg" : "border-gray-300"
                }`}
                type={type}
                defaultValue={defaultValue}
                onChange={(e) => {
                    onChange!(e.target.value);
                    setHasValue(e.target.value !== "");
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
}

export default Input;
