import styled from 'styled-components';
import {Navbar, Button, Row, Table} from "react-bootstrap";

import * as COLORES from '../constans/Colores';

export const StyleGeneral = styled.div`
    background-color: ${COLORES.FONDO};
    min-height: ${props => props.windowHeight}px;
    padding-bottom: 30px;
    padding-top: 30px;
    position: relative;
`
export const StylesNavbar = styled(Navbar)`
    background: ${COLORES.AZUL}; 
    background: -moz-linear-gradient(left,  ${COLORES.AZUL} 36%,  ${COLORES.VERDE} 100%); 
    background: -webkit-linear-gradient(left,  ${COLORES.AZUL} 36%,  ${COLORES.VERDE} 100%);
    background: linear-gradient(to right,  ${COLORES.AZUL} 36%,  ${COLORES.VERDE} 100%);
    color: ${COLORES.TEXTO};
    border-color: transparent;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 0px;
    padding-bottom: 0px;
    min-height: 60px;
    @media screen and (max-width: 600px) {
        min-height: 60px;
        position: relative;
    }
    @media screen and (max-width: 450px) {
        min-height: 60px;
        position: relative;
        > .navbar-toggler{
            margin-top: 10px;
        }
    }
`

export const StyleBrand = styled(Navbar.Brand)`
    background-color: ${COLORES.BLANCO};
    width: 40px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    font-weight: 700;
    margin-left: 20px;
    margin-right: 0px;
    @media screen and (max-width: 600px) {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    @media screen and (max-width: 450px) {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`

export const StylesTitulo = styled.h1`
    color: ${COLORES.TITULOS};
    font-weight: bold;
    font-size: 16px;
    margin-bottom: ${props => props.MBottom ? props.MBottom : 0 }px;
    margin-top: ${props => props.MBottom ? props.MTop : 0 }px;
    
`

export const StylesTexto = styled.p`
    color: ${COLORES.TEXTO};
    font-size: 14px;
    margin-bottom: 0px;
    white-space: pre;
    text-align: ${props => props.align ? props.align : 'left'};
    width: ${props => props.align ? '100%' : 'auto'};
`

export const StylesContenTable = styled.div`
    height: ${props => props.windowHeight}px;
    overflow-y: auto;
    width: 100%;
    @media screen and (max-width: 600px) {
        height: auto;
    }
    @media screen and (max-width: 450px) {
        height: auto;
    }
`

export const StylesTable = styled(Table)`
    border-collapse: separate;
    border-spacing: 3px 3px;
    > thead > tr > th {
        border-width: 0;
        box-shadow: none;
        background-color: ${COLORES.BLANCO};
        color: ${COLORES.TITULOS};
        font-size: 14px;
        padding: 10px 15px;
    }
    > tbody > tr > td {
        color: ${COLORES.TEXTO};
        font-size: 14px;
        box-shadow: none;
        border: 0px;
        padding: 10px 15px;
    }
    > tbody > tr:nth-child(even) {
        background-color: ${COLORES.GRIS};
    }
    > tbody > tr:nth-child(odd) {
        background-color: ${COLORES.BLANCO};
    }
`
export const StylesTableTRCenter = styled.td`
    text-align: center;
`
export const StylesTableTRRight = styled.td`
    text-align: right;
`

export const StylesBtnVerde = styled(Button)`
    background-color: ${COLORES.VERDE};
    color: ${COLORES.BLANCO};
    border-color: ${COLORES.VERDE};
    font-weight: bold;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
    max-height: 40px;
    &:hover{
        background-color: ${COLORES.VERDEACTIVO};
        border-color: ${COLORES.VERDEACTIVO  };
    }
    @media screen and (max-width: 600px) {
        margin-top: 20px;
    }
    @media screen and (max-width: 450px) {
        margin-top: 20px;
    }
`

export const StylesBtnSecundary = styled(Button)`
    background-color: ${COLORES.BORDE};
    color: ${COLORES.NEGRO};
    border-color: ${COLORES.BORDE};
    font-weight: bold;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
    max-height: 40px;
    margin-right: ${props => props.margiRight ? props.margiRight : 20}px;
    &:hover{
        background-color: ${COLORES.GRIS};
        border-color: ${COLORES.GRIS  };
        color: ${COLORES.NEGRO};
    }
`

export const StylesFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 8px;
    padding-bottom: 8px;
`

export const StylesContentSpinner = styled.div`
    width: 100%;
    height: ${props => props.windowHeight}px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const StyleNoData = styled.div`
    background-color: ${COLORES.BLANCO};
    color: ${COLORES.TEXTO};
`

export const StyleCajaBart = styled.div`
    background-color: ${COLORES.BLANCO};
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 15px;
`

export const StyleRowMtop = styled(Row)`
    margin-top: 20px;
`