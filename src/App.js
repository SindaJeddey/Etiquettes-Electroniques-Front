import React, {Component} from 'react';
import './App.css';
import Login from "./containers/Login/Login";
import Store from "./containers/ChooseStore/Store";
import {connect} from "react-redux";
import {Route, withRouter} from "react-router";
import Layout from "./hoc/Layout";
import Content from "./components/Content/Content";
import UserProfile from "./containers/UserProfile/UserProfile";
class App extends Component{


    render() {
        return(
            <div>
                {!this.props.store ? <Store/> :
                    !this.props.token ? <Login/> :
                        <Layout>
                            <Route path={"/profile"} exact render={() => <UserProfile/>}/>
                            <Route path={"/:choice/:operation"} render={() => <Content/>} />
                    </Layout>}
            </div>

        )
    }
}

const mapStateToProps =(state) => ({
    token: state.credentialsReducer.token,
    store: state.credentialsReducer.store
})

export default withRouter(connect(mapStateToProps)(App));
