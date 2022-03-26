import React from 'react';
import { Container, Row, Col, Spinner, Toast } from 'react-bootstrap';
import {StylesTitulo, StyleContenPage, StylesTable, StylesTableTRCenter, StylesBorderDivisor, StylesBtnVerde, StylesContentSpinner, StylesTableTRRight, StylesContenTable, StyleNoData } from './Styles';

const Tabla = ({data}) => {
    return (
        <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
                <StylesTitulo MBottom={10} MTop={20}>Articulos</StylesTitulo>
                <StylesContenTable>
                    <StylesTable responsive={true}>
                        <thead>
                            <tr>
                                <th>Network</th>
                                <th>Cuenta</th>
                                <th>Reach</th>
                                <th>Impressions</th>
                                <th>Views</th>
                                <th>Publications</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data?.length > 0 ? data?.map(item => {
                                return(
                                    <tr key={item.id}>
                                        <td>{item.networkId}</td>
                                        <td>{item.name}</td>
                                        <StylesTableTRRight>{item.lote}</StylesTableTRRight>
                                    </tr>
                                )
                            }) :
                                <tr>
                                    <td colSpan='3'><StyleNoData>No hay datos disponibles.</StyleNoData></td>
                                </tr>
                            }
                        </tbody>
                    </StylesTable>
                </StylesContenTable>
            </Col>
        </Row>
    );
}
 
export default Tabla;