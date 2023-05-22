import React from 'react';
// import {Outlet} from "react-router-dom";
// import NavBar from '../components/NavBar';


const HomePage = () => {
  const titleStyle = {
    fontSize: '32px', 
    color: 'black',
    textAlign: 'center',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh', 
  };

  return(
    <>
    
    <div style={containerStyle}>
      <h1 style={titleStyle}>Landing Page</h1>
    </div>
    
    </>
  )

}
    
export  default HomePage;