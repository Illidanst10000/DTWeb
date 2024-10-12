import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameComponents from "./components/GameComponents";
import LoginForm from "./components/LoginForm";
import {observer} from "mobx-react-lite";
import ChatRoom from "./components/ChatRoom";
import PrivateRoute from "./http/PrivateRoute";
import ArmyConstructorComponent from "./components/ArmyConstructorComponent";



const App = () => {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/game" element={<GameComponents/>} />
                        <Route path="/army" element={<ArmyConstructorComponent/>} />
                        <Route path="/" element={1} />
                        <Route path="/chat" element={<ChatRoom/>} />
                    </Route>

                </Routes>
            </div>
        </Router>
    );
};

export default observer(App) ;