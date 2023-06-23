import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import {InicioSesion} from '../hooks/Conexion'
import swal from 'sweetalert';
import { saveToken } from '../utilidades/Sessionutil';
import { useNavigate } from 'react-router';
import mensajes from '../utilidades/Mensajes';
import '../css/style.css';



const Sesion = () => {
  const navegation = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm();

    const onSubmit = (data) => {
      var datos = {
        "usuario": data.usuario,
        "clave": data.clave
      };
      InicioSesion(datos).then((info) => {
        if(info.code !== 200){
          console.log(info.code)
          mensajes(info.msg, 'error', 'Error');       
        } else {
          saveToken(info.token);     
          console.log(info);   
          mensajes(info.message);
          navegation('/inicio'); 
        }      
      });
    }
 
    return (
        <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit = {handleSubmit(onSubmit)}> 
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Registrate con</p>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">O
            </p>
          </div>

          
          <div className="form-outline mb-4">
            <input type="email" id="form3Example3" className="form-control form-control-lg"
              placeholder="Ingrese usuario"  {...register('usuario', {required: true, pattern: /^\S+@\S+$/i})}/>
                {errors.usuario && errors.usuario.type === 'required' && <div className='alert alert-danger'>Ingrese el correo</div>}
                {errors.usuario && errors.usuario.type === 'pattern' && <div className='alert alert-danger'>Ingrese un correo valido</div>}
            <label className="form-label" for="form3Example3">Correo</label>
          </div>

          
          <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Ingrese clave" {...register('clave',{required:true})}/>
              {errors.clave && errors.clave.type === 'required' && <div className='alert alert-danger'>Ingrese una clave</div>}
            <label className="form-label" for="form3Example4">Clave</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="/inicio" className="text-body">Recuperar contraseña</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg"
              style={{paddingLeft: 2.5, paddingRight: 2.5}}>Iniciar sesion</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">¿No tienes cuenta? <a href="#!"
                className="link-danger">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    
    <div className="text-white mb-3 mb-md-0">
      Copyright ©. Thais Cartuche.
    </div>
    

    
    <div>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-google"></i>
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
    
  </div>
</section>
    );
}
 
export default Sesion;