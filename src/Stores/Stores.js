import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Store from "./Store/Store";
import {withRouter} from "react-router";
import StoreForm from "./Store/StoreForm";

const Stores = (props) => {
    const API_URL='/api/stores'
    const [stores, setStores]= useState(null);
    const [search, setSearch] = useState("")
    const [add, setAdd] = useState(false);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => setStores(response.data))
            .catch(error => console.log(error))
    },[props.history.location])


    const onOpen = () => {
        setAdd(true)
        props.history.push('/stores?add')
    }

    const close = () => {
        setAdd(false);
        props.history.push('/stores')
    }

    return(
        <div className={'stores_search_container'}>
            <div className={'add_store'}>
                <Button
                    style={{
                        backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                    }}
                    variant={"contained"}
                    startIcon={<AddCircleOutlineIcon/>}
                    type={"submit"}
                    size={"large"}
                    onClick={onOpen}>New Store</Button>
                <StoreForm open={add} close={close} store={null} operation={"Add"}/>
            </div>
            <div>
                <TextField
                    label="Search Store"
                    value={search}
                    name={"search"}
                    variant={"outlined"}
                    onChange={(event) => setSearch(event.target.value)}
                    style={{ borderColor:"#f57c00"}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className={'stores_results'}>
                <ul>
                    {stores ?
                        stores.filter(store => {
                            if(!search || search === "")
                                return store
                            if(store.name.replace(/\s+/g, '').toLowerCase().includes(search.replace(/\s+/g, '').toLowerCase()))
                                return store
                            if(store.storeCode.toLowerCase().includes(search.toLowerCase()))
                                return store
                            if(store.location.replace(/\s+/g, '').toLowerCase().includes(search.replace(/\s+/g, '').toLowerCase()))
                                return store
                            if(store.zipCode.replace(/\s+/g, '').toLowerCase().includes(search.replace(/\s+/g, '').toLowerCase()))
                                return store
                        })
                            .map((store,i) => <Store key={i} store={store}/>)
                        : null}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Stores);