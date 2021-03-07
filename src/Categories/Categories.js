import React, {useEffect, useState} from "react";
import './Categories.css';
import {withRouter} from "react-router";
import axios from 'axios';
import Category from "./Category/Category";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CategoryForm from "./Category/CategoryForm";

const Categories = (props) => {
    const [categories, setCategories]= useState(null);
    const [search, setSearch] = useState("")
    const [add, setAdd] = useState(false);

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
    },[props.history.location])

    const onOpen = () => {
        setAdd(true)
        props.history.push('/categories?operation=add')
    }

    const close = () => {
        setAdd(false);
        props.history.push('/categories')
    }

    return(
        <div className={'categories_search_container'}>
            <div className={'add_category'}>
                <Button
                    style={{
                        backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                    }}
                    variant={"contained"}
                    startIcon={<AddCircleOutlineIcon/>}
                    type={"submit"}
                    size={"large"}
                    onClick={onOpen}>New Category</Button>
                <CategoryForm operation={"Add"} code={null} name={null} open={add} close={close} categories={categories}/>
            </div>
            <div>
                <TextField
                    label="Search Category"
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
            <div className={'categories_results'}>
                <ul>
                    {categories ?
                        categories.filter(category => {
                            if(!search || search === "")
                                return category
                            if(category.name.replace(/\s+/g, '').toLowerCase().includes(search.replace(/\s+/g, '').toLowerCase()))
                                return category
                            if(category.categoryCode.toLowerCase().includes(search.toLowerCase()))
                                return category
                            return category
                        })
                                  .map((category,i) => <Category key={i} code={category.categoryCode} name={category.name}/>)
                        : null}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Categories);
