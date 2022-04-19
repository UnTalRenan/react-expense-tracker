import React from 'react'
import {ItemListGastos} from './ItemListGastos'
import {ItemListIngreso} from './ItemListIngreso'
const Filtros = ({filtro, setFiltro,filtroMes,setFiltroMes, filtroIngre, setFiltroIngre}) => {
  return (
    <div className='filtros sombras'>
        <form >

            <div className='columnas-filtros contenedor'>
                <div className='campo'>
                    <label className='etiqueta'>Expenses</label>
                    <select 
                        value={filtro}
                        onChange={(e)=>setFiltro(e.target.value)}
                        >
                        <option value="">-- All --</option>
                        <option value="x">-- None --</option>
                        {ItemListGastos.map(item=>(
                                <option key={item.key} value={item.key}>{item.value}</option>   
                        ))  
                        }
                        
                  
                    </select>
                </div>
                <div className='campo'>
                    <label className='etiqueta'>Incomes</label>
                    <select 
                        value={filtroIngre}
                        onChange={(e)=>setFiltroIngre(e.target.value)}
                        >
                        <option value="">-- All --</option>
                        <option value="x">-- None --</option>
                        {ItemListIngreso.map(item=>(
                                <option key={item.key} value={item.key}>{item.value}</option>   
                        ))  
                        }   
                  
                    </select>
                </div>
                <div className='campo'>
                      <label className='etiqueta'>Month</label>
                      <select 
                          value={filtroMes}
                          onChange={(e)=>setFiltroMes(e.target.value)}
                          > 
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>      
                          <option value="August">August</option>      
                          <option value="October">October</option>      
                          <option value="November">November</option>      
                          <option value="December">December</option>      
                                          
                      </select>
                </div>
             </div>
        </form>

    </div>
  )
}

export default Filtros