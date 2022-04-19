

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  fechaNueva.setHours(0,0,0,0);
  const opcioes = {
    year : 'numeric',
    month: 'long',
    day: '2-digit'
  }

  return fechaNueva.toLocaleDateString('es-Es',opcioes);
}


export const formatearCantidad = (cantidad)=>{
  return cantidad.toLocaleString('es-US',{ 
      style:'currency', 
      currency:'USD'
     })
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getLongMonthName =(date)=> {
    return monthNames[date.getMonth()];
}
