import React from "react";
import classes from './Profile.module.css';
import cx from "classnames";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Profile = () => {
    return(
        <div className={classes.container}>
            <button className={cx(classes.btnLink, "btn")}>
                <AccountCircleIcon/> Profile
            </button>
        </div>
    )
}

export default Profile;