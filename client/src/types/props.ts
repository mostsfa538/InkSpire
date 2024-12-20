import { ReactNode } from "react";
import { User } from "./data";

export type AuthContextType = {
	user: User | null;
	loading: boolean;
	login: (user: { email: string; password: string }) => void;
	signup: (user: { email: string; password: string }) => void;
	logout: () => void;
	setUser: (user: User | null) => void;
	error: { status: number; msg: string } | null;
};

export type AuthProviderProps = {
	children: React.ReactNode;
};

export type InputComponentProps = {
	onChange: (value: string | any) => void;
	label?: string;
	type: string;
	defaultValue?: any;
	styles?: string;
	placeHolder?: string;
	min?: number;
	max?: number;
	size?: number;
	horizontal?: boolean;
};

export type AuthFormProps = {
	type: string;
};

export type ButtonProps = {
	text: string;
	onClick: (e: React.FormEvent) => void;
	disabled?: boolean;
	styles?: string;
};

export type AlertProps = {
	type: "error" | "success" | "info";
	message: string;
};

export type CustomLinkProps = {
	children: ReactNode;
	to: string;
	styles?: string;
	button?: boolean;
	onClick?: () => void;
};
