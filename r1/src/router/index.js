import React, { Component } from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import App from '../App.js'

export default class ERouter extends React.Component{
    render() {
        return (
            <HashRouter>
                <App></App>
            </HashRouter>
        );
    }
}
