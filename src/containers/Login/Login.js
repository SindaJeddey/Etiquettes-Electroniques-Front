import React, {Component} from "react";
import classes from './Login.module.css';
import cx from 'classnames';
import axios from 'axios';
import * as actionCreators from '../../store/actions/index';
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router";
import Choices from "../../components/Choices/Choices";
import Modal from "../../components/Modal/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const decoder = require('jwt-decode')

class Login extends Component{

    state = {
        forgotPassword: false,
        email: null
    }

    onClickHandler = (event) => {
        event.preventDefault();
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

    onModalClose = () => {
        this.setState({forgotPassword: false})
    }

    onModalOpen = () => {
        this.setState({forgotPassword: true})
    }

    onEmailChange = (email) => {
        this.setState({email: email})
    }

    onEmailSend = () => {
        axios.post("https://localhost:8443/api/password/token", {email: this.props.emailAddress})
            .then(response => {
                this.props.onSetToken(response.data.token);
                this.setState({resetEmailSent: true});
                console.log(this.props)
            })
            .catch(error => console.log(error))
    }

    render() {
        if (this.props.token !== null)
            return (<Redirect to={"/welcome"} />)
        return(
            <div className={classes.container}>
                <h2 className={cx("pt-5 mb-5",classes.title)}>Log In</h2>
                <form className={classes.form}>
                    <div className={classes.input}>
                        <TextField label="Username"
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={(event) => this.props.onChangeUsername(event.target.value)}/>
                    </div>
                    <div className={classes.input}>
                        <TextField label="Password"
                                   fullWidth={true}
                                   variant="outlined"
                                   type={"password"}
                                   onChange={(event) => this.props.onChangePassword(event.target.value)}/>
                    </div>
                    <small className={classes.fpw}
                           onClick={this.onModalOpen}>
                        Forgot your password?
                    </small>
                    <Modal open={this.state.forgotPassword}
                           title={"Password Reset"}
                           email={true}
                           successMessage={"An email with password reset link has been sent to the given email address."}
                           onClose={this.onModalClose}
                           onSetEmail={this.onEmailChange}
                           subscribe={true}
                           onEmailSend={this.onEmailSend}/>
                    <div className={classes.buttonContainer}>
                       <Button size={"large"} className={classes.button}
                               color={"primary"}
                               variant={"contained"}
                               onClick={event => this.onClickHandler(event)}>Login</Button>
                   </div>
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