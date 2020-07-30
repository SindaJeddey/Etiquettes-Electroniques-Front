import React, {Component} from "react";
import {withRouter} from "react-router";
import classes from './List.module.css';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

class List extends Component {

    render() {
        console.log(this.props)
        const products =  [
            {
                id:1,
                name: "Sady"
            },
            {
                id:2,
                name: "Sady1"
            }
            ,
            {
                id:3,
                name: "Sady2"
            }
        ]

        return(
            <div className={classes.container}>
                <TableContainer component={Paper}>
                    <Table classes={classes.table} aria-label="simple table">
                        <TableBody>
                            {products.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center" padding={"none"}>
                                        <div className={classes.editIcon}>
                                            <EditIcon />
                                        </div>
                                        <div className={classes.deleteIcon}>
                                            <DeleteOutlineIcon />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default withRouter(List)