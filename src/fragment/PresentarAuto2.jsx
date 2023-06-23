import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from 'react-bootstrap';
import RegistrarAuto from "./RegistrarAuto";
import DataTable from "react-data-table-component";
import React, { useState } from 'react';
import { Autos } from "../hooks/Conexion";
import { borrarSesion, getToken } from "../utilidades/Sessionutil";
import { useNavigate } from "react-router";

export const Prueba2 = () => {
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llautos, setLlautos] = useState(false);

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
    ];

    if (!llautos) {
        Autos(getToken()).then((info) => {
            if (info.error == true && info.messaje == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                navegation("/sesion")
            } else {
                const filteredData = info.info.filter(auto => auto.stock === 0);
                setData(filteredData);
                console.log(filteredData);
            }
            setLlautos(true);
        })
    }

    return (

        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>AUTOS VENDIDOS</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <div>
                            <Button variant="primary" href={'/autos'} style={{ marginLeft: '5px', backgroundColor: 'blue', borderColor: 'blue' }}>
                                <span style={{ marginLeft: '5px', marginInlineStart: '10px' }}>Autos Disponibles</span>
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
            </div>
        </div>
    );
}

export default Prueba2;