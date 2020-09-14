import React from "react";
import User from "../../containers/Models/User/User";
import {withRouter} from "react-router";
import List from "../../containers/List/List";
import Category from "../../containers/Models/Category/Category";
import Product from "../../containers/Models/Product/Product";
import queryString from 'query-string';
import Transactions from "../../containers/Transactions/Transactions";
const Content = (props) =>{
    const { match: { params } } = props;
    switch (params.choice){
        case "operators":
            if (params.operation ==="add")
                return <User operation={"Add"} role={"Operator"}/>
            if (params.operation ==="update") {
                const param = queryString.parse(props.location.search);
                return <User operation={"Update"} role={"Operator"} id={param.id}/>
            }
            if(params.operation ==="browse")
                return <List key={"operators"} role={"operators"}/>
            else
                return null
            break;
        case "super-operators":
            if (params.operation ==="add")
                return <User operation={"Add"} role={"Super-Operator"}/>
            if (params.operation ==="update") {
                const param = queryString.parse(props.location.search);
                return <User operation={"Update"} role={"Super-Operator"} id={param.id}/>
            }
            if(params.operation ==="browse")
                return <List key={"super-operators"} role={"super-operators"}/>
            else
                return null
            break;
        case "products":
            if (params.operation ==="add")
                return <Product operation={"Add"}/>
            else if (params.operation ==="browse")
                return <List key={"products"} role={"products"}/>;
            else if(params.operation === "update"){
                const param = queryString.parse(props.location.search);
                return <Product operation={"Update"} id={param.id}/>
            }
            break;
        case "inStoreProducts":
            if(params.operation === "update"){
                const param = queryString.parse(props.location.search);
                return <Product operation={"Update"} id={param.id} inStore={true} />
            }
            break;
        case "categories":
            if (params.operation ==="add")
                return <Category operation={"Add"}/>
            else if (params.operation ==="browse")
                return <List key={"categories"} role={"categories"}/>;
            else if(params.operation === "update") {
                const param = queryString.parse(props.location.search);
                return <Category operation={"Update"} id={param.id}/>
            }
            break;
        case "stores":
            if(params.operation==="browse")
                return <List key={"stores"} role={"inStoreProducts"}/>
            else if(params.operation==="product") {
                const param = queryString.parse(props.location.search);
                return <Transactions id={param.id}/>
            }
            else return null
        default:
            return <p>content</p>;
    }

}

export default withRouter(Content);