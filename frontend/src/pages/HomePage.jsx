import React from 'react';
import {Outlet} from "react-router-dom";
import NavBar from '../components/NavBar';


const HomePage = () => {
    return(
      <>
        <NavBar></NavBar>
        <Outlet></Outlet>
      </>
    )
}
    
export  default HomePage;