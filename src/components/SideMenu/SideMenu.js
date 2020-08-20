import React, {Component} from "react";
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import classes from './SideMenu.module.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router";

class SideMenu extends Component {

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        if (this.props.choice === null)
            return <Redirect to={'/welcome'}/>
        const choice = this.props.choice.replace("s","");
        return(
            <div className={classes.container}>
                <div className={classes.title}>{choice+"s"}</div>
                <div className={classes.option} onClick={this.props.searchClick}>
                    <SearchIcon className={classes.icon} fontSize={"large"}/>
                    <div className={classes.text}>
                        Search for {choice}
                    </div>
                </div>
                <div className={classes.option} onClick={this.props.addClick}>
                    <PersonAddIcon className={classes.icon} fontSize={"large"}/>
                    <div className={classes.text}>
                        Add new {choice}
                    </div>
                </div>
                <div className={classes.back} onClick={this.goBack}>
                    <ArrowBackIosIcon fontSize={"small"}/>Back
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        choice: state.choiceReducer.choice
    }
)

export default withRouter(connect(mapStateToProps)(SideMenu));