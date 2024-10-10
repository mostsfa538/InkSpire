export interface User {
    id?: string;
    email: string;
    password: string;
};

export type AuthError = {
    status: number;
    msg: string;
}