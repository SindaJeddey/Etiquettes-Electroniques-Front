import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import classes from './SideMenu.module.css';

const SideMenu = ({choice}) => {
    return(
        <div className={classes.container}>
            <div className={classes.title}>{choice+'s'}</div>
            <div className={classes.option}>
                <SearchIcon className={classes.icon} fontSize={"large"}/>
                <div className={classes.text}>
                    Search for {choice}
                </div>
            </div>
            <div className={classes.option}>
                <PersonAddIcon className={classes.icon} fontSize={"large"}/>
                <div className={classes.text}>
                    Add new {choice}
                </div>
            </div>
        </div>
    )
}

export default SideMenu;