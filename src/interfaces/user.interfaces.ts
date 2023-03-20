export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string | undefined;
    confirmPassword: string | undefined;
    userType: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}