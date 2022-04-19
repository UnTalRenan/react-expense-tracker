import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastosFiltradosMes, setGastoEditar, eliminarGasto}) => {
  
  return (
    <div className='listado-gatos contenedor'>
        
        
        {
            <>
              <h2>{gastosFiltradosMes.length?"Expenses/Incomes": "There are no data"}</h2>
              {gastosFiltradosMes.map(gasto=>(
                <Gasto 
                  key={gasto.id} 
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto} />
              ))}
            </>
          
          
        }
      
    </div>
  )
}

export default ListadoGastos