import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import classes from './Modal.modules.css';
import * as actionCreators from '../../store/actions/index';
import {connect} from "react-redux";

class Modal extends Component {

    state = {
        resetEmailSent: false
    }

    render() {
        return(
            <div className={classes.container}>
                <Dialog open={this.props.open}
                        onClose={this.props.onClose}
                        aria-labelledby="form-dialog-title"
                        fullWidth={true}>
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
                            this.props.email === true?
                            this.state.resetEmailSent === false ? <Button onClick={this.props.onEmailSend} color="primary">
                            Subscribe
                        </Button> : null : <Button onClick={this.props.confirm} color="primary">
                                    Confirm
                                </Button> : null
                        }
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default Modal;