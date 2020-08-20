import React, {Component} from "react";
import classes from './AddUser.module.css';
import TextField from "@material-ui/core/TextField";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import axios from 'axios';
import CloseIcon from "@material-ui/icons/Close";
import ImageUploader from 'react-images-upload';

const API_URL = "https://localhost:8443/api/"
class AddUser extends Component{

    state = {
        name: null,
        lastName: null,
        username: null,
        email: null
    }

    onClickHandler = () => {
        const user  = { ...this.state}
        axios.post(API_URL+this.props.choice.toLowerCase()+"/new", user , {
            headers : {
                'Authorization': this.props.token
            }
        })
            .then(response => {
                console.log(response)
                this.props.onSubmit();
            })
            .catch(error => console.log(error))
        console.log(user);
    }

    render() {
        return(
            <div className={classes.container}>
                <CloseIcon className={classes.closeIcon} onClick={this.props.onClose}/>
                <div className={classes.title}>New {this.props.choice.replace("s","")}</div>
                <form className={classes.form}>
                    <div className={classes.input}>
                        <TextField label={"Name"}
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={event => this.setState({name: event.target.value})}/>
                    </div>
                    <div className={classes.input}>
                        <TextField label={"Last Name"}
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={event => this.setState({lastName: event.target.value})}/>
                    </div>
                    <div className={classes.input}>
                        <TextField label={"Username"}
                                   fullWidth={true}
                                   helperText={"* Must be unique"}
                                   variant="outlined"
                                   onChange={event => this.setState({username: event.target.value})}/>
                    </div>
                    <div className={classes.input}>
                        <TextField label={"Email"}
                                   type={"email"}
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={event => this.setState({email: event.target.value})}/>
                    </div>
                    <div className={classes.imageInput}>
                        <ImageUploader  withIcon={false}
                                        buttonText='Choose image' singleImage={true}/>
                    </div>
                    <div className={classes.buttonContainer}>
                        <Button className={classes.button}
                                color={"primary"}
                                variant={"contained"} startIcon={<PersonAddIcon/>}
                                onClick={this.onClickHandler}>Add {this.props.choice.replace("s","")}</Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    choice: state.choiceReducer.choice,
    token: 'Bearer '+state.credentialsReducer.token
})

export default connect(mapStateToProps)(AddUser);