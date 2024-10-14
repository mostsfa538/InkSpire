import useAuth from '../../../hooks/useAuth';
import { BiShoppingBag } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Button from '../../UI/Button';
import { IoIosMenu, IoMdClose } from 'react-icons/io';
import { useState } from 'react';

function Navbar() {
    const { user, logout } = useAuth();
    const [sideMenu, setSideMenu] = useState(false);

    return (
        <>
            <nav className="flex w-full py-2 px-8 max-md:px-4">
                <div className="flex-1 flex items-center">
                    <div className="max-md:hidden">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="md:hidden">
                        <div onClick={() => setSideMenu(!sideMenu)}>
                            {!sideMenu ? <IoIosMenu /> : <IoMdClose />}
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
                        <div className="flex gap-4 text-nowrap [&>*]:py-2 [&>*]:px-6 [&>*]:transition-all [&>*]:rounded-md [&>*]:h-fit max-lg:[&>*]:p-2 max-md:[&>*]:p-1 max-md:gap-2 max-lg:text-xs">
                            <Link className="border border-tertiary hover:bg-white" to="/signin">Sign In</Link>
                            <Link className="bg-secondary text-white hover:bg-tertiary" to="/signup">Sign Up</Link>
                        </div>
                        ) : 
                        <div>
                            <Button text='Sign Out' onClick={logout} />
                        </div>
                    }
                </div>
            </nav>
            <div className={`flex flex-col relative gap-2 rounded-r-md bg-secondary text-white w-fit p-2 ${!sideMenu ? ('right-60') : ('right-0') } text-xs transition-all md:hidden`}>
                <div className='flex text-sm font-semibold items-center gap-x-5'>
                    <h1>Inkspire</h1>
                    {!user && <BiShoppingBag size={15} />}
                </div>
                <hr />
                <Link to="/">Home</Link>
            </div>
        </>
    )
}

export default Navbar