import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Layout from "./components/Layout/Layout";
import {Route} from "react-router";
import Logout from "./containers/Logout/Logout";
import Profile from "./components/Profile/Profile";
import Login from "./containers/Login/Login";
import Choices from "./components/Choices/Choices";
import Panel from "./containers/Panel/Panel";
class App extends Component{

    render() {
        return(
            <div>
                <Layout>
                    {this.props.token!==null? <Logout/> : null}
                    {this.props.token!==null? <Profile/> : null}
                    <Route path={"/welcome"} exact component={Choices}/>
                    <Route path={"/:choice/:option"} component={Panel}/>
                    <Route path="/" exact component={Login}/>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        token: state.credentialsReducer.token,
        choice: state.choiceReducer.choice
    }
)


export default connect(mapStateToProps)(App);
