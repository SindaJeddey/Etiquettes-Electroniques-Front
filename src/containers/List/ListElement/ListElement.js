import React, {Component} from "react";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TableRow from "@material-ui/core/TableRow";
class ListElement extends Component{

    render() {
        return (
            <TableRow key={this.props.id}>
                <TableCell component="th" scope="row">{this.props.id}</TableCell>
                <TableCell align="center">
                    {this.props.name}
                </TableCell>
                <TableCell align="center" padding={"none"}>
                    <EditIcon/>
                </TableCell>
                <TableCell>
                    <DeleteOutlineIcon onClick={() => this.props.onDeleteHandler(this.props.id)}/>
                </TableCell>
            </TableRow>
        )
    }
}

export default ListElement;