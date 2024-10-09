import useAuth from '../hooks/useAuth'
import AuthForm from '../components/Forms/AuthForm'
import { Navigate } from 'react-router-dom'

function SignInPage() {
    const { user, login, error } = useAuth()

    if (user) return <Navigate to='/' />

    return (
        <div>
            <AuthForm title='Sign In' action={login} />
            { error && <p>{error}</p> }
        </div>
    )
}

export default SignInPage