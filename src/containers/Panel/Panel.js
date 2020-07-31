import React, {Component} from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import {connect} from "react-redux";
import classes from './Panel.module.css';
import Search from "../Search/Search";
import {withRouter} from "react-router";

class Panel extends Component {

    state = {
        search: false,
        adding: false
    }

    onSearchClick = () => {
        if(this.state.adding === true)
            this.setState({adding: false})
        this.setState({search: true})
    }

    onClose = () => {
        this.setState({search: false,adding: false})
    }

    render() {
        if(this.props.token === null) {
            this.props.history.replace('/')
        }
        return(
            <div className={classes.container}>
                    <SideMenu searchClick={this.onSearchClick}/>
                {this.state.search ? <Search choice={this.props.choice.replace("s", "")}
                                             onClose={this.onClose}/>
                                             : null}

            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        choice: state.choiceReducer.choice,
        token: state.credentialsReducer.token
    }
)

export default withRouter(connect(mapStateToProps)(Panel));