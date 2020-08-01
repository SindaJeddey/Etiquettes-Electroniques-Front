import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import classes from './Modal.modules.css';
import axios from 'axios';
import * as actionCreators from '../../store/actions/index';
import {connect} from "react-redux";

class Modal extends Component {
    state = {
        resetEmailSent: false
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
        return(
            <div className={classes.container}>
                <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <DialogContent>
                        {this.props.text ?
                            <DialogContentText>{this.props.text}</DialogContentText> :
                            this.state.resetEmailSent ?
                            <DialogContentText>{this.props.successMessage}</DialogContentText> :
                                null}
                        {this.props.email === true ?
                            this.state.resetEmailSent === false ? <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            onChange={event => this.props.onSetEmail(event.target.value)}
                        /> : null : null }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary">
                            Dismiss
                        </Button>
                        {this.props.subscribe === true ?
                            this.state.resetEmailSent === false ? <Button onClick={this.onEmailSend} color="primary">
                            Subscribe
                        </Button> : null : null}
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        emailAddress: state.passwordReducer.emailAddress,
        token: state.passwordReducer.token
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        onSetEmail: (email) => dispatch(actionCreators.setEmail(email)),
        onSetToken: (token) => dispatch(actionCreators.setToken(token))
    }
)
export default connect(mapStateToProps,mapDispatchToProps)(Modal);