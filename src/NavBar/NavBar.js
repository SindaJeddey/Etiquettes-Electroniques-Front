import React, {useState} from "react";
import './NavBar.css';
import {Link, withRouter} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import CopyrightIcon from '@material-ui/icons/Copyright';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import * as options from "./index";

const Navbar = (props) => {
    const [sidebar, setSidebar] = useState(false)

    const toggleSidebar =() => setSidebar(!sidebar)

    const store = JSON.parse(localStorage.getItem('store'))
    const address = store ? `${store.name},  ${store.location},  ${store.zipCode}` : "";
    return(
        <>
            <div className={'navbar'}>
                <Link to={"#"} className={'menu-bars'}>
                    <MenuIcon onClick={toggleSidebar}/>
                </Link>
                {props.location.pathname.includes("/products") ?
                    <div className={"products_choice"}>
                        <div className={"products"} onClick={() => props.history.push("/products?products=all")}> All Products </div>
                        <div className={"products"} onClick={() => props.history.push("/products?products=inStore")}> In Store Products </div>
                    </div>
                    : null}
                <h6><LocationOnIcon/>{address}</h6>
            </div>
            <nav className={sidebar? 'nav-menu active': 'nav-menu'}>
                <ul className={'nav-menu-items'} onClick={toggleSidebar}>
                    <li className={"navbar-toggle"}>
                        <Link to={"#"} className={'menu-bars'}>
                            <CloseIcon onClick={toggleSidebar}/>
                        </Link>
                    </li>
                    {options.ADMIN.map((item,i) =>(
                        <li key={i} className={'nav-text'}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <footer>
                <h8><CopyrightIcon/> EE Copyrights All Reserved</h8>
            </footer>
        </>
    )
}

const mapStateToProps = (state) => ({
    authority: state.credentialsReducer.authority
})


export default withRouter(Navbar);