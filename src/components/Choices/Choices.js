import React, {Component} from "react";
import Choice from "./Choice/Choice";
import classes from './Choices.module.css';
import * as options from "../index";


const Choices = ({role,username}) =>
{
        let choices = null;
        if (role === "ADMIN")
            choices = options.ADMIN;
        else if (role === "OPERATOR")
            choices = options.OPERATOR
        else
            choices = options.SUPER_OPERATOR
        return(
            <div>
                <div className={classes.welcome}>
                    Welcome {username}
                </div>
                <div className={classes.container}>
                    {choices.map((option,i) => <Choice key={i}
                                                       title={option}/>)}
                </div>
            </div>
            )
}

export default Choices;