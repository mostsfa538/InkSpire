import NavLinks from "./NavLinks"

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../features/app/store';
import { toggleSideMenu } from '../../../features/UI/UI';

import { BiSearch } from "react-icons/bi"
import { IoIosMenu, IoMdClose } from 'react-icons/io';


function SideMenu() {
    const { displaySideMenu } = useSelector((state: RootState) => state.UI);
    const dispatch = useDispatch();

    return (
        <div className="flex justify-end">
            <div onClick={() => dispatch(toggleSideMenu())}>
                {!displaySideMenu ? <IoIosMenu /> : <IoMdClose />}
            </div>
            <div className={`flex flex-col absolute gap-y-2 top-full rounded-xl mx-4 bg-white text-tertiary font-semibold w-fit p-4 ${displaySideMenu ? 'left-0' : 'left-[-1000px]'} transition-all md:hidden`}>
                <header className='flex flex-col text-sm justify-center gap-2'>
                    <div className="flex items-center">
                        <img className="w-10 h-10" src="/logo.png" alt="logo" />
                        <h1 className="text-lg">Inkspire</h1>
                    </div>
                    {/* TODO: Implement search functionality */}
                    <div className="flex bg-gray-200 items-center p-2 gap-2 rounded-md">
                        <BiSearch />
                        <input className="outline-none bg-gray-200 text-black" type="text" placeholder="Search" />
                    </div>
                </header>
                <div className="flex flex-col gap-y-2 text-sm">
                    <span className="text-gray-500 text-xs">Navigation</span>
                    <div className="pl-2">
                        <NavLinks flexFlow="flex-col" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideMenu