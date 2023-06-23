import { useNavigate } from 'react-router';
import '../css/stylea.css';
import { Autos, Marca } from '../hooks/Conexion';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import Footer from './Footer';
import Header from "./Header";
import mensajes from '../utilidades/Mensajes';
import { useState } from 'react';

const Inicio = () => {
    const navegation = useNavigate();
    const [nro, setNro] = useState(0);
    const [nroA, setNroA] = useState(0);
    const [nroB, setNroB] = useState(0);
    Marca(getToken()).then((info) => {
        if (info.error == true && info.messaje == 'Acceso denegado. Token a expirado') {
            borrarSesion();
            mensajes(info.mensajes);
            navegation("/sesion")
        } else {
            setNro(info.info.length);
        }
    })
    //AUTOS VENDIDOS
    Autos(getToken()).then((info) => {
        if (info.error == true && info.messaje == 'Acceso denegado. Token a expirado') {
            borrarSesion();
            mensajes(info.mensajes);
            navegation("/sesion")
        } else {
            const filteredData = info.info.filter(auto => auto.stock === 0);
            setNroA(filteredData.length);
        }
    })
    //AUTOS DISPONIBLES
    Autos(getToken()).then((info) => {
        if (info.error == true && info.messaje == 'Acceso denegado. Token a expirado') {
            borrarSesion();
            mensajes(info.mensajes);
            navegation("/sesion")
        } else {
            const filteredData = info.info.filter(auto => auto.stock != 0);
            setNroB(filteredData.length);
        }
    })

    return (
        <div className="wrapper center-content">
            <div className="d-flex flex-column">
                <div className="content">
                    <Header />
                    {/**De aquí a abajo el cuerpo*/}
                    <div className="content-fluid">
                        <h1 className="h3 mb-0 text-gray-800">INFORMACION DE MARCAS Y AUTOS</h1>
                        <div className="row">
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Autos Vendidos
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    {nroA}
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    Numero de Marcas
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    {nro}
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-info shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                    Autos Disponibles
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    {nroB}
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={borrarSesion}>Borrar token</button>
            <Footer />
        </div>
    );
};

export default Inicio;


