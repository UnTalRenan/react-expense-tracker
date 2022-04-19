import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({gastos
,handleNuevoGasto}) => {
    return (
        <header>
            <h1 className='title'>Expense Tracker</h1>

            <ControlPresupuesto gastos={gastos} handleNuevoGasto={handleNuevoGasto}/>
           
            
        </header>
      )
}

export default Header