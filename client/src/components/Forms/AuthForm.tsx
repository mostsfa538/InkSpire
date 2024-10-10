import React, { useState } from 'react'

import Input from '../UI/Input'
import Button from '../UI/Button'

import { Link } from 'react-router-dom'

import { AuthFormProps } from '../../types/props'

function AuthForm({ title, action, error }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        action({ email, password })
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <img className='w-1/6' src="/logo.ico" alt="logo" />
            <div className='bg-white p-2 rounded-lg w-3/4 h-3/4 shadow-md'>
                <form className='flex flex-col h-full' onSubmit={handleSubmit}>
                    <header className='flex-1 flex justify-center items-center'>
                        <h2 className='text-4xl text-secondary font-bold'>{title}</h2>
                    </header>
                    <div className='flex-[2] flex flex-col gap-4 p-2'>
                        <Input type='email' placeholder='Email' defaultValue={email} onChange={setEmail} />
                        <Input type='password' placeholder='Password' defaultValue={password} onChange={setPassword} />
                        <Button text={title!} onClick={handleSubmit} />
                    </div>
                    <span className='flex-1'>
                        {error && <p className='bg-error-background text-error-text p-2 rounded-md flex items-center justify-center'>{error.msg}</p>}
                    </span>
                    <span className='text-sm text-center'>
                            Don't have an account? <Link reloadDocument to='/signup' className='text-secondary font-bold'>Sign Up</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default AuthForm