import React from 'react';
import './App.css';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Sesion from './fragment/Sesion';
import Inicio from './fragment/Inicio';
import PresentarAuto, { Prueba } from './fragment/PresentarAuto';
import PresentarAuto2, { Prueba2 } from './fragment/PresentarAuto2';
import EditarAuto from './fragment/EditarAuto';
import { estaSesion } from './utilidades/Sessionutil';

function App() {
  const Middeware = ({children}) =>{
    const autenticado = estaSesion();
    const location = useLocation();
    if(autenticado){
      return children;
    }else{
      return <Navigate to= '/sesion' state={location}/>;
    }
  }

  const MiddewareSesion = ({children}) =>{
    const autenticado = estaSesion();
    const location = useLocation();
    if(autenticado){
      return <Navigate to= '/inicio'/>;
      
    }else{
      return children;
    }
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/sesion' element={<MiddewareSesion><Sesion/></MiddewareSesion>}/>
        <Route path='/inicio' element={<Middeware><Inicio/></Middeware>}/>
        <Route path='/autos' element={<Prueba/>}/>
        <Route path='/autosVendidos' element={<Prueba2/>}/>
        <Route path='/autos/edicion' element={<EditarAuto/>}/>
      </Routes>
      </div>
  );
}
export default App;
