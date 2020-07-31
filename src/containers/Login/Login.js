import React, {Component} from "react";
import classes from './Login.module.css';
import cx from 'classnames';
import axios from 'axios';
import * as actionCreators from '../../store/actions/index';
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router";
import Choices from "../../components/Choices/Choices";


const decoder = require('jwt-decode')

class Login extends Component{


    fetching = () => {
        const credentials = {
            username: this.props.username,
            password: this.props.password
        }
        axios.post("https://localhost:8443/login", credentials,{httpsAgent: {
            rejectUnauthorized: false
            }})
            .then(response => {
                const token = response.headers['authorization'].replace("Bearer ","");
                const auth = decoder(token).authorities[0].authority.replace("ROLE_","");
                this.props.onLogin({
                    username: this.props.username,
                    password: this.props.password,
                    token: token,
                    authority: auth
                });
                this.setState({redirect: true});
            })
            .catch(error => {
                console.log(error);
                this.props.history.replace('/')
            });
    }

    onClickHandler = (event) => {
        event.preventDefault();
        this.fetching();
    }


    render() {
        if (this.props.token !== null)
            return (<Redirect to={"/welcome"} />)
        return(
            <div className={classes.container}>
                <h2 className={cx("pt-5 mb-5",classes.title)}>Log In</h2>
                <form className={classes.form}>
                        <div className={"form-group"}>
                            <label className={cx(classes.label,"col-form-label")}>Username:</label>
                            <input type="text"
                                   className={cx("form-control", classes.input)}
                                   placeholder={"ex.sady99"}
                                   onChange={(event) => this.props.onChangeUsername(event.target.value)}/>
                        </div>
                        <div className={"form-group"}>
                            <label className={cx(classes.label,"col-form-label")}>Password:</label>
                            <input type="password"
                                   className={cx("form-control", classes.input)}
                                   placeholder={"Enter your password"}
                                   onChange={(event) => this.props.onChangePassword(event.target.value)}/>
                            <small className={cx(classes.fpw, "form-text")}>Forgot your password?</small>
                        </div>
                    <button className={cx("btn btn-primary mt-5",classes.button)}
                            onClick={event => this.onClickHandler(event)}>Login</button>
                </form>
            </div>
        )
    }

}

const mapStateToProps = (state) => (
    {
        username: state.credentialsReducer.username,
        password: state.credentialsReducer.password,
        token: state.credentialsReducer.token,
        authority: state.credentialsReducer.authority
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        onLogin: (credentials) => dispatch(actionCreators.login(credentials)),
        onChangeUsername: (username) => dispatch(actionCreators.updateUsername(username)),
        onChangePassword: (password) => dispatch(actionCreators.updatePassword(password))
    }
)

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));