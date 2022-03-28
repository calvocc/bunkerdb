import React, { useEffect } from 'react';
import {Modal, Form, Row, Col} from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";

import {StylesBtnVerde, StylesBtnSecundary} from "./Styles";
import {filtrarMetrics} from './utils';
const ModalComponent = ({isOpen, onClose, title, submit, redes, itemSelect}) => {
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onBlur' });

    const onSubmit = (data) => {
        submit(data);
        reset({
            name: '',
            networkId: '',
            reach: '',
            impressions: '',
            views: '',
            publications: ''
        })
    }

    useEffect(() => {
        if (itemSelect) {
            reset({ 
                name: itemSelect.name, 
                networkId: itemSelect.networkId ,
                reach: filtrarMetrics(itemSelect.metrics, 'reach').value,
                impressions: filtrarMetrics(itemSelect.metrics, 'impressions').value,
                views: filtrarMetrics(itemSelect.metrics, 'views').value,
                publications: filtrarMetrics(itemSelect.metrics, 'publications').value
            });
        }
    }, [itemSelect]);

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Controller
                            control={control}
                            {...register("name", { required: true })}
                            render={({ field }) => <Form.Control {...field} />}
                        />
                        {errors.name &&
                            <Form.Text>El campo es obligatorio</Form.Text>
                        }
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Network</Form.Label>
                        <Controller
                            control={control}
                            {...register("networkId", { required: true })}
                            render={({ field }) => 
                                <Form.Select  {...field}>
                                    <option value="" >Selection...</option>
                                    { redes.map( item => (<option value={item.id} key={item.id}>{item.label}</option>))}
                                </Form.Select>}
                        />
                        {errors.networkId &&
                            <Form.Text>El campo es obligatorio</Form.Text>
                        }
                    </Form.Group>

                    <Row>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Reach</Form.Label>
                                <Controller
                                    control={control}
                                    {...register("reach", { required: true })}
                                    render={({ field }) => <Form.Control {...field}  type="number"/>}
                                />
                                {errors.reach &&
                                    <Form.Text>El campo es obligatorio</Form.Text>
                                }
                            </Form.Group>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Impressions</Form.Label>
                                <Controller
                                    control={control}
                                    {...register("impressions", { required: true })}
                                    render={({ field }) => <Form.Control {...field}  type="number"/>}
                                />
                                {errors.impressions &&
                                    <Form.Text>El campo es obligatorio</Form.Text>
                                }
                            </Form.Group>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Views</Form.Label>
                                <Controller
                                    control={control}
                                    {...register("views", { required: true })}
                                    render={({ field }) => <Form.Control {...field}  type="number"/>}
                                />
                                {errors.views &&
                                    <Form.Text>El campo es obligatorio</Form.Text>
                                }
                            </Form.Group>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Publications</Form.Label>
                                <Controller
                                    control={control}
                                    {...register("publications", { required: true })}
                                    render={({ field }) => <Form.Control {...field} type="number"/>}
                                />
                                {errors.publications &&
                                    <Form.Text>El campo es obligatorio</Form.Text>
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} className="justify-content-end d-flex">
                            <StylesBtnSecundary variant="secondary" onClick={onClose}>Cancel</StylesBtnSecundary>
                            <StylesBtnVerde type="submit">Save</StylesBtnVerde>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalComponent;