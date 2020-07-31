import React, {Component} from "react";
import classes from './Choice.module.css';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import * as actionCreators from '../../store/actions';

class Choice extends Component{

    onClickHandler =() =>{
        this.props.onSetChoice(this.props.title);
        this.props.history.push('/'+this.props.authority.toLowerCase()+'/'+this.props.title.toLowerCase());
    }

    render() {
        return(
            <div className={classes.container}>
                <button className={"btn btn-outline-dark btn-block"}
                        onClick={this.onClickHandler}>
                    {this.props.title}
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        choice: state.choiceReducer.choice,
        authority: state.credentialsReducer.authority
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        onSetChoice: (choice) => dispatch(actionCreators.setChoice(choice))
    }
)
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Choice));