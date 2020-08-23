import React, {Component} from "react";
import {connect} from "react-redux";
import Category from "../Add/Category/Category";
import Store from "../Add/Store/Store";
import Product from "../Add/Product/Product";
import User from "../Add/User/User";
import Auxiliary from "../../hoc/Auxiliary";
import {withRouter} from "react-router";

class Update extends Component{

    onSubmitClick = () => {
        this.props.history.push('/'+this.props.choice.toLowerCase()+'/search')
    }


    render() {
        let update = null;
        switch (this.props.choice){
            case "Categories":
                update= <Category onClose={this.props.onClose}
                                  onSubmit={this.onSubmitClick}
                                  operation={"Update"}
                                  id={this.props.element}/>
                break;
            case "Stores":
                update= <Store onClose={this.props.onClose}
                               onSubmit={this.onSubmitClick}
                               operation={"Update"}
                               id={this.props.element}/>
                break;
            case "Products":
                update= <Product onClose={this.props.onClose}
                                 onSubmit={this.onSubmitClick}
                                 operation={"Update"}
                                 id={this.props.element}/>
                break;
            default:
                update = <User onClose={this.props.onClose}
                               onSubmit={this.onSubmitClick}
                               operation={"Update"}
                               id={this.props.element}/>
                break;
        }
        return(
            <Auxiliary>
                {update}
            </Auxiliary>
        )
    }
}

const mapStateToProps = (state) => ({
    element: state.choiceReducer.elementId,
    choice: state.choiceReducer.choice,
    authority: state.credentialsReducer.authority
})

export default connect(mapStateToProps)(withRouter(Update));