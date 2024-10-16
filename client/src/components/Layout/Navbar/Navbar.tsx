import { useState } from 'react';

import useAuth from '../../../hooks/useAuth';

import { IoIosMenu, IoMdClose } from 'react-icons/io';

import Carts from '../Cart/Carts';
import NavLinks from './NavLinks';
import SideMenu from './SideMenu';
import CustomLink from '../../UI/CustomLink';

function Navbar() {
    const { user, logout } = useAuth();
    const [displaySideMenu, setDisplaySideMenu] = useState(false);

    return (
        <nav className="relative flex w-full py-2 px-8 max-md:px-4">
            <div className="flex-1 flex items-center">
                <div className="max-md:hidden">
                    <NavLinks />
                </div>
                <div className="md:hidden">
                    <div onClick={() => setDisplaySideMenu(!displaySideMenu)}>
                        {!displaySideMenu ? <IoIosMenu /> : <IoMdClose />}
                    </div>
                    <SideMenu displaySideMenu={displaySideMenu} />
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
                    <CustomLink to='/signup' button styles='bg-secondary text-white hover:bg-tertiary'>Sign Up</CustomLink>
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