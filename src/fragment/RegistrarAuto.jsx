import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Marca, ObtenerColores, GuardarAuto } from '../hooks/Conexion';
import Header from "./Header";
import Footer from './Footer';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';

function RegistrarAuto() {
  const { watch, setValue } = useForm();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [validated, setValidated] = useState(false);
  const navegation = useNavigate();
  const [marcas, setMarcas] = useState([]);
  const [llmarcas, setLlmarcas] = useState(false);

  //acciones
  // onsubmit
  const onSubmit = (data) => {

    var datos = {
      "modelo": data.modelo,
      "precio": data.precio,
      "anio": data.anio,
      "color": data.color,
      "placa": data.placa,
      "stock": data.stock,
      "nombre": data.marca,
    };

    GuardarAuto(datos, getToken()).then((info) => {
      if (info.error === true) {
        mensajes(info.message, 'error', 'Error');
        //msgError(info.message);            
      } else {
        mensajes(info.message);
        navegation('/autos');
      }
    }
    );
  };

  if (!llmarcas) {
    Marca(getToken()).then((info) => {
      if (info.error === true && info.message === 'Acceso denegado. Token ha expirado') {
        borrarSesion();
        mensajes(info.message);
        navegation("/sesion");
      } else {
        console.log(info.info);
        if (Array.isArray(info.info)) {
          setMarcas(info.info);
          setLlmarcas(true);
        } else if (typeof info.info === 'object') {
          // Si info.info es un objeto, lo convertimos a un array con un solo elemento
          setMarcas([info.info]);
          setLlmarcas(true);
        } else {
          console.error("La respuesta de Marca(getToken()) no es un array válido");
        }
      }
    });
  }


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
                    <input type="text" {...register('modelo', { required: true })} className="form-control form-control-user" placeholder="Ingrese el modelo" />
                    {errors.modelo && errors.modelo.type === 'required' && <div className='alert alert-danger'>Ingrese un modelo</div>}
                  </div>
                  {/** INGRESAR PRECIO */}
                  <div className="form-group">
                    <input type="number" className="form-control form-control-user" placeholder="Ingrese el precio" {...register('precio', { required: true })} />
                    {errors.precio && errors.precio.type === 'required' && <div className='alert alert-danger'>Ingrese el precio</div>}

                  </div>

                  {/** INGRESAR AÑO */}
                  <div className="form-group">
                    <input type="number" className="form-control form-control-user" placeholder="Ingrese el año" {...register('anio', { required: true, value: '2023' })} />
                    {errors.anio && errors.anio.type === 'required' && <div className='alert alert-danger'>Ingrese el año</div>}

                  </div>

                  {/** INGRESAR COLOR */}
                  <div className="form-group">
                    <input type="text" {...register('color', { required: true })} className="form-control form-control-user" placeholder="Ingrese el color" />
                    {errors.color && errors.color.type === 'required' && <div className='alert alert-danger'>Ingrese un color</div>}
                  </div>


                  {/** INGRESAR PLACA */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese la placa" {...register('placa', { required: true })} />
                    {errors.placa && errors.placa.type === 'required' && <div className='alert alert-danger'>Ingrese una placa</div>}
                  </div>



                  {/** INGRESAR STOCK */}
                  <div className="form-group">
                    <input type="number" className="form-control form-control-user" placeholder="Ingrese el nùmero de autos disponibles" {...register('stock', { required: true, value: '1' })} />
                    {errors.stock && errors.stock.type === 'required' && <div className='alert alert-danger'>Ingrese el numero de autos a registrar</div>}

                  </div>

                  {/* ESCOGER MARCA */}
                  <div className="form-group">
                    <select className='form-control' {...register('marca', { required: true })} value={watch('marca')} onChange={(e) => setValue('marca', e.target.value)}>
                      <option value="">Elija una marca</option>
                      {Array.isArray(marcas) && marcas.map((m, i) => (
                        <option key={i} value={m.external_id}>
                          {m.nombre}
                        </option>
                      ))}
                    </select>
                    {errors.marca && errors.marca.type === 'required' && <div className='alert alert-danger'>Seleccione una marca</div>}
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

                    {/** BOTÓN REGISTRAR */}
                    <input className="btn btn-success btn-rounded" type='submit' value='Registrar'></input>
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
export default RegistrarAuto;