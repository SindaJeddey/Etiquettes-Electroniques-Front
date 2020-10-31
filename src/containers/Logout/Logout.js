import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Redirect} from "react-router";
const Logout = () =>  {

    localStorage.removeItem('jwt');
    localStorage.removeItem('store');
    return(
        <>
            <Dialog open={true}>
                <DialogTitle>Logging out ...</DialogTitle>
            </Dialog>
            <Redirect to={'/login'}/>
        </>
    )
}

export default Logout;