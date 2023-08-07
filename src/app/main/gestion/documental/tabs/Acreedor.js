import { Typography, ButtonBase, Dialog } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as XLSX from "xlsx";
import { useState } from "react";
import Disponible from "../tablas/Disponible";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HistorialCarga from "../tablas/HistorialCarga";
import { usePostFacturacionAcreedorMutation } from "app/store/instrucciones/instruccionesApi";
export default function Acreedor(props) {
  //STATES
  const [openDialog, setOpenDialog] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText: "",
    msgError: false,
  });
  const { msgResp, msgText, msgError } = MsgAlert;
  const [postFacturacionAcreedor] = usePostFacturacionAcreedorMutation();
  //
  //FUNCIONES
  const mostrarMensaje = (response) => {
    if (!(response.error == undefined)) {
      setMsgAlert({
        msgResp: true,
        msgText:
          response.error == "true"
            ? "EL EXCEL DEBE TENER MENOS DE 2000 FILAS"
            : response.error.data.message,
        msgError: true,
      });
      setCargando(false);
      setTimeout(() => {
        setOpenDialog(false);
      }, 2000);
    } else {
      setMsgAlert({
        msgResp: true,
        msgText: "SE CARGO EL ARCHIVO CORRECTAMENTE",
        msgError: false,
      });
      setCargando(false);
      setTimeout(() => {
        setOpenDialog(false);
      }, 6000);
    }
  };
  const handleFileUpload = (event) => {
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
        postFacturacionAcreedor({
          id: props.cliente.id,
          excelName: name,
          body: jsonData.slice(0, 1000),
        }).then((response) => {
          if (!(response.error == undefined)) {
            mostrarMensaje(response);
          } else {
            if (jsonData.length > 1000) {
              postFacturacionAcreedor({
                id: props.cliente.id,
                excelName: name,
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
            Excel Disponibles
          </Typography>
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1>
        <div className="p-[20px]">
          {/* EXCEL PARA DESCARGAR ---------------------------------------------------------------------------*/}
          <Disponible cliente={props.cliente} acreedor={true} />
        </div>
      </div>

      <div className="col-span-3 bg-white rounded-md">
        <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Historia de Carga
          </Typography>
          <AssignmentIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1>
        <div className="p-[20px]">
          {/* EXCEL HISTORICOS ---------------------------------------------------------------------------*/}
          <HistorialCarga excelData={props.dataExcel} type={"Acreedor"} />
        </div>
      </div>

      <div className="col-span-3 bg-white rounded-md">
        <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Subida
          </Typography>
          {/* SUBIDA DE ARCHIVO ---------------------------------------------------------------------------*/}
          <UploadFileIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1>
        <div className="p-[20px] ">
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
