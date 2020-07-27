import React from "react";
import classes from './Background.module.css';
import cx from 'classnames';

const Background = () => {
    return(
        <div>
            <div className={cx(classes.sideBar)}></div>
            <div className={cx(classes.centerComponent)}>
                <div className={classes.sideCenterComponent}/>
            </div>
            <div className={classes.logo}>LOGO</div>
        </div>
    );
}

export default Background;