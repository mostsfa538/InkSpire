import { ButtonProps } from "../../types/props"

function Button({ text, onClick, disabled, styles }: ButtonProps) {
    return <button className={`w-fit h-fit mx-auto ${disabled ? 'bg-gray-300' : 'bg-secondary' } text-white rounded-md transition-all font-semibold ${styles ? styles : 'px-4 py-2 max-md:text-xs max-md:p-1'}`} 
            disabled={disabled}
            onClick={(e) => onClick(e)}>
                {text}
            </button>
}

export default Button