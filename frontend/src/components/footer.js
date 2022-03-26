import React from 'react';

import { Container } from 'react-bootstrap';
import {StylesFooter, StylesTexto} from './Styles';

const FooterComponen = () => {
    return(
        <Container>
            <StylesFooter>
                <StylesTexto align='center'>Jhonathan Calvo © 2022</StylesTexto>
            </StylesFooter>
        </Container>
    )
}

export default FooterComponen;