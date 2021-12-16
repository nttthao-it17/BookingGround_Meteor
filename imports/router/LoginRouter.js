import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import LoginForm from "../ui/loginForm/LoginForm";
import AppRouter from "./AppRouter";
import RegistrationForm from '../ui/registrationForm/RegistrationForm';

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    <LoginForm />
                </Route>
                <Route exact path='/register'>
                    <RegistrationForm />
                </Route>
                <Route path="/app">
                    <AppRouter />
                </Route>
                {/* tương tự default trong switch case, đường dẫn không đúng mà trường hợp chưa
                    login mặc định trở về trang /login */}
                <Redirect to="/login" />
            </Switch>
        </Router>
    )
}

