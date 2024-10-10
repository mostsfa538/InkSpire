import React, { createContext, useState, useEffect } from "react";

import axios, { AxiosError } from "axios";

import { AuthError, User } from "../types/data";
import { AuthContextType, AuthProviderProps } from "../types/props";
import { handleAuthError } from "../utils/errors";

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<AuthError | null>(null);  // Error state for login/logout

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/login`, { withCredentials: true });
            setUser(response.data.user);
            setError(null);  // Clear any previous errors
        } catch (error) {
            const err = error as AxiosError;
            setUser(null);  // Clear user state
            setError(handleAuthError(err, 'checkauth'));  // Set error message
        }
    };

    const login = async (user: User) => {
        try {
            const response = await axios.post(`${SERVER_URL}/login`, user, { withCredentials: true });
            setUser(response.data.user);
            setError(null);  // Clear any previous errors
        } catch (error) {
            const err = error as AxiosError;
            setUser(null);  // Clear user state
            setError(handleAuthError(err, 'signin'));  // Set error message
        }
    };

    const signup = async (user: User) => {
        try {
            const response = await axios.post(`${SERVER_URL}/signup`, user, { withCredentials: true });
            setUser(response.data.user);
            setError(null);  // Clear any previous errors
        } catch (error) {
            const err = error as AxiosError;
            setUser(null);  // Clear user state
            setError(handleAuthError(err, 'signup'));  // Set error message
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${SERVER_URL}/logout`, {}, { withCredentials: true });
            setUser(null); // Clear user state
            setError(null);  // Clear any previous errors
        } catch (error) {
            const err = error as AxiosError;
            setError(handleAuthError(err));  // Set error message
        }
    };

    useEffect(() => {
        checkAuth();  // Check session when the app loads
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };