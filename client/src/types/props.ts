import { ReactNode } from "react";
import { User } from "./data";

export type AuthContextType = {
    user: User | null;
    login: (user: { email: string; password: string; }) => void;
    signup: (user: { email: string; password: string; }) => void;
    logout: () => void;
    error: { status: number, msg: string } | null;
};

export type AuthProviderProps = {
    children: React.ReactNode;
};

export type InputComponentProps = { 
    onChange: (value: string) => void, 
    label?: string, 
    type: string, 
    defaultValue: string 
    styles?: string
    placeHolder?: string
}

export type AuthFormProps = {
    type: string;
};

export type ButtonProps = {
    text: string,
    onClick: (e: React.FormEvent) => void
    disabled?: boolean
    styles?: string
};

export type AlertProps = {
    type: 'error' | 'success' | 'info',
    message: string
};

export type CustomLinkProps = { 
    children: ReactNode, 
    to: string, 
    styles?: string, 
    button?: boolean,
    onClick?: () => void
};