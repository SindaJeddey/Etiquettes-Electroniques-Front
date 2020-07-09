import React from "react";
import classes from './Background.module.css';

const Background = () => {
    return(
        <div>
            <div className={classes.sideBar}></div>
            <div className={classes.centerComponent}></div>
            <div className={classes.sideCenterComponent}></div>
            <div className={classes.logo}>LOGO</div>
        </div>
    );
}

export default Background;