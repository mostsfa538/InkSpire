import useAuth from '../../../hooks/useAuth';
import { BiShoppingBag } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Button from '../../UI/Button';
import { IoIosMenu, IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import NavButton from './NavButton';

function Navbar() {
    const { user, logout } = useAuth();
    const [sideMenu, setSideMenu] = useState(false);

    return (
        <>
            <nav className="relative flex w-full py-2 px-8 max-md:px-4">
                <div className="flex-1 flex items-center">
                    <div className="max-md:hidden">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="md:hidden">
                        <div onClick={() => setSideMenu(!sideMenu)}>
                            {!sideMenu ? <IoIosMenu /> : <IoMdClose />}
                        </div>
                        <div className={`flex flex-col absolute gap-2 top-full rounded-r-md bg-secondary text-white w-fit p-2 ${sideMenu ? 'left-0' : 'left-[-1000px]'} text-xs transition-all md:hidden`}>
                            <div className='flex text-sm font-semibold items-center gap-x-5'>
                                <h1>Inkspire</h1>
                                {!user && <BiShoppingBag size={15} />}
                            </div>
                            <hr />
                            <Link to="/">Home</Link>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex w-full justify-center">
                    <Link to="/">
                        <img className="w-14 h-14" src="/logo.png" alt="" />
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end">
                        <div className="flex items-center max-lg:hidden">
                            {user && <BiShoppingBag className="text-tertiary" size={20} />}
                            <div className="bg-tertiary mx-10 rounded-full w-3 h-3"></div>
                        </div>
                    {!user ? (
                        <div className="flex gap-4 text-nowrap max-md:gap-2 max-lg:text-xs">
                            <NavButton text='Sign In' to='/signin' styles='border border-tertiary hover:bg-white' />
                            <NavButton text='Sign Up' to='/signup' styles='bg-secondary text-white hover:bg-tertiary' />
                        </div>
                        ) : 
                        <div>
                            <Button text='Sign Out' onClick={logout} />
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar