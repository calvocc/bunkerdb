import React from 'react';

import {Navbar, Container} from "react-bootstrap";
import { StylesNavbar, StyleBrand } from './Styles';

const NavbarComponent = () => {
    return(
        <>
            <StylesNavbar expand="lg" sticky="top">
                <Container fluid>
                    <Navbar.Toggle/>
                    <StyleBrand>C</StyleBrand>
                </Container>
            </StylesNavbar>
        </>
    )
}

export default NavbarComponent;