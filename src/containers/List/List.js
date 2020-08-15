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
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import axios from 'axios';
import * as actionCreators from '../../store/actions/index'
import {connect} from "react-redux";
import ListElement from "./ListElement/ListElement";


const API_URL = "https://localhost:8443/api/";

class List extends Component {

    state = {
        page: 0,
        rowsPerPage: 8,
        list : null
    }

    componentDidMount() {
        console.log(this.props.choice)
        axios.get(API_URL+this.props.choice.toLowerCase(), {
            headers:{
                'Authorization':'Bearer '+this.props.token
            }
        })
            .then(response => {
                this.props.onSetItems(response.data)
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    render() {
        const handleChangePage = (event, newPage) => {
            this.setState({page: newPage});
        };

        const handleChangeRowsPerPage = (event) => {
            this.setState({
                rowsPerPage: parseInt(event.target.value, 10),
                page:0
            })
        };

        return(
            <div className={classes.container}>
                <TableContainer component={Paper}>
                    {   this.props.items ?
                        <Table classes={classes.table} aria-label="simple table">
                        <TableBody>
                            {(this.state.rowsPerPage > 0 ?
                                this.props.items.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.props.items)
                                .filter(data => {
                                    if (this.props.search === null) {
                                        return data;
                                    }
                                    else if(this.props.choice === "Operators" || this.props.choice === "Super-Operators"){
                                        if(data.id === parseInt(this.props.search) ||
                                            data.username.toLowerCase().includes(this.props.search.toLowerCase())){
                                            return data
                                        }
                                    }
                                    else {
                                        if (data.id === parseInt(this.props.search) ||
                                        data.name.toLowerCase().includes(this.props.search.toLowerCase()) )
                                            return data
                                    }
                            })
                                .map((row) => (
                                <ListElement id={row.id}
                                             name={this.props.choice === "Operators" || this.props.choice === "Super-Operators"
                                                 ? row.username
                                                 : row.name}/>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={8}
                                    count={this.props.items.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    onChangePage={handleChangePage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table> : null}
                </TableContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    choice: state.choiceReducer.choice,
    items: state.choiceReducer.items,
    token: state.credentialsReducer.token
});


const mapStateToDispatch = (dispatch) => ({
    onSetItems: (items) => dispatch(actionCreators.setItems(items))
})

export default connect(mapStateToProps,mapStateToDispatch)(withRouter(List))