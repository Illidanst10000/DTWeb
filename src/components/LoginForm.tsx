import React, {FC, useContext, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async () => {
        await store.login(username, password);
        if (store.isAuth) {
            const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';
            navigate(redirectPath);
        }
    };

    const handleRegistration = async () => {
        await store.registration(username, password);
        if (store.isAuth) {
            const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';
            navigate(redirectPath);
        }
    };

    return (
        <div>
            {store.isAuth && store.user?.username
                ? `User: ${store.user.username}`
                : 'User unauthorized'}
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                   value={password}/>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegistration}>Register</button>
        </div>
    );
};

export default observer(LoginForm);