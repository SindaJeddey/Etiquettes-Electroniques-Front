import React, {Component} from "react";
import {Redirect, Route} from "react-router";

const ProtectedRoute = ({component:Component , ...rest}) => {
    if(!localStorage.getItem('jwt')) {
        console.log("login")
        return <Redirect to={"/login"}/>
    }
    else {
        if(!localStorage.getItem('store')) {
            console.log("store")
            return <Redirect to={"/store"}/>
        }
    }
    return(
        <Route {...rest} render={() => <Component/>}/>
    )
}

export default ProtectedRoute;