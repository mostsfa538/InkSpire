import React, { useState } from "react";

import useAuth from "../../hooks/useAuth";

import Input from "../UI/Input";
import Alert from "../UI/Alert";
import Button from "../UI/Button";
import CustomLink from "../UI/CustomLink";

import { Navigate } from "react-router-dom";

import { AuthFormProps } from "../../types/props";
import { BsGoogle } from "react-icons/bs";
import { SERVER_URL } from "../../constants/values";

function AuthForm({ type }: AuthFormProps) {
	const { user, signup, login, error } = useAuth();

	if (user) return <Navigate to="/" />;

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

	const handleGoogleSignIn = async () => {
		const googleWindow = `${SERVER_URL}/auth/google/redirect`;
		window.open(googleWindow, "_self");
	};

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<CustomLink styles="w-1/6" to="/">
				<img src="/logo.ico" alt="logo" />
			</CustomLink>
			<div className="w-1/2 h-2/3 max-md:w-full max-md:p-2">
				<form className="flex flex-col h-full" onSubmit={handleSubmit}>
					<header className="flex-1 flex flex-col justify-center items-center">
						<h2 className="text-4xl text-tertiary font-bold max-sm:text-2xl max-lg:text-3xl">
							{title}
						</h2>
						<h3 className="text-primary-secondary max-sm:text-sm">
							{type === "signup"
								? "Think it. Write it. Share it."
								: "Happy to see you again!"}
						</h3>
					</header>
					<div className="flex-[2] flex flex-col gap-4 p-2">
						<Input
							type="email"
							label="Email"
							defaultValue={email}
							onChange={setEmail}
						/>
						<Input
							type="password"
							label="Password"
							defaultValue={password}
							onChange={setPassword}
						/>
						{type === "signup" && (
							<Input
								type="password"
								label="Confirm Password"
								defaultValue={confirmPassword}
								onChange={setConfirmPassword}
							/>
						)}
						<Button
							text={type === "signup" ? "Sign Up" : "Sign In"}
							onClick={handleSubmit}
							disabled={
								!email || !password || (type === "signup" && !confirmPassword)
							}
						/>
						{type === "signin" && (
							<span
								onClick={handleGoogleSignIn}
								className="bg-blue-600 flex justify-center cursor-pointer items-center gap-2 text-white p-2 rounded-md transition-all hover:bg-blue-700">
								<span>Sign in With</span> <BsGoogle />
							</span>
						)}
					</div>
					<span className="flex-1">
						{error && <Alert type="error" message={error.msg} />}
					</span>
					<span className="text-sm text-center text-nowrap max-sm:text-xs">
						{type === "signin" ? (
							<span>
								Don't have an account?{" "}
								<CustomLink to="/signup">Sign Up</CustomLink>
							</span>
						) : (
							<span>
								Already have an account?{" "}
								<CustomLink to="/signin">Sign In</CustomLink>
							</span>
						)}
					</span>
				</form>
			</div>
		</div>
	);
}

export default AuthForm;
