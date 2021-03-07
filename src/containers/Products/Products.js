import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import * as queryString from "query-string";
import './Products.css'
import axios from 'axios'
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CategoryIcon from "@material-ui/icons/Category";
import Product from "./Product/Product";

const Products = (props) => {
    const [products, setProducts] = useState(null);
    const [categories,setCategories] = useState(null);
    const [category,setCategory] = useState(null);
    const [search,setSearch] = useState(null);
    const params = queryString.parse(props.location.search);

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
        if (params.products === "all") {
            axios.get('/api/products')
                .then(response => setProducts(response.data))
                .catch(error => console.log(error))
        }
    },[props.location.search])

    return(
        <div className={'products_search_container'}>
            <div className={'add_product'}>
                <Button
                    style={{
                        backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                    }}
                    variant={"contained"}
                    startIcon={<AddCircleOutlineIcon/>}
                    type={"submit"}
                    size={"large"}>New Product</Button>
            </div>
            <div className={'search_container'}>
                <FormControl variant="outlined" fullWidth style={{ margin:"3%"}}>
                    <InputLabel>Category</InputLabel>
                    <Select value={category || ''}
                            startAdornment={<InputAdornment position="start"><CategoryIcon /></InputAdornment>}
                            onChange={(event) => setCategory(event.target.value)}>
                        {categories? categories.map((cat,i) => <MenuItem key={i} value={cat}>{cat.name}</MenuItem>) : null}
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label={`Search Product`}
                    value={search}
                    name={"search"}
                    variant={"outlined"}
                    fullWidth
                    onChange={(event) => setSearch(event.target.value)}
                    style={{ margin:"3%"}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className={'products_results'}>
                <ul>
                    {products?
                        products.filter(product => {
                            if(!search || search === "" && !category)
                                return product;
                            if(product.name.toLowerCase().includes(search.toLowerCase()))
                                return product;
                            if(product.productCode.toLowerCase().includes(search.toLowerCase()))
                                return product;
                            if(category.categoryCode.toLowerCase().includes(product.category.toLowerCase()))
                                return product
                            return product;
                            })
                                .map((product,i) => <Product key={i} product={product}/>) : null}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Products);
