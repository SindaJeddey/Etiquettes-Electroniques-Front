import React, {useState} from "react";
import '../Categories.css'
import {withRouter} from "react-router";
import CategoryForm from "../CategoyForm";

const Category = (props) => {
    const {code,name} = props;

    const [open,setOpen] = useState(false)

    const onOpen = () => {
        props.history.push('/categories?update')
        setOpen(true)
    }

    const close = () => {
        setOpen(false)
        props.history.push('/categories')
    }

    return(
        <>
            <li onClick={() => onOpen()} className={'result'}>
                {name}
                <br/>
                <span className={'code'}>{code}</span>
            </li>
            <CategoryForm open={open} close={close} name={name} code={code} operation={"Update"}/>
        </>
    )
}

export default withRouter(Category);