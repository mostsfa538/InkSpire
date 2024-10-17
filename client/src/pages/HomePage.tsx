import { BiSearch } from "react-icons/bi";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Quote from "../components/Misc/Quote";

function HomePage() {
    const voidFunc = () => {};
    return (
        <div className="relative h-full flex flex-col justify-start items-center text-black">
            <div className="fixed inset-0 z-0 opacity-10">
                <img
                    src="logo.png"
                    alt="Background Logo"
                    className="w-100 h-100 object-cover mx-auto my-auto"
                    style={{ marginTop: "-20px" }}
                />
            </div>
            <div className="relative w-full flex flex-col items-center z-10 gap-4 mt-8">
                <h1 className="text-4xl font-bold max-md:text-2xl">
                    <span className="animate-fadeIn opacity-0">Find</span>{" "}
                    <span className="animate-fadeInDelay opacity-0">Your</span>{" "}
                    <span className="animate-blurIn opacity-0">
                        <span className="bg-flower-pattern transition-all font-extrabold bg-[length:200%_auto] animate-animateBackground bg-clip-text text-transparent">
                            <span className="text-black">I</span>
                            <span>nk</span>
                            <span className="text-black">S</span>
                            piration
                        </span>
                    </span>
                </h1>
                <Quote />
                <div className="flex bg-white p-2 gap-2 w-1/2 rounded-xl shadow-md font-semibold max-md:w-full">
                    <span className="text-2xl flex justify-center items-center py-2 px-4 border-r-2 text-gray-400 max-md:text-lg max-md:p-2">
                        <BiSearch />
                    </span>
                    <Input
                        type="text"
                        defaultValue=""
                        placeHolder="Search"
                        onChange={voidFunc}
                        styles="w-full p-2 outline-none"
                    />
                    <Button
                        text="Search"
                        onClick={voidFunc}
                        styles="py-2 px-8 m-auto max-md:p-2 h-fit max-md:text-xs"
                    />
                </div>
            </div>
            <div className="relative flex-1 w-full flex justify-center items-center z-10">
                TODO: Popular...
            </div>
        </div>
    );
}

export default HomePage;
