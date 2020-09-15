import React, {Component} from "react";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import classes from './List.module.css';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import axios from 'axios';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from '@material-ui/icons/Add';
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Promo from "../Promo/Promo";
import AddToStore from "../AddToStore/AddToStore";
import AddTransaction from "../Transaction/AddTransaction";

const API ="https://localhost:8443/api/"

class List extends Component {

    state = {
        columns:[],
        data:[],
        search: null,
        categories:[],
        selectedCategory: null,
        promoModal:false,
        selectedRow:null,
        addToStoreModal:false,
        addTransactionModal:false
    }

    componentDidMount() {
        const role  = this.props.match.params.choice;
        let columns;
        let data = [];
        switch (role){
            case "operators":
                columns=['#','Username','Delete Operator'];
                axios.get(API+"operators",{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        response.data.forEach((user,index) =>{
                            data.push({code:user.username,id:index,username:user.username})
                        })
                        this.setState({columns:columns,data:data})
                    })
                    .catch(error => console.log(error))
                break;
            case "super-operators":
                columns=['#','Username','Delete Super-Operator'];
                axios.get(API+"super-operators",{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        response.data.forEach((user,index) =>{
                            data.push({code:user.username,id:index,name:user.username})
                        })
                        this.setState({columns:columns,data:data})
                    })
                    .catch(error => console.log(error))
                break;
            case "categories":
                columns=['#','Category','Delete Category'];
                axios.get(API+"categories",{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        response.data.forEach((cat,index)=>{
                            data.push({code:cat.categoryCode,id:index,name:cat.name})
                        })
                        this.setState({columns:columns,data:data})
                    })
                    .catch(error => console.log(error))
                break;
            case "products":
                columns=['#','Product','Category','Delete Product','Add To Store','Promo'];
                axios.get(API+"products",{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        response.data.forEach((product,index) =>{
                            data.push({code:product.productCode,id:index,name:product.name,category:product.category})
                        })
                        this.setState({columns:columns,data:data})
                    })
                    .catch(error => console.log(error))
                axios.get(API+"categories",{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        this.setState({categories: response.data})
                    })
                break;
            case "stores":
                columns=['#','Product','Category','Delete From Store','Add To Store'];
                axios.get(API+"stores/"+this.props.store+"/products",{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        response.data.inStoreProducts.forEach((product,index) =>{
                            data.push({code:product.inStoreProductCode,id:index,name:product.product.name,category:product.product.category})
                        })
                        this.setState({columns:columns,data:data})
                    })
                    .catch(error => console.log(error))
                axios.get(API+"categories",{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        this.setState({categories: response.data})
                    })
                break;
            default:
                break;
        }
    }


    handleChange = (event) => {
        const {name,value} = event.target
        switch (name) {
            case "category":
                this.setState({selectedCategory: value})
                break;
            case "search":
                this.setState({search: value})
                break;
            default:
                break;
        }
    }

    onDeleteHandler = (event,id) => {
        event.stopPropagation();
        const role  = this.props.match.params.choice;
        switch (role) {
            case "operator":
                axios.delete(API+"operators/"+id,{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        let data = this.state.data
                        data = data.filter(row => row.username !== id)
                        this.setState({data:data})
                    })
                    .catch(error => console.log(error))
                break;
            case "super-operator":
                axios.delete(API+"super-operators/"+id,{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        let data = this.state.data
                        data = data.filter(row => row.username !== id)
                        this.setState({data:data})
                    })
                    .catch(error => console.log(error))
                break;
            case "categories":
                axios.delete(API+"categories/"+id,{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        let data = this.state.data
                        data = data.filter(row => row.code !== id)
                        this.setState({data:data})
                    })
                    .catch(error => console.log(error))
                break;
            case "products":
                axios.delete(API+"products/"+id,{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        let data = this.state.data
                        data = data.filter(row => row.code !== id)
                        this.setState({data:data})
                    })
                    .catch(error => console.log(error))
                break;
            case "stores":
                const mvt  = {
                    type: "OUT",
                    product:{
                        inStoreProductCode:id,
                        store:{storeCode:this.props.store}
                    }
                }
                axios.put(API+"stores/"+this.props.store+"/products/delete",mvt,{headers:{'Authorization': this.props.token}})
                    .then(response => {
                        let data = this.state.data
                        console.log(response)
                        data = data.filter(row => row.code !== id)
                        this.setState({data:data})
                    })
                    .catch(error => console.log(error))
                break;
        }
    }

    onClickHandler = (code) => {
        const role  = this.props.match.params.choice;
        if(role === "stores")
            this.props.history.push("/"+role+"/product?id="+code)
        else
            this.props.history.push("/"+role+"/update?id="+code)
    }

