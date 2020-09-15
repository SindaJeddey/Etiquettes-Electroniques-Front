import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import classes from "../Promo/Promo.module.css";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import {connect} from "react-redux";
import {withRouter} from "react-router";

const API="https://localhost:8443/api/stores/"
class AddToStore extends Component{

    state={
        quantity: null,
        threshold:null,
        productExists:false,
        errors:{
            quantity: null
        }
    }

    componentDidMount() {
        axios.get(API+this.props.store+"/products/"+this.props.row,{headers:{'Authorization': this.props.token}})
            .then(response => {
                console.log(response.data)
                if(response.data.inStoreProductCode === null)
                    this.setState({threshold: response.data.product.threshold})
                else
                    this.setState({productExists : true})
            })
            .catch(response => console.log(response))
    }

    handleChange = (event) => {
        let errors = this.state.errors;
        if(event.target.value === null)
            errors.quantity="* Must provide a quantity for the product"
        else if(event.target.value <= 0)
            errors.quantity="* Must provide a valid quantity";
        else if(event.target.value <= this.state.threshold)
            errors.quantity="* Quantity must be above product threshold ( "+this.state.threshold+" )";
        else
            errors.quantity=""
        this.setState({errors:errors,quantity:event.target.value})
    }

    validateForm = () => {
        let newErrors = this.state.errors;
        let valid = true;
        if(this.state.quantity === null)
            newErrors.quantity="* Must provide a quantity for the product";
        if(newErrors.quantity !== null && newErrors.quantity.length>0)
            valid = false;
        this.setState({errors: newErrors})
        return valid;
    }

    onClick = () => {
        if(this.state.productExists)
            this.props.closeModal();
        else{
            if(this.validateForm()){
                let movement = {
                    type:"IN",
                    product:{
                        product: {
                            productCode:this.props.row
                        },
                        store:{
                            storeCode:this.props.store
                        }
                    },
                    quantity:this.state.quantity
                }
                axios.put(API+this.props.store+"/products/add",movement,{headers:{'Authorization': this.props.token}})
                    .then(response => this.props.history.push("/stores/browse"))
                    .catch(response => console.log(response))
            }
        }
    }

    render() {
        return(
            <Dialog onClose={this.props.closeModal} open={this.props.modal}>
                <DialogTitle onClose={this.props.closeModal}>
                    {!this.state.productExists?"Add Product To Current Store":"Product Exists!"}
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.field}>
                        {!this.state.productExists?<TextField label={"Quantity"}
                                    name={"quantity"}
                                    error={this.state.errors.quantity}
                                    helperText={this.state.errors.quantity}
                                    value={this.state.quantity}
                                    type={"number"}
                                    size={"small"}
                                    onChange={(event) => this.handleChange(event)}
                                    variant="outlined"/>:"Product already exists in the current store"}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" onClick={this.onClick} style={{
                        backgroundColor: "#f57c00", color:"#F1FAEE"
                    }}>
                        {!this.state.productExists?"Add Product":"Close"}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
const mapStateToDispatch = (state) => ({
    store:state.credentialsReducer.store.storeCode,
    token:'Bearer '+state.credentialsReducer.token
})
export default withRouter(connect(mapStateToDispatch)(AddToStore));