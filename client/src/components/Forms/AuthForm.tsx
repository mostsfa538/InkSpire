import React, { useState } from "react";

import useAuth from "../../hooks/useAuth";

import Input from "../UI/Input";
import Alert from "../UI/Alert";
import Button from "../UI/Button";

import { Link, Navigate } from "react-router-dom";

import { AuthFormProps } from "../../types/props";

function AuthForm({ type }: AuthFormProps) {
    const { user, signup, login, error } = useAuth();

    if (user) return <Navigate to='/' />

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const title = type === "signup" ? "Sign Up" : "Welcome Back";
    const action = type === "signup" ? signup : login;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (type === "signup" && password !== confirmPassword) return;

        action({ email, password });
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <img className="w-1/6" src="/logo.ico" alt="logo" />
            <div className="w-1/2 h-2/3">
                <form className="flex flex-col h-full"
                    onSubmit={handleSubmit}>
                    <header className="flex-1 flex flex-col justify-center items-center">
                        <h2 className="text-4xl text-tertiary font-bold max-sm:text-2xl max-lg:text-3xl">{title}</h2>
                        <h3 className="text-primary-secondary max-sm:text-sm">
                            {type === "signup" ? "Think it. Write it. Share it." : "Happy to see you again!"}
                        </h3>
                    </header>
                    <div className="flex-[2] flex flex-col gap-4 p-2">
                        <Input type="email" placeholder="Email" defaultValue={email} onChange={setEmail} />
                        <Input type="password" placeholder="Password" defaultValue={password} onChange={setPassword} />
                        {
                            type === "signup" && (
                                <Input type="password" placeholder="Confirm Password" defaultValue={confirmPassword} onChange={setConfirmPassword} />
                            )
                        }
                        <Button text={type === "signup" ? "Sign Up" : "Sign In"} onClick={handleSubmit} disabled={
                            !email || !password || (type === "signup" && !confirmPassword)
                        } />
                    </div>
                    <span className="flex-1">
                        {error && <Alert type="error" message={error.msg} />}
                    </span>
                    <span className="text-sm text-center max-sm:text-xs">
                        {
                            type === "signin" ?
                            <span>
                                Don't have an account?{" "}
                                <Link className="text-tertiary font-bold hover:underline" reloadDocument to="/signup">
                                    Sign Up
                                </Link>
                            </span> : 
                            <span>
                                Already have an account?{" "}
                                <Link className="text-tertiary font-bold hover:underline" reloadDocument to="/signin">
                                    Sign In
                                </Link>
                            </span>
                        }
                    </span>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;
