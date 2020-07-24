import React, {Component} from 'react';
import './App.css';
import Login from "./containers/Login/Login";
import {connect} from "react-redux";
import Layout from "./components/Layout/Layout";
import {Route, Switch} from "react-router";
import Logout from "./containers/Logout/Logout";
import Choices from "./components/Choices/Choices";
class App extends Component{

    render() {
        return(
            <div>
                <Layout>
                    {this.props.token!==null? <Logout/> : null}
                    <Switch>
                        <Route path={"/welcome"} component={() => <Choices role={this.props.authority}/>}/>
                        <Route path="/" component={Login}/>
                    </Switch>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        token: state.token,
        authority: state.authority
    }
)


export default connect(mapStateToProps)(App);
