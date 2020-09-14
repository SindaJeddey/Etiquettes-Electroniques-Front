import React, {Component} from "react";
import classes from "./Store.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StoreIcon from '@material-ui/icons/Store';
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from 'axios';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {connect} from "react-redux";
import * as actionCreators from '../../store/actions/index';

const API_URL="https://localhost:8443/api/stores";
class Store extends Component{
    state = {
        locations: [],
        stores:[],
        selectedLocation: null,
        selectedStore: null
    }

    componentDidMount() {
        axios.get(API_URL+"/locations")
            .then(response => {
                let locations = [];
                for(const value of response.data)
                    locations.push(value)
                this.setState({locations: locations})
            })
            .catch(error => console.log(error))
    }

    onSetLocation = (event) => {
        this.setState({selectedLocation: event.target.value},() =>{
            axios.get(API_URL+"/locations/"+this.state.selectedLocation)
                .then(response => this.setState({stores: response.data}))
                .catch(error => console.log(error))
        })
    }

    onSetStore = (event) =>{
        this.setState({selectedStore: event.target.value});
    }

    onClickHandler = (event) => {
        const store = this.state.selectedStore
        this.props.setStore(store)
    }

    render() {
        return(
            <div className={classes.container}>
                <div className={classes.subcontainer}>
                    <h2 className={classes.title}>Choose Store</h2>
                    <form className={classes.form}>
                        <div className={classes.input}>
                            {this.state.locations ? <FormControl variant="outlined" fullWidth={true}>
                                <InputLabel inputP>Location</InputLabel>
                                <Select
                                    startAdornment={<InputAdornment position="start">
                                    <LocationOnIcon />
                                </InputAdornment>}
                                    value={this.state.selectedLocation || ''}
                                    onChange={this.onSetLocation}
                                    label="Location">
                                    {this.state.locations.map(location => <MenuItem value={location}>{location}</MenuItem>)}
                                </Select>
                            </FormControl> : null}
                        </div>
                        <div className={classes.input}>
                            {this.state.stores ? <FormControl variant="outlined" fullWidth={true}>
                                <InputLabel inputP>Store</InputLabel>
                                <Select
                                    startAdornment={<InputAdornment position="start">
                                        <StoreIcon />
                                    </InputAdornment>}
                                    value={this.state.selectedStore || ''}
                                    onChange={this.onSetStore}
                                    label="Store">
                                    {this.state.stores.map(store => <MenuItem value={store}>{store.name}</MenuItem>)}
                                </Select>
                            </FormControl> : null}
                        </div>
                        <div className={classes.buttonContainer}>
                            <Button size={"large"}
                                    variant={"contained"}
                                    disabled={!this.state.selectedStore || !this.state.selectedLocation}
                                    onClick={(event) => this.onClickHandler(event)}>Continue</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    store: state.credentialsReducer.store,
    token: state.credentialsReducer.token
})

const mapDispatchToProps = (dispatch) => (
    {
        setStore: (store) => dispatch(actionCreators.setStore(store))
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(Store);