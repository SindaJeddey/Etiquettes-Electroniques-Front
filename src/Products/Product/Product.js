import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import ProductForm from "./ProductForm";
import {withRouter} from "react-router-dom";
import * as queryString from "query-string";

const Product = (props) => {
    const {product, key} = props;
    const params = queryString.parse(props.location.search);
    const [open,setOpen] = useState(false)

    const onOpen = () => {
        if(params.products !== "inStore")
            setOpen(true)
        else
            props.history.push(`/transactions?product=${product.productCode}`)
    }

    const close = () => {
        setOpen(false)
        props.history.push('/products')
    }
    return(
        <>
            <TableRow key={key} onClick={() => onOpen()}>
                <TableCell component="th" scope="row">
                    {product.productCode}
                </TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.category}</TableCell>
            </TableRow>
            <ProductForm open={open} close={close} product={product} operation={"Update"}/>
        </>
    )
}

export default withRouter(Product);
