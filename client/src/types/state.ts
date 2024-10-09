import { User } from "./data";

export type AuthContextType = {
    user: User | null;
    login: (user: User) => void;
    signup: (user: User) => void;
    logout: () => void;
    error: string | null;
};

export type AuthProviderProps = {
    children: React.ReactNode;
};