import useAuth from '../hooks/useAuth'
import AuthForm from '../components/Forms/AuthForm'
import { Navigate } from 'react-router-dom'
import AuthFormHero from '../components/Heros/AuthFormHero'

function SignInPage() {
    const { user, login, error } = useAuth()

    if (user) return <Navigate to='/' />

    return (
        <div className='flex h-full w-full'>
            <div className='flex-[1.5] flex'>
                <AuthFormHero image='bg-sign-in-hero' />
            </div>
            <div className='flex-1'>
                <AuthForm title='Sign In' action={login} error={error}/>
            </div>
        </div>
    )
}

export default SignInPage