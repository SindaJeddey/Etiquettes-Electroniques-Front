import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import React, {useState} from "react";

const SendEmail = ( props ) => {
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [error, setError] = useState(false);
    const [email,setEmail] = useState("")

    const onEmailChange = (email) => {
        setEmail(email);
    }

    const onEmailSend = () => {
        axios.put("/api/password/token", {email: email})
            .then(response => setResetEmailSent(true))
            .catch(error => setError(true))
    }

        return(
            <div>
            <Dialog open={props.forgotPassword}
                    onClose={props.onModalClose}
                    fullWidth={true}>
                <DialogTitle>Password Reset</DialogTitle>
                <DialogContent>
                    {resetEmailSent === false ?
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        error={error}
                        helperText={error? "Can't find user with the mentioned email.":""}
                        onChange={event => onEmailChange(event.target.value)}/>:
                        <DialogContentText>
                            An email with password reset link has been sent to the given email address.
                        </DialogContentText>}
                </DialogContent>
                <DialogActions>
                    <Button style={{backgroundColor: "#f57c00", color:"#F1FAEE"}}
                            onClick={props.onModalClose}
                            color="primary">
                        Dismiss
                    </Button>
                    {resetEmailSent === false ?
                        <Button style={{backgroundColor: "#f57c00", color:"#F1FAEE"}}
                                onClick={onEmailSend}
                                color="primary">
                            Subscribe
                        </Button>
                        : null}
                </DialogActions>
            </Dialog>
            </div>
        )
}

export default SendEmail;