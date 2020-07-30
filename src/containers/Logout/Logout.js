import React, {Component} from "react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import classes from './Logout.module.css';
import cx from 'classnames';
import * as actionCreators from '../../store/actions/index'
import {connect} from "react-redux";
import { withRouter} from "react-router";

class Logout extends Component {
    onLogoutHandler = () => {
        this.props.onLogout();
    }

    render() {
        if(this.props.token === null)
            this.props.history.url('/')
        return (
            <div className={classes.container}>
                <button className={cx(classes.btnLink, "btn")}
                        onClick={this.onLogoutHandler}>
                    <ExitToAppIcon className={classes.icon}/>Logout
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        token: state.credentialsReducer.token,
        authority: state.credentialsReducer.authority
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        onLogout : () => dispatch(actionCreators.logout())
    }
)
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Logout));