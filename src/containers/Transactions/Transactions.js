import React, {Component} from "react";
import axios from "axios";
import classes from "../List/List.module.css";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const API ="https://localhost:8443/api/"
class Transactions extends Component{

    state= {
        data:[],
        search:null,
        searchDate:null
    }

    componentDidMount() {
        let data = []
        axios.get(API+"transactions/"+this.props.id)
            .then(response => {
                console.log(response.data)
                response.data.forEach((row,index) =>
                    data.push({id:index,transactionDate: row.movementDate,type:row.type,quantity:row.quantity}))
                this.setState({data:data})
            })
            .catch(error => console.log(error));
    }

    render() {
        const {data} = this.state
        const columns = ['#','Transaction Date','Type','Quantity']
        return(
            <div className={classes.container}>
                <div className={classes.searchContainer}>
                    <div className={classes.searchField}>
                        <TextField variant={"outlined"}
                                   name={"search"}
                                   size={"small"}
                                   placeholder={"Search Transaction"}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <SearchIcon fontSize={"small"} />
                                           </InputAdornment>
                                       ),}}
                                   onChange={(event) => this.setState({search: event.target.value})}/>
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
                                {data.filter(row =>{
                                    if (this.state.search === null && this.state.searchDate === null)
                                        return row
                                    if (row.type.toLowerCase().includes(this.state.search.toLowerCase()))
                                        return row
                                }).map((row,index) => {
                                    return (
                                        <TableRow className={classes.row} key={index} hover>
                                            {Object.values(row).map((entry) =>
                                                <TableCell align={"center"} >
                                                    {entry}
                                                </TableCell>)}
                                        </TableRow>
                                    );})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}

export default Transactions;