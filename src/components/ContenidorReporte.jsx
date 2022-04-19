
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
//  import faker from 'faker';

const ContenidorReporte = ({ingresos, gastos}) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'data title',
          },
        },
      };
     
      
    const gastosEti = gastos.map((item)=>{
      return item.etiqueta;
    });
    const ingresosEti = ingresos.map((item)=>{
      return item.etiqueta;
    });
    const datos = gastos.map((item)=>{
      return item.total;
    });
    const datos2 = ingresos.map((item)=>{
      return item.total;
    });

    const data = {
        labels: gastosEti,
        datasets: [
        {
            label: 'Expenses',
            data: datos,// gastosEti.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
        ],
    };
    
    const data2 = {
      labels: ingresosEti,
      datasets: [
      {
          label: 'Incomes',
          data: datos2,//ingresosEti.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
      }
      ],
  };
  
 
  return (
    <>
    
    <Bar options={options} data={data} className='chart sombra' />         
    <Bar options={options} data={data2} className='chart sombra' />   
    </>
  )


}

export default ContenidorReporte