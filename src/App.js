import React, {Component} from 'react';
import './App.css';
import Login from "./containers/Login/Login";
import Store from "./containers/ChooseStore/Store";
import {Route, Switch, withRouter} from "react-router";
import UserProfile from "./containers/UserProfile/UserProfile";
import Navbar from "./components/NavBar/NavBar";
import ProtectedRoute from "./Navigation/ProtectedRoute";
import Home from "./Home/Home";
import Logout from "./containers/Logout/Logout";


class App extends Component{


    render() {
        return(
            <>
                <Navbar />
                <Switch>
                    <Route path={'/login'} exact component={Login}/>
                    <Route path={'/store'} exact component={Store}/>
                    <ProtectedRoute path={'/logout'} exact component={Logout}/>
                    <ProtectedRoute path={'/profile'} exact component={UserProfile}/>
                    <ProtectedRoute path={['/','/home']} exact component={Home}/>
                </Switch>
            </>
        )
    }
}


export default withRouter(App);
