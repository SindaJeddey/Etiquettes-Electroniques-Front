import React, {useEffect, useState} from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {withRouter} from "react-router-dom";
import * as queryString from "query-string";
import './Transacations.css';
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Transaction from "./Transaction/Transaction";

const Transactions = (props) => {
    const [transactions, setTransactions] = useState(null);
    const store = JSON.parse(localStorage.getItem('store'));
    const params = queryString.parse(props.location.search);
    const [product, setProduct] = useState(null);
    const [open,setOpen] = useState(false)

    const onOpen = () => {
        setOpen(true)
        props.history.push('/transactions/new')

    }

    const close = () => {
        setOpen(false)
        props.history.push(`/transactions?product=${product.productCode}`   )
    }

    useEffect(() => {
        let data = []
        axios.get(`/api/stores/${store.storeCode}/products/${params.product}`)
            .then(response => {
                setProduct(response.data);
                console.log(response.data)
                response.data.movements.forEach((row) =>
                    data.push({code:row.movementCode,transactionDate: row.movementDate,type:row.type,quantity:row.quantity}))
                setTransactions(data)
            })
            .catch(error => console.log(error));
    },[props.history.location])


    return(
        <div className={"transactions_search_container"}>
            {product? <div className={'product_title'}>{product.product.name}</div>:null}
            <div className={'add_transaction'}>
                <Button
                    style={{
                        backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                    }}
                    variant={"contained"}
                    startIcon={<AddCircleOutlineIcon/>}
                    type={"submit"}
                    size={"large"}
                    onClick={onOpen}>New Transaction</Button>
                <Transaction open={open} close={close} inStoreProduct={product}/>
            </div>
            <div className= {'transactions_results'}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Transaction Code</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions? transactions.map((row,index) => {
                            return (
                                <TableRow key={index} hover>
                                    {Object.values(row).map((entry) =>
                                        <TableCell align={"center"} >
                                            {entry}
                                        </TableCell>)}
                                </TableRow>
                            );}): null}
                    </TableBody>
                </Table>
            </div>
        </div>
    )

}


export default withRouter(Transactions);
