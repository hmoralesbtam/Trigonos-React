import { Chip, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import Chart from 'react-apexcharts';

function GraficoTorta(props){

    const { dataEstPago, dataEstRecept, dataEstFact} = props;
    
    const [estPagado, setEstPagado] = useState({
        options: {
           
            plotOptions: {
                pie: {
                  donut: {
                    size: '62%',
                   
                  },
                  
                  
                }

              },
              legend: {
                show: false, // Ocultar la leyenda
              },
            labels: [`Pagado `, `No pagado `, `Atrasado`],
            colors: ['#DFC6C5', '#CC3D3D', '#C47F70']
        },
        series : [dataEstPago.totalPagado,dataEstPago.totalNoPagado, dataEstPago.totalAtrasado],
       

    });
    const [estRecept, setRecept] = useState({
        options: {
            plotOptions: {
                pie: {
                  donut: {
                    size: '62%'
                  },
                 
                }
              },
              legend: {
                show: false, // Ocultar la leyenda
              },
            labels: [`Recepcionado `, `No Recepcionado `, `Rechazado `],
            colors: ['#DBCD6B', '#5C5B51', '#A89E52']
        },
        series : [dataEstRecept.totalRecepcionado,dataEstRecept.totalNoRecepcionado, dataEstRecept.totalRechazado],
       
    });
    const [estFact, setFact] = useState({
        options: {
            plotOptions: {
                pie: {
                  donut: {
                    size: '62%'
                  },
                 
                }
              },
              legend: {
                show: false, // Ocultar la leyenda
              },
            labels: [`Facturado `, `No Facturado `, `Atrasado`,`Pendiente`],
            colors: ['#3B91DB', '#3D4D5C', '#518F89','#2D6FA9']
        },
        series : [dataEstFact.totalFacturado,dataEstFact.totalNoFacturado, dataEstFact.totalFacturadoConAtraso,dataEstFact.totalPendiente],
       
    });



    return (
        <div className='flex flex-wrap '>
            <Paper className='flex flex-col  items-center shadow rounded-2xl m-[5px]'>
                <div className='p-[5px]'>
                <Chart  options={estRecept.options} series={estRecept.series} width={"60%"} type="donut" />
                </div>
                
                <div className="p-[5px]">
                {estRecept.series.map((dataset, i) => (
                    <div key={estRecept.options.labels[i]} className='flex flex-row'>
                        <Box
                        className="flex-0 w-10 h-10 rounded-full"
                        sx={{ backgroundColor: estRecept.options.colors[i] }}
                        />
                        <Typography className="ml-12 truncate">{estRecept.options.labels[i]}</Typography>
                        <Typography className="ml-12 text-right" color="text.secondary">
                        {dataset}
                        </Typography>
                    </div>
                ))}
                </div>
            </Paper>
            <Paper className='flex flex-col  items-center shadow rounded-2xl m-[5px]'>
                <div className='p-[5px]'>
                <Chart  options={estPagado.options} series={estPagado.series} width={"60%"} type="donut" />
                </div>
                <div className="p-[5px]">
                {estPagado.series.map((dataset, i) => (
                    <div  key={estPagado.options.labels[i]} className='flex flex-row'>
                        <Box
                        className="flex-0 w-10 h-10 rounded-full"
                        sx={{ backgroundColor: estPagado.options.colors[i] }}
                        />
                        <Typography className="ml-12 truncate">{estPagado.options.labels[i]}</Typography>
                        <Typography className="ml-12 text-right" color="text.secondary">
                        {dataset}
                    </Typography>
                    </div>
                ))}
                </div>
            </Paper>
            <Paper className='flex flex-col  items-center shadow rounded-2xl m-[5px]'>
                <div className='p-[5px]'>
                <Chart  options={estFact.options} series={estFact.series} width={"60%"} type="donut" />
                </div>
                
                <div className="p-[5px]">
                {estFact.series.map((dataset, i) => (
                    <div key={estFact.options.labels[i]} className='flex flex-row'>
                        <Box
                        className="flex-0 w-10 h-10 rounded-full"
                        sx={{ backgroundColor: estFact.options.colors[i] }}
                        />
                        <Typography className="ml-12 truncate">{estFact.options.labels[i]}</Typography>
                        <Typography className="ml-12 text-right" color="text.secondary">
                        {dataset}
                    </Typography>
                    </div>
                   
                ))}
                </div>
            </Paper>
        </div>
    );
}

export default GraficoTorta;