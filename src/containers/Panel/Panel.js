import React, {Component} from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import {connect} from "react-redux";
import classes from './Panel.module.css';
import Search from "../List/List";
import {Route, Switch, withRouter} from "react-router";
import User from "../Models/User/User";
import Category from "../Models/Category/Category";
import Product from "../Models/Product/Product";
import Store from "../Models/Store/Store";
import Update from "../Update/Update";

class Panel extends Component {

    onSearchClick = () => {
        this.props.history.push('/'+this.props.choice.toLowerCase()+"/search")
    }

    onClose = () => {
        this.props.history.push('/'+this.props.authority.toLowerCase()+'/'+this.props.choice.toLowerCase())
    }

    onAddClick = () => {
        this.props.history.push('/'+this.props.choice.toLowerCase()+"/add")
    }

    goBack = () => {
        this.props.history.push('/welcome')
    }

    render() {
        if(this.props.token === null) {
            this.props.history.replace('/')
        }

        let add = null;
        switch (this.props.choice){
            case "Categories":
                add = <Route exact path={"/:choice/add"} render={() => <Category
                    onClose={this.onClose}
                    onSubmit={this.onSearchClick}
                    operation={"Add"}/>} />
                break;
            case "Stores":
                add = <Route exact path={"/:choice/add"} render={() => <Store
                    onClose={this.onClose}
                    onSubmit={this.onSearchClick}
                    operation={"Add"}/>} />
                break;
            case "Products":
                add = <Route exact path={"/:choice/add"} render={() => <Product
                    onClose={this.onClose}
                    onSubmit={this.onSearchClick}
                    operation={"Add"}/>} />
                break;
            default:
                add = <Route exact path={"/:choice/add"} render={() => <User
                    onClose={this.onClose}
                    onSubmit={this.onSearchClick}
                    operation={"Add"}/>} />
                break;
        }
        return(
            <div className={classes.container}>
                <SideMenu searchClick={this.onSearchClick} addClick={this.onAddClick} goBack={this.goBack}/>
                {/*<Switch>*/}
                {/*    <Route path={"/:choice/search"} exact render={() => <List choice={this.props.choice.replace("s", "")}*/}
                {/*                                                                onClose={this.onClose} update={this.onClose}/>}/>*/}
                {/*    <Route path={"/:choice/update"} exact render={() => <Update onClose={this.onClose}/>}/>*/}
                {/*</Switch>*/}
                {add}
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        authority: state.credentialsReducer.authority,
        choice: state.choiceReducer.choice,
        token: state.credentialsReducer.token
    }
)

export default withRouter(connect(mapStateToProps)(Panel));