import React, { createContext, useState, useEffect } from "react";

import { SERVER_URL } from "../constants/values";

import axios, { AxiosError } from "axios";

import { AuthError, User } from "../types/data";
import { AuthContextType, AuthProviderProps } from "../types/props";
import { handleAuthError } from "../utils/errors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/app/store";
import { api } from "../features/api/api";
import { setCarts } from "../features/cart/cart";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<AuthError | null>(null);  // Error state for login/logout
    const dispatch = useDispatch<AppDispatch>()

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/login`, { withCredentials: true });
            const userId = response.data.user.id;
            const carts = await dispatch(api.endpoints.getUserCarts.initiate(userId))
            dispatch(setCarts(carts.data?.carts))
            setUser(response.data.user);
            setError(null);  // Clear any previous errors
        } catch (error) {
            const err = error as AxiosError;
            setUser(null);  // Clear user state
            setError(handleAuthError(err, 'checkauth'));  // Set error message
        }
    };

    const login = async (user: { email: string; password: string }) => {
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

    const signup = async (user: { email: string; password: string; }) => {
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