import React, {Component} from "react";
import classes from './Login.module.css';
import axios from 'axios';
import * as actionCreators from '../../store/actions/index';
import {connect} from "react-redux";
import { withRouter} from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendEmail from "./SendEmail/SendEmail";

const decoder = require('jwt-decode')

const API_URL="https://localhost:8443/login";
class Login extends Component{

    state = {
        forgotPassword: false
    }

    onLoginHandler = (event) => {
        event.preventDefault();
        const credentials = {
            username: this.props.username,
            password: this.props.password
        }
        axios.post(API_URL, credentials,{httpsAgent: {
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
                this.props.history.push('/dash')
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true})
            });
    }

    onModalClose = () => {
        this.setState({forgotPassword: false},() => console.log(this.state.forgotPassword))
    }

    onModalOpen = () => {
        this.setState({forgotPassword: true},() => console.log(this.state.forgotPassword))
    }

    render() {
        return(
            <div className={classes.container}>
                <div className={classes.subcontainer}>
                <h2 className={classes.title}>Log In</h2>
                    {this.state.error? <div className={classes.error}>* Username or password incorrect</div> : null}
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

                    <div className={classes.buttonContainer}>
                       <Button size={"large"}
                               style={{ backgroundColor: "#f57c00", color:"#F1FAEE"}}
                               variant={"contained"}
                               onClick={event => this.onLoginHandler(event)}>Login</Button>
                   </div>
                </form>
                </div>
                <SendEmail forgortPassword={this.state.forgotPassword}
                           onModalClose={this.onModalClose}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => (
    {
        username: state.credentialsReducer.username,
        password: state.credentialsReducer.password,
        token: state.credentialsReducer.token,
        authority: state.credentialsReducer.authority,
        store: state.credentialsReducer.store
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