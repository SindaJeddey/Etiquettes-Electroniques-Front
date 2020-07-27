import React, {Component} from 'react';
import './App.css';
import Login from "./containers/Login/Login";
import {connect} from "react-redux";
import Layout from "./components/Layout/Layout";
import {Route, Switch} from "react-router";
import Logout from "./containers/Logout/Logout";
import Choices from "./components/Choices/Choices";
import Profile from "./components/Profile/Profile";
import List from "./containers/List/List";
import SideMenu from "./components/SideMenu/SideMenu";
class App extends Component{

    render() {
        return(
            <div>
                <Layout>
                    {this.props.token!==null? <Logout/> : null}
                    {this.props.token!==null? <Profile/> : null}
                    <Switch>
                        <Route path={"/welcome"} exact component={() => <Choices username={this.props.username}
                                                                                 role={this.props.authority}/>}/>
                        <Route path={"/category"} exact component={List}/>
                        <Route path="/" component={() => <SideMenu choice = "Operator"/>}/>
                    </Switch>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        username: state.username,
        token: state.token,
        authority: state.authority
    }
)


export default connect(mapStateToProps)(App);
