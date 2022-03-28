import React from 'react';
import { Row, Col, ButtonGroup } from 'react-bootstrap';
import {StylesTable, StylesTableTRRight, StylesContenTable, StyleNoData, StylesBtnSecundary } from './Styles';

import {filtrarMetrics, sumarTotal} from './utils';

const Tabla = ({data, onEdit, onDelete}) => {

    return (
        <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data?.length > 0 ? 
                                <>
                                    {data?.map(item => {
                                        return(
                                            <tr key={item.id}>
                                                <td>{item.networkId}</td>
                                                <td>{item.name}</td>
                                                <StylesTableTRRight>{filtrarMetrics(item.metrics, 'reach').value}</StylesTableTRRight>
                                                <StylesTableTRRight>{filtrarMetrics(item.metrics, 'impressions').value}</StylesTableTRRight>
                                                <StylesTableTRRight>{filtrarMetrics(item.metrics, 'views').value}</StylesTableTRRight>
                                                <StylesTableTRRight>{filtrarMetrics(item.metrics, 'publications').value}</StylesTableTRRight>
                                                <td>
                                                <ButtonGroup >
                                                    <StylesBtnSecundary margiRight="0" onClick={()=> onEdit(item)}>Edit</StylesBtnSecundary>
                                                    <StylesBtnSecundary margiRight="0" onClick={()=> onDelete(item)}>Delete</StylesBtnSecundary>
                                                </ButtonGroup>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td colSpan={2}>Total: </td>
                                        <StylesTableTRRight>{sumarTotal(data, 'reach')}</StylesTableTRRight>
                                        <StylesTableTRRight>{sumarTotal(data, 'impressions')}</StylesTableTRRight>
                                        <StylesTableTRRight>{sumarTotal(data, 'views')}</StylesTableTRRight>
                                        <StylesTableTRRight>{sumarTotal(data, 'publications')}</StylesTableTRRight>
                                    </tr>
                                </>
                                :
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