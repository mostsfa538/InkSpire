import { InputComponentProps } from "../../types/props"

function Input({ onChange, label, type, defaultValue }: InputComponentProps) {
    return (
        <div>
            <label className='text-sm font-semibold text-secondary'>{label}</label>
            <input 
            className='w-full outline-none text-sm p-2 border-2 rounded-md transition-all focus:border-tertiary' 
            type={type}
            defaultValue={defaultValue} 
            onChange={(e) => onChange!(e.target.value)} />
        </div>
    )
}

export default Input