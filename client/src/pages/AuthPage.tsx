import Hero from '../components/Hero/Hero'
import Quote from '../components/Misc/Quote'
import AuthForm from '../components/Forms/AuthForm'
import { RootState } from '../features/app/store';
import { useSelector } from 'react-redux';
import CompleteSignup from '../components/Forms/CompleteSignup';

function AuthPage({ type }: { type: string }) {
    const { initialSignUp } = useSelector((state: RootState) => state.UI);

    return (
        <div className={`flex h-full w-full ${type === 'signup' && 'flex-row-reverse'}`}>
            <Hero image={type === 'signin' ? 'bg-sign-in-hero' : 'bg-sign-up-hero'}>
                <div className='w-full h-full text-primary-main flex flex-col justify-center items-center px-2 bg-black bg-opacity-35'>
                    <div className="backdrop-blur-sm flex flex-col p-8 rounded-lg justify-center items-center">
                        <Quote />
                    </div>
                </div>
            </Hero>
            {!initialSignUp ? <AuthForm type={type} /> : <CompleteSignup />}
        </div>
    )
}

export default AuthPage