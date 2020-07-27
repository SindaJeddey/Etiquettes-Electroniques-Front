import React, {Component} from "react";
import classes from './Choice.module.css';
import {withRouter} from "react-router";

class Choice extends Component{

    onClickHandler =() =>{
        this.props.history.push('/category')
    }

    render() {
        return(
            <div className={classes.container}>
                <button className={"btn btn-outline-dark btn-block"}
                        onClick={this.onClickHandler}>
                    {this.props.title}
                </button>
            </div>

        )
    }
}

export default withRouter(Choice);