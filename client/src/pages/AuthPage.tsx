import Hero from '../components/Hero/Hero'
import AuthForm from '../components/Forms/AuthForm'

function AuthPage({ type }: { type: string }) {
    return (
        <div className={`flex h-full w-full ${type === 'signup' && 'flex-row-reverse'}`}>
            <Hero image='bg-sign-in-hero'>
                <div className='w-full h-full text-primary-main flex flex-col justify-center items-center px-2 bg-black bg-opacity-35'>
                    <div className="backdrop-blur-sm flex flex-col p-8 rounded-lg justify-center items-center">
                        <q className='italic font-serif text-center'>
                            If there's a book that you want to read, but it hasn't been written yet, then you must write it.</q>
                        — Toni Morrison
                    </div>
                </div>
            </Hero>
            <AuthForm type={type} />
        </div>
    )
}

export default AuthPage