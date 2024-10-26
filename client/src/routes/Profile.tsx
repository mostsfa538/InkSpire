import { Navigate } from "react-router-dom"
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
        if (!f_name || !l_name || !email || !image) {
            alert('Please fill all fields')
            return
        }
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
            <form className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-2xl text-center mt-4">Profile</h1>
                <img src={user?.image} alt="profile" className="w-40" />
                <div className="flex flex-col gap-2 justify-center items-center [&>div]:flex [&>div]:gap-2 [&>div]:items-center [&>*>input]:outline-none [&>*>input]:text-lg [&>*>input]:font-bold [&>*>input]:bg-transparent">
                    <div className="flex gap-2">
                        <span>Name:</span>
                        <input type="text" size={f_name?.length!} defaultValue={user?.f_name} onChange={(e) => setFName(e.target.value)} />
                        <input type="text" size={l_name?.length!} defaultValue={user?.l_name} onChange={(e) => setLName(e.target.value)} />
                    </div>
                    <div className="flex gap-2">
                        <span>Email:</span>
                        <input type="email" size={email?.length! + 1} defaultValue={user?.email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <button 
                disabled={f_name === user?.f_name && l_name === user?.l_name && email === user?.email && image === user?.image}
                onClick={handleSubmit} className="bg-black text-white py-2 px-6 rounded-md disabled:opacity-50">Update</button>
            </form>
        </div>
    )
}

export default Profile