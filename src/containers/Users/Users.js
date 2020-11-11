import React, {useEffect, useState} from "react";
import axios from 'axios';
import {withRouter} from "react-router";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import User from "./User/User";
import './Users.css';
import UserForm from "./User/UserForm";


const Users = (props) =>{
    const role = props.location.pathname.replace('/','')
    const title = role === "operators" ? "Operator" : "Super-Operator"
    const API_URL = `/api/${role}`

    const [users, setUsers]= useState(null);
    const [search, setSearch] = useState("");
    const [add, setAdd] = useState(false);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setUsers(response.data);
                console.log(response.data)
            })
            .catch(error => console.log(error))
    },[props.history.location])

    const onOpen = () => {
        setAdd(true)
        props.history.push(`/${role}?add`)
    }
    const close = () => {
        setAdd(false);
        props.history.push(`/${role}`)
    }

    return (
        <div className={'users_search_container'}>
            <div className={'add_user'}>
                <Button
                    style={{
                        backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                    }}
                    variant={"contained"}
                    startIcon={<AddCircleOutlineIcon/>}
                    type={"submit"}
                    size={"large"}
                    onClick={onOpen}>New {title}</Button>
                <UserForm user={null} operation={"Add"} open={add} close={close}/>
            </div>
            <div>
                <TextField
                    label={`Search ${title}`}
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
            <div className={'users_results'}>
                <ul>{users ?
                    users.filter(user => {
                        if(!search || search === "")
                            return user
                        if(user.username.replace(/\s+/g, '').toLowerCase().includes(search.replace(/\s+/g, '').toLowerCase()))
                            return user
                    })
                        .map((user,i) => <User key={i} user={user}/>)
                    : null}
                </ul>
            </div>
        </div>
    )


}

export default withRouter(Users);