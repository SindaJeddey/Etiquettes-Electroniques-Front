import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import classes from "../Promo/Promo.module.css";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import StoreIcon from "@material-ui/icons/Store";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {FormHelperText} from "@material-ui/core";
import axios from "axios";
import {connect} from "react-redux";
import {withRouter} from "react-router";

const API="https://localhost:8443/api/"

class AddTransaction extends Component{

    state = {
        type:null,
        quantity:null,
        errors:{
            quantity:null,
            type:null
        }
    }

    componentDidMount() {
        axios.get(API+"stores/"+this.props.store+"/products/"+this.props.row)
            .then(response => {
                if(response.data.inStoreProductCode === null)
                    this.setState({threshold: response.data.product.threshold})
                else
                    this.setState({productExists : true})
            })
            .catch(response => console.log(response))
    }

    validateForm = () => {
        const mvt = {...this.state}
        delete mvt.errors;
        let newErrors = this.state.errors;
        let valid = true
        for (const key in mvt){
            switch (key){
                case "type":
                    if (mvt[key] === null) {
                        newErrors.type = "* Must provide movement type"
                        valid = false
                    }
                    break;
                case "quantity":
                    if (mvt[key] === null) {
                        newErrors.quantity = "* Must provide a quantity for the movement"
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

    handleChange = (event) => {
        const {name,value}= event.target;
        let errors = this.state.errors
        switch (name){
            case "type":
                if (value=== null)
                    errors.type =  "* Must provide movement type"
                else
                    errors.promotion=""
                break;
            case "quantity":
                if(value === null)
                    errors.quantity="* Must provide a quantity for the product"
                else if(value <= 0)
                    errors.quantity="* Must provide a valid quantity";
                else if(value <= this.state.threshold)
                    errors.quantity="* Quantity must be above product threshold ( "+this.state.threshold+" )";
                else
                    errors.quantity=""
            default:
                break;
        }
        this.setState({errors:errors,[name]:value})
    }

    onClick = () => {
        if(this.validateForm()){
            let movement = {
                type:this.state.type,
                product:{
                    inStoreProductCode:this.props.row,
                    store:{
                        storeCode:this.props.store
                    }
                },
                quantity:this.state.quantity
            }
            console.log(movement)
            axios.put(API+"transactions/add",movement)
                .then(response => this.props.history.push("/stores/browse"))
                .catch(response => console.log(response))
        }
    }

    render() {
        return(
            <Dialog onClose={this.props.closeModal} open={this.props.modal}>
                <DialogTitle onClose={this.props.closeModal}>
                    Add Transaction
                </DialogTitle>
                <DialogContent dividers>
                        <div className={classes.field}>
                            <FormControl variant="outlined" fullWidth={true} error={this.state.errors.type}>
                                <InputLabel inputP>Transaction Type</InputLabel>
                                <Select
                                    value={this.state.type}
                                    onChange={event => this.handleChange(event)}
                                    helperText={this.state.errors.type}
                                    name={"type"}
                                    label="Transaction Type">
                                    <MenuItem value={"IN"}>In</MenuItem>
                                    <MenuItem value={"OUT"}>Out</MenuItem>
                                </Select>
                                <FormHelperText>{this.state.errors.type}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className={classes.field}>
                            <TextField label={"Quantity"}
                                       error={this.state.errors.quantity}
                                       helperText={this.state.errors.quantity}
                                       name={"quantity"}
                                       type={"number"}
                                       value={this.state.quantity}
                                       size={"small"}
                                       onChange={(event) => this.handleChange(event)}
                                       variant="outlined"/>
                        </div>
                    </DialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" onClick={this.onClick}>
                        Add Transaction
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    store: state.credentialsReducer.store.storeCode
})

export default withRouter(connect(mapStateToProps)(AddTransaction));