import useAuth from "../hooks/useAuth";
import "tailwindcss/tailwind.css";
import { css } from "@emotion/react";

const styles = css`
    @keyframes bounce {
        0%,
        100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
    }

    @keyframes logo {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .animate-bounce {
        animation: bounce 2s infinite;
    }

    .animate-logo {
        animation: logo 1s ease-in-out;
    }
`;

function App() {
    const { user, logout } = useAuth();
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col" css={styles}>
            <nav className="bg-[#fee3c3] shadow-md py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        <span className="text-green-500">I</span>nk
                        <span className="text-green-500">$</span>pier
                    </div>
                    <div>
                        {user ? (
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out">
                                Logout
                            </button>
                        ) : (
                            <>
                                <a
                                    href="/signin"
                                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out">
                                    Sign In
                                </a>
                                <a
                                    href="/signup"
                                    className="px-4 py-2 bg-black text-[#fee3c3] rounded hover:bg-opacity-75 transition duration-300 ease-in-out ml-2">
                                    Sign Up
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <header
                className="flex-grow bg-cover bg-center relative"
                style={{
                    backgroundImage: "url('/home_hero.png')",
                }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-0"></div>
                <div className="container mx-auto flex items-center justify-center py-20 relative z-10">
                    <div className="relative bg-[#fee3c3] bg-opacity-75 p-6 rounded-lg flex items-center space-x-4">
                        <img
                            src="/main_logo.png"
                            alt="Bookstore Logo"
                            className="h-48 w-48 animate-bounce"
                        />
                        <input
                            type="text"
                            placeholder="Discover your next great read!"
                            className="px-4 py-2 w-80 bg-white bg-opacity-50 text-black rounded-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>
            </header>
            <section className="w-full py-10 bg-[#fee3c3]">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-black">
                        Trending Books
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-black p-4 rounded-lg shadow-md">
                            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-semibold mb-2 text-[#fee3c3]">
                                Book Title 1
                            </h3>
                            <p className="text-[#fee3c3]">Author Name</p>
                        </div>
                        <div className="bg-black p-4 rounded-lg shadow-md">
                            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-semibold mb-2 text-[#fee3c3]">
                                Book Title 2
                            </h3>
                            <p className="text-[#fee3c3]">Author Name</p>
                        </div>
                        <div className="bg-black p-4 rounded-lg shadow-md">
                            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-semibold mb-2 text-[#fee3c3]">
                                Book Title 3
                            </h3>
                            <p className="text-[#fee3c3]">Author Name</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
