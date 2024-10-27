import { Link, Navigate } from "react-router-dom"
import Navbar from "../components/Layout/Navbar/Navbar"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"
import { AppDispatch } from "../features/app/store"
import { useDispatch } from "react-redux"
import { updateProfile } from "../features/profile/profile"

function Profile() {
    
    const { user, loading, setUser } = useAuth()
    
    
    const [f_name, setFName] = useState("")
    const [l_name, setLName] = useState("")
    const [image, _setImage] = useState("")
    const [email, setEmail] = useState("")
    
    const dispatch = useDispatch<AppDispatch>()

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await dispatch(updateProfile({ userId: user!.id!.toString(), fName: f_name!, lName: l_name!, imageUrl: image!, email: email! }))
        setUser(response.payload)
    }

    useEffect(() => {
        if (user) {
            setFName(user.f_name!)
            setLName(user.l_name!)
            _setImage(user.image!)
            setEmail(user.email!)
        }
    }, [user])

    if (!user && !loading) return <Navigate to="/signin" />

    return (
        <div className="flex flex-col h-full">
            <Navbar />
            <div className="w-1/2 mx-auto flex flex-col gap-4 [&>*]:p-4 [&>*]:rounded-md max-md:w-full max-md:p-2">
                <form className="flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-2xl text-center mt-4">Update Profile</h1>
                    <img src={user?.image} alt="profile" className="w-40" />
                    <div className="flex flex-col gap-2 justify-center items-center [&>div]:flex [&>div]:gap-2 [&>div]:items-center [&>*>input]:outline-none [&>*>input]:text-lg [&>*>input]:font-bold [&>*>input]:bg-transparent">
                        <div className="flex gap-2">
                            <span>Name:</span>
                            <input type="text" max={20} size={f_name?.length!} defaultValue={user?.f_name} onChange={(e) => setFName(e.target.value)} />
                            <input type="text" max={20} size={l_name?.length!} defaultValue={user?.l_name} onChange={(e) => setLName(e.target.value)} />
                        </div>
                        <div className="flex gap-2">
                            <span>Email:</span>
                            <input type="email" max={30} size={email?.length! + 1} defaultValue={user?.email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <button 
                    disabled={f_name === user?.f_name && l_name === user?.l_name && email === user?.email && image === user?.image}
                    onClick={handleSubmit} className="bg-black text-white py-2 px-6 rounded-md disabled:opacity-50">Update</button>
                </form>
                <div className="flex flex-col gap-2 bg-warning-background font-bold">
                    <h1 className="text-xl underline">Your Favorites:</h1>
                    {
                        user?.Favorites?.length === 0 ? <p>No favorites yet</p> :
                        (
                            <div className="flex gap-2 flex-wrap max-md:text-sm">
                                {user?.Favorites?.map((favorite, index) => (
                                    <div key={index}>
                                        <Link to={`/catalog/item/${favorite.book.id}`} 
                                        className="p-2 bg-yellow-200 rounded-md transition-all hover:bg-gray-200">
                                            { favorite.book.title }
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
                <div className="flex flex-col gap-2 bg-info-background font-bold">
                    <h1 className="text-xl underline">Your Reviews:</h1>
                    {
                        user?.reviews?.length === 0 ? <p>No reviews yet</p> :
                        (
                            <div className="flex flex-col gap-2 flex-wrap max-md:text-sm">
                                {user?.reviews?.map((review, index) => (
                                <Link to={`/catalog/item/${review.book.id}`} key={index} className="w-full shadow-md bg-white p-2 rounded-lg transition-all hover:bg-gray-200">
                                    <div className="flex justify-between w-full">
                                       <div className="hover:underline">{review.book.title}</div>
                                        <span>{review.rating}/5</span>
                                    </div>
                                    <hr />
                                    <p className="p-2">{review.body}</p>
                                </Link>
                            ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile