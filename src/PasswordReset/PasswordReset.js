import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import classes from './PasswordReset.module.css';
import Button from "@material-ui/core/Button";
import * as actionCreators from '../ReduxStore/actions';
import axios from 'axios';
import Modal from "../../components/Modal/Modal";

class PasswordReset extends Component {

    state = {
        password: null,
        passwordConfirmation: null,
        response: false,
        error:false,
        sent:false
    }

    componentDidMount() {
        this.props.onSetToken(this.tokenExtraction())
    }

    tokenExtraction =() => {
        const url = this.props.location.search
        if(url.includes("token=")){
            const start = url.search("token=") + 6;
            let end = url.length;
            if(url.indexOf('&') !== -1)
                end = url.indexOf('&')-1;
            return (url.substring(start,end));
        }
        else
            return null;
    }

    onClickHandler = (event) => {
        if(this.state.password.localeCompare(this.state.passwordConfirmation) === 1
            || this.state.password.localeCompare(this.state.passwordConfirmation) === -1)
            this.setState({error: true})
        else {
            const newPasswordDto = {
                newPassword: this.state.password,
                token: this.props.token
            }
            axios.put("https://localhost:8443/api/password/reset", newPasswordDto)
                .then(response => {
                    if(response.data === "SAVED")
                        this.setState({response: true})
                })
                .catch(error => console.log(error));
        }
    }

    onModalClose = () => {
        this.setState({response: false})
        this.props.history.replace('/');
    }

    render() {
        if (this.tokenExtraction() === null)
            this.props.history.replace('/');
        return(
            <div className={classes.container}>
                <div className={classes.subcontainer}>
                    <h2 className={classes.title}>New Password</h2>
                    {this.state.error? <div className={classes.error}>* Passwords are not matching</div> : null}
                    <form className={classes.form}>
                        <div className={classes.input}>
                            <TextField label="New Password"
                                       fullWidth={true}
                                       variant="outlined"
                                       type={"password"}
                                       onChange={(event) => this.setState({password:event.target.value})}/>
                        </div>
                        <div className={classes.input}>
                            <TextField label="Confirm New Password"
                                       fullWidth={true}
                                       variant="outlined"
                                       type={"password"}
                                       onChange={(event) => this.setState({passwordConfirmation: event.target.value})}/>
                        </div>
                        <div className={classes.buttonContainer}>
                            <Button style={{
                                backgroundColor: "#f57c00", color:"#F1FAEE"
                            }} size={"large"}
                                    variant={"contained"}
                                    onClick={event => this.onClickHandler(event)}>Submit</Button>
                        </div>
                        <Modal title={"Password Reset"}
                               text={"Password has been successfully reset"}
                               email={false}
                               subscribe={false}
                               open={this.state.response}
                               onClose={this.onModalClose}/>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.passwordReducer.token,
    emailAddress: state.passwordReducer.emailAddress
});

const mapDispatchToProps = (dispatch) => ({
    onSetToken: (token) => dispatch(actionCreators.setToken(token))
})


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PasswordReset));
