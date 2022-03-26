import React from 'react';

import {Navbar, Nav, Container} from "react-bootstrap";
import { StylesNavbar, StyleBrand, StyleNavLink } from './Styles';

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