import React from "react";
import classes from './SideBar.module.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CopyrightIcon from '@material-ui/icons/Copyright';
import SubMenu from "./SubMenu";
import * as actionsCreators from "../../store/actions/index";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const SideBar = (props) => {
    const address = props.store.name+', '+props.store.location+', '+props.store.zipCode
    return(
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.logo}>LOGO</div>
                <div className={classes.store}><LocationOnIcon/>{address}</div>
            </div>
            <div className={classes.content}>
                {props.options.map((option,key) => <SubMenu option={option} key={key}/> )}
            </div>
            <div className={classes.footer}>
                <div className={classes.footerItem}>
                    <AccountCircleIcon/> <Link to={"/profile"}>Profile</Link>
                </div>
                <div className={classes.footerItem} onClick={() => props.onLogout()}>
                    <ExitToAppIcon/> Logout
                </div>
                <div className={classes.copyright}>
                    <CopyrightIcon fontSize={"small"}/> Copyrights EE 2020
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    store: state.credentialsReducer.store
});

const mapStateToDispatch = (dispatch) => ({
    onLogout: () => dispatch(actionsCreators.logout())
});

export default connect(mapStateToProps,mapStateToDispatch)(SideBar);