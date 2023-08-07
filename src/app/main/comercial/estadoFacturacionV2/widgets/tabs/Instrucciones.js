import {
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Checkbox,
  FormLabel,
  Autocomplete,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  TextFieldTable,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  MenuItem,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { es } from "date-fns/locale";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TuneIcon from "@mui/icons-material/Tune";
import * as React from "react";
import * as XLSX from "xlsx";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

import _ from "lodash";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinearProgress from "@mui/material/LinearProgress";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import Table from "@mui/material/Table";
import LoadingButton from "@mui/lab/LoadingButton";
import { SiMicrosoftexcel, SiBitcoinsv } from "react-icons/si";

// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
import Estadisticas from "../Componentes/Estadisticas/Estadisticas";
import TableContainer from "@mui/material/TableContainer";

import EditIcon from "@mui/icons-material/Edit";

import { styled } from "@mui/material/styles";

import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import TablaInstrucciones from "../Componentes/TablaInstrucciones/TablaInstrucciones";
import {
  useGetConceptoQuery,
  useGetInstruccionesSpecQuery,
  useGetNombreAcreedorQuery,
  useGetRutAcreedorQuery,
  useGetNombreDeudorQuery,
  useGetRutDeudorQuery,
  useGetConceptomMutation,
  useGetRutDeudormMutation,
  useGetNombreDeudormMutation,
  useGetNombreAcreedormMutation,
  useGetRutAcreedormMutation,
  useGetCartaQuery,
  useGetCodRefQuery,
  useGetNumberConceptMutation,
  useGetNumberCodRefMutation,
  useGetNumberCartaMutation,
  useGetNumberRutAcreedorMutation,
  useGetNumberRutDeudorMutation,
  useGetNumberNombreAcreedorMutation,
  useGetNumberNombreDeudorMutation,
  useGetCartamMutation,
  useGetCodRefmMutation,
  useGetInstruccionesSpecmMutation,
  useGetNumFilterMutation,
  useGetFiltersCCCMutation,
  useGetAllInstructionsMutation,
} from "app/store/instrucciones/instruccionesApi";
import {
  useGetBusinessNameQuery,
  useGetRutQuery,
} from "app/store/participantesApi/participantesApi";
import ModalEdicionInstruccion from "../Componentes/Modals/ModalEdicionInstruccion";
import { useRefetchQueriesMetricsMutation } from "app/store/metricsApi/metricsApi";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const columns = [
  { id: "ceN_billing_status_type_name", label: "E.Emision" },
  { id: "trgnS_dte_reception_status_name", label: "E.Recepcion" },
  { id: "ceN_payment_status_type_name", label: "E.Pago" },
  { id: "fecha_emision", label: "Fecha emision" },
  { id: "fecha_pago", label: "Fecha pago" },
  { id: "fecha_carta", label: "Fecha carta" },
  { id: "ceN_dte_acceptance_status_name", label: "E.Aceptacion" },
  { id: "folio", label: "Folio" },
  { id: "carta", label: "Carta" },
  { id: "nombreAcreedor", label: "Nombre Acreedor" },
  { id: "rutAcreedor", label: "Rut Acreedor" },
  { id: "nombreDeudor", label: "Nombre Deudor" },
  { id: "rutDeudor", label: "Rut Deudor" },
  { id: "glosa", label: "Glosa" },
  // { id: "concepto", label: "Concepto" },
  { id: "montoNeto", label: "Monto Neto" },
  { id: "montoBruto", label: "Monto Bruto" },
  { id: "tipo_instruccion", label: "tipo_instruccion" },
  { id: "id_instruccions", label: "Instruccion" },
  { id: "editar", label: "editar" },
];

let condicion = 1;
let estados = [];
let tableData = [];
let columnsHidden = [
  "id_instruccions",
  "editar",
  // "trgnS_dte_reception_status_name",
  "ceN_dte_acceptance_status_name",
  "tipo_instruccion",
];
let columnsOrder = [
  "Monto Neto",
  "Monto Bruto",
  "Fecha emision",
  "Fecha pago",
  "Fecha carta",
  "Folio",
];

let orderByList = {
  orderByNeto: "",
  orderByBruto: "",
  orderByFechaEmision: "",
  orderByFechaPago: "",
  orderByFechaCarta: "",
  orderByFolio: "",
};

export default function Instrucciones(props) {
  const { id } = props;
  const [table, setTable] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    dataRow: {},
    dataBoleean: false,
    fechaEmision: undefined,
    fechaRecepcion: undefined,
  });

  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [tableData, setTableData] = useState([]);
  const [cargando, setCargando] = useState(true);
  //estados
  const [state, setState] = useState({
    estadoEmision: false,
    estadoPago: false,
    estadoRecepcion: false,
    estadoAceptacion: false,
    acreedor: false,
    deudor: false,
    buscar:0,
    limpiar:0,
  });
  const clearStates = () => {
    setState((prevState)=>{
      return {
      estadoEmision: false,
      estadoPago: false,
      estadoRecepcion: false,
      estadoAceptacion: false,
      acreedor: false,
      deudor: false,
      buscar:0,
      limpiar:prevState.limpiar+1}
    });
  };
  //filtros
  let condicionFilters = 0;
  let conditionPeriods = 0;
  const [disabledDateEnd, setDisabledDateEnd] = useState(false);
  const [bussN, setBusinessName] = useState();
  const [rutN, setRutName] = useState();
  const [conceptN, setConceptName] = useState([]);
  const [cart, setCart] = useState([]);
  const [codRef, setCodRef] = useState([]);
  const [limpiar, setLimpiar] = useState(false);

  const [reloadEstadistica, setReloadEstadistica] = useState(false);
  const [selected, setSelected] = useState({
    sBusinessName: "",
    sRut: "",
    sConcept: "",
    sMontoNeto: "",
    sMontoBruto: "",
    sFolio: "",
    sCarta: "",
    sCodRef: "",
    sInicioPeriodo: "",
    sTerminoPeriodo: "",
    buscar:0,
    limpiar:false,
  });
 
  const clearFilters = () => {
    setSelected(
      {
        sBusinessName: "",
        sRut: "",
        sConcept: "",
        sMontoNeto: "",
        sMontoBruto: "",
        sFolio: "",
        sCarta: "",
        sCodRef: "",
        sInicioPeriodo: "",
        sTerminoPeriodo: "",
        buscar: "",
      },
      
    );
   
  };
  const {
    sBusinessName,
    sRut,
    sConcept,
    sCodRef,
    sCarta,
    sMontoNeto,
    sMontoBruto,
    sFolio,
    sInicioPeriodo,
    sTerminoPeriodo,
    buscar,
  } = selected;
  //tabla
  const [page, setPage] = useState(0);

  const [alert, setAlert] = useState(false);

  const [modal, setModal] = useState(false);
  const [editar, setEditar] = useState(false);

  const [skipFetchs, setSkipFetchs] = useState({
    skipNombreAcre: false,
    skipRutAcre: false,
    skipNombreDeudor: false,
    skipRutDeudor: false,
    skipConcept: false,
    skipInstructions: false,
    skipCodRef: false,
    skipCarta: false,
  });

  const {
    estadoEmision,
    estadoPago,
    estadoRecepcion,
    estadoAceptacion,
    acreedor,
    deudor,
  } = state;

  //CONST QUE RECIBE DATA
  //--CONCEPTO CARTA CODREF
  const [conceptFilter, setConceptFilter] = useState([]);
  const [codRefFilter, setCodRefFilter] = useState([]);
  const [cartaFilter, setCartaFilter] = useState([]);
  const [dataInstruction, setDataInstruction] = useState([]);



  //MUTATIONS DATA


  const [getInstrucciones, { isLoading: isLoadingInst }] =
    useGetInstruccionesSpecmMutation();

  //--Mutation recargar peticiones
  const [reloadEstadisticas, { isLoading: isLoadingQueris }] =
    useRefetchQueriesMetricsMutation();

  //cargas individuales pasaran por el verificar carga hasta que no se me ocurra otra manera
  const [cargaConcept, setCargaConcept] = useState(true);
  const [cargaCodRef, setCargaCodRef] = useState(true);
  const [cargaCarta, setCargaCarta] = useState(true);

  const [cargaInstructions, setCargaInstructions] = useState(false);

  const [LoadingApis, setLoadingApis] = useState(true);

  //PRRUEBA
  const [filtersPrueba, setFiltersPrueba] = useState([]);
  const [getFiltersCCC, { isLoading: isLoadingFilterCCC }] =
    useGetFiltersCCCMutation();
  // obtener cantidad de instrucciones para iterar
  const [getNumFilter, { isLoading: isLoadinFilters }] =
    useGetNumFilterMutation();

  const [cargaFilters, setCargaFilters] = useState(false);
  // obtener las instrucciones por pagina hasta obener el total en conjunto con el getNumFilter, logica para filtrado
  const [getAllDataInst, { isLoading: isLoadingAllData }] =
    useGetAllInstructionsMutation();
  const [allDataInstrucc, setAllDataInstrucc] = useState([]);
  const [filtersInstruc, setFilterInstruct] = useState([]);

  function GetAllInstructions() {
    setCargaFilters(true);
    let specPrueba = {
      PageIndex: 1,
      PageSize: 500,
    };
    getNumFilter({
      id: id,
    })
      .then((response) => {
        const buclesF = Math.round(response.data / 500 + 0.49) + 1;
        const requests = Array.from({ length: buclesF - 1 }, (_, index) => {
          specPrueba.PageIndex = index + 1;
          return getAllDataInst({
            id: id,
            PageIndex: specPrueba.PageIndex,
            PageSize: specPrueba.PageSize,
          });
        });

        Promise.all(requests)
          .then((responses) => {
            const newData = responses
              .map((response) => response.data.data)
              .flat();
            // console.log(
            //   `TODAS LAS INSTRUCCIONES DEL PARTICIPANTE ${id}`,
            //   newData
            // );

            //SIRVE PARA FILTRAR RECUERDALOOO
            // console.log(
            //   filterArrayOfObjectsByProperties(newData, {
            //     // glosa: "SEN_[TEE_][Abr23][L][V01]",
            //     // carta: "DE02245",
            //     deudor: 521,
            //   })
            // );
            //GUARDAR LAS INSTRUCCIONES EN UN ESTADO
            setAllDataInstrucc(newData);
            //GUARDAR LOS FILTROS (COLUMNAS A FILTRAR CON UN DISTINCT) EN UN ESTADO
            setFilterInstruct(distincFilters(newData));
            const distincts = distincFilters(newData);
            // console.log(distincts);
            setConceptFilter(distincts.glosa);
            setCodRefFilter(distincts.codigoRef);
            setCartaFilter(distincts.carta);

            setCargaFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function distincFilters(ArrayObj) {
    const distinctValues = ArrayObj.reduce((acc, obj) => {
      for (let key in obj) {
        if (!acc[key]) {
          acc[key] = new Set();
        }
        acc[key].add(obj[key]);
      }
      return acc;
    }, {});
    const distinctValuesArray = {
      glosa: distinctValues.glosa? [...distinctValues.glosa]:[],
      codigoRef: distinctValues.codigoRef?[...distinctValues.codigoRef]:[],
      carta: distinctValues.carta?[...distinctValues.carta]:[],
      nombreAcreedor:distinctValues.nombreAcreedor? [...distinctValues.nombreAcreedor]:[],
      nombreDeudor: distinctValues.nombreDeudor?[...distinctValues.nombreDeudor]:[],
      rutAcreedor: distinctValues.rutAcreedor?[...distinctValues.rutAcreedor]:[],
      rutDeudor: distinctValues.rutDeudor?[...distinctValues.rutDeudor]:[],
    };
    return distinctValuesArray;
  }
  // function filterArrayOfObjectsByProperties(arr, propertyNames, searchString) {
  //   const filtered = arr.filter((obj) => {
  //     return propertyNames.every((key) => {
  //       const value = obj[key];
  //       if (typeof value === 'string') {
  //         const lowercaseValue = value.toLowerCase();
  //         return searchString.some((searchItem) => lowercaseValue.includes(searchItem.toLowerCase()));
  //       } else if (typeof value === 'number') {
  //         if (isFloat(value)) {
  //           return searchString.some((searchItem) => value.toString().toLowerCase().includes(searchItem.toLowerCase()));
  //         } else {
  //           return searchString.some((searchItem) => value.toString().toLowerCase().includes(searchItem.toLowerCase()));
  //         }
  //       }
  //       return false;
  //     });
  //   });
  //   return filtered;
  // }
  // function filterArrayOfObjectsByProperties(arr, objectToSearch) {
  //   const filtrarPorAtributos = (atributos) => {
  //     return arr.filter((objeto) => {
  //       return Object.entries(atributos).reduce(
  //         (resultado, [atributo, valor]) => {
  //           return resultado && objeto[atributo] === valor;
  //         },
  //         true
  //       );
  //     });
  //   };
  //   return filtrarPorAtributos(objectToSearch);
  // }
  function filterArrayOfObjectsByProperties(arr, objectToSearch) {
    const filtrarPorAtributos = (atributos) => {
      return arr.filter((objeto) => {
        return Object.entries(atributos).reduce(
          (resultado, [atributo, valor]) => {
            if (valor !== undefined) {
              // if (atributo === 'montoBrutoIgual') {
              //   return resultado && objeto[atributo] === valor.replace(/\./g, "_");
              // }
              // else if (atributo === 'montoNetoIgual') {
              //   return resultado && objeto[atributo] === valor;
              // }
              // else if(atributo === 'period' && atributo === 'periodEnd'){
              //   return resultado && objeto[atributo] === valor;
              // }
              
              // else {
                return resultado && objeto[atributo] === valor;
              // }
            }
            return resultado;
          },
          true
        );
      });
    };
    return filtrarPorAtributos(objectToSearch);
  }
  function setAllFilters(arr,objtosearch, isacreedor=undefined,isClear=true) {
    const distincts = distincFilters(filterArrayOfObjectsByProperties(arr,objtosearch));
    setConceptFilter(distincts.glosa?distincts.glosa:[]);
    setCodRefFilter(distincts.codigoRef?distincts.codigoRef:[]);
    setCartaFilter(distincts.carta?distincts.carta:[]);
    if(objtosearch.acreedor){
      setBusinessName(distincts.nombreDeudor?distincts.nombreDeudor:[]);
      setRutName(distincts.rutDeudor?distincts.rutDeudor:[]);
    }else if(objtosearch.deudor){
      setBusinessName(distincts.nombreAcreedor?distincts.nombreAcreedor:[]);
      setRutName(distincts.rutAcreedor?distincts.rutAcreedor:[]);
    }
  }
  useEffect(() => {
    if(allDataInstrucc.length > 0){
      setAllFilters(allDataInstrucc,{
        ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.deudor?  {deudor: id}:{acreedor: id}),
        ...(state.estadoAceptacion ? { ceN_dte_acceptance_status_name: "Aceptado" } : {}),
        ...(state.estadoRecepcion ? { trgnS_dte_reception_status_name: "Recepcionado" } : {}),
        ...(state.estadoEmision ? { ceN_billing_status_type_name: "Facturado" } : {}),
        ...(state.estadoPago ? { ceN_payment_status_type_name: "Pagado" } : {}),
        ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.acreedor ? selected.sRut != ""?  {rutDeudor: selected.sRut}:{}:selected.sRut != ""? {rutAcreedor: selected.sRut}:{}),
        ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.acreedor ? selected.sBusinessName != ""? {nombreDeudor: selected.sBusinessName}:{}:selected.sBusinessName != ""?{nombreAcreedor: selected.sBusinessName}:{}),
        ...(selected.sCarta != ""? {carta: selected.sCarta } : {}),
        ...(selected.sCodRef != ""? {codigoRef: selected.sCodRef } : {}),
        ...(selected.sConcept != ""? {glosa: selected.sConcept } : {}),
        ...(selected.sMontoNeto != ""? {montoNeto: parseInt(selected.sMontoNeto.replace(/\./g, "_")) } : {}), 
        ...(selected.sMontoBruto != ""? {montoBruto: parseInt(selected.sMontoBruto.replace(/\./g, "_")) } : {}), 
        ...(selected.sFolio != ""? {folio:parseInt(selected.sFolio) } : {}),
        ...(selected.sInicioPeriodo != ""? {period: formatedDataToSearch(selected.sInicioPeriodo) } : {}), 
        ...(selected.sTerminoPeriodo != ""? {periodEnd: formatedDataToSearch(selected.sTerminoPeriodo) } : {}), 
      },(state.acreedor?1:0)===0 && (state.deudor?1:0)===0 ?undefined:state.acreedor?1:0,true);
    }
  }, [allDataInstrucc]);

  function prueba() {
    let specPrueba = {
      PageIndex: 1,
      PageSize: 500,
    };
    getNumFilter({
      id: id,
      spec: {
        EstadoAceptacion: state.estadoAceptacion ? "Aceptado" : "",
        EstadoRecepcion: state.estadoRecepcion ? "Recepcionado" : "",
        Acreedor: state.acreedor ? id : "",
        Deudor: state.deudor ? id : "",
        EstadoEmision: state.estadoEmision ? "Facturado" : "",
        EstadoPago: state.estadoPago ? "Pagado" : "",
        RutDeudor: state.acreedor
          ? selected.sRut != ""
            ? selected.sRut.slice(0, 8)
            : ""
          : "",
        RutAcreedor: state.deudor
          ? selected.sRut != ""
            ? selected.sRut.slice(0, 8)
            : ""
          : "",
        Glosa: selected.sConcept != "" ? selected.sConcept : "",
        MontoNeto: selected.sMontoNeto != "" ? selected.sMontoNeto : "",
        MontoBruto: selected.sMontoBruto != "" ? selected.sMontoBruto : "",
        Folio: selected.sFolio != "" ? selected.sFolio : "",
        NombreDeudor: state.acreedor
          ? selected.sBusinessName != ""
            ? selected.sBusinessName
            : ""
          : "",
        NombreAcreedor: state.deudor
          ? selected.sBusinessName != ""
            ? selected.sBusinessName
            : ""
          : "",
        Carta: sCarta != "" ? sCarta : "",
        CodigoRef: sCodRef != "" ? sCodRef : "",
        FechaEmision: "",
        FechaRecepcion: "",
        FechaPago: "",
        FechaAceptacion: "",
        Concepto: "",
        InicioPeriodo:
          sInicioPeriodo != ""
            ? `20${sInicioPeriodo.getYear().toString().slice(1, 3)}/${
                sInicioPeriodo.getMonth() + 1
              }/01`
            : "",
        TerminoPeriodo:
          sTerminoPeriodo != ""
            ? `20${sTerminoPeriodo.getYear().toString().slice(1, 3)}/${
                sTerminoPeriodo.getMonth() + 1
              }/01`
            : "",
        OrderByNeto: "",
        OrderByBruto: "",
        OrderByFechaEmision: "",
        OrderByFechaPago: "",
        OrderByFechaCarta: "",
        OrderByFolio: "",
      },
      PageIndex: specPrueba.PageIndex,
      PageSize: specPrueba.PageSize,
    })
      .then((response) => {
        const buclesF = Math.round(response.data / 500 + 0.49) + 1;
        const requests = Array.from({ length: buclesF - 1 }, (_, index) => {
          specPrueba.PageIndex = index + 1;
          return getFiltersCCC({
            id: id,
            spec: {
              EstadoAceptacion: state.estadoAceptacion ? "Aceptado" : "",
              EstadoRecepcion: state.estadoRecepcion ? "Recepcionado" : "",
              Acreedor: state.acreedor ? id : "",
              Deudor: state.deudor ? id : "",
              EstadoEmision: state.estadoEmision ? "Facturado" : "",
              EstadoPago: state.estadoPago ? "Pagado" : "",
              RutDeudor: state.acreedor
                ? selected.sRut != ""
                  ? selected.sRut.slice(0, 8)
                  : ""
                : "",
              RutAcreedor: state.deudor
                ? selected.sRut != ""
                  ? selected.sRut.slice(0, 8)
                  : ""
                : "",
              Glosa: selected.sConcept != "" ? selected.sConcept : "",
              MontoNeto: selected.sMontoNeto != "" ? selected.sMontoNeto : "",
              MontoBruto:
                selected.sMontoBruto != "" ? selected.sMontoBruto : "",
              Folio: selected.sFolio != "" ? selected.sFolio : "",
              NombreDeudor: state.acreedor
                ? selected.sBusinessName != ""
                  ? selected.sBusinessName
                  : ""
                : "",
              NombreAcreedor: state.deudor
                ? selected.sBusinessName != ""
                  ? selected.sBusinessName
                  : ""
                : "",
              Carta: sCarta != "" ? sCarta : "",
              CodigoRef: sCodRef != "" ? sCodRef : "",
              FechaEmision: "",
              FechaRecepcion: "",
              FechaPago: "",
              FechaAceptacion: "",
              Concepto: "",
              InicioPeriodo:
                sInicioPeriodo != ""
                  ? `20${sInicioPeriodo.getYear().toString().slice(1, 3)}/${
                      sInicioPeriodo.getMonth() + 1
                    }/01`
                  : "",
              TerminoPeriodo:
                sTerminoPeriodo != ""
                  ? `20${sTerminoPeriodo.getYear().toString().slice(1, 3)}/${
                      sTerminoPeriodo.getMonth() + 1
                    }/01`
                  : "",
              OrderByNeto: "",
              OrderByBruto: "",
              OrderByFechaEmision: "",
              OrderByFechaPago: "",
              OrderByFechaCarta: "",
              OrderByFolio: "",
            },
            PageIndex: specPrueba.PageIndex,
            PageSize: specPrueba.PageSize,
          });
        });

        Promise.all(requests)
          .then((responses) => {
            const newData = responses
              .map((response) => response.data.data)
              .flat();
            setFiltersPrueba((prevLista) => {
              if (Array.isArray(prevLista)) {
                return [...prevLista, ...newData];
              } else {
                return [...newData];
              }
            });
            // console.log(
            //   "PRUEBAAA",
            //   Array.from(new Set(newData.map(JSON.stringify)), JSON.parse)
            // );
            // setCargaFiltersCCC(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function GetInstructions() {
    setLoadingApis(true);
    setCargaInstructions(true);
    setDataInstruction();
    getInstrucciones({
      id: id,
      PageIndex: pageIndex,
      PageSize: rowsPerPage,
      spec: {
        EstadoAceptacion: state.estadoAceptacion ? "Aceptado" : "",
        EstadoRecepcion: state.estadoRecepcion ? "Recepcionado" : "",
        Acreedor: state.acreedor ? id : "",
        Deudor: state.deudor ? id : "",
        EstadoEmision: state.estadoEmision ? "Facturado" : "",
        EstadoPago: state.estadoPago ? "Pagado" : "",
        RutDeudor: state.acreedor
          ? selected.sRut != ""
            ? selected.sRut.slice(0, 8)
            : ""
          : "",
        RutAcreedor: state.deudor
          ? selected.sRut != ""
            ? selected.sRut.slice(0, 8)
            : ""
          : "",
        Glosa: selected.sConcept != "" ? selected.sConcept : "",
        MontoNeto: selected.sMontoNeto != "" ? selected.sMontoNeto : "",
        MontoBruto: selected.sMontoBruto != "" ? selected.sMontoBruto : "",
        MontoNetoIgual: selected.sMontoNeto != "" ? selected.sMontoNeto : "",
        MontoBrutoIgual: selected.sMontoBruto != "" ? selected.sMontoBruto : "",
        Folio: selected.sFolio != "" ? selected.sFolio : "",
        NombreDeudor: state.acreedor
          ? selected.sBusinessName != ""
            ? selected.sBusinessName
            : ""
          : "",
        NombreAcreedor: state.deudor
          ? selected.sBusinessName != ""
            ? selected.sBusinessName
            : ""
          : "",
        Carta: sCarta != "" ? sCarta : "",
        CodigoRef: sCodRef != "" ? sCodRef : "",
        FechaEmision: "",
        FechaRecepcion: "",
        FechaPago: "",
        FechaAceptacion: "",
        Concepto: "",
        InicioPeriodo:
          sInicioPeriodo != ""
            ? `20${sInicioPeriodo.getYear().toString().slice(1, 3)}/${
                sInicioPeriodo.getMonth() + 1
              }/01`
            : "",
        TerminoPeriodo:
          sTerminoPeriodo != ""
            ? `20${sTerminoPeriodo.getYear().toString().slice(1, 3)}/${
                sTerminoPeriodo.getMonth() + 1
              }/01`
            : "",
        OrderByNeto: "",
        OrderByBruto: "",
        OrderByFechaEmision: "",
        OrderByFechaPago: "",
        OrderByFechaCarta: "",
        OrderByFolio: "",
      },
    })
      .then((response) => {
        console.log(response.data)
        setDataInstruction(response.data);
        setPagination(response.data.count);
        setPageCount(response.data.pageCount + 1);
        setCargaInstructions(false);
      })
      .catch((error) => {
        setCargaInstructions(false);
      });
  }
  //concept, carta, codref

  useEffect(() => {
    if (conceptFilter) {
      setCargaConcept(false);
    }
    if (codRefFilter) {
      setCargaCodRef(false);
    }
    if (cartaFilter) {
      setCargaCarta(false);
    }
  }, [conceptFilter, codRefFilter, cartaFilter]);

  function searchFilter() {
    setLoadingApis(true);
    setAllFilters(allDataInstrucc,{
      ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.deudor?  {deudor: id}:{acreedor: id}),
      ...(state.estadoAceptacion ? { ceN_dte_acceptance_status_name: "Aceptado" } : {}),
      ...(state.estadoRecepcion ? { trgnS_dte_reception_status_name: "Recepcionado" } : {}),
      ...(state.estadoEmision ? { ceN_billing_status_type_name: "Facturado" } : {}),
      ...(state.estadoPago ? { ceN_payment_status_type_name: "Pagado" } : {}),
      ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.acreedor ? selected.sRut != ""?  {rutDeudor: selected.sRut}:{}:selected.sRut != ""? {rutAcreedor: selected.sRut}:{}),
      ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.acreedor ? selected.sBusinessName != ""? {nombreDeudor: selected.sBusinessName}:{}:selected.sBusinessName != ""?{nombreAcreedor: selected.sBusinessName}:{}),
      ...(selected.sCarta != ""? {carta: selected.sCarta } : {}),
      ...(selected.sCodRef != ""? {codigoRef: selected.sCodRef } : {}),
      ...(selected.sConcept != ""? {glosa: selected.sConcept } : {}),
      ...(selected.sMontoNeto != ""? {montoNeto: parseInt(selected.sMontoNeto.replace(/\./g, "_")) } : {}), 
      ...(selected.sMontoBruto != ""? {montoBruto: parseInt(selected.sMontoBruto.replace(/\./g, "_")) } : {}), 
      ...(selected.sFolio != ""? {folio:parseInt(selected.sFolio) } : {}),
      ...(selected.sInicioPeriodo != ""? {period: formatedDataToSearch(selected.sInicioPeriodo) } : {}), 
      ...(selected.sTerminoPeriodo != ""? {periodEnd: formatedDataToSearch(selected.sTerminoPeriodo) } : {}), 
    },(state.acreedor?1:0)===0 && (state.deudor?1:0)===0 ?undefined:state.acreedor?1:0,true);
    setPageIndex(1);
    setPagination(0);
    setPageCount(0);
    setRowsPerPage(5);
    GetInstructions();
  }
  useEffect(() => {
    function verificacarga() {
      if (
        [
          cargaInstructions,
          cargaFilters,
          // cargaConcept,
          // cargaCodRef,
          // cargaCarta,
          // cargaNombreAcre,
          // cargaNombreDeu,
          // cargaRutAcre,
          // cargaRutDeudor,
        ].every((valor) => valor === false)
      ) {
        return false;
      } else {
        return true;
      }
    }

    if (verificacarga() === false) {
      if (
        !cargaInstructions &&
        !cargaFilters
        // !cargaConcept &&
        // !cargaCodRef &&
        // !cargaCarta &&
        // !cargaNombreAcre &&
        // !cargaNombreDeu &&
        // !cargaRutAcre &&
        // !cargaRutDeudor
      ) {
        setLoadingApis(false);
      }
    }
  }, [
    cargaInstructions,
    cargaFilters,
    // cargaConcept,
    // cargaCodRef,
    // cargaCarta,
    // cargaNombreAcre,
    // cargaNombreDeu,
    // cargaRutAcre,
    // cargaRutDeudor,
  ]);

  const isOptionEqualToValue = (option, value) => {
    return option.value === value;
  };

  useEffect(() => {
    setPageIndex(1);
    setPagination(0);
    setPageCount(0);
    setRowsPerPage(5);
    // clearFilters();
    clearStates();
    GetInstructions();
    GetAllInstructions();
  }, [id]);
  useEffect(() => {
    if (selected.buscar > 0|| selected.limpiar >0) {
      setAllFilters(allDataInstrucc,{
        ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.deudor?  {deudor: id}:{acreedor: id}),
        ...(state.estadoAceptacion ? { ceN_dte_acceptance_status_name: "Aceptado" } : {}),
        ...(state.estadoRecepcion ? { trgnS_dte_reception_status_name: "Recepcionado" } : {}),
        ...(state.estadoEmision ? { ceN_billing_status_type_name: "Facturado" } : {}),
        ...(state.estadoPago ? { ceN_payment_status_type_name: "Pagado" } : {}),
        ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.acreedor ? selected.sRut != ""?  {rutDeudor: selected.sRut}:{}:selected.sRut != ""? {rutAcreedor: selected.sRut}:{}),
        ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.acreedor ? selected.sBusinessName != ""? {nombreDeudor: selected.sBusinessName}:{}:selected.sBusinessName != ""?{nombreAcreedor: selected.sBusinessName}:{}),
        ...(selected.sCarta != ""? {carta: selected.sCarta } : {}),
        ...(selected.sCodRef != ""? {codigoRef: selected.sCodRef } : {}),
        ...(selected.sConcept != ""? {glosa: selected.sConcept } : {}),
        ...(selected.sMontoNeto != ""? {montoNeto: parseInt(selected.sMontoNeto.replace(/\./g, "_")) } : {}), 
        ...(selected.sMontoBruto != ""? {montoBruto: parseInt(selected.sMontoBruto.replace(/\./g, "_")) } : {}), 
        ...(selected.sFolio != ""? {folio:parseInt(selected.sFolio) } : {}),
        ...(selected.sInicioPeriodo != ""? {period: formatedDataToSearch(selected.sInicioPeriodo) } : {}), 
        ...(selected.sTerminoPeriodo != ""? {periodEnd: formatedDataToSearch(selected.sTerminoPeriodo) } : {}), 
      },(state.acreedor?1:0)===0 && (state.deudor?1:0)===0 ?undefined:state.acreedor?1:0,true);
      setPageIndex(1);
      setPagination(0);
      setPageCount(0);
      setRowsPerPage(5);
      GetInstructions();
    }

  }, [selected.buscar, selected.limpiar]);
  
  useEffect(() => {
    if (!table) {
      setPageIndex(1);
      setPagination(0);
      setPageCount(0);
      setRowsPerPage(5);
      GetInstructions();
      reloadEstadisticas();
      setReloadEstadistica(!reloadEstadistica);
    }
  }, [table]);

  useEffect(() => {
   
    if(!selected.buscar){
      setLoadingApis(true);
      console.log(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.acreedor ? selected.sRut != ""?  {rutDeudor: selected.sRut}:{}:selected.sRut != ""? {rutAcreedor: selected.sRut}:{})
      setAllFilters(allDataInstrucc,{
        ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.deudor?  {deudor: id}:{acreedor: id}),
        ...(state.estadoAceptacion ? { ceN_dte_acceptance_status_name: "Aceptado" } : {}),
        ...(state.estadoRecepcion ? { trgnS_dte_reception_status_name: "Recepcionado" } : {}),
        ...(state.estadoEmision ? { ceN_billing_status_type_name: "Facturado" } : {}),
        ...(state.estadoPago ? { ceN_payment_status_type_name: "Pagado" } : {}),
        ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.acreedor ? selected.sRut != ""?  {rutDeudor: selected.sRut}:{}:selected.sRut != ""? {rutAcreedor: selected.sRut}:{}),
        ...(((state.acreedor?1:0)===0 && (state.deudor?1:0)===0 )? {}:state.acreedor ? selected.sBusinessName != ""? {nombreDeudor: selected.sBusinessName}:{}:selected.sBusinessName != ""?{nombreAcreedor: selected.sBusinessName}:{}),
        ...(selected.sCarta != ""? {carta: selected.sCarta } : {}),
        ...(selected.sCodRef != ""? {codigoRef: selected.sCodRef } : {}),
        ...(selected.sConcept != ""? {glosa: selected.sConcept } : {}),
        ...(selected.sMontoNeto != ""? {montoNeto: parseInt(selected.sMontoNeto.replace(/\./g, "_")) } : {}), 
        ...(selected.sMontoBruto != ""? {montoBruto: parseInt(selected.sMontoBruto.replace(/\./g, "_")) } : {}), 
        ...(selected.sFolio != ""? {folio:parseInt(selected.sFolio) } : {}),
        ...(selected.sInicioPeriodo != ""? {period: formatedDataToSearch(selected.sInicioPeriodo) } : {}), 
        ...(selected.sTerminoPeriodo != ""? {periodEnd: formatedDataToSearch(selected.sTerminoPeriodo) } : {}), 
      },(state.acreedor?1:0)===0 && (state.deudor?1:0)===0 ?undefined:state.acreedor?1:0,true);
      GetInstructions();
    }
      
  }, [state]);
  useEffect(() => {
    if(selected.sInicioPeriodo){
      console.log(formatedDataToSearch(sInicioPeriodo))
    }
    if(selected.sTerminoPeriodo){
      console.log(formatedDataToSearch(sTerminoPeriodo))
    }
    if(selected.sMontoNeto){
      console.log(selected.sMontoNeto)
    }
  
  }, [selected])
  
  function formatedDataToSearch(date){
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0"); 
    const anio = date.getFullYear().toString();
    const horas = date.getHours().toString();
    const minutos = date.getMinutes().toString().padStart(2, "0");
    const segundos = date.getSeconds().toString().padStart(2, "0");
    const fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    return fechaFormateada
  }
  const handleChange = (event) => {
    if (event.target.name === "acreedor" && event.target.checked === true) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        deudor: false,
      });
    } else if (
      event.target.name === "deudor" &&
      event.target.checked === true
    ) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        acreedor: false,
      });
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const clearAllFilters = () => {
    if (condicionFilters === 0) {
      // clearFilters();
      // GetInstructions();
      // FiltersOne();
    } else {
      // clearFilters();
      // GetInstructions();
      clearStates();
      // FiltersOne();
    }
  };
  const conditionFilters = (e) => {
    if (e.target.name === "estados" && e.target.checked === true) {
      condicionFilters = 1;
    }
    if (e.target.name === "estados" && e.target.checked === false) {
      condicionFilters = 0;
    }
  };
  const chile = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  });

  const handleChangePage = () => {
    setLoadingApis(true);

    setPageIndex(pageIndex === pageCount ? pageIndex : pageIndex + 1);
    if (pageIndex === pageCount) {
      setLoadingApis(false);
    }
  

    GetInstructions();
  };
  const handleOpen = (row) => {
    const coincide = props.participants.some((item) => {
      return item.business_Name === row.nombreAcreedor;
    });
    let billingDate = new Date(row.fecha_emision);
    let receptionDate = new Date(row.fecha_recepcion);
    let emisione = `20${billingDate.getYear().toString().slice(1, 3)}/${
      billingDate.getMonth() + 1
    }/${billingDate.getDate()}`;
    let recepcione = `20${receptionDate.getYear().toString().slice(1, 3)}/${
      receptionDate.getMonth() + 1
    }/${receptionDate.getDate()}`;
    emisione === "2017/1/1" ? (emisione = false) : (emisione = true);
    recepcione === "2017/1/1" ? (recepcione = false) : (recepcione = true);
    setDataEdit({
      dataBoleean: coincide,
      dataRow: row,
      fechaEmision: emisione,
      fechaRecepcion: recepcione,
    });
    setTable(true);
  };

  const handleChangePagedos = () => {
    setLoadingApis(true);

    setPageIndex(pageIndex > 1 ? pageIndex - 1 : 1);
    if (pageIndex === 1) {
      setLoadingApis(false);
    }

    GetInstructions();
  };
  const handleChangeRowsCount = (option) => {
    if (rowsPerPage != option) {
      setLoadingApis(true);
      setRowsPerPage(option);
      setPageIndex(1);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setPageIndex(1);
  };
  const showModal = (data) => {
    if (modal === true) {
      setModal(false);
      return;
    }

    dataInstruction = data;
    setModal(true);
  };
  const getOpenModal = (openModal) => {
    tokenOpenModal = openModal;
  };

  const exportToExcel = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "instrucciones.xlsx");
  };

  function random(dateString) {
    var thedate = new Date(dateString);
    var prueba = `${
      thedate.getDate() <= 9 ? "0".concat(thedate.getDate()) : thedate.getDate()
    }/${
      thedate.getMonth() < 9
        ? "0".concat(thedate.getMonth() + 1)
        : thedate.getMonth() + 1
    }/20${thedate.getYear().toString().slice(1, 3)}`;
    return prueba;
  }
  
  function returnInstructionState(id) {
    let estado = "vacio";
    if (id === 0) {
      estado = "Abierta";
    } else if (id === 1) {
      estado = "Editable";
    } else if (id === 2) {
      estado = "Cerrada";
    }
    return estado;
  }
  function formatDateToBD(strDate) {
   // Separamos el string de fecha en sus componentes (año, mes y día)
   const [year, month, day] = strDate.split('/');

   // Creamos un objeto Date con los componentes de la fecha
   const dateObj = new Date(year, month - 1, day); // Restamos 1 al mes ya que en JavaScript los meses comienzan en 0
 
   // Obtenemos el formato deseado "2017-01-01T00:00:00" utilizando toISOString
   const formattedDate = `${dateObj.toISOString().substring(0,11)}00:00:00`;
 
   return formattedDate;
  }
  
  const clearOrderBy = () => {
    orderByList.orderByFolio = "";
    orderByList.orderByFechaCarta = "";
    orderByList.orderByFechaPago = "";
    orderByList.orderByFechaEmision = "";
    orderByList.orderByNeto = "";
    orderByList.orderByBruto = "";
  };
  const orderBy = (column) => {
    if (column === "Monto Neto") {
      orderByList.orderByBruto = "";
      orderByList.orderByFechaEmision = "";
      orderByList.orderByFechaPago = "";
      orderByList.orderByFechaCarta = "";
      orderByList.orderByFolio = "";
      if (orderByList.orderByNeto === "") {
        orderByList.orderByNeto = "desc";
      } else if (orderByList.orderByNeto === "desc") {
        orderByList.orderByNeto = "asc";
      } else if (orderByList.orderByNeto === "asc") {
        orderByList.orderByNeto = "desc";
      }
    } else if (column === "Monto Bruto") {
      orderByList.orderByNeto = "";
      orderByList.orderByFechaEmision = "";
      orderByList.orderByFechaPago = "";
      orderByList.orderByFechaCarta = "";
      orderByList.orderByFolio = "";
      if (orderByList.orderByBruto === "") {
        orderByList.orderByBruto = "desc";
      } else if (orderByList.orderByBruto === "desc") {
        orderByList.orderByBruto = "asc";
      } else if (orderByList.orderByBruto === "asc") {
        orderByList.orderByBruto = "desc";
      }
    } else if (column === "Fecha emision") {
      orderByList.orderByNeto = "";
      orderByList.orderByBruto = "";
      orderByList.orderByFechaPago = "";
      orderByList.orderByFechaCarta = "";
      orderByList.orderByFolio = "";
      if (orderByList.orderByFechaEmision === "") {
        orderByList.orderByFechaEmision = "desc";
      } else if (orderByList.orderByFechaEmision === "desc") {
        orderByList.orderByFechaEmision = "asc";
      } else if (orderByList.orderByFechaEmision === "asc") {
        orderByList.orderByFechaEmision = "desc";
      }
    } else if (column === "Fecha pago") {
      orderByList.orderByFechaEmision = "";
      orderByList.orderByNeto = "";
      orderByList.orderByBruto = "";

      orderByList.orderByFechaCarta = "";
      orderByList.orderByFolio = "";
      if (orderByList.orderByFechaPago === "") {
        orderByList.orderByFechaPago = "desc";
      } else if (orderByList.orderByFechaPago === "desc") {
        orderByList.orderByFechaPago = "asc";
      } else if (orderByList.orderByFechaPago === "asc") {
        orderByList.orderByFechaPago = "desc";
      }
    } else if (column === "Fecha carta") {
      orderByList.orderByFechaPago = "";
      orderByList.orderByFechaEmision = "";
      orderByList.orderByNeto = "";
      orderByList.orderByBruto = "";

      orderByList.orderByFolio = "";
      if (orderByList.orderByFechaCarta === "") {
        orderByList.orderByFechaCarta = "desc";
      } else if (orderByList.orderByFechaCarta === "desc") {
        orderByList.orderByFechaCarta = "asc";
      } else if (orderByList.orderByFechaCarta === "asc") {
        orderByList.orderByFechaCarta = "desc";
      }
    } else if (column === "Folio") {
      orderByList.orderByFechaCarta = "";
      orderByList.orderByFechaPago = "";
      orderByList.orderByFechaEmision = "";
      orderByList.orderByNeto = "";
      orderByList.orderByBruto = "";
      if (orderByList.orderByFolio === "") {
        orderByList.orderByFolio = "desc";
      } else if (orderByList.orderByFolio === "desc") {
        orderByList.orderByFolio = "asc";
      } else if (orderByList.orderByFolio === "asc") {
        orderByList.orderByFolio = "desc";
      }
    }
  };
  return (
    <div className="grid grid-cols-12 gap-12 p-[20px]">
      <div className="hd:col-span-6  hdmas:col-span-12   bg-white rounded-md">
        <div className="grid grid-cols-6 ">
          <div className="col-span-2  border-solid border-r-2">
            <div className="flex flex-row  m-[20px]">
              <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                Estados
              </Typography>
              <TuneIcon className="ml-[10px] text-pantoneazul" />
            </div>
            <h1 className="border border-b-pantoneazul w-full"></h1>

            <div className="p-[20px]">
              <Grid
                container
                direction="column"
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="space-evenly"
                alignItems="stretch"
                // alignItems="flex-start"
              >
                <Grid item className="w-full">
                  <Item className="shadow rounded-xl">
                    <FormControlLabel
                      className="flex justify-normal"
                      control={
                        <Switch
                          disabled={LoadingApis}
                          checked={state.estadoEmision}
                          onChange={handleChange}
                          name="estadoEmision"
                        />
                      }
                      label={
                        state.estadoEmision
                          ? "Factura Emitida"
                          : "Factura No Emitida"
                      }
                      sx={
                        state.estadoEmision
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    />
                  </Item>
                </Grid>
                <Grid item className="w-full">
                  <Item className="shadow rounded-xl">
                    <FormControlLabel
                      className="flex justify-normal"
                      control={
                        <Switch
                          disabled={LoadingApis}
                          checked={state.estadoPago}
                          onChange={handleChange}
                          name="estadoPago"
                        />
                      }
                      label={state.estadoPago ? "Pagado" : "No Pagado"}
                      sx={
                        state.estadoPago ? { color: "green" } : { color: "red" }
                      }
                    />
                  </Item>
                </Grid>
                <Grid item className="w-full">
                  <Item className="shadow rounded-xl">
                    <FormControlLabel
                      className="flex justify-normal"
                      control={
                        <Switch
                          disabled={LoadingApis}
                          checked={state.estadoRecepcion}
                          onChange={handleChange}
                          name="estadoRecepcion"
                        />
                      }
                      label={
                        state.estadoRecepcion
                          ? "Recepcionado"
                          : "No Recepcionado"
                      }
                      sx={
                        state.estadoRecepcion
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    />
                  </Item>
                </Grid>
                <Grid item className="w-full">
                  <Item className="shadow rounded-xl">
                    <FormControlLabel
                      className="flex justify-normal"
                      control={
                        <Switch
                          disabled={LoadingApis}
                          checked={state.estadoAceptacion}
                          onChange={handleChange}
                          name="estadoAceptacion"
                        />
                      }
                      label={
                        state.estadoAceptacion ? "Aceptado" : "No Aceptado"
                      }
                      sx={
                        state.estadoAceptacion
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    />
                  </Item>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="col-span-2  border-solid border-r-2">
            <div className="flex flex-row  mx-[5px] my-[20px]">
              <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                Tipos de instrucción
              </Typography>
              <SupervisedUserCircleIcon className="ml-[10px] text-pantoneazul" />
            </div>
            <h1 className="border border-b-pantoneazul w-full"></h1>

            <div className="p-[20px]">
              <Grid
                container
                direction="column"
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="space-evenly"
                alignItems="stretch"
                // alignItems="flex-start"
              >
                <Grid item className="w-full ">
                  <Item className="shadow rounded-xl">
                    <FormControlLabel
                      className="flex justify-normal "
                      control={
                        <Switch
                          disabled={LoadingApis}
                          checked={state.acreedor}
                          onChange={handleChange}
                          name="acreedor"
                        />
                      }
                      label="Acreedor"
                      sx={
                        state.acreedor ? { color: "green" } : { color: "red" }
                      }
                    />
                  </Item>
                </Grid>
                <Grid item className="w-full">
                  <Item className="shadow rounded-xl">
                    <FormControlLabel
                      className="flex justify-normal"
                      control={
                        <Switch
                          disabled={LoadingApis}
                          checked={state.deudor}
                          onChange={handleChange}
                          name="deudor"
                        />
                      }
                      label="Deudor"
                      sx={state.deudor ? { color: "green" } : { color: "red" }}
                    />
                  </Item>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="col-span-2  ">
            <div className="flex flex-row  m-[20px]">
              <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                Excel Disponibles
              </Typography>
              <AssignmentIcon className="ml-[10px] text-pantoneazul" />
            </div>
            <h1 className="border border-b-pantoneazul w-full"></h1>

            <div className="p-[20px]">
              <Grid
                container
                direction="column"
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="space-evenly"
                alignItems="stretch"
                // alignItems="flex-start"
              >
                <Grid item className="w-full">
                  <Tooltip title="Desactivado" arrow placement="top">
                    <span>
                      <LoadingButton
                        className="w-full"
                        loading={true}
                        loadingPosition="start"
                        startIcon={<SiMicrosoftexcel />}
                        variant="contained"
                        color="success"
                        // onClick={()=>{
                        //   convertAndDownloadExcel(headAgentes,DataRows,`Excel del participante ${props.nameParticipant}`,false)
                        // }}
                      >
                        Todos
                      </LoadingButton>
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item className="w-full">
                  <Tooltip
                    title="Desactivado"
                    //Descargar Excel
                    arrow
                    placement="top"
                  >
                    <span>
                      <LoadingButton
                        className="w-full"
                        loading={true}
                        loadingPosition="start"
                        startIcon={<SiMicrosoftexcel />}
                        variant="contained"
                        color="success"
                        // onClick={()=>{
                        //   convertAndDownloadExcel(headAgentes,DataRows,`Excel del participante ${props.nameParticipant}`,false)
                        // }}
                      >
                        Todos
                      </LoadingButton>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>

      <div className="hd:col-span-6  hdmas:col-span-12  bg-white rounded-md">
        <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Estadísticas
          </Typography>
          <EqualizerIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1>
        <div className="p-[20px]">
          <Estadisticas participantId={props.id} reLoad={reloadEstadistica} />
        </div>
      </div>
      <div className="hdmas:col-span-12  hd:col-span-2  bg-white rounded-md">
        <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Filtros
          </Typography>
          <FilterAltIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1>
        {LoadingApis ? (
          <div className="flex items-center">
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="primary" />
            </Stack>
          </div>
        ) : (
          <div className="flex flex-col flex-auto mt-6">
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <Box className="flex flex-col hd:flex-col p-[20px] ">
                {/* sx={{  width: 1000}} */}

                <>
                  <Box className="flex flex-wrap justify-evenly">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      disabled={!state.acreedor && !state.deudor ? true : false}
                      options={!bussN ? ["cargando"] : bussN}
                      value={selected.sBusinessName || null}
                      isOptionEqualToValue={(option, value) => {
                        if (
                          value === option ||
                          value === null ||
                          value === ""
                        ) {
                          return true;
                        }
                      }}
                      // isOptionEqualToValue={(option, value) =>
                      //   bussN.label === value.label
                      // }
                      name="cambio"
                      sx={{ width: 300, mb: 2 }}
                      onChange={(event, newValue) => {
                        if (newValue === null) {
                          setSelected({
                            ...selected,
                            sBusinessName: "",
                            sRut: "",
                          });
                        } else {
                          setSelected({ ...selected, sBusinessName: newValue });
                          // apiGet(1, newValue.label);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Coordinado" />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      disabled={!state.acreedor && !state.deudor ? true : false}
                      value={selected.sRut || null}
                      options={!rutN ? ["cargando"] : rutN}
                      sx={{ width: 300, mb: 2 }}
                      onChange={(event, newValue) => {
                        if (newValue === null) {
                          setSelected({
                            ...selected,
                            sRut: "",
                            sBusinessName: "",
                          });
                        } else {
                          setSelected({ ...selected, sRut: newValue });
                          // apiGet(1, newValue.label);
                        }
                      }}
                      isOptionEqualToValue={(option, value) => {
                        if (
                          value === option ||
                          value === null ||
                          value === ""
                        ) {
                          return true;
                        }
                      }}
                      // isOptionEqualToValue={(option, value) =>
                      //   rutN.label === value.label
                      // }
                      renderInput={(params) => (
                        <TextField {...params} label="Rut" />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={conceptFilter}
                      value={selected.sConcept || null}
                      sx={{ width: 300, mb: 2 }}
                      // onChange={(event, newValue, reason) => {
                      //   if (newValue !=null) {
                      //     setSelected({ ...selected, sConcept: newValue.label });
                      //   }
                      // }}
                      onChange={(e, selectedObject) => {
                        if (selectedObject !== null) {
                          setSelected({
                            ...selected,
                            sConcept: selectedObject,
                          });
                        } else {
                          setSelected({ ...selected, sConcept: "" });
                        }
                      }}
                      isOptionEqualToValue={(option, value) => {
                        if (
                          value === option ||
                          value === null ||
                          value === ""
                        ) {
                          return true;
                        }
                      }}
                      // isOptionEqualToValue={(option, value) => conceptN=== value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          key={params.id}
                          label="Concepto"
                        />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      value={selected.sCarta || null}
                      // disabled={props.cargando || !disabled ? true : false}
                      options={cartaFilter}
                      sx={{ width: 300, mb: 2 }}
                      onChange={(event, newValue, reason) => {
                        if (newValue != null) {
                          setSelected({ ...selected, sCarta: newValue });
                        } else {
                          setSelected({ ...selected, sCarta: "" });
                        }
                      }}
                      isOptionEqualToValue={(option, value) => {
                        if (
                          value === option ||
                          value === null ||
                          value === ""
                        ) {
                          return true;
                        }
                      }}
                      // isOptionEqualToValue={(option, value) => cart === value}
                      renderInput={(params) => (
                        <TextField {...params} key={params.id} label="Carta" />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      value={selected.sCodRef || null}
                      // disabled={!disabled ? true : false}
                      options={codRefFilter}
                      sx={{ width: 300, mb: 2 }}
                      onChange={(event, newValue, reason) => {
                        if (newValue != null) {
                          setSelected({ ...selected, sCodRef: newValue });
                        } else {
                          setSelected({ ...selected, sCodRef: "" });
                        }
                      }}
                      isOptionEqualToValue={(option, value) => {
                        if (
                          value === option ||
                          value === null ||
                          value === ""
                        ) {
                          return true;
                        }
                      }}
                      // isOptionEqualToValue={(option, value) => codRef === value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          key={params.id}
                          label="Codigo Referencia"
                        />
                      )}
                    />

                    <TextField
                      label="Monto Neto"
                      id="outlined-start-adornment"
                      // disabled={!disabled ? true : false}
                      sx={{ width: 300, mb: 2 }}
                      value={
                        limpiar || selected.sMontoNeto === ""
                          ? null
                          : chile.format(selected.sMontoNeto).replace("$", "")
                      }
                      onChange={(event) => {
                        if (event.target.value === null) {
                          setSelected({ ...selected, sMontoNeto: null });
                        } else {
                          setSelected({
                            ...selected,
                            sMontoNeto: event.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace(".", ""),
                          });
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Monto Bruto"
                      id="outlined-start-adornment"
                      // disabled={!disabled ? true : false}
                      sx={{ width: 300, mb: 2 }}
                      value={
                        limpiar || selected.sMontoBruto === ""
                          ? ""
                          : chile.format(selected.sMontoBruto).replace("$", "")
                      }
                      onChange={(event) => {
                        if (event.target.value === null) {
                          setSelected({ ...selected, sMontoBruto: null });
                        } else {
                          setSelected({
                            ...selected,
                            sMontoBruto: event.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace(".", ""),
                          });
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Folio"
                      id="outlined-start-adornment"
                      // disabled={!disabled ? true : false}
                      value={selected.sFolio}
                      onChange={(event) => {
                        if (event.target.value === null) {
                          setSelected({ ...selected, sFolio: null });
                        } else {
                          setSelected({
                            ...selected,
                            sFolio: event.target.value,
                          });
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ReceiptLongIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2, width: 300 }}
                    />
                  </Box>

                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={es}
                  >
                    <Box className="flex justify-center">
                      <Box className="flex flex-col">
                        {/* <FormControlLabel
                        control={<Checkbox />}
                        label="Desde"
                        disabled
                        checked
                        name="desde"
                      /> */}
                        <DatePicker
                          views={["year", "month"]}
                          label="Fecha inicio"
                          openTo="year"
                          minDate={new Date("2017-02-01")}
                          maxDate={new Date("2023-01-01")}
                          value={sInicioPeriodo === "" ? null : sInicioPeriodo}
                          onChange={(value) => {
                            value != null &&
                              setSelected({
                                ...selected,
                                sInicioPeriodo: value,
                              });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText={null}
                              sx={{ mb: 2 }}
                            />
                          )}
                        />

                        {/* <FormControlLabel
                        control={<Checkbox />}
                        label="Hasta"
                        onChange={(e) => conditionalPeriods(e)}
                        name="hasta"
                      /> */}
                        <DatePicker
                          views={["year", "month"]}
                          label="Fecha termino"
                          openTo="year"
                          // disabled={disabledDateEnd ? true : false}
                          minDate={new Date("2017-02-01")}
                          maxDate={new Date("2023-01-01")}
                          value={
                            sTerminoPeriodo === "" ? null : sTerminoPeriodo
                          }
                          onChange={(value) => {
                            value != null &&
                              setSelected({
                                ...selected,
                                sTerminoPeriodo: value,
                              });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText={null}
                              sx={{ mb: 2 }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </LocalizationProvider>
                  <FormLabel className="text-center" component="legend">
                    Limpieza Filtros
                  </FormLabel>
                  <Box className="flex flex-wrap justify-evenly">
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Filtros"
                        disabled
                        onChange={(e) => conditionFilters(e)}
                        name="filtros"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Estados"
                        onChange={(e) => conditionFilters(e)}
                        name="estados"
                      />
                    </FormGroup>
                  </Box>
                  <Button
                    className="w-[150px]"
                    variant="contained"
                    color="secondary"
                    startIcon={<SearchIcon />}
                    // value={selected.sFolio}
                    // onClick={() => {
                    //   if (condicionFilters === 1) {
                    //     clearAllFilters();
                    //   } else {
                    //     clearFilters();
                    //   }
                    // }}
                    disabled={LoadingApis}
                    onClick={() => {
                      setSelected((prevLista) => {
                        return {
                          sBusinessName: "",
                          sRut: "",
                          sConcept: "",
                          sMontoNeto: "",
                          sMontoBruto: "",
                          sFolio: "",
                          sCarta: "",
                          sCodRef: "",
                          sInicioPeriodo: "",
                          sTerminoPeriodo: "",
                          buscar: 0,
                          limpiar: prevLista.limpiar+1,
                        };
                      });
                      if(condicionFilters ===1){
                        clearStates();
                      }
                 
                      
                    }}
                    style={{
                      m: 1,
                      width: 200,
                      margin: "0 auto",
                      display: "flex",
                      marginTop: 25,
                      // backgroundColor: "#002553",
                      color: "white",
                    }}
                  >
                    Limpiar Filtros
                  </Button>
                  <Button
                    className="w-[150px]"
                    variant="contained"
                    color="secondary"
                    startIcon={<SearchIcon />}
                    onClick={() => {
                      searchFilter();
                    }}
                    disabled={LoadingApis}
                    style={{
                      m: 1,
                      width: 200,
                      margin: "0 auto",
                      display: "flex",
                      marginTop: 25,

                      color: "white",
                    }}
                  >
                    Buscar
                  </Button>
                  {/* {props.cargando ? <>Cargando...</> :
                  <><Button
                  className="w-[150px]"
                  variant="contained"
                  color="secondary"
                  startIcon={<SearchIcon />}
                  value={selected.sFolio}
                  onClick={() => {
                    if (condicionFilters === 1) {
                      clearAllFilters();
                    } else {
                      clearFilters();
                    }
                  }}
                  style={{
                    m: 1,
                    width: 200,
                    margin: "0 auto",
                    display: "flex",
                    marginTop: 25,
                    // backgroundColor: "#002553",
                    color: "white",
                  }}
                >
                  Limpiar Filtros
                </Button>
                <Button
                  className="w-[150px]"
                  variant="contained"
                  color="secondary"
                  startIcon={<SearchIcon />}
                  onClick={
                    buscar
                      ? () => {
                          setSelected({ ...selected, buscar: false });
                        }
                      : () => {
                          setSelected({ ...selected, buscar: true });
                        }
                  }
                  style={{
                    m: 1,
                    width: 200,
                    margin: "0 auto",
                    display: "flex",
                    marginTop: 25,

                    color: "white",
                  }}
                >
                  Buscar
                </Button></>
                } */}
                </>
              </Box>
            </Box>
          </div>
        )}
      </div>
      <div className=" hdmas:col-span-12   hd:col-span-10  bg-white rounded-md">
        {/* <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Instrucciones
          </Typography>
          <FilterAltIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1> */}

        {LoadingApis ? (
          <div className="flex items-center">
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="primary" />
            </Stack>
          </div>
        ) : (
          <Box className="flex flex-col flex-auto p-[5px]  overflow-hidden h-full  w-full">
            <div className="flex flex-col sm:flex-row items-start justify-between">
              {alert && <AlertDialogSlide />}
            </div>
            <div className="flex flex-col flex-auto ">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center">
                  <div className="flex flex-row justify-center items-center">
                    Filas por Página
                    <TextField
                      id="PagePerRows"
                      select
                      value={rowsPerPage}
                      variant="standard"
                      // size="small"
                    >
                      {[5, 10, 25].map((option) => (
                        <MenuItem
                          key={option}
                          value={option}
                          onClick={() => {
                            handleChangeRowsCount(option);
                          }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="flex flex-row justify-center items-center"></div>

                  <Tooltip title="Previo" arrow placement="top">
                    <span>
                      <IconButton
                        sx={{ "&:hover": { color: "#e4493f" } }}
                        key="chechedRight"
                        aria-label="Close"
                        color="primary"
                        onClick={handleChangePagedos}
                        disabled={pageIndex === 1}
                        size="small"
                      >
                        <NavigateBeforeIcon fontSize="large" />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Siguiente" arrow placement="top">
                    <span>
                      <IconButton
                        sx={{ "&:hover": { color: "#e4493f" } }}
                        key="chechedLeft"
                        aria-label="Close"
                        color="primary"
                        onClick={handleChangePage}
                        disabled={pageIndex === pageCount}
                        // disabled={checkeddos.length === 0}
                        size="small"
                      >
                        <NavigateNextIcon fontSize="large" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </div>
                <div>
                  <b>{`Página ${pageIndex} de ${pageCount} / Total de instrucciones: ${pagination}`}</b>
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table
                  stickyHeader
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) =>
                        columnsOrder.some((e) => e === column.label) ? (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            sx={
                              columnsHidden.some((e) => e === column.id)
                                ? { display: { xl: "none", xs: "block" } }
                                : {}
                            }
                          >
                            <ImportExportIcon
                              onClick={() => {
                                orderBy(column.label);
                              }}
                            />{" "}
                            {column.label}
                          </TableCell>
                        ) : (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                            }}
                            sx={
                              columnsHidden.some((e) => e === column.id)
                                ? { display: { xl: "none", xs: "block" } }
                                : {}
                            }
                          >
                            {column.label}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataInstruction.data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id_instruccions}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];

                              // !tableData.some(
                              //   (e) => e.id_instruccions === id_instruccions
                              // );

                              if (
                                columnsHidden.some((e) => e === column.id) &&
                                column.label != "editar"
                              ) {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{
                                      display: { xl: "none", xs: "block" },
                                    }}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              } else if ("editar" === column.label) {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    <Tooltip
                                      title="Actualizar Instrucción"
                                      arrow
                                      placement="top"
                                    >
                                      <span>
                                        <IconButton
                                          sx={{
                                            "&:hover": { color: "#e4493f" },
                                          }}
                                          key="chechedLeft"
                                          aria-label="Close"
                                          color="primary"
                                          onClick={() => {
                                            handleOpen(row);
                                          }}
                                          disabled={table}
                                          size="small"
                                        >
                                          <EditIcon fontSize="medium" />
                                        </IconButton>
                                      </span>
                                    </Tooltip>
                                  </TableCell>
                                );
                              } else if (
                                "Monto Bruto" === column.label ||
                                "Monto Neto" === column.label
                              ) {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {chile.format(
                                      column.format && typeof value === "number"
                                        ? column.format(value)
                                        : value
                                    )}
                                  </TableCell>
                                );
                              } else if ("tipo_instruccion" === column.label) {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {returnInstructionState(value)}
                                  </TableCell>
                                );
                              } else if (
                                column.label === "Fecha emision" ||
                                column.label === "Fecha pago" ||
                                column.label === "Fecha carta"
                              ) {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {random(value)}
                                  </TableCell>
                                );
                              } else if (
                                column.label === "E.Emision" ||
                                column.label === "E.Pago" || column.label === "E.Recepcion" 
                              ) {
                                if (value.includes("No")) {
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{ color: "red" }}
                                    >
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                } else {
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{ color: "green" }}
                                    >
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                }
                              } else {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              }
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {table && (
              <ModalEdicionInstruccion
                setTable={() => {
                  setTable(false);
                  setDataEdit({
                    // dataRow: {},
                    ...dataEdit,
                    dataBoleean: false,
                    fechaEmision: undefined,
                    fechaRecepcion: undefined,
                  });
                }}
                getDataOfUpdate={(data) => {
                 console.log(data)
                  
                    //CAMBIAMOS LOS DATOS DE LA INSTRUCCION SI SON EXITOSOS LOS CAMBIOS SE EJECUTA TODO EL GETDATAOFUPDATE()
                    
                    setAllDataInstrucc((prevstate) => {
                      return prevstate.map((item) => {
                        // Verificamos si el id del objeto actual coincide con data.id
                        if (item.id_instruccions === data.id) {
                          // Si hay coincidencia, retornamos el objeto actualizado
                          return {
                            ...item, // Mantenemos los atributos originales del objeto
                            // Aquí puedes editar los atributos que necesitas cambiar en base a data
                            fecha_recepcion: formatDateToBD(data.spec.FechaRecepcion),
                            fecha_aceptacion: formatDateToBD(data.spec.FechaAceptacion),
                            fecha_emision: formatDateToBD(data.spec.FechaEmision),
                            fecha_pago: formatDateToBD(data.spec.FechaPago),
                            // Y así sucesivamente con los demás atributos que desees actualizar
                          };
                        } else {
                          // Si no hay coincidencia, simplemente devolvemos el objeto original sin cambios
                          return item;
                        }
                      });
                    });
                   
               
                    // console.log(formatDateToBD(data.spec.FechaRecepcion));
                    // console.log(formatDateToBD(data.spec.FechaPago));
                    // console.log(formatDateToBD(data.spec.FechaAceptacion));
                    // console.log(formatDateToBD(data.spec.FechaEmision));
               



                }}
                dataEdit={dataEdit}
              />
            )}
          </Box>
        )}
      </div>
    </div>
  );
}
