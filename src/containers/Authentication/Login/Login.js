import React, { useState} from "react";
import './Login.css';
import axios from 'axios';
import * as actionCreators from '../../../store/actions';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendEmail from "./SendEmail/SendEmail";

const decoder = require('jwt-decode')

const Login = (props) => {

    const [forgotPassword, setForgotPassword] = useState(false);
    const [error, setError] = useState(false);

    const onLoginHandler = (event) => {
        event.preventDefault();

        const credentials = {
            username: props.username,
            password: props.password
        }

        axios.post('login', credentials)
            .then(response => {
                const token = response.headers['authorization'].replace("Bearer ","");
                const authority = decoder(token).authorities[0].authority.replace("ROLE_","");
                props.onLogin({
                    username: props.username,
                    authority: authority
                });
                localStorage.setItem('jwt',token);
                props.history.push('/store')
            })
            .catch(error => {
                console.log(error);
                setError(true);
            });
    }

    const offForgotPassword = () => setForgotPassword(false)

    const onForgotPassword = () => {
        setError(false);
        setForgotPassword(true)
    }

    if(localStorage.getItem('jwt')){
        if(localStorage.getItem('store'))
            return <Redirect to={'/home'}/>
        else return <Redirect to={'/store'}/>
    }


    return(
            <div className={'login_container'}>
                <div className={'login_sub_container'}>
                <h2 className={'login_title'}>Log In</h2>
                    {error? <div className={'login_error'}>* Username or password incorrect</div> : null}
                <form className={'login_form'}>
                    <div className={'login_input'}>
                        <TextField label="Username"
                                   fullWidth={true}
                                   error={error}
                                   variant="outlined"
                                   onChange={(event) => props.onChangeUsername(event.target.value)}/>
                    </div>
                    <div className={'login_input'}>
                        <TextField label="Password"
                                   fullWidth={true}
                                   error={error}
                                   variant="outlined"
                                   type={"password"}
                                   onChange={(event) => props.onChangePassword(event.target.value)}/>
                    </div>
                    <small className={'login_fpw'}
                           onClick={onForgotPassword}>
                        Forgot your password?
                    </small>
                    <div className={'login_button_container'}>
                       <Button size={"large"}
                               style={{ backgroundColor: "#f57c00", color:"#F1FAEE"}}
                               variant={"contained"}
                               onClick={event => onLoginHandler(event)}>Login</Button>
                   </div>
                </form>
                </div>
                <SendEmail forgotPassword={forgotPassword}
                           onModalClose={offForgotPassword}/>
            </div>
        )

}

const mapStateToProps = (state) => (
    {
        username: state.credentialsReducer.username,
        password: state.credentialsReducer.password,
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