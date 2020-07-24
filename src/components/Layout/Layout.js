import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Background from "../Background/Background";
const Layout = (props) => {
    return(
        <Auxiliary>
            <Background/>
            <main>
                {props.children}
            </main>
        </Auxiliary>
    )
}

export default Layout;