    closeModal = () => {
        this.setState({promoModal:false,addToStoreModal:false,addTransactionModal:false})
    }

    render() {
        const {columns, data} = this.state
        const { role } = this.props
        return(
            <div className={classes.container} >
                <div className={classes.searchContainer}>
                    {role === "products" || role === "inStoreProducts" ?
                        <div className={classes.category}>
                            <FormControl variant="outlined"
                                         fullWidth={true}
                                         size={"small"}>
                                <InputLabel>Choose Category</InputLabel>
                                <Select name={"category"}
                                        variant={"outlined"}
                                        onChange={(event) => this.handleChange(event)}
                                        value={this.state.selectedCategory}>
                                    <MenuItem value={""}>None</MenuItem>
                                    {this.state.categories.map((category) => <MenuItem key={category.id}
                                                                                       value={category.name}>
                                        {category.name}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                        : null}
                        <div className={classes.searchField}>
                            <TextField variant={"outlined"}
                                       name={"search"}
                                       size={"small"}
                                       placeholder={"Search "+role}
                                       InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize={"small"} />
                                    </InputAdornment>
                                ),}}
                                       onChange={(event) => this.handleChange(event)}/>
                        </div>

                </div>
                <div className={classes.list}>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow >
                                    {columns.map((column) => (
                                        <TableCell align={"center"}>
                                            {column}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.filter(row => {
                                    if(this.state.search === null && this.state.selectedCategory === null )
                                        return row;
                                    if(this.state.selectedCategory !== null &&
                                        row.category.toLowerCase().includes(this.state.selectedCategory.toLowerCase())){
                                            return row;
                                    }
                                    if(this.state.search !== null &&
                                        row.name.toLowerCase().includes(this.state.search.toLowerCase()))
                                        return row
                                }).map((row) => {
                                    return (
                                        <TableRow className={classes.row} key={row.id} hover
                                                  onClick={() => this.onClickHandler(row.code)}>
                                            {Object.values(row).map((entry,index) => index === 0 ? null :
                                                <TableCell align={"center"}>
                                                {entry}
                                            </TableCell>)}
                                                <TableCell align={"center"}>
                                                    <Button style={{
                                                        backgroundColor: "#f57c00", color:"#F1FAEE"
                                                    }} startIcon={<DeleteIcon/>}
                                                            onClick={(event) => this.onDeleteHandler(event,row.code)}>Delete</Button>
                                                </TableCell>
                                            {role==="products"?
                                                <TableCell align={"center"}>
                                                    <Button style={{
                                                        backgroundColor: "#f57c00", color:"#F1FAEE"
                                                    }} startIcon={<AddIcon/>}
                                                            onClick={(event) => {
                                                                event.stopPropagation()
                                                                this.setState({addToStoreModal:true, selectedRow: row.code})
                                                            }}>Add To Store</Button>
                                                </TableCell>:
                                                role==="inStoreProducts"?
                                                    <TableCell align={"center"}>
                                                        <Button style={{
                                                            backgroundColor: "#f57c00", color:"#F1FAEE"
                                                        }} startIcon={<AddIcon/>}
                                                                onClick={(event) => {
                                                            event.stopPropagation()
                                                            this.setState({addTransactionModal:true, selectedRow: row.code})
                                                        }}>Transaction</Button>
                                                    </TableCell>
                                                    :null}
                                            {role==="products"?
                                                <TableCell align={"center"}>
                                                    <Button style={{
                                                        backgroundColor: "#f57c00", color:"#F1FAEE"
                                                    }} onClick={(event) => {
                                                        event.stopPropagation()
                                                        this.setState({promoModal: true, selectedRow: row.code})
                                                    }}>Promo</Button>
                                                </TableCell>
                                                :null}
                                        </TableRow>
                                    );})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {this.state.promoModal?<Promo modal={this.state.promoModal}
                                             closeModal={this.closeModal}
                                             row={this.state.selectedRow}/>:null}
                    {this.state.addToStoreModal?<AddToStore modal={this.state.addToStoreModal}
                                                  closeModal={this.closeModal}
                                                  row={this.state.selectedRow}/>:null}
                    {this.state.addTransactionModal?<AddTransaction modal={this.state.addTransactionModal}
                                                            closeModal={this.closeModal}
                                                            row={this.state.selectedRow}/>:null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token:'Bearer '+state.credentialsReducer.token,
    choice: state.choiceReducer.choice,
    store: state.credentialsReducer.store.storeCode
})


export default withRouter(connect(mapStateToProps)(List));