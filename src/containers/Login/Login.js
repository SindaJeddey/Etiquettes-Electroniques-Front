import React, {Component} from "react";
import classes from './Login.module.css';
import cx from 'classnames';
import axios from 'axios';

class Login extends Component{
    state ={
        username:'',
        password:'',
        loggedInToken: null
    }

    onClickHandler = (event) => {
        event.preventDefault();
        const credentials ={
            username: this.state.username,
            password: this.state.password
        }

        axios.post("http://localhost:8080/login", credentials)
            .then(response => {
                this.setState({loggedInToken: response.headers['authorization'].replace("Bearer ", "")})
                console.log(this.state)
            })
            .catch(error => console.log(error));
    }


    render() {
        return(
            <div className={classes.container}>
                <h2 className={cx("pt-5 mb-5",classes.title)}>Log In</h2>
                <form className={classes.form}>
                        <div className={"form-group"}>
                            <label className={cx(classes.label,"col-form-label")}>Username:</label>
                            <input type="text"
                                   className={cx("form-control", classes.input)}
                                   placeholder={"ex.sady99"}
                                   onChange={(event) => this.setState({username: event.target.value})}/>
                        </div>
                        <div className={"form-group"}>
                            <label className={cx(classes.label,"col-form-label")}>Password:</label>
                            <input type="password"
                                   className={cx("form-control", classes.input)}
                                   placeholder={"Enter your password"}
                                   onChange={(event) => this.setState({password: event.target.value})}/>
                            <small className={cx(classes.fpw, "form-text")}>Forgot your password?</small>
                        </div>
                    <button className={cx("btn btn-primary mt-5",classes.button)}
                            onClick={event => this.onClickHandler(event)}>Login</button>
                </form>
            </div>
        )
    }

}

export default Login;