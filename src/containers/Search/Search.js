import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import classes from './Search.module.css';
import List from "../List/List";
import CloseIcon from "@material-ui/icons/Close";
import {connect} from "react-redux";
import * as actionCreators from '../../store/actions/index';


class Search extends Component {
    state = {
        search: null
    }

    render() {
        return(
            <div className={classes.container} >
                <CloseIcon className={classes.closeIcon} onClick={this.props.onClose}/>
                <div className={classes.searchContainer}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <SearchIcon onClick={this.onClickHandler}/>
                        </Grid>
                        <Grid item>
                            <TextField label={"Search "+this.props.choice}
                                       onChange={(event) => this.setState({search: event.target.value})}/>
                        </Grid>
                    </Grid>
                </div>
                <List search={this.state.search} update={this.props.update}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    choice: state.choiceReducer.choice
})

const mapStateToDispatch = (dispatch) => ({
    onSetElement: (element) => dispatch(actionCreators.setElement(element))
})


export default connect(mapStateToProps,mapStateToDispatch)(Search);