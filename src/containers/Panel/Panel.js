import React, {Component} from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import {connect} from "react-redux";
import classes from './Panel.module.css';
import Search from "../Search/Search";

class Panel extends Component {
    render() {

        return(
            <div className={classes.container}>
                    <SideMenu choice={this.props.choice}/>
                    <Search/>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        choice: state.choiceReducer.choice
    }
)

export default connect(mapStateToProps)(Panel);