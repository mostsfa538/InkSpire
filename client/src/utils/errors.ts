import { AxiosError } from "axios";
import { AuthError } from "../types/data";

export const handleAuthError = (
    error: AxiosError,
    func?: string
): AuthError | null => {
    const err = error as AxiosError;
    const status = err.response?.status;

    switch (status) {
        case 401:
        case 400:
            if (func === "signin")
                return {
                    status: 401,
                    msg: "Wrong Email or Password. Please Try again!",
                };
            if (func === "signup")
                return {
                    status: 401,
                    msg: "Email already exists. Please Sign In",
                };
            if (func === "checkauth") return null;
            return { status: 401, msg: "Unauthorized. Please Sign In." };
        case 404:
            return { status: 404, msg: "User not found. Please try again." };
        case 500:
            return {
                status: 500,
                msg: "Server error. Please try again later.",
            };
        default:
            return {
                status: 500,
                msg: "Server error. Please try again later.",
            };
    }
};
