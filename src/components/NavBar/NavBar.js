import React, {useState} from "react";
import './NavBar.css';
import {Link} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import CopyrightIcon from '@material-ui/icons/Copyright';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import * as options from "../index";

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false)

    const toggleSidebar =() => setSidebar(!sidebar)

    const store = JSON.parse(localStorage.getItem('store'))
    let address = "";
    if(store)
        address = `${store.name}, ${store.location}, ${store.zipCode}`
    return(
        <>
            <div className={'navbar'}>
                <Link to={"#"} className={'menu-bars'}>
                    <MenuIcon onClick={toggleSidebar}/>
                </Link>
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

export default Navbar;