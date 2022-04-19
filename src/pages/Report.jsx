import React, { useEffect, useState } from 'react'
import ContenidorReporte from '../components/ContenidorReporte'
import FiltrosReportes from '../components/FiltrosReportes'
import HttpService from '../helpers/httpClient';
import { ItemListGastos } from '../components/ItemListGastos';
import { ItemListIngreso } from '../components/ItemListIngreso';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
const Report = ({idUser}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [gastos, setGastos] = useState([])
  const [itemFinalIngresos, setItemFinalIngresos] = useState([]);
  const [itemFinalGastos, setItemFinalGastos] = useState([]);

  useEffect(() => {
    if(user)
    {
      const fetchData = async () =>  {
        try {
          cargarGastos();
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
    }

}, [user]);

  function cargarGastos()
  {
     HttpService.getExpense(user.email)
       .then(gastos => {

         setGastos(gastos)
         
       })
       .catch(error => {
         console.log("ERROR:"+error);
       }).finally(() => {
          
        

     })
       
  }
  //let itemFinalIngresos=[];
  //let itemFinalGastos=[];

  const handleCambioFecha = (fechaCalendar1, fechaCalendar2)=>{
  
    fechaCalendar1.setHours(0,0,0,0);
    fechaCalendar2.setHours(0,0,0,0);
    let gastosFiltrados=[{tipo:'x',fecha:new Date()}];
    let ingresosFiltrados=[];
    gastos.map((element)=>{
      let item=new Date(element.fecha+"T00:00:00");
      item.setHours(0,0,0,0);     
      if(item.getTime()>=fechaCalendar1.getTime()   &&   item.getTime()<= fechaCalendar2.getTime()) 
      {
        if(element.tipo==='Expense')
          gastosFiltrados.push(element);
        else
          ingresosFiltrados.push(element);
      }
    
    })
    
    
    //setItemFinalGastos([])
    const Gas=[];
    ItemListGastos.forEach(function(itemP, index) {
      const sumal = gastosFiltrados.reduce((sum, item) => (item.categoria==itemP.key?sum+item.valor:sum), 0 );
      Gas.push({etiqueta: itemP.value, total: sumal});
   
    });
    
    setItemFinalGastos(Gas);
    
    
    //setItemFinalIngresos([])
    const Ing=[];
    ItemListIngreso.forEach(function(itemP, index) {
      const sumal = ingresosFiltrados.reduce((sum, item) => (item.categoria==itemP.key?sum+item.valor:sum), 0 );
      Ing.push({etiqueta: itemP.value, total: sumal});
 
    });
    
    setItemFinalIngresos(Ing);

    

  }

  return (
    isAuthenticated?(
    <>
      <header>
            <h1 className='title'>Report</h1>
            <FiltrosReportes handleCambioFecha={handleCambioFecha}/>            
      </header>
      <main>
          <ContenidorReporte ingresos={itemFinalIngresos} gastos={itemFinalGastos}  />
      </main>
    </>
    ):(
      <Login/>
    )
  )
}

export default Report