import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import classes from './Modal.modules.css';

const Modal = (props) => {
    return(
        <div className={classes.container}>
            <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{props.text}</DialogContentText>
                    {props.email === true ? <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> : null }
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>
                    {props.subscribe === true ? <Button onClick={props.subscribe} color="primary">
                        Subscribe
                    </Button> : null }

                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Modal