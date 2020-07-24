import React, {Component} from "react";
import Choice from "./Choice/Choice";
import classes from './Choices.module.css';
import * as options from "../index";


const Choices = ({role}) =>
{
        let choices = null;
        if (role === "ADMIN")
            choices = options.ADMIN;
        else if (role === "OPERATOR")
            choices = options.OPERATOR
        else
            choices = options.SUPER_OPERATOR
        return(
            <div className={classes.container}>
                {choices.map((option,i) => <Choice key={i} title={option}/>)}
            </div>)
}

export default Choices;