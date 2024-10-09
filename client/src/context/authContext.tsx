import React, { createContext, useState, useEffect, useContext } from "react";

import axios from "axios";

import { User } from "../types/data";
import { AuthContextType, AuthProviderProps } from "../types/state";

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);  // Error state for login/logout

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/login`, { withCredentials: true });
            setUser(response.data.user);
        } catch (error) {
            setError('Please Login first to have access.');  // Set error message
        }
    };

    const login = async (user: User) => {
        try {
            const response = await axios.post(`${SERVER_URL}/login`, user, { withCredentials: true });
            setUser(response.data.user);
            setError(null);  // Clear any previous errors
        } catch (error) {
            setError('Login failed. Please try again.');  // Set error message
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${SERVER_URL}/logout`, {}, { withCredentials: true });
            setUser(null);
            setError(null);  // Clear any previous errors
        } catch (error) {
            setError('Logout failed. Please try again.');  // Set error message
        }
    };

    useEffect(() => {
        checkAuth();  // Check session when the app loads
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
