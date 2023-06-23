import React, { useState, useEffect } from 'react';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ModificarAuto, ObtenerAuto, Marca } from '../hooks/Conexion';
import '../css/style.css';
import '../css/stylea.css';

function EditarAuto(nro) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [a, setA] = useState(null);
  const navegation = useNavigate();
  const [marcas, setMarcas] = useState([]);//para listar marcas
  const [llmarcas, setLlmarcas] = useState(false);//para listar marcas
  const onSubmit = (data) => {
    var datos = {
      "modelo": data.modelo,
      "precio": data.precio,
      "anio": data.anio,
      "color": data.color,
      "placa": data.placa,
      "stock": data.stock,
      "externalId": a.externalId,
    };

    ModificarAuto(getToken(), datos).then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, 'error', 'Error');
        console.log('Error: Edititando...')
      } else {
        mensajes(info.msg);
        console.log('Exito: Edititando')
      }
    });
  };
  if (!llmarcas) {
    Marca(getToken()).then((info) => {
      if (info.error === true && info.msg === 'Acceso denegado. Token ha expirado') {
        borrarSesion();
        mensajes(info.msg);
        navegation("/sesion");
      } else {
        if (Array.isArray(info.info)) {
          setMarcas(info.info);
          setLlmarcas(true);
        } else {
          console.error("No es un array válido");
        }
      }
    });
  }
  useEffect(() => {

    ObtenerAuto(nro.nro, getToken()).then((resultado) => {
      setA(resultado.info);
    }).catch((error) => {
      console.error("Error: Obtener datos a editar", error);
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="d-flex flex-column">
        <div className="content">
          <div className='container-fluid'>
            <div className="col-lg-10">
              <div className="p-5">

                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                  {/** INGRESAR MODELO */}
                  <div className="form-group">
                    <input type="text" {...register('modelo', { required: true })} className="form-control form-control-user" placeholder="Ingrese el modelo" defaultValue={a && a.modelo ? a.modelo : ''} />
                    {errors.modelo && errors.modelo.type === 'required' && <div className='alert alert-danger'>Ingrese un modelo</div>}
                  </div>
                  {/** INGRESAR PRECIO */}
                  <div className="form-group">
                    <input type="number" className="form-control form-control-user" placeholder="Ingrese el precio" {...register('precio', { required: true })} defaultValue={a && a.precio ? a.precio : ''} />
                    {errors.precio && errors.precio.type === 'required' && <div className='alert alert-danger'>Ingrese el precio</div>}

                  </div>

                  {/** INGRESAR AÑO */}
                  <div className="form-group">
                    <input type="number" className="form-control form-control-user" placeholder="Ingrese el año" {...register('anio', { required: true })} defaultValue={a && a.anio ? a.anio : ''} />
                    {errors.anio && errors.anio.type === 'required' && <div className='alert alert-danger'>Ingrese un anio</div>}
                  </div>

                  {/** INGRESAR COLOR */}
                  <div className="form-group">
                    <input type="text" {...register('color', { required: true })} className="form-control form-control-user" placeholder="Ingrese el color" defaultValue={a && a.color ? a.color : ''} />
                    {errors.color && errors.color.type === 'required' && <div className='alert alert-danger'>Ingrese un color</div>}
                  </div>
                  {/** INGRESAR PLACA */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese la placa" {...register('placa', { required: true })} defaultValue={a && a.placa ? a.placa : ''} />
                    {errors.placa && errors.placa.type === 'required' && <div className='alert alert-danger'>Ingrese una placa</div>}
                  </div>
                  {/** INGRESAR STOCK */}
                  <div className="form-group">
                    <input type="number" className="form-control form-control-user" placeholder="Ingrese el nùmero de autos disponibles" {...register('stock', { required: true })} defaultValue={a && a.stock ? a.stock : ''} />
                    {errors.stock && errors.stock.type === 'required' && <div className='alert alert-danger'>Ingrese el numero de autos a registrar</div>}

                  </div>

                  {/** BOTÓN CANCELAR */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="/autos" className="btn btn-danger btn-rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <span style={{ marginLeft: '5px' }}>Cancelar</span>
                    </a>

                    {/** BOTÓN EDITAR */}
                    <input className="btn btn-success btn-rounded" type='submit' value='Editar'></input>
                  </div>

                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditarAuto;