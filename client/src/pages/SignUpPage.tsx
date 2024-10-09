import { Navigate } from 'react-router-dom'
import AuthForm from '../components/Forms/AuthForm'
import useAuth from '../hooks/useAuth'

function SignUpPage() {
    const { user, signup, error } = useAuth()

    if (user) return <Navigate to='/' />

    return (
        <div>
            <AuthForm title='Sign Up' action={signup} />
            { error && <p>{error}</p> }
        </div>
    )
}

export default SignUpPage