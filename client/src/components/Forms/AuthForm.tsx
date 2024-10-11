import React, { useState } from "react";

import Input from "../UI/Input";
import Button from "../UI/Button";

import { Link } from "react-router-dom";

import { AuthFormProps } from "../../types/props";

function AuthForm({ title, action, error }: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        action({ email, password });
    };

    return (
        <>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-30px); }
                        60% { transform: translateY(-15px); }
                    }

                    @keyframes fadeIn {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }

                    .logo-animation {
                        animation: spin 4s linear infinite, bounce 2s ease-in-out infinite;
                    }

                    .form-container {
                        background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
                        padding: 2rem;
                        border-radius: 1rem;
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                        animation: fadeIn 1s ease-in-out;
                    }

                    .form-header {
                        font-family: 'Poppins', sans-serif;
                        color: #fff;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                    }

                    .form-input {
                        border: none;
                        border-radius: 0.5rem;
                        padding: 1rem;
                        margin-bottom: 1rem;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    .form-button {
                        background: #ff7e5f;
                        color: #fff;
                        border: none;
                        border-radius: 0.5rem;
                        padding: 1rem;
                        cursor: pointer;
                        transition: background 0.3s ease;
                    }

                    .form-button:hover {
                        background: #feb47b;
                    }

                    .error-message {
                        background: rgba(255, 0, 0, 0.1);
                        color: #ff0000;
                        padding: 0.5rem;
                        border-radius: 0.5rem;
                    }

                    .signup-link {
                        color: #fff;
                        font-weight: bold;
                        text-decoration: underline;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-30px); }
                        60% { transform: translateY(-15px); }
                    }

                    @keyframes fadeIn {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }

                    .logo-animation {
                        animation: spin 4s linear infinite, bounce 2s ease-in-out infinite;
                    }

                    .form-container {
                        background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
                        padding: 2rem;
                        border-radius: 1rem;
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                        animation: fadeIn 1s ease-in-out;
                    }

                    .form-header {
                        font-family: 'Poppins', sans-serif;
                        color: #fff;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                    }

                    .form-input {
                        border: none;
                        border-radius: 0.5rem;
                        padding: 1rem;
                        margin-bottom: 1rem;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    .form-button {
                        background: #ff7e5f;
                        color: #fff;
                        border: none;
                        border-radius: 0.5rem;
                        padding: 1rem;
                        cursor: pointer;
                        transition: background 0.3s ease;
                    }
                    .form-button:hover {
                        background: #feb47b;
                    }

                    .error-message {
                        background: rgba(255, 0, 0, 0.1);
                        color: #ff0000;
                        padding: 0.5rem;
                        border-radius: 0.5rem;
                    }
                        
                    .signup-link {
                        color: #fff;
                        font-weight: bold;
                        text-decoration: underline;
                    }
                `}
            </style>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <img
                    className="w-1/6 logo-animation"
                    src="/main_logo.ico"
                    alt="logo"
                />
                <div className="form-container">
                    <form
                        className="flex flex-col h-full"
                        onSubmit={handleSubmit}>
                        <header className="flex-1 flex justify-center items-center">
                            <h2 className="text-4xl form-header">{title}</h2>
                        </header>
                        <div className="flex-[2] flex flex-col gap-4 p-2">
                            <Input
                                type="email"
                                placeholder="Email"
                                defaultValue={email}
                                onChange={setEmail}
                                // className="form-input"
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                defaultValue={password}
                                onChange={setPassword}
                                // className="form-input"
                            />
                            <Button
                                text={title!}
                                onClick={handleSubmit}
                                // className="form-button"
                            />
                        </div>
                        <span className="flex-1">
                            {error && (
                                <p className="error-message">{error.msg}</p>
                            )}
                        </span>
                        <span className="text-sm text-center">
                            Don't have an account?{" "}
                            <Link
                                reloadDocument
                                to="/signup"
                                className="signup-link">
                                Sign Up
                            </Link>
                        </span>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AuthForm;
