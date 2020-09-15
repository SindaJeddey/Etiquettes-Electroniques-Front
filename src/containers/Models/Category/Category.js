import React, {Component} from "react";
import classes from './Category.module.css';
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import List from "../../List/List";

const API_URL = "https://localhost:8443/api/categories/";
class Category extends Component{

    state = {
        id: null,
        name: null,
        names:[],
        products: [],
        errors:{
            name:null
        }
    }

    componentDidMount() {
        axios.get(API_URL+"names",{headers:{'Authorization':this.props.token}})
            .then(response => this.setState({names: response.data}))
            .catch(error => console.log(error))
        if(this.props.id !== null && this.props.id !== undefined ){
            axios.get(API_URL+this.props.id+'/products',{
                headers:{
                    'Authorization': this.props.token
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        id: this.props.id,
                        name: response.data.name,
                        products: response.data.products})
                })
                .catch(error => console.log(error))
        }
    }

    onClickHandler = () => {
        console.log(this.validateForm(this.state.errors))
        if(this.validateForm(this.state.errors)) {
            const category = {...this.state}
            if (this.state.id === null) {
                axios.post(API_URL + "new", category, {
                    headers: {
                        'Authorization': this.props.token
                    }
                })
                    .then(response => this.props.history.push("/categories/browse"))
                    .catch(error => console.log(error))
            } else {
                axios.put(API_URL + this.state.id, category, {
                    headers: {
                        'Authorization': this.props.token
                    }
                })
                    .then(response => this.props.history.push("/categories/browse"))
                    .catch(error => console.log(error))
            }
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        let  errors = this.state.errors;
        if (value=== "" || value=== " ")
            errors.name =  "* Must provide a category name"
        else if (value[0] === " ")
            errors.name = "* Category name should start with a letter"
        else if(this.state.names.includes(value))
            errors.name="* Category name already exists"
        else
            errors.name = "";
        this.setState({errors: errors, name:value})
    }

    validateForm = (errors) => {
        let valid = true;
        let newErrors = errors;
        if(this.state.name === null) {
            newErrors.name = "* Must provide a category name"
            valid = false
        }
        if(newErrors.name !== null && newErrors.name.length > 0)
            valid = false;
        this.setState({errors: newErrors})
        return valid;
    }


    render() {
        return(
            <div className={classes.container}>
                <div className={classes.title}>{this.props.operation} Category</div>
                <form className={classes.form}>
                    <div className={classes.input}>
                        <TextField label={"Category Name"}
                                   error={this.state.errors.name}
                                   helperText={this.state.errors.name}
                                   name={"name"}
                                   value={this.state.name}
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={event => this.handleChange(event)}/>
                    </div>
                    <div>
                    </div>
                    <div className={classes.button}>
                        <Button style={{
                            backgroundColor: "#f57c00", color:"#F1FAEE"
                        }}
                                variant={"contained"}
                                startIcon={<AddIcon/>}
                                onClick={this.onClickHandler}>{this.props.operation} Category</Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: 'Bearer '+state.credentialsReducer.token
})

export default connect(mapStateToProps)(withRouter(Category));