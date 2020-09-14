import React, {Component} from "react";
import classes from "./Store.module.css";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import axios from 'axios';
import {connect} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

const API_URL ="https://localhost:8443/api/stores/"
const CATEGORIES = "https://localhost:8443/api/categories"
class Store extends Component{

    state = {
        allCategories: [],
        id:null,
        name: null,
        location:null,
        zipCode: null,
        categories: []
    }

    componentDidMount() {
        axios.get(CATEGORIES,{headers:{'Authorization': this.props.token}})
            .then(response => {
                this.setState({allCategories: response.data})
            })
            .catch(error => console.log(error))
        if(this.props.id !== null && this.props.id !== undefined)
        {
            axios.get(API_URL+this.props.id+'/categories',{headers:{'Authorization': this.props.token}})
                .then(response => {
                    this.setState({
                        id: this.props.id,
                        name: response.data.name,
                        location: response.data.location,
                        zipCode: response.data.zipCode,
                        categories: response.data.categories
                    })

                })
                .catch(error => console.log(error))
        }
    }

    onClickHandler = () => {
        if(this.state.id === null){
            axios.post(API_URL + "new", this.state, {headers: {'Authorization': this.props.token}})
                .then(response => {
                    this.props.onSubmit();
                })
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

    onMultipleSelect = (event) => {
        this.setState({categories: event.target.value})
    }

    render() {
        return(
            <div className={classes.container}>
                <CloseIcon className={classes.closeIcon} onClick={this.props.onClose}/>
                <div className={classes.title}>{this.props.operation} Store</div>
                <form className={classes.form}>
                    <div className={classes.input}>
                        <TextField label={"ChooseStore Name"}
                                   value={this.state.name}
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={event => this.setState({name: event.target.value})}/>
                    </div>
                    <div className={classes.input}>
                        <TextField label={"Location"}
                                   value={this.state.location}
                                   fullWidth={true}
                                   variant="outlined"
                                   onChange={event => this.setState({location: event.target.value})}/>
                    </div>
                    <div className={classes.input}>
                        <TextField label={"Zip Code"}
                                   value={this.state.zipCode}
                                   fullWidth={true}
                                   type={"number"}
                                   variant="outlined"
                                   onChange={event => this.setState({zipCode: event.target.value})}/>
                    </div>
                    <div className={classes.select_input}>
                        <FormControl className={classes.select}>
                            <InputLabel>Categories</InputLabel>
                            <Select onChange={(event => this.onMultipleSelect(event))}
                                    multiple={true}
                                    value={this.state.categories}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip key={value}
                                                      onMouseDown={(event) => event.stopPropagation()}
                                                      label={value.name}
                                                      className={classes.chip} onDelete={()=>this.onChipDelete(value)}/>
                                            ))}
                                        </div>
                                    )}>
                                {this.state.allCategories.map((category,i) => (
                                    <MenuItem key={i} value={category}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Button className={classes.button}
                                color={"primary"}
                                variant={"contained"} startIcon={<AddIcon/>}
                                onClick={this.onClickHandler}>{this.props.operation} Store</Button>
                    </div>
                </form>
            </div>
        )
    }

    onChipDelete = (value) => {
        let categories = this.state.categories;
        categories = categories.filter(cat => cat.id !== value.id);
        this.setState({categories: categories}, () => console.log(this.state))

    }
}

const mapStateToProps = (state) => ({
    token: 'Bearer '+state.credentialsReducer.token
});

export default connect(mapStateToProps)(Store);