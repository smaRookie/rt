import React, { Component } from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import App from '../App.js'
import Home from '../pages/home/home'

export default class ERouter extends React.Component{
    render() {
        return (
                <HashRouter>
                    <App>
                        <Route path={'/'} redirect={'/home'} component={Home}></Route>
                    </App>
                </HashRouter>
        );
    }
}
