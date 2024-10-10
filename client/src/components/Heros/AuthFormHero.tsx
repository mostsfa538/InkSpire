function AuthFormHero({ image }: { image: string }) {
    return (
        <div className={`w-full h-full ${image} bg-contain`}>
            <div className='w-full h-full text-primary flex flex-col p-2 justify-center items-center bg-black bg-opacity-35'>
                <div className="backdrop-blur-sm flex flex-col p-4 rounded-lg justify-center items-center">
                    <h1 className='text-4xl font-bold'>Welcome Back!</h1>
                    <q className='italic font-serif text-center'>If there's a book that you want to read, but it hasn't been written yet, then you must write it.</q>
                    — Toni Morrison
                </div>
            </div>
        </div>
    )
}

export default AuthFormHero