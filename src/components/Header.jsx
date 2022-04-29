import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({gastos
,handleNuevoGasto}) => {
    return (
        <header>
            <h1 data-cy='header-home' className='title'>Expense Tracker</h1>

            <ControlPresupuesto gastos={gastos} handleNuevoGasto={handleNuevoGasto}/>
           
            
        </header>
      )
}

export default Header