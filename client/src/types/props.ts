import { User } from "./data";

export type AuthContextType = {
    user: User | null;
    login: (user: User) => void;
    signup: (user: User) => void;
    logout: () => void;
    error: { status: number, msg: string } | null;
};

export type AuthProviderProps = {
    children: React.ReactNode;
};

export type InputComponentProps = { 
    onChange: (value: string) => void, 
    placeholder: string, 
    type: string, 
    defaultValue: string 
}

export type AuthFormProps = {
    type: string;
};

export type ButtonProps = {
    text: string,
    onClick: (e: React.FormEvent) => void
    disabled?: boolean
};

export type AlertProps = {
    type: 'error' | 'success' | 'info',
    message: string
};