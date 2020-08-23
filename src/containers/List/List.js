import React, {Component} from "react";
import {withRouter} from "react-router";
import classes from './List.module.css';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import axios from 'axios';
import * as actionCreators from '../../store/actions/index'
import {connect} from "react-redux";
import ListElement from "../../components/ListElement/ListElement";
import Modal from "../../components/Modal/Modal";


const API_URL = "https://localhost:8443/api/";

class List extends Component {

    state = {
        page: 0,
        rowsPerPage: 8,
        deleteModal: false,
        id: null
    }

    componentDidMount() {
        axios.get(API_URL+this.props.choice.toLowerCase(), {
            headers:{
                'Authorization':this.props.token
            }
        })
            .then(response => {
                this.props.onSetItems(response.data)
            })
            .catch(error => console.log(error))
    }

    onModalClose = () => {
        this.setState({deleteModal: false})
    }

    deleteHandler = (id) => {
        this.setState({deleteModal: true, id:id})
    }

    updateHandler = (id) => {
        this.props.onSetElementId(id);
        this.props.update()
        this.props.history.push("/"+this.props.choice.toLowerCase()+"/update");
    }

    onConfirm = () => {
        axios.delete(API_URL+this.props.choice.toLowerCase()+"/"+this.state.id,{
            headers:{
                'Authorization':this.props.token
            }
        })
            .then(response => {
                this.props.onSetItems(this.props.items.filter(data => data.id !== this.state.id))
                this.setState({deleteModal: false})
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
                                    else if(this.props.choice.toLowerCase() === "operators" || this.props.choice.toLowerCase() === "super-operators"){
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
                                             name={this.props.choice.toLowerCase() === "operators" ||
                                             this.props.choice.toLowerCase() === "super-operators"
                                                 ? row.username
                                                 : row.name}
                                             onDeleteHandler={this.deleteHandler}
                                             onUpdateHandler={this.updateHandler}/>
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
                <Modal email={false}
                       subscribe={true}
                       open={this.state.deleteModal}
                       title={"Delete "+this.props.choice.replace("s","")+"?"}
                       text={"Are you sure you want to delete "+this.props.choice.replace("s","").toLowerCase()+"?"}
                       onClose={this.onModalClose}
                       confirm={this.onConfirm}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authority: state.credentialsReducer.authority,
    choice: state.choiceReducer.choice,
    elementId: state.choiceReducer.elementId,
    items: state.choiceReducer.items,
    token: 'Bearer '+state.credentialsReducer.token
});


const mapStateToDispatch = (dispatch) => ({
    onSetItems: (items) => dispatch(actionCreators.setItems(items)),
    onSetElementId: (id) => dispatch(actionCreators.setElement(id))
})

export default connect(mapStateToProps,mapStateToDispatch)(withRouter(List))