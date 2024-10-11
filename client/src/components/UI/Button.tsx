import { ButtonProps } from "../../types/props"

function Button({ text, onClick, disabled, }: ButtonProps) {
    return <button className={`w-fit mx-auto bg-secondary ${disabled && 'bg-gray-300' } text-white px-4 py-2 rounded-lg transition-all max-md:text-sm`} 
            disabled={disabled}
            onClick={(e) => onClick(e)}>
                {text}
            </button>
}

export default Button