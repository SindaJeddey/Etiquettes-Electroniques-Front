import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import axios from 'axios';
import classes from './Promo.module.css'

const API = "https://localhost:8443/api/products/promotions/"
class Promo extends Component{

    state={
        currentPromo:false,
        promotion:null,
        promotionType:null,
        promotionEndDate: null,
        errors:{
            promotion:null,
            promotionType:null,
            promotionEndDate: null
        }
    }

    onClick = ()=> {
        if(this.state.currentPromo)
            this.props.closeModal()
        else {
            if (this.validateForm(this.state.errors)) {
                const promo = {...this.state}
                delete promo.errors;
                delete promo.currentPromo;
                axios.put(API+this.props.row+"/add",promo)
                    .then(response => this.props.closeModal())
                    .catch(error => console.log(error))}
        }
    }

    componentDidMount() {
        axios.get(API+this.props.row)
            .then(response => {
                if (response.data !== ""){
                    this.setState({
                        currentPromo: true,
                        promotion:response.data.promotion,
                        promotionType:response.data.promotionType,
                        promotionEndDate:response.data.promotionEndDate
                    })
                }
            })
            .catch(error => console.log(error))
    }

    handleChange = (event) => {
        const {name,value}= event.target;
        let errors = this.state.errors
        switch (name){
            case "promotion":
                if (value=== "" || value=== " " || value=== null)
                    errors.promotion =  "* Must provide promotion"
                else
                    errors.promotion=""
                break;
            case "promotionType":
                if (value=== "" || value=== " " || value=== null)
                    errors.promotionType =  "* Must provide promotion type"
                else
                    errors.promotionType=""
                break;
            default:
                break;
        }
        this.setState({errors:errors,[name]:value})
    }

    validateForm = (errors) => {
        const promo = {...this.state}
        delete promo.errors;
        delete promo.currentPromo;
        let newErrors = this.state.errors;
        let valid = true
        for (const key in promo){
            switch (key){
                case "promotion":
                    if (promo[key] === null) {
                            newErrors.promotion = "* Must provide promotion"
                            valid = false
                        }
                    break;
                case "promotionType":
                        if (promo[key] === null) {
                            newErrors.promotionType = "* Must provide a promotion type"
                            valid = false
                        }
                    break;
                case "promotionEndDate":
                        if (promo[key] === null) {
                            newErrors.promotionEndDate = "* Must provide an end date for the promotion"
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

    render() {
        return (
            <div className={classes.container}>
        <Dialog onClose={this.props.closeModal} open={this.props.modal}>
            <DialogTitle onClose={this.props.closeModal}>
                {this.state.currentPromo ? "Promotion":"Add Promotion"}
            </DialogTitle>
            {!this.state.currentPromo?<DialogContent dividers>
                <div className={classes.field}>
                    <TextField label={"Promotion Type"}
                               error={this.state.errors.promotionType}
                               helperText={this.state.errors.promotionType}
                               name={"promotionType"}
                               value={this.state.promotionType}
                               size={"small"}
                               onChange={(event) => this.handleChange(event)}
                               variant="outlined"/>
                </div>
                <div className={classes.field}>
                    <TextField label={"Promotion"}
                               error={this.state.errors.promotion}
                               helperText={this.state.errors.promotion}
                               name={"promotion"}
                               value={this.state.promotion}
                               size={"small"}
                               onChange={(event) => this.handleChange(event)}
                               variant="outlined"/>
                </div>
                <div className={classes.field}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            minDate={Date.now()}
                            minDateMessage={"Date should not be before today"}
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            label="Select Promotion End Date"
                            onChange={(date) => this.setState({promotionEndDate: date})}
                            value={this.state.promotionEndDate}/>
                    </MuiPickersUtilsProvider>
                </div>
                    <small style={{color:"#f44336"}}>{this.state.errors.promotionEndDate}</small>
                </DialogContent>:
                <DialogContent dividers>
                    <div className={classes.field}>
                        <TextField label={"Promotion Type"}
                                   name={"type"}
                                   size={"small"}
                                   value={this.state.promotionType}
                                   disabled={true}/>
                    </div>
                    <div className={classes.field}>
                        <TextField label={"Promotion"}
                                   name={"promotion"}
                                   size={"small"}
                                   value={this.state.promotion}
                                   disabled={true}/>
                    </div>
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                label="Promotion End Date"
                                disabled={true}
                                value={this.state.promotionEndDate}/>
                        </MuiPickersUtilsProvider>
                    </div>
                </DialogContent>
            }
            <DialogActions>
                <Button autoFocus color="primary" onClick={this.onClick}>
                    {!this.state.currentPromo? "Add Promotion":"Close"}
                </Button>
            </DialogActions>
        </Dialog>
            </div>)
    }
}

export default Promo;