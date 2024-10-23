import { useState } from "react"
import Input from "../UI/Input"
import { Link, Navigate } from "react-router-dom"
import { updateProfile } from "../../features/profile/profile"
import useAuth from "../../hooks/useAuth"
import { setInitialSignUp } from "../../features/UI/UI"
import { AppDispatch } from "../../features/app/store"
import { useDispatch } from "react-redux"

function CompleteSignup() {
    const { user, setUser } = useAuth()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profileImage, setProfileImage] = useState('https://placehold.co/20')

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await dispatch(updateProfile({ userId: user!.id!.toString(), fName: firstName, lName: lastName, imageUrl: profileImage }))
        setUser(response.payload)
        dispatch(setInitialSignUp(false))
        return <Navigate to='/' />
    }

    return (
        <div className="flex justify-center items-center font-semibold w-full max-md:p-4 max-md:text-sm">
            <form className="w-1/3 flex flex-col p-10 rounded-lg h-2/3 max-md:w-full">
                <header className="mx-auto text-center">
                    <h2 className="font-bold text-2xl">Welcome</h2>
                    <p className="text-sm italic">Complete your profile</p>
                </header>
                <div className="flex flex-1 flex-col justify-center gap-2 w-full mx-auto">
                    <div
                    style={{
                        backgroundImage: `url(${profileImage === '' ? 'https://placehold.co/20' : profileImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} 
                    className={`mx-auto rounded-full w-20 h-20 flex overflow-hidden`}>
                    </div>
                    <Input type="text" placeHolder="Profile Image (Url)" onChange={setProfileImage} />
                    <Input type="text" placeHolder="First Name" onChange={setFirstName} />
                    <Input type="text" placeHolder="Last Name" onChange={setLastName} />
                </div>
                <div className="flex justify-between p-2">
                    <Link to='/' className="bg-info-background text-info-text py-2 px-6 rounded-md">Skip</Link>
                    <button onClick={handleSubmit} className="bg-black text-white py-2 px-6 rounded-md">Done</button>
                </div>
            </form>
        </div>
    )
}

export default CompleteSignup