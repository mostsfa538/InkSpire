import { Link } from "react-router-dom"
import { CustomLinkProps } from "../../types/props"

function CustomLink({ children, to, styles, button = false, onClick }: CustomLinkProps) {
    const defalutStyles = button ? 'py-2 px-6 rounded-md h-fit max-md:p-1 max-md:text-xs' : 'text-tertiary font-bold hover:underline hover:text-secondary'
    return (
        <Link reloadDocument className={`transition-all font-semibold ${defalutStyles} ${styles}`} to={to} onClick={onClick ? () => onClick() : undefined}>{children}</Link>
    )
}

export default CustomLink