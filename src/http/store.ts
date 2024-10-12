import AuthService, {AuthResponse, IUser} from "./AuthService";
import {makeAutoObservable} from "mobx";
import axios, {API_URL} from "./axios";

export default class Store {
    user = {} as IUser
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password);
            console.log(response.data)
            localStorage.setItem('token', response.data.access_token)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }

    async registration(username: string, password: string) {
        try {
            const response = await AuthService.registration(username, password);
            console.log(response)
            localStorage.setItem('token', response.data.access_token)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            console.log(localStorage.getItem('token'))
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.access_token)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e)
            this.setAuth(false);
        }
    }


}