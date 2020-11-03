import React, {Component} from 'react';
import './App.css';
import Login from "./Authentication/Login/Login";
import Store from "./ChooseStore/Store";
import {Route, Switch, withRouter} from "react-router";
import UserProfile from "./UserProfile/UserProfile";
import Navbar from "./components/NavBar/NavBar";
import ProtectedRoute from "./Navigation/ProtectedRoute";
import Home from "./Home/Home";
import Logout from "./Authentication/Logout/Logout";
import Category from "./Categories/Categories";


class App extends Component{


    render() {
        return(
            <>
                {!localStorage.getItem('store') || !localStorage.getItem('jwt') ? null : <Navbar/>}
                <Switch>
                    <Route path={'/login'} exact component={Login}/>
                    <Route path={'/store'} exact component={Store}/>
                    <ProtectedRoute path={'/logout'} exact component={Logout}/>
                    <ProtectedRoute path={'/profile'} exact component={UserProfile}/>
                    <ProtectedRoute path={'/categories'} component={Category}/>
                    <ProtectedRoute path={['/','/home']} exact component={Home}/>
                </Switch>
            </>
        )
    }
}


export default withRouter(App);
