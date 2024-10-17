import useAuth from '../../../hooks/useAuth';

import Carts from '../Cart/Carts';
import NavLinks from './NavLinks';
import SideMenu from './SideMenu';
import CustomLink from '../../UI/CustomLink';


function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="relative flex w-full py-2 px-8 max-md:px-4 z-50">
            <div className="flex-1 flex items-center">
                <div className="max-md:hidden">
                    <NavLinks />
                </div>
                <div className="md:hidden">
                    <SideMenu />
                </div>
            </div>
            <div className="flex-1 flex w-full justify-center">
                <CustomLink to="/">
                    <img className="w-14 h-14" src="/logo.png" alt="" />
                </CustomLink>
            </div>
            <div className="flex flex-1 items-center justify-end gap-4">
                <div className="flex justify-end">
                    {user && <Carts carts={user.carts} />}
                </div>
            {!user ? (
                <div className="flex gap-4 text-nowrap max-md:gap-2 max-lg:text-xs">
                    <CustomLink to='/signin' button styles='border border-tertiary hover:bg-white'>Sign In</CustomLink>
                </div>
                ) : 
                <div className='text-nowrap'>
                    <CustomLink to='/' button styles='bg-secondary text-white hover:bg-tertiary' onClick={logout}>Sign Out</CustomLink>
                </div>
            }
            </div>
        </nav>
    )
}

export default Navbar