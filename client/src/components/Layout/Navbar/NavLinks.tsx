import CustomLink from "../../UI/CustomLink"

function NavLinks({ flexFlow = 'flex-row' }: { flexFlow?: string }) {
    return (
        <ul className={`flex ${flexFlow} gap-x-4 gap-y-2`}>
            <li>
                <CustomLink to='/'>Home</CustomLink>
            </li>
            <li>
                <CustomLink to='/'>Home</CustomLink>
            </li>
        </ul>
    )
}

export default NavLinks