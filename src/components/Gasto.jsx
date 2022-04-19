import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import {formatearFecha, formatearCantidad} from '../helpers/index'

const dicccionarioIconos = {
    foods: 'data:image/png;base64,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',
    bills: 'https://img.icons8.com/external-itim2101-lineal-color-itim2101/100/000000/external-bills-financial-itim2101-lineal-color-itim2101.png',
    transportation: 'https://img.icons8.com/color/100/000000/taxi.png',
    shopping: 'https://img.icons8.com/fluency/100/000000/shopping-cart-with-money.png',
    health: 'https://img.icons8.com/color/100/000000/health-book.png',
    leisure: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/000000/external-leisure-lifestyles-flaticons-lineal-color-flat-icons-4.png',
    subscriptions: 'https://img.icons8.com/color/100/000000/netflix.png',
    miscellaneous: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/000000/external-tarp-home-improvement-flaticons-lineal-color-flat-icons.png',
      

    salary: 'https://img.icons8.com/external-nawicon-outline-color-nawicon/100/000000/external-salary-labour-day-nawicon-outline-color-nawicon.png', 
    awards: 'https://img.icons8.com/external-flatart-icons-flat-flatarticons/100/000000/external-award-strategy-flatart-icons-flat-flatarticons.png',
    grants: 'https://img.icons8.com/color/100/000000/community-grants.png',
    sale: 'https://img.icons8.com/external-becris-lineal-color-becris/100/000000/external-sales-business-consultant-becris-lineal-color-becris.png',
    rental: 'https://img.icons8.com/external-ddara-lineal-color-ddara/100/000000/external-rental-real-estate-ddara-lineal-color-ddara.png',
    lottery: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/000000/external-lottery-casino-flaticons-lineal-color-flat-icons-3.png',
    others: 'https://img.icons8.com/external-flaticons-flat-flat-icons/100/000000/external-income-lifestyles-flaticons-flat-flat-icons-2.png'         
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

 const {nombre , valor, categoria, id, idUser, fecha, tipo}=gasto;
//izquierda a derecha
 const leading=()=>(
    <LeadingActions>
        <SwipeAction onClick={()=>setGastoEditar(gasto)}>
            Edit
        </SwipeAction>
    </LeadingActions>
 )

 //izquierda a derecha
 const trailing=()=>(
    <TrailingActions>
        <SwipeAction onClick={()=>eliminarGasto(id)}
        destructive={true}>
            Delete
        </SwipeAction>
    </TrailingActions>
 )

  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leading()}
            trailingActions={trailing()}
            >
      
            <div className='gasto sombra'>
                <div className='contenido-gasto'>
                    <img 
                        src={dicccionarioIconos[categoria]} 
                        alt="Icono categoria" 
                    />
                    <div className='descripcion-gasto'>
                        <p className='categoria'>
                            {categoria}
                        </p>
                        <p className='nombre-gasto'>
                            {nombre}
                        </p>
                        <p className='fecha-gasto'> 
                            Added the: {''}
                            <span>{formatearFecha(new Date(fecha+"T00:00:00"))}</span>
                        </p>
                    </div>
                </div>
                <p className={`cantidad-gasto valor-${tipo}`}>
                    {formatearCantidad(Number(valor))}
                    </p>
            </div>

        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto