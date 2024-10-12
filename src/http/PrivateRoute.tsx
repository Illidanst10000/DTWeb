import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Store from "./store";
import {Context} from "../index";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const PrivateRoute = observer(() => {
    const { store } = useContext(Context);
    const [authChecked, setAuthChecked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkAuthToken = async () => {
            if (localStorage.getItem('token')) {

                await store.checkAuth();
            }
            setAuthChecked(true);
        };
        checkAuthToken();
    }, [store]);


    if (!authChecked) {
        return <div>Loading...</div>
    }

    // If auth is valid, render protected components
    return store.isAuth ? <Outlet /> : <Navigate to={`/login?redirect=${location.pathname}`} />;
});

export default PrivateRoute;