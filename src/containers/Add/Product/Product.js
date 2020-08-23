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
import CloseIcon from "@material-ui/icons/Close";

const CATEGORIES = "https://localhost:8443/api/categories";
const API_URL = "https://localhost:8443/api/products/"
class Product extends Component{

    state = {
            categories: [],
            name: null,
            unity: null,
            devise: null,
            categoryId: null,
            quantityThreshold: null,
            longDescription: null,
            shortDescription: null,
            image1: null,
            image2: null,
            image3: null
    }

    componentDidMount() {
        axios.get(CATEGORIES,{headers:{'Authorization':this.props.token}})
            .then(response => this.setState({categories: response.data}))
            .catch(error => console.log(error))
        if(this.props.id !== null && this.props.id !== undefined){
            axios.get(API_URL+this.props.id,{headers:{'Authorization': this.props.token}})
                .then(response => {
                    this.setState({
                        id: this.props.id,
                        name: response.data.name,
                        unity: response.data.unity,
                        devise: response.data.devise,
                        categoryId: response.data.categoryId,
                        quantityThreshold: response.data.quantityThreshold,
                        longDescription: response.data.longDescription,
                        shortDescription: response.data.shortDescription})
                })
                .catch(error => console.log(error))
        }
    }

    onClickHandler = () => {
        const product = {...this.state}
        delete product.categories
        if(this.state.id === null ){
            axios.post(API_URL + "new", product, {headers: {'Authorization': this.props.token}})
                .then(response => this.props.onSubmit())
                .catch(error => console.log(error))
        }
        else {
            axios.put(API_URL+this.state.id, this.state,{
                headers: {
                    'Authorization': this.props.token
                }
            })
                .then(response => this.props.onSubmit())
                .catch(error => console.log(error))
        }
    }

    pictureToByte = (picture) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(picture);
        fileReader.onload = () => {
            let bytes = new Uint8Array(fileReader.result)
        }
    }

    onImagesUpload = (pictures) => {
        pictures.map(picture => this.pictureToByte(picture))
        this.setState({image1: pictures[0], image2: pictures[1], image3:pictures[2]})
    }

    render() {
        return(
            <div className={classes.container}>
                <CloseIcon className={classes.closeIcon} onClick={this.props.onClose}/>
                <div className={classes.title}>{this.props.operation} Product</div>
                    <form className={classes.form}>
                        <div className={classes.flex_container}>
                            <div className={classes.left}>
                                <div className={classes.input}>
                                    <TextField label={"Product Name"}
                                               value={this.state.name}
                                               fullWidth={true}
                                               size={"small"}
                                               variant="outlined"
                                               onChange={event => this.setState({name: event.target.value})}/>
                                </div>
                                <div className={classes.select_container}>
                                    <div className={classes.select}>
                                        <FormControl variant="outlined" fullWidth={true} size={"small"} >
                                            <InputLabel>Unity</InputLabel>
                                            <Select onChange={event => this.setState({unity: event.target.value})}
                                                    value={this.state.unity}>
                                                <MenuItem value={"cm"}>Cm</MenuItem>
                                                <MenuItem value={"l"}>Liter</MenuItem>
                                                <MenuItem value={"kg"}>Kilograms</MenuItem>
                                                <MenuItem value={"piece"}>Piece</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={classes.select}>
                                        <FormControl variant="outlined" fullWidth={true} size={"small"}>
                                            <InputLabel>Devise</InputLabel>
                                            <Select onChange={event => this.setState({devise: event.target.value})}
                                                    value={this.state.devise}>
                                                <MenuItem value={"dt"}>Dinar Tunisien</MenuItem>
                                                <MenuItem value={"euro"}>Euro</MenuItem>
                                                <MenuItem value={"dollar"}>Dollar</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className={classes.category}>
                                    <FormControl variant="outlined" fullWidth={true} size={"small"}>
                                        <InputLabel>Category</InputLabel>
                                        <Select onChange={event => this.setState({categoryId: event.target.value})}
                                                value={this.state.categoryId} >
                                            {this.state.categories.map((category) => <MenuItem key={category.id}
                                                                                               value={category.id}>
                                                {category.name}
                                            </MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className={classes.input}>
                                    <TextField label={"Product Stock Threshold"}
                                               size={"small"}
                                               value={this.state.quantityThreshold}
                                               type={"number"}
                                               fullWidth={true}
                                               variant="outlined"
                                               onChange={event => this.setState({quantityThreshold: event.target.value})}/>
                                </div>
                                <div>
                                    <ImageUploader  withLabel={false} className={classes.image_input}
                                                    onChange={this.onImagesUpload}
                                                    buttonText='Choose 3 product images'/>
                                </div>
                                <div className={classes.button}>
                                    <Button
                                            color={"primary"}
                                            variant={"contained"} startIcon={<AddIcon/>}
                                            onClick={this.onClickHandler}>{this.props.operation} Product</Button>
                                </div>
                            </div>
                            <div className={classes.right}>
                                <div className={classes.input}>
                                    <TextField label={"Short Description"}
                                               value={this.state.shortDescription}
                                               size={"small"}
                                               multiline={true}
                                               rows={5}
                                               fullWidth={true}
                                               variant="outlined"
                                               onChange={event => this.setState({shortDescription: event.target.value})}/>
                                </div>
                                <div className={classes.input}>
                                    <TextField label={"Long Description"}
                                               value={this.state.longDescription}
                                               size={"small"}
                                               multiline={true}
                                               rows={15}
                                               fullWidth={true}
                                               variant="outlined"
                                               onChange={event => this.setState({longDescription: event.target.value})}/>
                                </div>
                            </div>
                        </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: 'Bearer '+state.credentialsReducer.token
})


export default connect(mapStateToProps)(Product);