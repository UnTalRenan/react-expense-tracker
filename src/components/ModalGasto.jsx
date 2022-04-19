import React from 'react'
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import { useEffect } from 'react'
import { useState } from 'react'
import cerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'
import HttpService from '../helpers/httpClient';
import {ItemListGastos} from './ItemListGastos'
import {ItemListIngreso} from './ItemListIngreso'
const ModalGasto = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar
    ,setMensajeSuccess, idUser, tipoModal
    }) => {
  
   const [mensaje, setMensaje] = useState('');
   const [fechaCalendar, setFechaCalendar] = useState(new Date());

   const [gasto, setGasto] = useState({
    //id: 0,
    idUser: idUser,
    nombre: "",
    categoria: "",
    tipo: tipoModal,
    fecha: new Date(),
    valor: 0.0,
   }) ;    

    useEffect(() => {
        console.log(gastoEditar.nombre?"si hay":"no hay");

        if(Object.keys(gastoEditar).length>0){
            setGasto(gastoEditar)
            const da=new Date(gastoEditar.fecha);
            setFechaCalendar(da);
            
        }
    }, [])

    const ocultarModal =()=>{  
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
            setGastoEditar({});
        }, 500);
        
    }

    const handleSubmit =(e) =>{
        e.preventDefault();

        if([gasto.nombre, gasto.valor, gasto.fecha, gasto.categoria].includes(''))
        {
            setMensaje('All fields are required')
            
            setTimeout(() => {
                setMensaje("");
            }, 3000);
            return;
        }
        if(gasto.valor<=0)
        {
            setMensaje('All fields are required')
            
            setTimeout(() => {
                setMensaje("");
            }, 3000);
            return;
        }

        if(gasto.id){
            HttpService.updateExpense(gasto.id,gasto).then((result) => {
                guardarGasto(result);
                setMensajeSuccess('Updated Successfully')        
                setTimeout(() => {
                    setMensajeSuccess("");
                }, 2600);
            })
            .catch(err => {
                console.log("error al modificar "+err);
            })
            .finally(() => {
            })

        }else{           
            HttpService.saveExpense(gasto).then((result) => {
                guardarGasto(result);
                setMensajeSuccess('Saved Successfully')        
                setTimeout(() => {
                    setMensajeSuccess("");
                }, 2600);
            })
            .catch(err => {
                console.log("error al guardar "+err);
            })
            .finally(() => {
            })

        }         
    }
    const handleChange = (e,tipo) =>{
        if(tipo==='fecha'){
            console.log("eerr:");  
            //
            const data=new Date(e);
            setFechaCalendar(data);
            setGasto( {...gasto, fecha:data});  
        }else if(tipo==='number'){
            const value = Number(e.target.value);
            setGasto( {...gasto, [e.target.name]:value});
        }else{
            const value = e.target.value;
            setGasto( {...gasto, [e.target.name]:value});
        }
    }


  return (
    <div className='modal'>

        <div className='cerrar-modal'>
            <img src={cerrarBtn} 
            alt="Buton close modal"
            onClick={ocultarModal}/>
        </div>
        <form className={`formulario ${animarModal?"animar":"cerrar"}`}
            onSubmit={handleSubmit}>

             <legend >{gastoEditar.nombre ? `Edit ${tipoModal}` :`New ${tipoModal}`}</legend>
            
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <div className='campo'>
                <label htmlFor="nombre">Name {tipoModal}</label>
                <input
                name="nombre"
                type="text"
                maxLength="20"
                placeholder={`Type the name of ${tipoModal}`}
                value={gasto.nombre}
                onChange= {(e) => handleChange(e,'text')}
                />
            </div>
            <div className='campo'>
                <label htmlFor="valor">Amount</label>
                <input
                name="valor"
                type="number"
                maxLength="7"
                value={gasto.valor}
                onChange= {(e) => handleChange(e,'number')}
                />
            </div>
            <div className='campo'>
                <label htmlFor="fecha">Date</label>
                <DatePicker name="fecha" className='campofecha' dateFormat="dd/MMMM/yyyy" selected={ fechaCalendar }  onChange= {(e) => handleChange(e,'fecha')} />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Category</label>
                {
                    (tipoModal==="Expense")?(
                        <select name="categoria"
                            value={gasto.categoria} 
                            onChange= {(e) => handleChange(e)}>
                            <option value="">-- Select --</option>
                            {ItemListGastos.map(item=>(
                                <option key={item.key} value={item.key}>{item.value}</option>   
                            ))  
                            }
                             
                
                        </select>
                    ):(
                        <select name="categoria"
                            value={gasto.categoria} 
                            onChange= {(e) => handleChange(e)}>
                            <option value="">-- Select --</option>
                            {ItemListIngreso.map(item=>(
                                <option key={item.key} value={item.key}>{item.value}</option>   
                            ))  
                            }
                             
                    
                        </select>

                    )
                    
                    
                }
               
            </div>

            <input 
                type="submit" 
                value={gastoEditar.nombre?"Save Changes":`Add ${tipoModal}`}
                />

                

        </form>



    </div>
  )
}

export default ModalGasto