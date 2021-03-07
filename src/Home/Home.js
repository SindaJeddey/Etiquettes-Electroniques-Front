import React from "react";

const Home = () => {

    const { storeCode } = JSON.parse(localStorage.getItem('store'));

    return(
        <>
            <h1>Home Page</h1>
            Below threshold in store products
            Current Promos
        </>
    )
}

export default Home;
