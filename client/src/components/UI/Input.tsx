import { InputComponentProps } from "../../types/props"

function Input({ onChange, placeholder, type, defaultValue }: InputComponentProps) {
    return (
        <div>
            <label className='text-sm font-semibold text-secondary'>{placeholder}</label>
            <input className='w-full outline-none text-sm p-2 border-2 rounded-md transition-all focus:border-tertiary' type={type} placeholder={placeholder} defaultValue={defaultValue} onChange={(e) => onChange!(e.target.value)} />
        </div>
    )
}

export default Input