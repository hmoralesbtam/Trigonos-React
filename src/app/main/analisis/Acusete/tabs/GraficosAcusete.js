import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { CallApiData } from "../store/CallApiData";
// import ReactApexChart from "react-apexcharts";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

let arrayPrueba = [
  // "0:15",
  // "0:30",
  // "0:45",
  "1:00",
  // "1:15",
  // "1:30",
  // "1:45",
  "2:00",
  // "2:15",
  // "2:30",
  // "2:45",
  "3:00",
  // "3:15",
  // "3:30",
  // "3:45",
  "4:00",
  // "4:15",
  // "4:30",
  // "4:45",
  "5:00",
  // "5:15",
  // "5:30",
  // "5:45",
  "6:00",
  // "6:15",
  // "6:30",
  // "6:45",
  "7:00",
  // "7:15",
  // "7:30",
  // "7:45",
  "8:00",
  // "8:15",
  // "8:30",
  // "8:45",
  "9:00",
  // "9:15",
  // "9:30",
  // "9:45",
  "10:00",
  // "10:15",
  // "10:30",
  // "10:45",
  "11:00",
  // "11:15",
  // "11:30",
  // "11:45",
  "12:00",
  // "12:15",
  // "12:30",
  // "12:45",
  "13:0",
  // "13:15",
  // "13:30",
  // "13:45",
  "14:00",
  // "14:15",
  // "14:30",
  // "14:45",
  "15:00",
  // "15:15",
  // "15:30",
  // "15:45",
  "16:00",
  // "16:15",
  // "16:30",
  // "16:45",
  "17:00",
  // "17:15",
  // "17:30",
  // "17:45",
  "18:00",
  // "18:15",
  // "18:30",
  // "18:45",
  "19:00",
  // "19:15",
  // "19:30",
  // "19:45",
  "20:00",
  // "20:15",
  // "20:30",
  // "20:45",
  "21:00",
  // "21:15",
  // "21:30",
  // "21:45",
  "22:00",
  // "22:15",
  // "22:30",
  // "22:45",
  "23:00",
  // "23:15",
  // "23:30",
  // "23:45",
  "0:00",
];

let dataPrueba = [
  {
    id: 2108816,
  },
  {
    id: 2108815,
  },
  {
    id: 2108814,
  },
];
let series = [
  {
    name: "inverter 1",
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0.4, 4.3, 14.82, 33.72, 57.56, 88.45, 102.9, 147.7, 179.99, 187.91,
      160.27, 145.45, 191.18, 203.88, 193.56, 172.5, 214.25, 196.04, 201.85,
      211.2, 161.18, 135.56, 139.76, 179.13, 203.81, 212.63, 159.22, 222.13,
      225.49, 225.48, 225.15, 225.45, 226.14, 225.56, 22.58, 225.61, 225.55,
      225.61, 225.56, 225.63, 225.55, 225.52, 225.54, 25.49, 224.77, 220.67,
      214.54, 206.45, 193.87, 169.63, 141.2, 110.74, 72.61, 33.92, 12.24, 5.02,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  },
  {
    name: "inverter 2",
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0.4, 4.3, 14.82, 33.72, 57.56, 88.45, 102.9, 147.7, 179.99, 187.91,
      160.27, 145.45, 191.18, 203.88, 13.56, 172.5, 214.25, 196.04, 201.85,
      211.2, 161.18, 135.56, 139.76, 179.13, 203.81, 212.63, 159.22, 222.13,
      225.49, 225.48, 225.15, 225.45, 226.14, 225.56, 225.58, 225.61, 225.55,
      225.61, 225.56, 225.63, 225.55, 225.52, 225.54, 25.49, 224.77, 220.67,
      214.54, 206.45, 193.87, 169.63, 141.2, 110.74, 72.61, 33.92, 12.24, 5.02,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  },
];
function GraficosAcusete(props) {
  const [render, setRender] = useState(false);
  const [apiResponseData, setApiResponseData] = useState([]);
  let condicional = 0;
  let nameColumns = [];
  let dataDay = [];
  for (let x = 0; x < apiResponseData.length; x++) {
    let dataApiColumn = apiResponseData[x];
    if (condicional === 0) {
      for (var i in dataApiColumn) {
        if (i === "id" || i === "fecha") {
          continue;
        }
        nameColumns.push({
          name: i,
          data: [],
        });
      }
    }
    condicional = 1;
    let contador = 0;
    for (var i in dataApiColumn) {
      if (i === "id" || i === "fecha") {
        continue;
      }

      if (contador === 4) {
      }
      nameColumns[contador].data.push(dataApiColumn[i]);
      contador = contador + 1;
    }
  }

  for (let x = 0; x < nameColumns.length; x++) {
    let contador = 0;
    let suma = 0;
    let condicionalName = 0;
    let cuantasVeces = 0;
    for (var i in nameColumns[x].data) {
      if (i == 95) {
        suma = suma + nameColumns[x].data[i];
        dataDay[x].data.push(suma / 4);
        contador = 0;
        suma = 0;
        continue;
      }
      if (contador === 4) {
        if (condicionalName === 0) {
          dataDay.push({
            name: nameColumns[x].name,
            data: [],
          });
        }
        condicionalName = 1;
        if (x === 0) {
          dataDay[x].data.push((suma / 4).toFixed(2));
        } else {
          dataDay[x].data.push((suma / 4).toFixed(2));
        }

        contador = 0;
        suma = 0;
      }
      suma = suma + nameColumns[x].data[i];
      contador = contador + 1;
    }
  }
  // console.log(dataDay);
  series = dataDay;
  useEffect(() => {
    const fetchData = async (proyecto) => {
      let prueba;
      prueba = await CallApiData(proyecto);
      return prueba;
    };
    fetchData(props.nombreProyecto).then((value) => {
      setApiResponseData(value);
    });
  }, [props.nombreProyecto]);
  const options = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: arrayPrueba,
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FF1654",
        },
        labels: {
          style: {
            colors: "#FF1654",
          },
        },
        title: {
          text: "Series A",
          style: {
            color: "#FF1654",
          },
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#247BA0",
        },
        labels: {
          style: {
            colors: "#247BA0",
          },
        },
        title: {
          text: "Series B",
          style: {
            color: "#247BA0",
          },
        },
      },
    ],
    // dataLabels: {
    //   enabled: true,
    // },
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        height={800}
        type="line"
        width="1900"
      />
    </div>
  );
}
export default GraficosAcusete;
