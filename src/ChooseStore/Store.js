import React, {Component, useEffect, useState} from "react";
import "./Store.css";
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
import * as actionCreators from '../ReduxStore/actions';
import {Redirect, withRouter} from "react-router";
import {emphasize} from "@material-ui/core";

const Store =(props) => {

    const [locations,setLocations] = useState(null);
    const [stores, setStores] = useState([]);
    const [location,setLocation] = useState("");
    const [store,setStore] = useState(null)

    useEffect(() => {
        axios.get("/api/stores/locations")
            .then(response => {
                let locations = [];
                for(const value of response.data)
                    locations.push(value)
                setLocations(locations);
            })
            .catch(error => console.log(error))
    },[])

    const onSetLocation = (event) => {
        setLocation(event.target.value);
        console.log(location)
        axios.get("/api/stores/locations/"+event.target.value)
            .then(response => {
                setStores(response.data)
            })
            .catch(error => console.log(error))
    }

    const onSetStore = (event) => setStore(event.target.value);

    const onClickHandler = (event) => {
        localStorage.setItem('store', JSON.stringify(store))
        props.history.push('/home')
    }

    if(localStorage.getItem('store'))
        return <Redirect to={'/home'}/>

    return(
            <div className={'choose_store_container'}>
                <div className={'choose_store_sub_container'}>
                    <h2 className={'choose_store_title'}>Choose Store</h2>
                    <form className={'choose_store_form'}>
                        <div className={'choose_store_input'}>
                            {locations ? <FormControl variant="outlined" fullWidth={true}>
                                <InputLabel>Location</InputLabel>
                                <Select
                                    startAdornment={<InputAdornment position="start"><LocationOnIcon /></InputAdornment>}
                                    value={location || ''}
                                    onChange={event => onSetLocation(event)}
                                    label="Location">
                                    {locations.map(location => <MenuItem value={location}>{location}</MenuItem>)}
                                </Select>
                            </FormControl> : null}
                        </div>
                        <div className={'choose_store_input'}>
                            {stores ? <FormControl variant="outlined" fullWidth={true}>
                                <InputLabel>Store</InputLabel>
                                <Select
                                    startAdornment={<InputAdornment position="start"><StoreIcon /></InputAdornment>}
                                    value={store || ''}
                                    onChange={event => onSetStore(event)}
                                    label="Store">
                                    {stores.map(store => <MenuItem value={store}>{store.name}</MenuItem>)}
                                </Select>
                            </FormControl> : null}
                        </div>
                        <div className={'choose_store_button_container'}>
                            <Button size={"large"}
                                    style={{
                                backgroundColor: "#f57c00", color:"#F1FAEE"
                            }}
                                    variant={"contained"}
                                    disabled={!store || !location}
                                    onClick={(event) => onClickHandler(event)}>Continue</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
}


const mapDispatchToProps = (dispatch) => (
    {
        setStore: (store) => dispatch(actionCreators.setStore(store))
    }
)

export default withRouter(connect(null,mapDispatchToProps)(Store));