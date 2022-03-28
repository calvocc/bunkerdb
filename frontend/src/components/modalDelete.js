import React from 'react';
import {Modal, Row, Col} from 'react-bootstrap';

import {StylesBtnVerde, StylesBtnSecundary, StylesTexto, StyleRowMtop} from "./Styles";

const ModalDeleteComponent = ({isOpen, onClose, title, submit, itemSelect}) => {

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <StylesTexto>Estas seguro de eliminar la cuenta {itemSelect?.name}</StylesTexto>
                    </Col>
                </Row>
                <StyleRowMtop>
                    <Col xs={12} sm={12} md={12} lg={12} className="justify-content-end d-flex">
                        <StylesBtnSecundary variant="secondary" onClick={onClose}>Cancel</StylesBtnSecundary>
                        <StylesBtnVerde onClick={()=> submit(itemSelect)}>Save</StylesBtnVerde>
                    </Col>
                </StyleRowMtop>
            </Modal.Body>
        </Modal>
    )
}

export default ModalDeleteComponent;