import React from "react";
import {Redirect, Route} from "react-router";

const ProtectedRoute = ({component:Component , ...rest}) => {
    if(!localStorage.getItem('jwt')) {
        return <Redirect to={"/login"}/>
    }
    else {
        if(!localStorage.getItem('store')) {
            return <Redirect to={"/ReduxStore"}/>
        }
    }
    return(
        <Route {...rest} render={() => <Component/>}/>
    )
}

export default ProtectedRoute;
