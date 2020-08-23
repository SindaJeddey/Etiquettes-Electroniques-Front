import React, {Component} from "react";
import classes from './User.module.css';
import TextField from "@material-ui/core/TextField";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import axios from 'axios';
import CloseIcon from "@material-ui/icons/Close";
import ImageUploader from 'react-images-upload';
import Auxiliary from "../../../hoc/Auxiliary";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const API_URL = "https://localhost:8443/api/"
class User extends Component{

    state = {
        id: null,
        name: null,
        lastName: null,
        username: null,
        email: null,
        role: null
    }

    componentDidMount() {
        if(this.props.id !== null && this.props.id !== undefined){
            axios.get(API_URL+this.props.choice.toLowerCase()+"/"+this.props.id,{headers:{'Authorization': this.props.token}})
                .then(response => {
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

    onClickHandler = () => {
        const user  = { ...this.state}
        if(this.state.id === null){
            axios.post(API_URL + this.props.choice.toLowerCase() + "/new", user, {
                headers: {
                    'Authorization': this.props.token
                }
            })
                .then(response => this.props.onSubmit())
                .catch(error => console.log(error))
        }
        else {
            axios.put(API_URL + this.props.choice.toLowerCase() +"/"+this.state.id, user,{
                headers: {
                    'Authorization': this.props.token
                }
            })
                .then(response => this.props.onSubmit())
                .catch(error => console.log(error))
        }
    }

    render() {
        return(
            <div className={classes.container}>
                <CloseIcon className={classes.closeIcon} onClick={this.props.onClose}/>
                <div className={classes.title}>{this.props.operation} {this.props.choice.replace("s","")}</div>
                <form className={classes.form}>
                    {this.props.operation === "Add" ? <Auxiliary>
                        <div className={classes.input}>
                            <TextField label={"Name"}
                                       value={this.state.name}
                                       fullWidth={true}
                                       variant="outlined"
                                       onChange={event => this.setState({name: event.target.value})}/>
                        </div>
                        <div className={classes.input}>
                            <TextField label={"Last Name"}
                                       value={this.state.lastName}
                                       fullWidth={true}
                                       variant="outlined"
                                       onChange={event => this.setState({lastName: event.target.value})}/>
                        </div>
                        <div className={classes.input}>
                            <TextField label={"Username"}
                                       value={this.state.username}
                                       fullWidth={true}
                                       helperText={"* Must be unique"}
                                       variant="outlined"
                                       onChange={event => this.setState({username: event.target.value})}/>
                        </div>
                        <div className={classes.input}>
                            <TextField label={"Email"}
                                       value={this.state.email}
                                       type={"email"}
                                       fullWidth={true}
                                       variant="outlined"
                                       onChange={event => this.setState({email: event.target.value})}/>
                        </div>
                        <div className={classes.imageInput}>
                            <ImageUploader withIcon={false}
                                           buttonText='Choose image' singleImage={true}/>
                        </div>
                    </Auxiliary> :
                        <div className={classes.input}>
                            <FormControl variant="outlined" fullWidth={true} size={"small"} >
                                <InputLabel>Role</InputLabel>
                                <Select onChange={event => this.setState({role: event.target.value})}
                                        value={this.state.role}>
                                    <MenuItem value={"ADMIN"}>Admin</MenuItem>
                                    <MenuItem value={"OPERATOR"}>Operator</MenuItem>
                                    <MenuItem value={"SUPER_OPERATOR"}>Super Operator</MenuItem>
                                </Select>
                            </FormControl>
                        </div>}
                    <div>
                        <Button className={classes.button}
                                color={"primary"}
                                variant={"contained"} startIcon={<PersonAddIcon/>}
                                onClick={this.onClickHandler}>{this.props.operation} {this.props.choice.replace("s","")}</Button>
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

export default connect(mapStateToProps)(User);