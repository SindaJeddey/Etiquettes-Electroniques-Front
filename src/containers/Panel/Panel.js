import React, {Component} from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import {connect} from "react-redux";
import classes from './Panel.module.css';
import Search from "../Search/Search";
import {Route, withRouter} from "react-router";
import User from "../Add/User/User";
import Category from "../Add/Category/Category";
import Product from "../Add/Product/Product";
import Store from "../Add/Store/Store";
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
                    <Route path={"/:choice/search"} exact render={() => <Search choice={this.props.choice.replace("s", "")}
                                                                          onClose={this.onClose} update={this.onClose}/>}/>
                {add}
                    <Route path={"/:choice/update"} exact render={() => <Update onClose={this.onClose}/>}/>
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