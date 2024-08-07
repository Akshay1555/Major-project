 import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// //import './navbar.css';
 import './Nav.css';




// export default Nav;
import logoGoshala from './logo-goshala-removebg.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleExample() {
       const auth = localStorage.getItem("user");
      const navigate = useNavigate();
    
       const handleLogout = () => {
         localStorage.clear();
          navigate('/');
       };
      
  return (
    <Navbar 
    collapseOnSelect expand="lg" 
    style={{width:"100%",height:"21vh",marginTop: 0,  fontSize:"1.5em",padding:0,backgroundColor:"orange",position:"static",
    }}>
      
      <Container>
      <img src={logoGoshala} className="logoGoshala"
      style={{height:60}}></img>  
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"style={{zIndex:"2",backgroundColor:"orange",}}>
          <Nav className="me-auto" style={{display:"flex",justifyContent:"space-between",}}>
            <Nav.Link className="me-auto1" href="/">Home</Nav.Link>
            <Nav.Link className="me-auto1" href="/About">About Us</Nav.Link>
            <Nav.Link className="me-auto1" href="/Goshalas">Goshalas</Nav.Link>
            
          </Nav>
          <Nav>
          {auth ? (
         <Nav.Link className="me-auto1" onClick={handleLogout}>Logout</Nav.Link> 
         ) : (
           <Nav.Link className="me-auto1" href="/Login">Login</Nav.Link>
         )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default CollapsibleExample;
