import React, {Component} from "react";
import classes from './Product.module.css';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {connect} from "react-redux";
import {FormHelperText} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {withRouter} from "react-router";

const CATEGORIES = "https://localhost:8443/api/categories";
const API_URL = "https://localhost:8443/api/products/";


class Product extends Component{
    state = {
            categories: [],
            name: null,
            unity: null,
            devise: null,
            category: null,
            quantityThreshold: null,
            longDescription: null,
            shortDescription: null,
            image1: null,
            image2: null,
            image3: null,
        errors :  {
            name: null,
            unity: null,
            devise: null,
            categoryId: null,
            quantityThreshold: null,
            longDescription: null,
            shortDescription: null
        }
    }

    componentDidMount() {
        axios.get(CATEGORIES,{headers:{'Authorization':this.props.token}})
            .then(response => this.setState({categories: response.data}))
            .catch(error => console.log(error))
        if(this.props.id !== null && this.props.id !== undefined){
            axios.get(API_URL+this.props.id,{headers:{'Authorization': this.props.token}})
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        id: this.props.id,
                        name: response.data.name,
                        unity: response.data.unity,
                        devise: response.data.devise,
                        category: response.data.category,
                        promotion: response.data.promotion,
                        promotionType: response.data.promotionType,
                        promotionEndDate: response.data.promotionEndDate,
                        quantityThreshold: response.data.quantityThreshold,
                        longDescription: response.data.longDescription,
                        shortDescription: response.data.shortDescription})
                })
                .catch(error => console.log(error))
        }
    }

    onDeleteHandler = () => {
        axios.delete(API_URL+this.props.id)
            .then(response => this.props.history.push("/products/browse"))
            .catch(error => console.log(error))
    }

    onAddHandler = () => {
        if(this.validateForm(this.state.errors)){
            const mvt = {
                type: "IN",
                quantity: this.state.quantity,
                product: {
                    product: {
                        id: this.props.id
                    },
                    store: {
                        id: this.props.store
                    }
                }
            }
            axios.put("https://localhost:8443/api/stores/" + this.props.store + "/products/add", mvt)
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        let errors= this.state.errors;
        switch (name){
            case "name":
                if (value=== "" || value=== " " || value === null)
                    errors.name =  "* Must provide product's name"
                else if (value[0] === " ")
                    errors.name = "* Name should start with a letter"
                else
                    errors.name = ""
                break;
            case "unity":
                if(value === null)
                    errors.unity = "* Must provide a unity for the product"
                else
                    errors.unity = ""
                break;
            case "quantityThreshold":
                if (value === null)
                    errors.quantityThreshold = "* Must provide a threshold"
                else if(value <= 0)
                    errors.quantityThreshold = "* Threshold invalid";
                else
                    errors.quantityThreshold = ""
                break;
            case "devise":
                if(value === null)
                    errors.devise = "* Must provide a devise for the product"
                else
                    errors.devise = ""
                break;
            case "longDescription":
                if(value === null || value === "")
                    errors.longDescription="* Must provide a long description"
                else if (value.length > 800 || value.length < 200)
                    errors.longDescription="* Long description must not surpass 800 characters and have less than 200 characters"
                else
                    errors.longDescription = ""
                break;
            case "shortDescription":
                if(value === null || value === "")
                    errors.shortDescription="* Must provide a short description"
                else if (value.length > 200)
                    errors.shortDescription="* Short description must not surpass 200 characters"
                else
                    errors.shortDescription = ""
                break;
            case "categoryId":
                if(value === null) {
                    errors.category = "* Must provide a category"
                }
                else
                    errors.category = ""
                break;
            default:
                break;
        }
        this.setState({errors: errors,[name]: value})
    }

    validateForm = (errors) => {
        const product = {...this.state}
        delete product.categories
        delete product.errors
        let newErrors = errors
        let valid = true
        for (const key in product){
            switch (key){
                case "name":
                    if (product[key] === null) {
                        newErrors.name = "* Must provide product's name"
                        valid = false
                    }
                    break;
                case "unity":
                    if(product[key] === null) {
                        newErrors.unity = "* Must provide a unity for the product"
                        valid = false
                    }
                    break;
                case "quantityThreshold":
                    if (product[key] === null) {
                        newErrors.quantityThreshold = "* Must provide a threshold"
                        valid = false
                    }
                    break;
                case "devise":
                    if(product[key] === null) {
                        newErrors.devise = "* Must provide a devise for the product"
                        valid = false
                    }
                    break;
                case "longDescription":
                    if(product[key] === null) {
                        newErrors.longDescription = "* Must provide a long description"
                        valid = false
                    }
                    else if (product[key].length > 800 || product[key].length < 200) {
                        newErrors.longDescription = "* Long description must not surpass 800 characters and have less than 200 characters"
                        valid=false
                    }

                    break;
                case "shortDescription":
                    if(product[key] === null) {
                        newErrors.shortDescription = "* Must provide a short description"
                        valid = false
                    }
                    else if (product[key].length> 200) {
                        newErrors.shortDescription = "* Short description must not surpass 200 characters"
                        valid=false
                    }
                    break;
                case "category":
                    if(product[key] === null) {
                        newErrors.category = "* Must provide a category"
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
        this.setState({errors: newErrors});
        return valid;
    }

    onClickHandler = () => {
        if(this.validateForm(this.state.errors)) {
            const product = {...this.state}
            delete product.categories
            delete product.errors
            if (this.props.operation === "Add") {
                axios.post(API_URL + "new", product, {headers: {'Authorization': this.props.token}})
                    .then(response => this.props.history.push("/products/browse"))
                    .catch(error => console.log(error))
            } else {
                axios.put(API_URL + this.state.id, product, {
                    headers: {
                        'Authorization': this.props.token
                    }
                })
                    .then(response => this.props.history.push("/products/browse"))
                    .catch(error => console.log(error))
            }
        }
    }

    pictureToByte = (picture) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(picture);
        fileReader.onload = () => {
            let bytes = new Uint8Array(fileReader.result)
            console.log(bytes)
        }
    }

    onImagesUpload = (pictures) => {
        pictures.map(picture => this.pictureToByte(picture))
        this.setState({image1: btoa(pictures[0]), image2: btoa(pictures[1]), image3: btoa(pictures[2])})
    }

    render() {
        const disabled = this.props.inStore
        return(
            <div className={classes.container}>
                <div className={classes.title}>{this.props.operation} Product</div>
                    <form className={classes.form}>
                        <div className={classes.flex_container}>
                            <div className={classes.left}>
                                <div className={classes.input}>
                                    <TextField label={"Product Name"}
                                               error={this.state.errors.name}
                                               helperText={this.state.errors.name}
                                               name={"name"}
                                               value={this.state.name}
                                               fullWidth={true}
                                               size={"small"}
                                               variant="outlined"
                                               onChange={event => this.handleChange(event)}/>
                                </div>
                                <div className={classes.select_container}>
                                    <div className={classes.select}>
                                        <FormControl variant="outlined"
                                                     fullWidth={true} size={"small"}
                                                     error={this.state.errors.unity}>
                                            <InputLabel>Unity</InputLabel>
                                            <Select name={"unity"}
                                                    helperText={this.state.errors.unity}
                                                    onChange={event => this.handleChange(event)}
                                                    value={this.state.unity}>
                                                <MenuItem value={"cm"}>Cm</MenuItem>
                                                <MenuItem value={"l"}>Liter</MenuItem>
                                                <MenuItem value={"kg"}>Kilograms</MenuItem>
                                                <MenuItem value={"piece"}>Piece</MenuItem>
                                            </Select>
                                            <FormHelperText>{this.state.errors.unity}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className={classes.select}>
                                        <FormControl variant="outlined"
                                                     fullWidth={true}
                                                     size={"small"}
                                                     error={this.state.errors.devise}>
                                            <InputLabel>Devise</InputLabel>
                                            <Select name={"devise"}
                                                    onChange={event => this.handleChange(event)}
                                                    value={this.state.devise}>
                                                <MenuItem value={"dt"}>Dinar</MenuItem>
                                                <MenuItem value={"euro"}>Euro</MenuItem>
                                                <MenuItem value={"dollar"}>Dollar</MenuItem>
                                            </Select>
                                            <FormHelperText>{this.state.errors.devise}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className={classes.category}>
                                    <FormControl variant="outlined"
                                                 fullWidth={true}
                                                 size={"small"}
                                                 error={this.state.errors.category}>
                                        <InputLabel>Category</InputLabel>
                                        <Select name={"category"}
                                                onChange={event => this.handleChange(event)}
                                                value={this.state.category} >
                                            {this.state.categories.map((category) => <MenuItem key={category.id}
                                                                                               value={category.name}>
                                                {category.name}
                                            </MenuItem>)}
                                        </Select>
                                        <FormHelperText>{this.state.errors.category}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div className={classes.input}>
                                    <TextField name={"quantityThreshold"}
                                               error={this.state.errors.quantityThreshold}
                                               helperText={this.state.errors.quantityThreshold}
                                               label = {"Product Stock Threshold"}
                                               size={"small"}
                                               value={this.state.quantityThreshold}
                                               type={"number"}
                                               fullWidth={true}
                                               variant="outlined"
                                               onChange={event => this.handleChange(event)}/>
                                </div>
                                <div>
                                    <ImageUploader  name={"images"}
                                                    disabled={disabled}
                                                    withLabel={false}
                                                    onChange={this.onImagesUpload}
                                                    buttonText='Choose 3 Product Images'/>
                                </div>

                            </div>
                            <div className={classes.right}>
                                <div className={classes.input}>
                                    <TextField name={"shortDescription"}
                                               error={this.state.errors.shortDescription}
                                               helperText={this.state.errors.shortDescription}
                                               label={"Short Description"}
                                               value={this.state.shortDescription}
                                               size={"small"}
                                               multiline={true}
                                               rows={5}
                                               fullWidth={true}
                                               variant="outlined"
                                               onChange={event => this.handleChange(event)}/>
                                </div>
                                <div className={classes.input}>
                                    <TextField label={"Long Description"}
                                               error={this.state.errors.longDescription}
                                               helperText={this.state.errors.longDescription}
                                               name={"longDescription"}
                                               value={this.state.longDescription}
                                               size={"small"}
                                               multiline={true}
                                               rows={15}
                                               fullWidth={true}
                                               variant="outlined"
                                               onChange={event => this.handleChange(event)}/>
                                </div>
                            </div>
                        </div>
                        <div className={classes.button}>
                            <Button
                                variant={"contained"} startIcon={<AddIcon/>}
                                onClick={this.onClickHandler}>{this.props.operation} Product</Button>
                        </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: 'Bearer '+state.credentialsReducer.token,
    store: state.credentialsReducer.store.id
})


export default withRouter(connect(mapStateToProps)(Product));