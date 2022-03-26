import React, {useEffect, useState, useRef} from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import clienteAxios from '../../components/axios';
import FooterComponen from '../../components/footer';
import {StyleGeneral, StyleCajaBart} from '../../components/Styles';
import * as COLORES from '../../constans/Colores';

import Canvas from '../../components/canvas';
import Tabla from '../../components/tabla';

const HomePage = () => {
    const contentRef = useRef(null);

    const [windowHeight, setWindowHeight] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [metrics, setMetrics] = useState();
    const [redes, setRedes] = useState();
    const [cuentas, setCuentas] = useState();
    const [filter, setFilter] = useState("reach");

    let resizeWindow = () => {
        setWindowHeight(window.innerHeight);
        setContainerWidth(contentRef.current.clientWidth);
    };

    const consultarMetricas = async() => {
        try {
            const result = await clienteAxios.get('/metrics');
            setMetrics(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const consultarRedes = async() => {
        try {
            const result = await clienteAxios.get('/networks');
            setRedes(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const consultarCuentas = async ()  => {
        try {
            const result = await clienteAxios.get('/accounts');
            setCuentas(result.data);
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    useEffect(() => {
        consultarMetricas();
        consultarRedes();
        consultarCuentas();
    }, []);

    return ( 
        <StyleGeneral windowHeight={windowHeight - 60}>
            <Container>
                <Row>
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <select className="form-select" value={filter} onChange={ value => setFilter(value.target.value)}>
                            { metrics?.map( item => (
                                <option value={item.id} key={item.id}>{item.label}</option>
                            ))}
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} ref={contentRef}>
                        <StyleCajaBart>
                            <Canvas 
                                seriesName="Vinyl records"
                                padding={40}
                                gridScale={50}
                                gridColor={COLORES.TEXTO}
                                data={cuentas}
                                colors={["#a55ca5","#ff0000", "#bccd7a","#eb9743"]}
                                containerWidth={containerWidth - 54}
                                metrics={filter}
                            />
                        </StyleCajaBart>
                    </Col>
                </Row>
                <Tabla data={cuentas}/>
            </Container>
            <FooterComponen />
        </StyleGeneral>
     );
}
 
export default HomePage;