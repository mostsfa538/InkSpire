import { ButtonProps } from "../../types/props"

function Button({ text, onClick, disabled, }: ButtonProps) {
    return <button className={`w-fit mx-auto ${disabled ? 'bg-gray-300' : 'bg-secondary' } text-white px-4 py-2 rounded-md transition-all max-md:text-xs max-md:p-1`} 
            disabled={disabled}
            onClick={(e) => onClick(e)}>
                {text}
            </button>
}

export default Button