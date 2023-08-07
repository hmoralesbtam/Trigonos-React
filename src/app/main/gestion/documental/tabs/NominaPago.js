import { Typography, ButtonBase, Dialog, TextField } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as React from "react";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import HistorialCarga from "../tablas/HistorialCarga";
import Disponible from "../tablas/Disponible";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
//CALENDARIO
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { es } from "date-fns/locale";
//
//
import { usePostNominasPagoMutation } from "app/store/instrucciones/instruccionesApi";
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
const componentsProps = {
  tooltip: {
    sx: {
      userSelect: "none",

      bgcolor: "primary.main",
      "& .MuiTooltip-arrow": {
        color: "primary.main",
      },
    },
  },
};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
}));
function createData(name, estado) {
  return { name, estado };
}

const rows = [createData("Excel 1", false), createData("Excel 2", true)];

export default function NominaPago(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText: "",
    msgError: false,
  });
  // const [openDialog, setOpenDialog] = useState(true);
  // const [cargando, setCargando] = useState(true);
  // const [MsgAlert, setMsgAlert] = useState({
  //   msgResp: false,
  //   msgText: "EXITO",
  //   msgError: false,
  // });
  const { msgResp, msgText, msgError } = MsgAlert;
  const [postNominasPago] = usePostNominasPagoMutation();
  const [dates, setDates] = React.useState({
    payDate: new Date("2017-01-02"),
  });
  const { payDate } = dates;
  const handleChangeDataPicker = (newValue) => {
    const fechita = `20${newValue.getYear().toString().slice(1, 3)}/${String(
      newValue.getMonth() + 1
    ).padStart(2, "0")}/${newValue.getDate()}`;

    return fechita;
  };
  //
  //FUNCIONES
  const mostrarMensaje = (response) => {
    if (!(response.error == undefined)) {
      setMsgAlert({
        msgResp: true,
        msgText:
          response.error == "true"
            ? "PORFAVOR CONTACTAR A SOPORTE TRIGONOS"
            : response.error.data.message,
        msgError: true,
      });
      setCargando(false);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 2000);
    } else {
      setMsgAlert({
        msgResp: true,
        msgText: "EXITO",
        msgError: false,
      });
      setCargando(false);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 2000);
    }
  };

  const handleFileUpload = (event) => {
    if ("2017/01/1" == handleChangeDataPicker(payDate)) {
      setOpenDialog(true);
      setCargando(true);
      setMsgAlert({
        msgResp: true,
        msgText: "Debes seleccionar una fecha de pago",
        msgError: true,
      });
      setCargando(false);
      setTimeout(() => {
        setOpenDialog(false);
      }, 2000);
      return;
    }
    // console.log(handleChangeDataPicker(payDate));
    const file = event.target.files[0];
    const reader = new FileReader();
    let name = event.target.files[0].name;
    reader.onload = (e) => {
      setOpenDialog(true);
      setCargando(true);
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      if (jsonData.length < 2000) {
        postNominasPago({
          id: props.cliente.id,
          bank: props.cliente.bank,
          excelName: name,
          fechaPago: handleChangeDataPicker(payDate),
          body: jsonData.slice(0, 1000),
        }).then((response) => {
          if (!(response.error == undefined)) {
            mostrarMensaje(response);
          } else {
            if (jsonData.length > 1000) {
              postNominasPago({
                id: props.cliente.id,
                bank: props.cliente.bank,
                excelName: name,
                fechaPago: handleChangeDataPicker(payDate),
                body: jsonData.slice(1000, 2003),
              }).then((response) => {
                mostrarMensaje(response);
              });
            } else {
              mostrarMensaje(response);
            }
          }
        });
      } else {
        mostrarMensaje({ error: "true" });
      }
    };
    reader.readAsArrayBuffer(file);
  };
  //
  return (
    <div className="grid grid-cols-9 gap-12 p-[20px]">
      <div className="col-span-3 bg-white rounded-md">
        <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Historia de Carga
          </Typography>
          <AssignmentIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1>
        <div className="p-[20px]">
          <HistorialCarga excelData={props.dataExcel} type={"Nominas"} />
        </div>
      </div>
      <div className="col-span-3 bg-white rounded-md">
        <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Subida
          </Typography>
          <UploadFileIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1>
        <div className="p-[20px]">
          <div className=" rounded-md flex items-center justify-center">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <MobileDatePicker
                label="Fecha de Pago"
                // disabled={
                //   !props.acreedor && !props.fechaRecepcion ? false : true
                // }
                inputFormat="dd/MM/yyyy"
                minDate={new Date("2017-01-02")}
                maxDate={new Date("2024-01-01")}
                value={payDate}
                onChange={(newValue) => {
                  setDates({ ...dates, payDate: new Date(newValue) });
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ mb: 2, width: 268 }} />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="p-[10px] ">
          <div className="bg-[#f0f0f0] rounded-md flex items-center justify-center ">
            <input type="file" onChange={(e) => handleFileUpload(e)} />
            <ButtonBase
              className="cursor-copy"
              variant="contained"
              size="medium"
            ></ButtonBase>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={"paper"}
      >
        {cargando ? (
          <div className="flex flex-col justify-center items-center min-h-[250px] min-w-[300px]">
           
            <CircularProgress color="secondary"  />
            <span className="text-center text-pantonerojo pt-[20px]">  Cargando...</span>
            
          </div>
        ) : (
          <div>
            {msgResp && (
              <div className="flex justify-center items-center min-h-[250px] min-w-[300px]">
                {msgError ? (
                  <div className="flex flex-col justify-center items-center min-h-[250px] min-w-[300px]">
                    <WarningIcon className="w-[68px] h-[68px]  text-red" />
                  
                    <span className="text-center text-red pt-[20px] text-justify break-all max-w-[300px] px-[20px]"> {msgText}</span>
                  </div>
                ) : (
                  <div className="flex  flex-col justify-center items-center min-h-[250px] min-w-[300px]">
                    <CheckCircleIcon className="w-[68px] h-[68px] text-green" />
                    <span className="text-center  text-green pt-[20px] text-justify break-all max-w-[300px] px-[20px]">{msgText}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}
