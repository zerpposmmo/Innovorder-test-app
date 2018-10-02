import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';

const Main = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
        </Switch>
    </BrowserRouter>
);

export default Main