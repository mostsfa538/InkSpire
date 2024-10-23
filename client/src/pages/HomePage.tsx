import Quote from "../components/Misc/Quote"
import Search from "../components/UI/Search"
import useAuth from "../hooks/useAuth"

function HomePage() {
    const { user } = useAuth()
    return (
        <section className="h-full flex flex-col justify-center items-center text-black">
            <div className="flex-1 w-full flex justify-center items-center">
                <div className="text-4xl font-bold max-md:text-2xl">
                    { !user ?
                        <>
                            <span className="animate-fadeIn opacity-0">Find</span>{" "}
                            <span className="animate-fadeInDelay opacity-0">Your</span>{" "}
                            <span className="animate-blurIn opacity-0">
                                <span className="bg-flower-pattern transition-all font-extrabold bg-[length:200%_auto] animate-animateBackground bg-clip-text text-transparent">
                                    In<span className="text-black italic">k</span>spiration
                                </span>
                            </span>
                        </> : 
                        (
                            <h1>
                                Welcome back, {' '}
                                <span className="relative text-secondary">
                                    {user.f_name ? user.f_name : `User ${user.id}`}{' '}
                                    <span className="absolute bg-tertiary h-1 top-full left-0 animate-widthToFull"></span>
                                </span> 🎉{' '}
                            </h1>
                        )
                    }
                </div>
            </div>
            <div className="flex-1 w-full flex flex-col justify-between items-center max-md:px-4">    
                <Quote />
                <div className="bg-white p-2 w-1/2 rounded-xl shadow-md font-semibold max-md:w-full">
                    <Search styling={
                        {
                            icon: "text-2xl flex justify-center items-center py-2 px-4 border-r-2 text-gray-400 max-md:text-lg max-md:p-2",
                            input: "w-full p-2 outline-none",
                            button: "py-2 px-8 m-auto h-fit max-md:p-2"
                        }
                    }/>
                </div>
            </div>
            <div className="flex-[2] w-full flex justify-center items-center">
                TODO: Popular...
            </div>
        </section>
    )
}

export default HomePage