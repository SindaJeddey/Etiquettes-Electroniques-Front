import React, {Component} from 'react';
import './App.css';
import Login from "./containers/Login/Login";
import {connect} from "react-redux";
import Layout from "./components/Layout/Layout";
import {Route, Switch} from "react-router";
import Logout from "./containers/Logout/Logout";
import Welcome from "./components/Welcome/Welcome";
import Profile from "./components/Profile/Profile";
class App extends Component{

    render() {
        return(
            <div>
                <Layout>
                    {this.props.token!==null? <Logout/> : null}
                    {this.props.token!==null? <Profile/> : null}
                    <Switch>
                        <Route path={"/welcome"} component={() => <Welcome username={this.props.username}
                                                                           role={this.props.authority}/>}/>
                        <Route path="/" component={Login}/>
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
