import React, {Component} from "react";
import classes from './User.module.css';
import TextField from "@material-ui/core/TextField";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import Auxiliary from "../../../hoc/Auxiliary";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withRouter} from "react-router";
import {FormHelperText} from "@material-ui/core";

const API_URL = "https://localhost:8443/api/";
class User extends Component{

    state = {
        id: null,
        name: null,
        lastName: null,
        username: null,
        email: null,
        image:null,
        errors: {
            username: null,
            email:null,
            name:null,
            role:null,
            lastName: null
        },
        usernames: []
    }

    componentDidMount() {
        const role = this.props.role.toLowerCase()+'s';
        if(this.props.operation ==="Add")
            axios.get(API_URL+role+"/usernames")
                .then(response => this.setState({usernames: response.data}))
                .catch(error => console.log(error));

        else if(this.props.id !== null || this.props.id !== undefined){
            console.log("here")
            axios.get(API_URL+role+"/"+this.props.id,{headers:{'Authorization': this.props.token}})
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        id: this.props.id,
                        name: response.data.name,
                        lastName: response.data.lastName,
                        username: response.data.username,
                        email: response.data.email,
                        role: response.data.role})
                })
                .catch(error => console.log(error))
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.url !== this.props.match.url)
            this.setState({
                id: null,
                name: null,
                lastName: null,
                username: null,
                email: null,
                role: null,
                errors: {
                    username: null,
                    email:null,
                    name:null,
                    lastName: null
                },
                usernames: []})
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
            case "username":
                if(value === "" || value === " ")
                    errors.username="* Must provide a username"
                else if(this.state.usernames.includes(value))
                    errors.username="* Username already exists"
                else if (value[0] === " ")
                    errors.username = "* Username should with a letter, number or underscore (_)"
                else
                    errors.username = ""
                break;
            default:
                break;
        }
        this.setState({errors: errors,[name]: value})
    }

    validateForm = (errors) => {
        const user = {...this.state}
        delete user.usernames
        delete user.errors
        delete user.id
        let newErrors = this.state.errors
        let valid = true
        for (const key in user){
            switch (key){
                case "name":
                    if(this.props.operation !== "Update") {
                        if (user[key] === null) {
                            newErrors.name = "* Must provide name"
                            valid = false
                        }
                    }
                    break;
                case "lastName":
                    if(this.props.operation !== "Update") {
                        if (user[key] === null) {
                            newErrors.lastName = "* Must provide a last name"
                            valid = false
                        }
                    }
                    break;
                case "email":
                    if(this.props.operation !== "Update") {
                        if (user[key] === null) {
                            newErrors.email = "* Must provide an email"
                            valid = false
                        }
                    }
                    break;
                case "username":
                    if(this.props.operation !== "Update") {
                        if (user[key] === null) {
                            newErrors.username = "* Must provide a username"
                            valid = false
                        }
                    }
                    break;
                case "role":
                    if(this.props.operation === "Update") {
                        if (user[key] === null) {
                            newErrors.role = "* Must provide a role"
                            valid = false
                        }
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
        console.log(this.state.errors)
        if(this.validateForm(this.state.errors)) {
            console.log("in")
            const user  = { ...this.state}
            delete user.usernames
            const role = this.props.role.toLowerCase()+'s';
            if (this.props.operation === "Add") {
                axios.post(API_URL + role + "/new", user, {
                    headers: {
                        'Authorization': this.props.token
                    }
                })
                    .then(response => this.props.history.push("/" + role + "/browse"))
                    .catch(error => console.log(error))
            } else {
                axios.put(API_URL + role + "/" + this.state.id, user, {
                    headers: {
                        'Authorization': this.props.token
                    }
                })
                    .then(response => this.props.history.push("/" + role + "/browse"))
                    .catch(error => console.log(error))
            }
        }

    }

    render() {
        const {operation, role} = this.props
        return(
            <div className={classes.container}>
                <div className={classes.title}>{operation} {role}</div>
                <form className={classes.form}>
                    {operation === "Add" ?
                    <Auxiliary>
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
                            <TextField label={"Username"}
                                       error={this.state.errors.username}
                                       helperText={this.state.errors.username}
                                       name={"username"}
                                       value={this.state.username}
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
                        <div className={classes.imageInput}>
                            <ImageUploader withIcon={false}
                                           buttonText='Choose image'
                                           singleImage={true}/>
                        </div>
                    </Auxiliary> :
                        <div className={classes.input}>
                            <FormControl variant="outlined" fullWidth={true} size={"small"} error={this.state.errors.role} >
                                <InputLabel>Role</InputLabel>
                                <Select name={"role"}
                                        onChange={event => this.setState({role: event.target.value})}
                                        value={this.state.role?this.state.role:null}>
                                    <MenuItem value={"ADMIN"}>Admin</MenuItem>
                                    <MenuItem value={"OPERATOR"}>Operator</MenuItem>
                                    <MenuItem value={"SUPER_OPERATOR"}>Super Operator</MenuItem>
                                </Select>
                                <FormHelperText>{this.state.errors.role}</FormHelperText>
                            </FormControl>
                        </div>}
                    <div className={classes.buttonContainer}>
                        <Button
                                color={"primary"}
                                variant={"contained"} startIcon={<PersonAddIcon/>}
                                onClick={this.onClickHandler}>{operation} {operation === "Add" ? role : this.state.username}</Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: 'Bearer '+state.credentialsReducer.token
})

export default connect(mapStateToProps)(withRouter(User));