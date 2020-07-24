import React, {Component} from "react";
import classes from './Choice.module.css';

class Choice extends Component{
    buttonClick = (event) => {
        event.preventDefault();
    }
    render() {
        return(
            <div className={classes.container}>
                <button className={"btn btn-outline-dark btn-block"}
                        onClick={this.props.clicked}>
                    {this.props.title}
                </button>
            </div>

        )
    }
}

export default Choice;