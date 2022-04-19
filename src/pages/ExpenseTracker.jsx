import { useState } from 'react'
import Header from '../components/Header'
import ModalGasto from '../components/ModalGasto';
import IconoNuevoGasto from '../img/nuevo-gasto.svg'
import {getLongMonthName} from '../helpers/index'
import ListadoGastos from '../components/ListadoGastos';
import { useEffect } from 'react';
import Filtros from '../components/Filtros';
import Mensaje from '../components/Mensaje';
import HttpService from '../helpers/httpClient';
import { LoginButton } from '../components/auth0/Login';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
function ExpenseTracker() {
  
  //let idUser="2";
  const { user, isAuthenticated, isLoading } = useAuth0();

  /*
  useEffect(() => {
    if(user)
     {
      //idUser=user.email;
      console.log("USUARIO"+"  "+user.email);
     }

  }, [user])*/
  
  

  const [modal, setModal] = useState(false);
  const [tipoModal, setTipoModal] = useState('');
  const [animarModal, setAnimarModal] = useState(false);


  const [gastos, setGastos] = useState([]);

  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('')
  const [filtroMes, setFiltroMes] = useState('')
  const [filtroIngre, setFiltroIngre] = useState('')
  
  const [gastosFiltradosMes, setGastosFiltradosMes] = useState([])

  const [mensajeSuccess,setMensajeSuccess] = useState('');
  useEffect(() => {
    if(user)
    {
      const fetchData = async () =>  {
        //setLoading(true);
        try {
          setFiltroMes(getLongMonthName(new Date()));
          cargarGastos();
        } catch (error) {
            console.log(error);
        }
        //setLoading(false);
    };

    fetchData();
    }


      
  }, [user]);

  useEffect(() => {
    if(Object.keys(gastoEditar).length>0){
      setTipoModal(gastoEditar.tipo)
      setModal(true);
      setTimeout(() => {
      setAnimarModal(true)
      }, 500);
      
    }

  }, [gastoEditar])
  
  useEffect(() => {

    if(filtroMes)
    {
      const gasFiltroMes=gastos.filter(gasto=>filtroMes==getLongMonthName(new Date(gasto.fecha)) ) ;
      //setGastosFiltradosMes(gasFiltroMes);

      let gastosFiltro=[];
      let gastosFiltroIng=[];
      if(filtroIngre){
        gastosFiltroIng=gasFiltroMes.filter(gasto=>gasto.categoria===filtroIngre);
      }else{
        gastosFiltroIng=gasFiltroMes.filter(gasto=>gasto.tipo==='Income');
      }
      console.log("filtro:"+filtro)
      if(filtro)
      {
          gastosFiltro=gasFiltroMes.filter(gasto=>gasto.categoria===filtro);
      }else {
        gastosFiltro=gasFiltroMes.filter(gasto=>gasto.tipo==='Expense');
      }
      console.log("filtroINg:"+filtroIngre)
     
      let gastosFiltroRes=[];
      gastosFiltro.forEach(function(item, index) {
        gastosFiltroRes.push(item);
      });
      
      gastosFiltroIng.forEach(function(item, index) {
        gastosFiltroRes.push(item);
      });
      setGastosFiltradosMes(gastosFiltroRes)

    }
    
  }, [filtro,filtroMes,filtroIngre])

  
  useEffect(() => {  
    if(gastos)
    {
      console.log("MEs:"+filtroMes);
        console.log("gastotal:"+gastos.length);
        const gastosIni=gastos.filter(gasto=>filtroMes==getLongMonthName(new Date(gasto.fecha)) ) ;
        setGastosFiltradosMes(gastosIni);   
    }
  }, [gastos])
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

  const handlesetFiltro=(value)=>{
    setFiltro(value);
    if(value.length>1)
        setFiltroIngre('x')
      
  }       
  const handlesetFiltroIngres=(value)=>{
   setFiltroIngre(value)
   if(value.length>1)
    setFiltro('x');
  }
  

  const handleNuevoGasto = (tipo)=>{
    
    setTipoModal(tipo)

    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
    setAnimarModal(true)
     
    }, 500);
    
  }

  const handleNuevoIngreso = ()=>{
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
    setAnimarModal(true)
     
    }, 500);
    
  }

  const guardarGasto = (gasto) =>{
    setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
            setGastoEditar({});
        }, 500);

        cargarGastos();
  }

  const eliminarGasto =(id)=>{
    
    HttpService.deleteExpense(id).then(() => {
      const nuevosGastos=gastos.filter(valor=>valor.id!==id);
      setGastos(nuevosGastos);
    })

    
  }


  return (
   
      isAuthenticated?(

        <div className={modal?'fijar':''}>
        
        <Header 
          gastos={gastosFiltradosMes}
          handleNuevoGasto={handleNuevoGasto}
          />

          <>
            <main>
              {mensajeSuccess && <Mensaje tipo="success">{mensajeSuccess}</Mensaje>}
              <Filtros
                filtro={filtro}
                setFiltro={handlesetFiltro}
                filtroMes={filtroMes}
                setFiltroMes={setFiltroMes}
                filtroIngre={filtroIngre}
                setFiltroIngre={handlesetFiltroIngres}
              />

              <ListadoGastos 
                gastosFiltradosMes={gastosFiltradosMes}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            </main>
      
          </>
        

        {modal && <ModalGasto 
          setModal={setModal} 
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          setMensajeSuccess={setMensajeSuccess}
          idUser={user.email}
          tipoModal={tipoModal}
          
          />}
      

      </div>

      ):(
          <Login/>
        )

   
    

    
  )
}

export default ExpenseTracker
