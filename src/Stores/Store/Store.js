import React, {useState} from "react";
import '../Stores.css';
import {withRouter} from "react-router";
import StoreForm from "./StoreForm";

const Store = (props) => {
    const {store} = props;

    const [open,setOpen] = useState(false)

    const onOpen = () => {
        props.history.push('/stores?operation=update')
        setOpen(true)
    }

    const close = () => {
        setOpen(false)
        props.history.push('/stores')
    }

    return(
        <>
            <li onClick={() => onOpen()} className={'store_result'}>
                {store.name}
                <br/>
                <span className={'store_address'}>{`${store.location}, ${store.zipCode}`}</span><br/>
                <span className={'store_code'}>{store.storeCode}</span>
            </li>
            <StoreForm open={open} close={close} store={store} operation={"Update"}/>
        </>
    )
}

export default withRouter(Store)