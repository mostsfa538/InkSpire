import { InputComponentProps } from "../../types/props"

function Input({ onChange, label, type, defaultValue, styles, placeHolder, max }: InputComponentProps) {
    return (
        <div className="w-full">
            {label && <label className='text-sm font-semibold text-secondary'>{label}</label>}
            <input 
            maxLength={max}
            className={`${styles ? styles : 'w-full outline-none text-sm p-2 border-2 rounded-md transition-all focus:border-tertiary'}`} 
            placeholder={placeHolder}
            type={type}
            defaultValue={defaultValue} 
            onChange={(e) => onChange!(e.target.value)} />
        </div>
    )
}

export default Input