import React, {Component} from 'react';
import './App.css';
import Login from "./containers/Login/Login";
import Store from "./containers/ChooseStore/Store";
import {connect} from "react-redux";
import {Route, Router, Switch, withRouter} from "react-router";
import Content from "./components/Content/Content";
import UserProfile from "./containers/UserProfile/UserProfile";
import Navbar from "./components/NavBar/NavBar";
import ProtectedRoute from "./Navigation/ProtectedRoute";


class App extends Component{


    render() {
        return(
            <>
                <Switch>
                    <Route path={'/login'} exact component={Login}/>
                    <Route path={'/store'} exact component={Store}/>
                    <ProtectedRoute path={'/profile'} exact component={UserProfile}/>
                </Switch>
                <Navbar />
            </>
        )
    }
}


export default withRouter(App);
