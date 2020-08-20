import React, {Component} from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import {connect} from "react-redux";
import classes from './Panel.module.css';
import Search from "../Search/Search";
import {withRouter} from "react-router";
import AddUser from "../Add/User/AddUser";
import AddCategory from "../Add/Category/AddCategory";
import AddProduct from "../Add/Product/AddProduct";
import AddStore from "../Add/Store/AddStore";

class Panel extends Component {

    state = {
        search: false,
        adding: false
    }

    onSearchClick = () => {
        this.setState({search: true, adding:false})
    }

    onClose = () => {
        this.setState({search: false,adding: false})
    }

    onAddClick = () => {
        this.setState({adding: true, search: false})
    }

    render() {
        if(this.props.token === null) {
            this.props.history.replace('/')
        }
        let add = null;
        switch (this.props.choice){
            case "Categories":
                add = <AddCategory onClose={this.onClose} onSubmit={this.onSearchClick}/>
                break;
            case "Stores":
                add = <AddStore onClose={this.onClose} onSubmit={this.onSearchClick}/>
                break;
            case "Products":
                add = <AddProduct onClose={this.onClose} onSubmit={this.onSearchClick}/>
                break;
            default:
                add = <AddUser onClose={this.onClose} onSubmit={this.onSearchClick}/>
                break;
        }
        return(
            <div className={classes.container}>
                    <SideMenu searchClick={this.onSearchClick} addClick={this.onAddClick}/>
                {this.state.search ? <Search choice={this.props.choice.replace("s", "")}
                                             onClose={this.onClose}/>
                                             : this.state.adding ? add : null }

            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        choice: state.choiceReducer.choice,
        token: state.credentialsReducer.token
    }
)

export default withRouter(connect(mapStateToProps)(Panel));