
import { useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
export default function Estadisticas(props) {
    const theme = useTheme();
    const [state, setState] = useState({
        options: {
            labels: ['A', 'B', 'C', 'D', 'E']
        },
        series : [44, 55, 41, 17, 15]

    });
    const [options, setOptions] = useState({
          
        series: [67],
        options: {
          chart: {
            height: 350,
            type: 'radialBar',
            offsetY: -10
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                name: {
                  fontSize: '16px',
                  color: undefined,
                  offsetY: 120
                },
                value: {
                  offsetY: 76,
                  fontSize: '22px',
                  color: undefined,
                  formatter: function (val) {
                    return val + "%";
                  }
                }
              }
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91]
            },
          },
          stroke: {
            dashArray: 4
          },
          labels: ['Sin pagar'],
        },
      
      
      })
    const chartOptions = {
        chart: {
          animations: {
            speed: 400,
            animateGradually: {
              enabled: false,
            },
          },
          fontFamily: 'inherit',
          foreColor: 'inherit',
          height: '100%',
          type: 'donut',
          sparkline: {
            enabled: true,
          },
        },
        colors: ['#3182CE', '#63B3ED'],
        labels:['A', 'B', 'C', 'D', 'E'],
        plotOptions: {
          pie: {
            customScale: 0.9,
            expandOnClick: false,
            donut: {
              size: '70%',
            },
          },
        },
        stroke: {
          colors: [theme.palette.background.paper],
        },
        series:[44, 55, 41, 17, 15],
        states: {
          hover: {
            filter: {
              type: 'none',
            },
          },
          active: {
            filter: {
              type: 'none',
            },
          },
        },
        tooltip: {
          enabled: true,
          fillSeriesColor: false,
          theme: 'dark',
          custom: ({ seriesIndex, w }) =>
            `<div class="flex items-center h-32 min-h-32 max-h-23 px-12">
                <div class="w-12 h-12 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                <div class="ml-8 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                <div class="ml-8 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
            </div>`,
        },
      };


    return (
        <div className="donut">
            <Chart   options={options.options} series={options.series} type="radialBar" height={350} />
        </div>
    );
}