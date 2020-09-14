import {Component} from "react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import classes from './UserProfile.module.css'
import Button from "@material-ui/core/Button";
import UpdateIcon from '@material-ui/icons/Update';
import {connect} from "react-redux";
import axios from 'axios';
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers";

class UserProfile extends Component{
    state = {
        name:null,
        lastName:null,
        email:null,
        password:null,
        birthday:null,
        errors:{
            name:null,
            lastName:null,
            email:null,
            password:null,
            birthday:null
        }
    }

    componentDidMount() {
        axios.get("https://localhost:8443/api/"+this.props.authority+"/"+this.props.username)
            .then(response => {
                console.log(response)
                this.setState({
                    name: response.data.name,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    birthday: response.data.birthday
                })
            })
            .catch(error => console.log(error))
    }

    handleChange = (event) => {
        const validEmailRegex =
            RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        const {name, value} = event.target;
        let errors = this.state.errors
        switch (name){
            case "name":
                if (value=== "" || value=== " ")
                    errors.name =  "* Must provide user's name"
                else if (value[0] === " ")
                    errors.name = "* Name should start with a letter"
                else
                    errors.name = ""
                break;
            case "lastName":
                if (value=== "" || value=== " ")
                    errors.lastName =  "* Must provide last name"
                else if (value[0] === " ")
                    errors.lastName = "* Last name should start with a letter"
                else
                    errors.lastName = ""
                break;
            case "email":
                if(value === "" )
                    errors.email="* Must provide an email";
                else if(!validEmailRegex.test(value))
                    errors.email="* Email not valid";
                else errors.email=null
                break;
            default:
                break;
        }
        this.setState({errors: errors,[name]: value})
    }

    validateForm = (errors) => {
        const user = {...this.state}
        delete user.errors
        let newErrors = this.state.errors
        let valid = true
        for (const key in user){
            switch (key){
                case "name":
                        if (user[key] === null) {
                            newErrors.name = "* Must provide name"
                            valid = false
                        }
                    break;
                case "lastName":
                        if (user[key] === null) {
                            newErrors.lastName = "* Must provide a last name"
                            valid = false
                        }
                    break;
                case "email":
                        if (user[key] === null) {
                            newErrors.email = "* Must provide an email"
                            valid = false
                        }
                    break;
                default:
                    break;
            }
        }
        Object.values(newErrors).forEach(
            (val) => {
                if(val !== null && val.length >0)
                    valid = false;
            }
        );
        this.setState({errors: newErrors})
        return valid;
    }

    onClickHandler = () => {
        if(this.validateForm(this.state.errors)){
            const user = {
                ...this.state
            }
            delete user.errors
            axios.put("https://localhost:8443/api/" + this.props.authority + "/update/" + this.props.username, user, {headers:{'Authorization': this.props.token}})
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
    }

    render() {
        const {username} = this.props
        return(
            <div className={classes.container}>
                <div className={classes.title}>{username}</div>
                <form className={classes.form}>
                            <div className={classes.input}>
                                <TextField label={"Name"}
                                           error={this.state.errors.name}
                                           helperText={this.state.errors.name}
                                           name={"name"}
                                           value={this.state.name}
                                           fullWidth={true}
                                           variant="outlined"
                                           onChange={event => this.handleChange(event)}/>
                            </div>
                            <div className={classes.input}>
                                <TextField label={"Last Name"}
                                           error={this.state.errors.lastName}
                                           helperText={this.state.errors.lastName}
                                           name={"lastName"}
                                           value={this.state.lastName}
                                           fullWidth={true}
                                           variant="outlined"
                                           onChange={event => this.handleChange(event)}/>

                            </div>
                            <div className={classes.input}>
                                <TextField label={"Email"}
                                           error={this.state.errors.email}
                                           helperText={this.state.errors.email}
                                           name={"email"}
                                           value={this.state.email}
                                           type={"email"}
                                           fullWidth={true}
                                           variant="outlined"
                                           onChange={event => this.handleChange(event)}/>
                            </div>
                            <div className={classes.birthday}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            label="Select birthday"
                                            onChange={(date) => this.setState({birthday:date})}
                                            value={this.state.birthday}/>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className={classes.input}>
                                <TextField label={"New Password"}
                                           name={"password"}
                                           value={this.state.password}
                                           type={"password"}
                                           fullWidth={true}
                                           variant="outlined"
                                           onChange={event => this.handleChange(event)}/>
                            </div>
                    <div className={classes.buttonContainer}>
                        <Button
                            variant={"contained"}
                            startIcon={<UpdateIcon/>}
                            onClick={this.onClickHandler}>Update Profile</Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    username: state.credentialsReducer.username,
    authority: state.credentialsReducer.authority.toLowerCase()+"s",
    token:state.credentialsReducer.token
})

export default connect(mapStateToProps)(UserProfile);