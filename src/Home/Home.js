import React, {useEffect} from "react";
import axios from 'axios';

const Home = () => {

    const { storeCode } = JSON.parse(localStorage.getItem('store'));

    return(
        <>
            <h1>Home Page</h1>
        </>
    )
}

export default Home;