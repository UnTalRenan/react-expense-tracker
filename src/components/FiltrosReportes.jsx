import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FiltrosReportes = ({handleCambioFecha}) => {

  const [fechaCalendar1, setFechaCalendar1] = useState(new Date());
  const [fechaCalendar2, setFechaCalendar2] = useState(new Date());


  useEffect(() => {
    console.log("enviando");
    handleCambioFecha(fechaCalendar1,fechaCalendar2);
  }, [fechaCalendar1,fechaCalendar2])


  return (
      <>
        <form className='formulario'>
            
            <div className='contenedor-filtros-reporte  contenedor sombra dos-columnas'>
                
                <div className='campo'>
                        <label htmlFor="fecha">Start Date</label>
                        <DatePicker name="fecha" className='campofecha' dateFormat="dd/MMMM/yyyy" selected={ fechaCalendar1 }  onChange= {(e) => setFechaCalendar1(e)} />
                </div>
                <div className='campo'>
                        <label htmlFor="fecha">End Date</label>
                        <DatePicker name="fecha" className='campofecha' dateFormat="dd/MMMM/yyyy" selected={ fechaCalendar2 }  onChange= {(e) => setFechaCalendar2(e)} />
                </div>
                
            </div>        
       </form>  
      </>
    
  )
}

export default FiltrosReportes