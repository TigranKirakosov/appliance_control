import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import Navbar from './components/navbar';
import ControlPage from './pages/control-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import Container from './components/container';

export enum ERoutes {
    HOME = '/',
    CONTROL = '/control-panel',
    LOGIN = '/login',
    REGISTER = '/register'
};

const Routing = () => {
    return (
        <Router>
            <Navbar />
            <Container p='5'>
                <Switch>
                    <Route exact path={ERoutes.HOME} component={HomePage}/>
                    <Route path={ERoutes.CONTROL} component={ControlPage}/>
                    <Route path={ERoutes.LOGIN} component={LoginPage}/>
                    <Route path={ERoutes.REGISTER} component={RegisterPage}/>
                </Switch>
            </Container>
        </Router>
    );
};

export default Routing;
