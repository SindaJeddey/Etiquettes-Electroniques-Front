import Auxiliary from "./Auxiliary";
import React from "react";
import SideBar from "../components/SideBar/SideBar";
import {Redirect, withRouter} from "react-router";
import * as options from "../components";
import {connect} from "react-redux";

const Layout = (props) => {
    if(!props.token)
        return <Redirect to={"/"}/>
    let choices = options.ADMIN
    if (props.authority !== null){
        if (props.authority === "ADMIN")
            choices = options.ADMIN;
        else if (props.authority === "OPERATOR")
            choices = options.OPERATOR
        else if (props.authority === "SUPER_OPERATOR")
            choices = options.SUPER_OPERATOR
    }
    return(
        <Auxiliary>
            <SideBar options={choices} store={props.store}/>
            <main>
                {props.children}
            </main>
        </Auxiliary>
    )
};

const mapStateToProps = (state) => (
    {
        token: state.credentialsReducer.token,
        authority: state.credentialsReducer.authority,
        store: state.credentialsReducer.store
    }
)
export default connect(mapStateToProps)(withRouter(Layout))