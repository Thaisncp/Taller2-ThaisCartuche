import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from 'react-bootstrap';
import RegistrarAuto from "./RegistrarAuto";
import DataTable from "react-data-table-component";
import React, { useState } from 'react';
import { Autos } from "../hooks/Conexion";
import { borrarSesion, getToken } from "../utilidades/Sessionutil";
import EditarAuto from "./EditarAuto";
import { useNavigate } from "react-router";

export const Prueba = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llautos, setLlautos] = useState(false);
    const [selectID, setSelectID] = useState(null);
    const handClose = () => setShooow(false);
    const handShow = () => setShooow(true);
    const [show2, setShooow] = useState(false);


    const handleEditarAuto = async (id) => {
        setSelectID(id);
        handShow();
    };

    const columns = [
        {
            name: 'Modelo',
            selector: row => row.modelo,
        },
        {
            name: 'Año',
            selector: row => row.anio,
        },
        {
            name: 'Color',
            selector: row => row.color,
        },
        {
            name: 'Placa',
            selector: row => row.placa,
        },
        {
            name: 'Precio',
            selector: row => '$ ' + row.precio,
        },
        {
            name: 'Marca',
            selector: row => row.marca.nombre,
        },
        {
            name: 'Pais',
            selector: row => row.marca.pais,
        },
        {
            name: 'Acciones',
            selector: row => (<>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="#" class="btn btn-outline-info btn-rounded" value={selectID} onClick={() => handleEditarAuto(row.externalId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </a>
                </div>

            </>),
        },

    ];

    if (!llautos) {
        Autos(getToken()).then((info) => {
            if (info.error == true && info.messaje == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                navegation("/sesion")
            } else {
                const filteredData = info.info.filter(auto => auto.stock != 0);
                setData(filteredData);
            }
            setLlautos(true);
        })
    }
    return (

        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">

                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Buscar auto" aria-label="Search" />

                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "blue" }}><h2><b>Autos Disponibles</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <div>
                            <Button variant="primary" onClick={handleShow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                                <span style={{ marginLeft: '5px' }}>Agregar Auto</span>
                            </Button>
                            <Button variant="primary" href={'/autosVendidos'} style={{ marginLeft: '5px', backgroundColor: 'green', borderColor: 'green' }}>
                                <span style={{ marginLeft: '5px', marginInlineStart: '10px' }}>Autos Vendidos</span>
                            </Button>
                            <Button variant="primary" href={'/inicio'} style={{ marginLeft: '5px', backgroundColor: 'red', borderColor: 'red' }}>
                                <span style={{ marginLeft: '5px', marginInlineStart: '10px' }}>INICIO</span>
                            </Button>
                        </div>


                    </div>
                </div>
                <div className="row">

                    <DataTable
                        columns={columns}
                        data={data}
                        selectableRows

                    />

                </div>

                {/* <!--- Model Box ---> */}
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar auto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegistrarAuto />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="model_box">
                    <Modal
                        show={show2}
                        onHide={handClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Editar auto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditarAuto nro={selectID} ></EditarAuto>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handClose}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Prueba;