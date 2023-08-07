import { Box } from "@mui/material";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//DIALOG
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
//
//LLAMADAS A API REDUX
import { useGetInstruccionesSpecmMutation } from "app/store/instrucciones/instruccionesApi";
//
import { useState } from "react";
//TRANSICION DEL DIALOG
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//
//ELEMENTOS DE LA TABLA
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f1f5f9",
    color: "#002554",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // backgroundColor: "#F7F7F7",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
}));
//
//CABECERAS DEL EXCEL
let headMasivoAcreedor = [
  [
    "ID Instruccion",
    "Nombre Acreedor",
    "Nombre Deudor",
    "Rut",
    "Folio",
    "Fecha Emision",
    "Fecha de Pago",
    "Concepto",
    "Monto",
  ],
];
let headHistoricoAcreedor = [
  [
    "ID Instruccion",
    "Nombre Acreedor",
    "Nombre Deudor",
    "Rut",
    "Folio",
    "Fecha Emision",
    "Fecha de Pago",
    "Concepto",
    "Monto",
  ],
];
let headMasivoDeudor = [
  [
    "ID Instruccion",
    "Nombre Acreedor",
    "Nombre Deudor",
    "Rut",
    "Folio",
    "Fecha Recepcion",
    "Concepto",
    "Monto",
  ],
];
let headHistoricoDeudor = [
  [
    "ID Instruccion",
    "Nombre Acreedor",
    "Nombre Deudor",
    "Rut",
    "Folio",
    "Fecha Recepcion",
    "Fecha Emision",
    "Fecha Pago",
    "Concepto",
    "Monto",
  ],
];
//
//VARBIABLES
let array = [];
//
export default function Disponible(props) {
  //STATES
  const [cargando, setCargando] = useState(true);
  const [open, setOpen] = useState(false);
  const [stateDataExcel, setStateDataExcel] = useState({
    data: [],
    error: false,
    msgError: "",
    title: "Cargando porfavor espere",
  });
  //
  const [getInstructions, dataInstructions] =
    useGetInstruccionesSpecmMutation();
  //DATOS EXCEL
  let tableUtils = props.acreedor
    ? [
        {
          id: 1,
          name: `AC-${props.cliente.rut}`,
          description: "Cuadre Masivo de instrucciones acreedor",
          headerExcel: headMasivoAcreedor,
        },
        {
          id: 2,
          name: `AC-HIST-${props.cliente.rut}`,
          description: "Historia de instrucciones de acreedor",
          headerExcel: headHistoricoAcreedor,
        },
      ]
    : [
        {
          id: 1,
          name: `DC-${props.cliente.rut}`,
          description:
            "Cuadre Masivo de instrucciones deudor(Agregar Folio y Fecha de recepción, aceptación)",
          headerExcel: headMasivoDeudor,
        },
        {
          id: 2,
          name: `DC-HIST-${props.cliente.rut}`,
          description:
            "Historia de instrucciones de deudor(Agregar Folio y Fecha de recepción, aceptación, emisión y pago)",
          headerExcel: headHistoricoDeudor,
        },
      ];
  //
  const callAllInstructions = (header, name, idDocumento) => {
    let jsonApi = {};
    if (idDocumento == 1) {
      jsonApi = {
        id: props.cliente.id,
        PageIndex: 1,
        PageSize: 100,
        spec: props.acreedor
          ? { conFolio: "si", Pagada: false, Acreedor: props.cliente.id }
          : { Folio: 0, Pagada: false, Deudor: props.cliente.id },
      };
    } else {
      jsonApi = {
        id: props.cliente.id,
        PageIndex: 1,
        PageSize: 100,
        spec: props.acreedor
          ? { Folio: 0, Pagada: false, Acreedor: props.cliente.id }
          : { Pagada: false, Deudor: props.cliente.id },
      };
    }
    setOpen(true);
    getInstructions(jsonApi)
      .then((response) => {
        let { data, error, count } = response;
        if (data != undefined) {
          if (data.count > 0) {
            let buclesF = Math.round(data.count / 100 + 0.49) + 1;
            for (let x = 1; x < buclesF; x++) {
              jsonApi.PageIndex = x;
              getInstructions(jsonApi)
                .then((response) => {
                  response.data.data.map((el) => {
                    console.log(response.data.data);
                    if (idDocumento == 1 && props.acreedor == true) {
                      array.push({
                        Id: el.id_instruccions,
                        nombre_acreedor: props.cliente.business_Name,
                        nombre_deudor: el.nombreDeudor,
                        rut: el.rutAcreedor,
                        folio: el.folio,
                        fecha_emision: el.fecha_emision.substring(0, 10),
                        fecha_pago: el.fecha_pago.substring(0, 10),
                        glosa: el.glosa,
                        monto: el.montoNeto,
                      });
                    } else if (idDocumento == 2 && props.acreedor == true) {
                      array.push({
                        Id: el.id_instruccions,
                        nombre_acreedor: props.cliente.business_Name,
                        nombre_deudor: el.nombreDeudor,
                        rut: el.rutAcreedor,
                        folio: el.folio,
                        fecha_emision: el.fecha_emision.substring(0, 10),
                        fecha_pago: el.fecha_pago.substring(0, 10),
                        glosa: el.glosa,
                        monto: el.montoNeto,
                      });
                    } else if (idDocumento == 1 && props.acreedor == false) {
                      array.push({
                        Id: el.id_instruccions,
                        nombre_acreedor: el.nombreAcreedor,
                        nombre_deudor: props.cliente.business_Name,
                        rut: el.rutAcreedor,
                        folio: el.folio,
                        fecha_recepcion: el.fecha_recepcion.substring(0, 10),
                        glosa: el.glosa,
                        monto: el.montoNeto,
                      });
                    } else if (idDocumento == 2 && props.acreedor == false) {
                      array.push({
                        Id: el.id_instruccions,
                        nombre_acreedor: el.nombreAcreedor,
                        nombre_deudor: props.cliente.business_Name,
                        rut: el.rutAcreedor,
                        folio: el.folio,
                        fecha_recepcion: el.fecha_recepcion.substring(0, 10),
                        fecha_emision: el.fecha_emision.substring(0, 10),
                        fecha_pago: el.fecha_pago.substring(0, 10),
                        glosa: el.glosa,
                        fecha_pago: el.fecha_pago.substring(0, 10),
                        monto: el.montoNeto,
                      });
                    }
                  });
                  if (array.length === data.count) {
                    setCargando(false);
                    convertAndDownloadExcel(header, array, name);
                    setStateDataExcel({
                      data: array,
                      error: false,
                      msgError: "Se descargo con exito",
                      title: "Notificación",
                    });
                    setTimeout(() => {
                      restablecerCargaDato();
                    }, 2000);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          } else if (data.length === 0) {
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          } else {
            setStateDataExcel({
              data: array,
              error: array.length > 0 ? false : true,
              msgError: array.length > 0 ? error : "No se registran datos",
              title: "Notificación",
            });
            setOpen(true);
            setTimeout(() => {
              restablecerCargaDato();
            }, 2000);
          }
        }
      })
      .catch((error) => {
        setStateDataExcel({
          data: array,
          error: array.length > 0 ? false : true,
          msgError: array.length > 0 ? error : "No se registran datos",
          title: "Notificación",
        });
        setOpen(true);
        setTimeout(() => {
          restablecerCargaDato();
        }, 2000);
      });
  };
  const convertAndDownloadExcel = (header, data, name) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, header);
    const sheet = XLSX.utils.sheet_add_json(ws, data, {
      origin: "A2",
      skipHeader: true,
    });
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${name}.xlsx`);
  };
  const restablecerCargaDato = () => {
    setOpen(false);
    array = [];
    setCargando(true);
    setStateDataExcel({
      data: [],
      error: false,
      msgError: "",
      title: "Cargando porfavor espere",
    });
  };
  return (
    <TableContainer component={Box}>
      <Table aria-label="customized table" size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Documento</StyledTableCell>
            <StyledTableCell align="left">Descripción</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableUtils.map((row) => (
            <Tooltip
              key={row.id}
              title="Descargar"
              arrow
              placement="right"
              // placement="top-start"
            >
              <StyledTableRow
                key={row.id}
                hover
                className="border-b-2 border-inherit cursor-pointer "
                onClick={() => {
                  callAllInstructions(row.headerExcel, row.name, row.id);
                }}
              >
                <StyledTableCell component="th" scope="row" align="left">
                  <SiMicrosoftexcel
                    size={30}
                    className="mr-[10px] text-green-700"
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  {" "}
                  {row.description}
                </StyledTableCell>
              </StyledTableRow>
            </Tooltip>
          ))}
        </TableBody>
      </Table>
      {/* TERMINA  */}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={}
        // aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: "#FF5733" }}>
          {stateDataExcel.title}

          {/* <ReportIcon sx={{ color: "#FF5733" }} /> */}
        </DialogTitle>
        <DialogContent>
          {stateDataExcel.msgError == "" ? (
            <div className="flex justify-center items-center h-[250px] w-[300px]">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <h2 className="text-pantoneazul">
              {JSON.stringify(stateDataExcel.msgError)}
            </h2>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
