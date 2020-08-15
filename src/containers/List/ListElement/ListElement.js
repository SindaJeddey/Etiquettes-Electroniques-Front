import React from "react";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TableRow from "@material-ui/core/TableRow";

const ListElement = ({id,name}) => {
    return (
        <TableRow key={id}>
            <TableCell component="th" scope="row">{id}</TableCell>
            <TableCell align="center">
                {name}
            </TableCell>
            <TableCell align="center" padding={"none"}>
                    <EditIcon/>
            </TableCell>
            <TableCell>
                    <DeleteOutlineIcon/>
            </TableCell>
        </TableRow>
    )
}

export default ListElement;