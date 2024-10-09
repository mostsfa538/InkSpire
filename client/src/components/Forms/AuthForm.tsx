import React, { useState } from 'react'
import { User } from '../../types/data'

type AuthFormProps = {
    title?: string
    action: (user: User) => void
}

function AuthForm({ title, action }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        action({ email, password })
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{title}</h2>
            <input type="email" placeholder="Email" defaultValue={email} onChange={(e) => setEmail!(e.target.value)} />
            <input type="password" placeholder="Password" defaultValue={password} onChange={(e) => setPassword!(e.target.value)} />
            <button className='w-fit mx-auto' onClick={(e) => handleSubmit(e)}>{title}</button>

        </form>
    )
}

export default AuthForm