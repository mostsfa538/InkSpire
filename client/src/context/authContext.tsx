import React, { createContext, useState, useEffect } from "react";

import { SERVER_URL } from "../constants/values";

import axios, { AxiosError } from "axios";

import { AuthError, User } from "../types/data";
import { AuthContextType, AuthProviderProps } from "../types/props";
import { handleAuthError } from "../utils/errors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/app/store";
import { setCarts } from "../features/cart/cart";
import { setOrders } from "../features/orders/orders";
import { setFavorites } from "../features/favorites/favorites";
import { setInitialSignUp } from "../features/UI/UI";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);  // Loading state for login/logout
    const [error, setError] = useState<AuthError | null>(null);  // Error state for login/logout
    const dispatch = useDispatch<AppDispatch>()


    const checkAuth = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${SERVER_URL}/login`, { withCredentials: true });
            
            setUser(response.data.user);
            dispatch(setCarts(response.data.user.carts));
            dispatch(setOrders(response.data.user.orders));
            dispatch(setFavorites(response.data.user.Favorites));
            
            console.log(response.data.user.Favorites)

            setError(null);  // Clear any previous errors
        } catch (error) {
 
            const err = error as AxiosError;
            setUser(null);  // Clear user state
            setError(handleAuthError(err, 'checkauth'));  // Set error message
        }
        setLoading(false);
    };

    const login = async (user: { email: string; password: string }) => {
        try {
            const response = await axios.post(`${SERVER_URL}/login`, user, { withCredentials: true });

            setUser(response.data.user);
            dispatch(setCarts(response.data.user.carts));
            dispatch(setOrders(response.data.user.orders));
            dispatch(setFavorites(response.data.user.Favorites));

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
            dispatch(setInitialSignUp(true));
            dispatch(setCarts(response.data.user.carts));
            dispatch(setOrders(response.data.user.orders));
            dispatch(setFavorites(response.data.user.Favorites));

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
        <AuthContext.Provider value={{ user, loading, login, logout, signup, setUser, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };