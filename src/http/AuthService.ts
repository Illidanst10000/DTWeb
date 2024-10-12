import $api from "./axios";
import {AxiosResponse} from "axios";

export interface IUser {
    username: string;
    id: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: IUser;
}

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/login', {username, password});
    }

    static async registration(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/registration', {username, password});
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
}