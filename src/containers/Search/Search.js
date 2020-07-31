import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import classes from './Search.module.css';
import List from "../List/List";
import CloseIcon from "@material-ui/icons/Close";

class Search extends Component {

    render() {
        return(
            <div className={classes.container} >
                <CloseIcon className={classes.closeIcon} onClick={this.props.onClose}/>
                <div className={classes.searchContainer}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <SearchIcon/>
                        </Grid>
                        <Grid item>
                            <TextField label={"Search "+this.props.choice}/>
                        </Grid>
                    </Grid>
                </div>
                <List/>
            </div>

        )
    }
}

export default Search;