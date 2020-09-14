import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router";

const ProtectedRoute = (props) => {
    if (this.props.token === null)
        return <Redirect to={"/"}/>
    return <Route {...props} />
}

const mapStateToProps = (state) => ({
    token: state.credentialsReducer.token,
});

export default withRouter(connect(mapStateToProps)(ProtectedRoute));