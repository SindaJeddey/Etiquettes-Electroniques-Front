import React, {useState} from "react";
import '../Categories.css'
import {withRouter} from "react-router";
import CategoryForm from "./CategoryForm";

const Category = (props) => {
    const {code,name} = props;

    const [open,setOpen] = useState(false)

    const onOpen = () => {
        props.history.push('/categories?operation=update')
        setOpen(true)
    }

    const close = () => {
        setOpen(false)
        props.history.push('/categories')
    }

    return(
        <>
            <li onClick={() => onOpen()} className={'category_result'}>
                {name}
                <br/>
                <span className={'category_code'}>{code}</span>
            </li>
            <CategoryForm open={open} close={close} name={name} code={code} operation={"Update"}/>
        </>
    )
}

export default withRouter(Category);