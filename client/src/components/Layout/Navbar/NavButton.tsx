import { Link } from "react-router-dom"

function NavButton({ text, to, styles }: { text: string, to: string, styles: string }) {
    return (
        <Link className={`py-2 px-6 transition-all rounded-md h-fit max-lg:p-2 max-md:p-1 ${styles}`} to={to}>{text}</Link>
    )
}

export default NavButton