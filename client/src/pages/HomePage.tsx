import { BiSearch } from "react-icons/bi"
import Button from "../components/UI/Button"
import Input from "../components/UI/Input"
import Quote from "../components/Misc/Quote"

function HomePage() {
    const voidFunc = () => {}
    return (
        <div className="h-full flex flex-col justify-center items-center text-black">
            <div className="flex-1 w-full flex justify-center items-center">
                <h1 className="text-4xl font-bold max-md:text-2xl">
                    <span className="animate-fadeIn opacity-0">Find</span>{" "}
                    <span className="animate-fadeInDelay opacity-0">Your</span>{" "}
                    <span className="animate-blurIn opacity-0">
                        <span className="bg-flower-pattern transition-all font-extrabold bg-[length:200%_auto] animate-animateBackground bg-clip-text text-transparent">
                            In<span className="text-black italic">k</span>spiration
                        </span>
                    </span>
                </h1>
            </div>
            <div className="flex-1 w-full flex flex-col justify-between items-center max-md:px-4">    
                <Quote />
                <div className="flex bg-white p-2 gap-2 w-1/2 rounded-xl shadow-md font-semibold max-md:w-full">
                    <span className="text-2xl flex justify-center items-center py-2 px-4 border-r-2 text-gray-400 max-md:text-lg max-md:p-2"><BiSearch /></span>
                    <Input type="text" defaultValue="" placeHolder="Search" onChange={voidFunc} styles="w-full p-2 outline-none" />
                    <Button text="Search" onClick={voidFunc} styles="py-2 px-8 m-auto max-md:p-2 h-fit max-md:text-xs" />
                </div>
            </div>
            <div className="flex-[2] w-full flex justify-center items-center">
                TODO: Popular...
            </div>
        </div>
    )
}

export default HomePage