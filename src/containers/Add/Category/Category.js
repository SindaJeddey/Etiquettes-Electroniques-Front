import React, {Component} from "react";
import classes from './Category.module.css';
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {connect} from "react-redux";

const API_URL = "https://localhost:8443/api/categories/";
class Category extends Component{

    state = {
        id: null,
        name: null
    }

    componentDidMount() {
        if(this.props.id !== null && this.props.id !== undefined ){
            axios.get(API_URL+this.props.id,{headers:{'Authorization': this.props.token}})
                .then(response => {
                    this.setState({
                        id: this.props.id,
                        name: response.data.name})
                })
                .catch(error => console.log(error))
        }
    }

    onClickHandler = () => {
        const category = {...this.state}
        if(this.state.id === null){
            axios.post(API_URL + "new", category, {
                headers: {
                    'Authorization': this.props.token
                }
            })
                .then(response => this.props.onSubmit())
                .catch(error => console.log(error))
        }
        else {
            axios.put(API_URL+this.state.id, category,{
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
                <div className={classes.title}>{this.props.operation} Category</div>
                <form className={classes.form}>
                    <div className={classes.input}>
                        <TextField label={"Category Name"}
                                   value={this.state.name}
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={event => this.setState({name: event.target.value})}/>
                    </div>
                    <div>
                        <Button className={classes.button}
                                color={"primary"}
                                variant={"contained"} startIcon={<AddIcon/>}
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

export default connect(mapStateToProps)(Category);