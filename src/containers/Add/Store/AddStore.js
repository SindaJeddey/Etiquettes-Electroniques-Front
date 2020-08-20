import React, {Component} from "react";
import classes from "./AddStore.module.css";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import axios from 'axios';
import {connect} from "react-redux";

const API_URL ="https://localhost:8443/api/stores/new"
class AddStore extends Component{

    state = {
        name: null,
        location:null,
        zipCode: null
    }

    onClickHandler = () => {
        axios.post(API_URL,this.state,{headers:{'Authorization': this.props.token}})
            .then(response => {
                console.log(response)
                this.props.onSubmit();
            })
            .catch(error => console.log(error))
    }

    render() {
        return(
            <div className={classes.container}>
                <CloseIcon className={classes.closeIcon} onClick={this.props.onClose}/>
                <div className={classes.title}>New Store</div>
                <form className={classes.form}>
                    <div className={classes.input}>
                        <TextField label={"Store Name"}
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={event => this.setState({name: event.target.value})}/>
                    </div>
                    <div className={classes.input}>
                        <TextField label={"Location"}
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={event => this.setState({location: event.target.value})}/>
                    </div>
                    <div className={classes.input}>
                        <TextField label={"Zip Code"}
                                   fullWidth={true}
                                   type={"number"}
                                   variant="outlined"
                                   onChange={event => this.setState({zipCode: event.target.value})}/>
                    </div>
                    <div>
                        <Button className={classes.button}
                                color={"primary"}
                                variant={"contained"} startIcon={<AddIcon/>}
                                onClick={this.onClickHandler}>Add Store</Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: 'Bearer '+state.credentialsReducer.token
});

export default connect(mapStateToProps)(AddStore);