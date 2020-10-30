import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import React, {Component} from "react";

class SendEmail extends Component{
    state ={
        resetEmailSent: false,
        error: false,
        email:"",
        open:false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.open !== this.props.forgortPassword)
            this.setState({open: this.props.forgortPassword},() => console.log(this.state))
    }

    onEmailChange = (email) => {
        this.setState({email: email})
    }

    onEmailSend = () => {
        axios.put("https://localhost:8443/api/password/token", {email: this.state.email})
            .then(response => {
                this.setState({resetEmailSent: true});
            })
            .catch(error => console.log(error.status))
    }

    closeModal = () => {
        this.setState({open :false})
    }
    render() {
        return(
            <div>
            <Dialog open={this.state.open}
                    onClose={this.closeModal}
                    aria-labelledby={"form-dialog-title"}
                    fullWidth={true}>
                <DialogTitle>Password Reset</DialogTitle>
                <DialogContent>
                    {this.state.resetEmailSent === false ?
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        error={this.state.error}
                        onChange={event => this.onEmailChange(event.target.value)}
                        />:
                        <DialogContentText>
                            An email with password reset link has been sent to the given email address.
                        </DialogContentText>}
                </DialogContent>
                <DialogActions>
                    <Button style={{backgroundColor: "#f57c00", color:"#F1FAEE"}}
                            onClick={this.closeModal}
                            color="primary">
                        Dismiss
                    </Button>
                    {this.state.resetEmailSent === false ?
                        <Button style={{backgroundColor: "#f57c00", color:"#F1FAEE"}}
                                onClick={this.onEmailSend}
                                color="primary">
                            Subscribe
                        </Button>
                        : null}
                </DialogActions>
            </Dialog>
            </div>
        )
}
}

export default SendEmail;