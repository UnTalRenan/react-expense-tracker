import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {formatearCantidad} from '../helpers/index'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import IconoNuevoGasto from '../img/nuevo-gasto.svg'
import IconoNuevoIngreso from '../img/nuevo-ingreso.svg'
import 'react-circular-progressbar/dist/styles.css';
const ControlPresupuesto = ({gastos, handleNuevoGasto}) => {

    const [balance, setBalance] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [ingresado, setIngresado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
      let totalGastado=0;
      let totalIngresos=0;
      gastos.forEach(function(item, index) {
          if(item.tipo==="Expense")
          {
            totalGastado=(totalGastado+Number(item.valor));
          }else{
            totalIngresos=(totalIngresos+Number(item.valor));
          }
          
      });
      const totalBalance = totalIngresos - totalGastado;

      let nuevoPorcentaje=0;
      totalGastado>0?nuevoPorcentaje=100:0;
      if(totalIngresos>0 && totalGastado>0 )
        nuevoPorcentaje= (( (totalIngresos-totalBalance)/totalIngresos )*100).toFixed(2);

      setGastado(totalGastado)
      setIngresado(totalIngresos)
      setBalance(totalBalance)
      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje);  
      }, 500);
      
    }, [gastos])  
    
    
    const handleOpen =(e,tipo) =>{
      e.preventDefault();
      handleNuevoGasto(tipo);

    }


  return (
    
      <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

          <div className='contenido-presupuesto container-laterales'>
              <div className='conainer-totales'>
                  <span>Incomes:</span> {formatearCantidad(ingresado)}
                  <div className='nuevo-ingreso'>
                    <img 
                      src={IconoNuevoIngreso} 
                      alt="Icono nuevo ingreso"
                      onClick={(e)=>handleOpen(e,'Income')}
                    />
                </div>
              </div>
            
              
          </div>
          <div className='container-progres'>
            <div>
              <CircularProgressbar
              styles={buildStyles({
                pathColor : '#3B82F6',
                trailColor : '#F5F5F5'
              })} 
              value={porcentaje} 
              text={`${porcentaje}% Spend`}/>
              </div>
              <div className='contenido-presupuesto container-laterales'>
                <div className='conainer-totales'>
                    <span>Balance:</span> {formatearCantidad(balance)}
                </div>
              </div>
          </div>
          <div className='contenido-presupuesto container-laterales'>
              <div className='conainer-totales'>
                  <span>Expense:</span> {formatearCantidad(gastado)}
                  <div className='nuevo-gasto'>
                      <img 
                        src={IconoNuevoGasto} 
                        alt="Icono nuevo gasto"
                        onClick={(e)=>handleOpen(e,'Expense')}
                      />
                  </div>
              </div>
          </div>
          
        
      </div>
    
  )
}

export default ControlPresupuesto