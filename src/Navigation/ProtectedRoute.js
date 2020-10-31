import React, {Component} from "react";
import {Redirect, Route} from "react-router";

const ProtectedRoute = ({component:Component , ...rest}) => {
    console.log("in here")
    if(!localStorage.getItem('jwt')) {
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