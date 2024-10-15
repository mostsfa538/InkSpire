import { ReactNode } from "react"
import { Link } from "react-router-dom"

function CustomLink({ children, to, styles, button = false }: { children: ReactNode, to: string, styles?: string, button?: boolean }) {
    const defalutStyles = button ? 'py-2 px-6 rounded-md h-fit max-lg:p-2 max-md:p-1' : 'text-tertiary font-bold hover:underline hover:text-secondary'
    return (
        <Link className={`transition-all ${defalutStyles} ${styles}`} to={to}>{children}</Link>
    )
}

export default CustomLink