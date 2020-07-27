import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import classes from './List.module.css';
import cx from  'classnames';
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";

class List extends Component {
    render() {
        const products =  [
            {
                id:1,
                name: "Sady"
            },
            {
                id:2,
                name: "Sady1"
            }
            ,
            {
                id:3,
                name: "Sady2"
            }
        ]
        return(
            <div className={classes.container}>

            </div>
        )
    }
}

export default withRouter(List)