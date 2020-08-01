import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";

class PasswordReset extends Component {
    render() {
        return(
            <div>
                <form>
                    <TextField label="New Password" variant="outlined" />
                    <TextField label="Confirm New Password" variant="outlined" />
                </form>
            </div>
        )
    }
}

export default PasswordReset;