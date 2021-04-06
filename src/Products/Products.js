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
import {TableBody, TableCell} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import ProductForm from "./Product/ProductForm";

const Products = (props) => {
    const [products, setProducts] = useState(null);
    const [categories,setCategories] = useState(null);
    const [category,setCategory] = useState(null);
    const [search,setSearch] = useState(null);
    const params = queryString.parse(props.location.search);
    const [add, setAdd] = useState(false);
    const store = JSON.parse(localStorage.getItem('store'));

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
        if (params.products === "all") {
            axios.get('/api/products')
                .then(response => setProducts(response.data))
                .catch(error => console.log(error))
        } else if (params.products === "inStore"){
            axios.get(`/api/stores/${store.storeCode}/products`)
                .then(response => {
                    let data = [];
                    response.data.inStoreProducts.forEach(prod => data.push(prod.product))
                    setProducts(data)
                })
                .catch(error => console.log(error))
        }
    },[props.location.search])

    const onOpen = () => {
        setAdd(true)
    }

    const close = () => {
        setAdd(false);
        props.history.push('/products')
    }
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
                    size={"large"}
                    onClick={onOpen}>New Product</Button>
                <ProductForm open={add} product={null} operation={"add"} close={close}/>
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
            <div className= {'products_results'}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell align="center">Product</TableCell>
                            <TableCell align="center">Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products? products.map((product, i) => <Product key={i} product={product}/>) : null}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default withRouter(Products);
