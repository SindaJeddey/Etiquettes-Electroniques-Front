import React, {Component} from "react";
import classes from './AddCategory.module.css';
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {connect} from "react-redux";

const API_URL = "https://localhost:8443/api/categories/new";
class AddCategory extends Component{

    state = {
        name: null
    }

    onClickHandler = () => {
        const category = {...this.state}
        axios.post(API_URL,category, {
            headers: {
                'Authorization': this.props.token
            }})
            .then(response => this.props.onSubmit())
            .catch(error => console.log(error))
    }

    render() {
        return(
            <div className={classes.container}>
                <CloseIcon className={classes.closeIcon} onClick={this.props.onClose}/>
                <div className={classes.title}>New Category</div>
                <form className={classes.form}>
                    <div className={classes.input}>
                        <TextField label={"Category Name"}
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={event => this.setState({name: event.target.value})}/>
                    </div>
                    <div>
                        <Button className={classes.button}
                                color={"primary"}
                                variant={"contained"} startIcon={<AddIcon/>}
                                onClick={this.onClickHandler}>Add Category</Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: 'Bearer '+state.credentialsReducer.token
})

export default connect(mapStateToProps)(AddCategory);