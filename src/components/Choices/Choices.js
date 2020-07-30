import React, {Component} from "react";
import Choice from "../../containers/Choice/Choice";
import classes from './Choices.module.css';
import * as options from "../index";
import {Redirect, withRouter} from "react-router";
import {connect} from "react-redux";


class Choices extends Component {
    render() {
        let redirect = <Redirect to={"/"} />;
        if (this.props.authority !== null && this.props.username !== null){
            let choices = null;
            if (this.props.authority === "ADMIN")
                choices = options.ADMIN;
            else if (this.props.authority === "OPERATOR")
                choices = options.OPERATOR
            else if (this.props.authority === "SUPER_OPERATOR")
                choices = options.SUPER_OPERATOR
            redirect = (
                    <div>
                        <div className={classes.welcome}>
                            Welcome {this.props.username}
                        </div>
                        <div className={classes.container}>
                            {choices.map((option,i) => <Choice key={i}
                                                               title={option}/>)}
                        </div>
                    </div>
            )
        }
        return(redirect)
    }
}

const mapStateToProps = (state) => (
    {
        username: state.credentialsReducer.username,
        authority: state.credentialsReducer.authority
    }
)

export default withRouter(connect(mapStateToProps)(Choices));