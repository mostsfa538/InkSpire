import CustomLink from "../../UI/CustomLink"

function NavLinks({ flexFlow = 'flex-row' }: { flexFlow?: string }) {
    const sideMenuStyling = flexFlow === 'flex-col' ? 'w-full bg-gray-100 p-2 rounded-md' : ''
    return (
        <div className={`flex ${flexFlow} gap-x-4 gap-y-2`}>
            <CustomLink to='/' styles={sideMenuStyling}>Home</CustomLink>
        </div>
    )
}

export default NavLinks