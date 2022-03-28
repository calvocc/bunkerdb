import React, {useEffect, useState, useRef} from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import clienteAxios from '../../components/axios';
import FooterComponen from '../../components/footer';
import {StyleGeneral, StyleCajaBart, StyleRowMtop, StylesTitulo, StylesBtnVerde} from '../../components/Styles';
import * as COLORES from '../../constans/Colores';

import Canvas from '../../components/canvas';
import Tabla from '../../components/tabla';
import ModalComponent from '../../components/modal';
import ModalDeleteComponent from '../../components/modalDelete';
import {sumarRedes} from '../../components/utils';

const HomePage = () => {
    const contentRef = useRef(null);

    const [windowHeight, setWindowHeight] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [metrics, setMetrics] = useState();
    const [redes, setRedes] = useState();
    const [cuentas, setCuentas] = useState();
    const [filter, setFilter] = useState("reach");
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [modalTipe, setModalTipe] = useState(null);
    const [itemSelect, setItemSelect] = useState(null);
    const [agrupar, setAgrupar] = useState(false);
    const [cuentasredes, setCuentasredes] = useState(null);

    let resizeWindow = () => {
        setWindowHeight(window.innerHeight);
        setContainerWidth(contentRef.current.clientWidth);
    };

    const consultarMetricas = async() => {
        try {
            const result = await clienteAxios.get('/metrics');
            setMetrics(result.data);
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    const consultarRedes = async() => {
        try {
            const result = await clienteAxios.get('/networks');
            setRedes(result.data);
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    const consultarCuentas = async ()  => {
        try {
            const result = await clienteAxios.get('/accounts');
            setCuentas(result.data);
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    const onSubmit = async ({name, reach, impressions, views, publications, networkId}) => {
        const params = {
            name,
            networkId,
            metrics: [
                {
                    id: "reach",
                    value: parseInt(reach)
                },
                {
                    id: "impressions",
                    value: parseInt(impressions)
                },
                {
                    id: "views",
                    value: parseInt(views)
                },
                {
                    id: "publications",
                    value: parseInt(publications)
                }
            ]
        }
        try {
            if( modalTipe === 2){
                const result = await clienteAxios.put(`/account/${itemSelect.id}`, params);
                if(result.status === 200){
                    toast.success('Creado con exito');
                    consultarCuentas();
                    setShow(false);
                    setItemSelect(null);
                    setModalTipe(null);
                }
                return
            }

            const result = await clienteAxios.post('/account', params);
            if(result.status === 200){
                toast.success('Creado con exito');
                consultarCuentas();
                setShow(false);
                setModalTipe(null);
            }
        } catch (error) {
            setItemSelect(null);
            setModalTipe(null);
            toast.error('Algo salio mal')
            console.log(error)
        }
    }

    const onSubmitDlete = async(data) => {
        try {
            const result = await clienteAxios.delete(`/account/${data.id}`);
            if(result.status === 200){
                toast.success('Eliminado con exito');
                consultarCuentas();
                setShowDelete(false);
                setItemSelect(null);
            }
        } catch (error) {
            setItemSelect(null);
            toast.error('Algo salio mal')
        }
    }

    const agruparRedes = (data) => {
        let array = [];
        redes.forEach(element => {
            let item = element;
            item['metrics'] = [
                {
                    id: "reach",
                    value: sumarRedes(data, element.id, "reach")
                },
                {
                    id: "impressions",
                    value: sumarRedes(data, element.id, "impressions")
                },
                {
                    id: "views",
                    value: sumarRedes(data, element.id, "views")
                },
                {
                    id: "publications",
                    value: sumarRedes(data, element.id, "publications")
                }
            ]
            array.push(item)
        });
        console.log('array agrupar --')
        console.log(array)
        console.log('-- array agrupar')
        setCuentasredes(array);
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

    useEffect( () => {
        if(redes && redes) agruparRedes(cuentas, redes);
    }, [cuentas, redes])

    console.log(cuentasredes)

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
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <Form.Group>
                            <Form.Check type="checkbox" checked={agrupar} label="Agrupar por redes"  onChange={ (val) => setAgrupar(val.target.checked)}/>
                        </Form.Group>
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
                                data={agrupar ? redes : cuentas}
                                colors={["#0089e4","#4fafff", "#97e9ff","#20f26f","#3df883"]}
                                containerWidth={containerWidth - 54}
                                metrics={filter}
                            />
                        </StyleCajaBart>
                    </Col>
                </Row>
                <StyleRowMtop>
                    <Col xs={12} sm={8} md={8} lg={8}>
                        <StylesTitulo MBottom={10} MTop={20}>Results by accounts</StylesTitulo>
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4} className="justify-content-end d-flex">
                        <StylesBtnVerde onClick={ () => setShow(true)}>Add accounts</StylesBtnVerde>
                    </Col>
                </StyleRowMtop>
                <Tabla 
                    data={cuentas} 
                    onEdit={(item) => {setShow(true); setModalTipe(2); setItemSelect(item)}} 
                    onDelete={(item) => {setShowDelete(true); setItemSelect(item)}}
                />
            </Container>

            <ModalComponent 
                isOpen={show}
                onClose={ () => setShow(false)}
                title={modalTipe === 2 ? "Edit acount" : "Add acount"}
                submit={(data) => onSubmit(data)}
                redes={redes}
                itemSelect={itemSelect}
            />

            <ModalDeleteComponent 
                isOpen={showDelete}
                onClose={ () => setShowDelete(false)}
                title="Delete acount"
                submit={(data) => onSubmitDlete(data)}
                itemSelect={itemSelect}
            />
            <FooterComponen />
        </StyleGeneral>
     );
}
 
export default HomePage;