
import {
    Box,
    Modal,
    Button,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
    TextField,
    Stack,
    Autocomplete,
    Alert,
  } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect, useRef, useState } from 'react';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { es } from "date-fns/locale";
import axios from "axios";
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { usePatchInstruccionesSpecMutation } from "app/store/instrucciones/instruccionesApi";
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
let emisione;
const ReceptionState = ["Recepcionado", "No Recepcionado", "Rechazado"];
const AceptationState = ["Aceptado", "Rechazado", "Pendiente"];
const BillingState = ["No Facturado", "Facturado", "Facturado con Atraso"];
const PaymentState = ["No Pagado", "Pagado", "Pagado con Atraso"];
const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function ModalEdicionInstruccion({
    setTable,
    dataEdit,
    getDataOfUpdate
}) {
    console.log(dataEdit)
    const user = useSelector(selectUser);
    const {nombre, apellido,email} = user.data;
    const {  dataRow,dataBoleean,fechaEmision,fechaRecepcion} = dataEdit;
    const [boolFechRecept, setFechRecept] = useState(fechaRecepcion);
    const [open, setOpen] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [MsgAlert, setMsgAlert] = useState({
      msgResp: false,
      msgText: "",
      msgError: false,
    });
    const { msgResp, msgText, msgError } = MsgAlert;
    const [value, setValue] = useState(
        new Date("December 01, 1995 03:24:00")
      );
      
      const [patchInstrucciones, data_] = usePatchInstruccionesSpecMutation();
      const [alertt, setAlertt] = useState(false);
      const [error, setError] = useState(false);
      const [errorDp, setErrorDp] = useState(false);
      const handleChangeDataPicker = (newValue) => {
        const fechita = `20${newValue.getYear().toString().slice(1, 3)}/${
          newValue.getMonth() + 1
        }/${newValue.getDate()}`;
    
        setValue(fechita);
      };
      const [render, setRender] = useState(false);
      const [disabledChange, setDisabledChanged] = useState(true);
    
      useEffect(() => {
        if (alertt === true) {
          setTimeout(() => {
            setAlertt(false);
          }, 5000);
        }
        if (error === true) {
          setTimeout(() => {
            setError(false);
          }, 5000);
        }
        if (errorDp === true) {
          setTimeout(() => {
            setErrorDp(false);
          }, 5000);
        }
      }, [alertt, error, errorDp]);
      const [states, setStates] = useState({
        reception: dataRow.trgnS_dte_reception_status_name,
        aceptation: dataRow.ceN_dte_acceptance_status_name,
        payment: dataRow.ceN_payment_status_type_name,
        billing: dataRow.ceN_billing_status_type_name,
        folio: dataRow.folio,
      });
      const { reception, aceptation, payment, billing, folio } = states;
      const [dates, setDates] = useState({
        receptionDate: new Date(dataRow.fecha_recepcion),
        aceptationDate: new Date(dataRow.fecha_aceptacion),
        billingDate: new Date(dataRow.fecha_emision),
        paymentDate: new Date(dataRow.fecha_pago),
      });
        const handleClose = () => {
            setOpen(false);
            setTable();
        };
        const sendDataSuccesfull = (data_) => {
          // setOpen(false);
          getDataOfUpdate(data_);
      };
      const { receptionDate, aceptationDate, billingDate, paymentDate } = dates;
      const viendoErrores = () => {};
      const ApiPatch = async () => {
        const billingDateF = `20${billingDate.getYear().toString().slice(1, 3)}/${
          billingDate.getMonth() + 1
        }/${billingDate.getDate()}`;
        const receptionDateF = `20${receptionDate
          .getYear()
          .toString()
          .slice(1, 3)}/${receptionDate.getMonth() + 1}/${receptionDate.getDate()}`;
        const paymentDateF = `20${paymentDate.getYear().toString().slice(1, 3)}/${
          paymentDate.getMonth() + 1
        }/${paymentDate.getDate()}`;
        const aceptationDateF = `20${aceptationDate
          .getYear()
          .toString()
          .slice(1, 3)}/${
          aceptationDate.getMonth() + 1
        }/${aceptationDate.getDate()}`;
        emisione = `20${billingDate.getYear().toString().slice(1, 3)}/${
          billingDate.getMonth() + 1
        }/${billingDate.getDate()}`;
        if (paymentDate < billingDate) {
          setErrorDp(true);
          return;
        }
        setOpenDialog(true);
        setLoading(true);
        try {
          let dataNew= {
            id:dataRow.id_instruccions, 
            spec:{
                FechaEmision:receptionDateF,
                FechaRecepcion:receptionDateF,
                FechaPago:paymentDateF,
                FechaAceptacion:receptionDateF,
                TipoInstructions:1,
                Folio:folio,
                Editor:email
                }}
           patchInstrucciones(dataNew).then((response) => {
                    // setAlertt(true);
                    setLoading(false);
                    if(response.error === undefined){
                        setMsgAlert({
                          msgResp: true,
                          msgText: "Exito, Operación Realizada",
                          msgError: false,
                        });
                        setFechRecept(!fechaRecepcion);
                        sendDataSuccesfull(dataNew);
                        setTimeout(() => {
                          setOpenDialog(false);
                        }, 1000);
                      }else{
                        setMsgAlert({
                          msgResp: true,
                          msgText: "No se logró realizar la operación",
                          msgError: true,
                        });

                        setTimeout(() => {
                          setOpenDialog(false);
                        }, 1000);
                      }
                  })
                  .catch((error) => {
                    setMsgAlert({
                        msgResp: true,
                        msgText: "No se logró realizar la operación",
                        msgError: true,
                      });
                      setTimeout(() => {
                     
                        setOpenDialog(false);
                      }, 1000);
                  });
          } catch (error) {
            setLoading(false);
            setMsgAlert({
              msgResp: true,
              msgText: "No se logró realizar la operación",
              msgError: true,
            });
            setTimeout(() => {
              setOpenDialog(false);
            }, 1000);
          }
      
      };
   return (
   <Dialog
    open={open}
    scroll={'paper'}
    aria-labelledby="scroll-dialog-title"
    aria-describedby="scroll-dialog-description"
    >
    <DialogTitle id="scroll-dialog-title"><div className="static ">
        <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
        Actualizar Instrucción #{dataRow.id_instruccions}<DriveFileRenameOutlineIcon/>
        </Typography>
        <IconButton className="absolute top-0 right-0" onClick={handleClose} variant="contained" color="error">
            <HighlightOffIcon />
        </IconButton>
        </div></DialogTitle>
    <DialogContent dividers={scroll === 'paper'} className="min-w-[400px]">
    <div>
        
        <h3>
            Acreedor: {dataRow.nombreAcreedor} / {dataRow.rutAcreedor}
        </h3>
        <h3>
            Deudor: {dataRow.nombreDeudor} / {dataRow.rutDeudor}
        </h3>
        <hr />
        <br />
        <Stack direction="row" spacing={2}>
            <Autocomplete
            label="Estado Recepción"
            disablePortal
            id="combo-box-demo"
            value={reception}
            disabled
            options={ReceptionState}
            name="reception"
            onChange={(event, newValue) => {
                setStates({ ...states, reception: newValue });
            }}
            renderInput={(params) => (
                <TextField {...params} label="Estado Recepción" />
            )}
            sx={{ mb: 2, width: 300 }}
            />
            <Autocomplete
            label="Estado Aceptación"
            disablePortal
            id="combo-box-demo"
            disabled
            value={aceptation}
            options={AceptationState}
            name="aceptation"
            onChange={(event, newValue) => {
                setStates({ ...states, aceptation: newValue });
            }}
            renderInput={(params) => (
                <TextField {...params} label="Estado Aceptación" />
            )}
            sx={{ mb: 2, width: 300 }}
            />
            <Autocomplete
            label="Estado Facturación"
            disablePortal
            id="combo-box-demo"
            value={billing}
            disabled
            options={BillingState}
            name="billing"
            onChange={(event, newValue) => {
                setStates({ ...states, billing: newValue });
            }}
            renderInput={(params) => (
                <TextField {...params} label="Estado Facturación" />
            )}
            sx={{ mb: 2, width: 300 }}
            />
        </Stack>
        <Stack direction="row" spacing={2}>
            <Autocomplete
            label="Estado Pago"
            disablePortal
            id="combo-box-demo"
            value={payment}
            options={PaymentState}
            disabled
            name="payment"
            onChange={(event, newValue) => {
                setStates({ ...states, payment: newValue });
            }}
            renderInput={(params) => (
                <TextField {...params} label="Estado Pago" />
            )}
            sx={{ mb: 2, width: 268 }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <MobileDatePicker
                label="Fecha Recepcion"
                disabled={!dataBoleean && !boolFechRecept ? false : true}
                inputFormat="dd/MM/yyyy"
                minDate={new Date("2017-01-02")}
                maxDate={new Date("2024-01-01")}
                value={receptionDate}
                onChange={(newValue) => {
                setDates({ ...dates, receptionDate: new Date(newValue) });
                }}
                renderInput={(params) => (
                <TextField {...params} sx={{ mb: 2, width: 268 }} />
                )}
            />
            <MobileDatePicker
                label="Fecha Aceptacion"
                disabled
                inputFormat="dd/MM/yyyy"
                minDate={new Date("2017-01-02")}
                maxDate={new Date("2024-01-01")}
                value={aceptationDate}
                onChange={(newValue) => {
                setDates({ ...dates, aceptationDate: new Date(newValue) });
                }}
                renderInput={(params) => (
                <TextField {...params} sx={{ mb: 2, width: 268 }} />
                )}
            />
            </LocalizationProvider>
        </Stack>
        <Stack direction="row" spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <MobileDatePicker
                label="Fecha Pago"
                disabled={dataBoleean  &&  boolFechRecept? false : true}
                inputFormat="dd/MM/yyyy"
                value={paymentDate}
                minDate={new Date("2017-01-02")}
                maxDate={new Date("2024-01-01")}
                onChange={(newValue) => {
                setDates({ ...dates, paymentDate: new Date(newValue) });
                }}
                renderInput={(params) => (
                <TextField {...params} sx={{ mb: 2, width: 268 }} />
                )}
            />
            <MobileDatePicker
                label="Fecha Facturacion"
                disabled
                inputFormat="dd/MM/yyyy"
                value={billingDate}
                minDate={new Date("2017-01-02")}
                maxDate={new Date("2024-01-01")}
                onChange={(newValue) => {
                setDates({ ...dates, billingDate: new Date(newValue) });
                }}
                renderInput={(params) => (
                <TextField {...params} sx={{ mb: 2, width: 268 }} />
                )}
            />
            </LocalizationProvider>
            <TextField
            label="Folio"
            id="outlined"
            value={folio}
            disabled={!dataBoleean && !boolFechRecept ? false : true}
            onChange={(event) => {
                setStates({ ...states, folio: event.target.value });
            }}
            name="Folio"
            sx={{ mb: 2, width: 268 }}
            />
        </Stack>
        {alertt && (
            <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
                Se actualizo la instruccion correctamente
            </Alert>
            </Stack>
        )}
        {error && (
            <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="warning">
                Error!! No se actualizo la instruccion
            </Alert>
            </Stack>
        )}
        {errorDp && (
            <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="warning">
                Error!! La fecha de pago no puede ser menor a la fecha de
                facturación
            </Alert>
            </Stack>
        )}
        
        </div>
    </DialogContent>
    <DialogActions className='flex justify-evenly m-[20px]'>
            <Tooltip
            title="Actualizar Instrucción"
            arrow
            placement="top"
            componentsProps={componentsProps}
            >
            <IconButton
                className=""
                size="medium"
                variant="contained"
                color="success"
                onClick={() => {
                    ApiPatch();
                    }}
            >
                <CheckCircleOutlineIcon fontSize="large" />
            </IconButton>
            </Tooltip>
            <Tooltip
            title="Nose que poner uwu"
            followCursor
            componentsProps={componentsProps}
            >
            <IconButton
                className=""
                size="medium"
                variant="contained"
                color="info"
            >
                <ErrorOutlineOutlinedIcon fontSize="large" />
            </IconButton>
            </Tooltip>
            <Tooltip
            title="Regresar a instrucciones"
            placement="top"
            componentsProps={componentsProps}
            >
            <IconButton
                className=""
                size="medium"
                variant="contained"
                color="primary"
                onClick={handleClose}
            >
                <ArrowCircleRightOutlinedIcon fontSize="large" />
            </IconButton>
            </Tooltip>
    </DialogActions>


    <Dialog
            open={openDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            scroll={"paper"}
          >
            {loading ? (
              <div className="flex justify-center items-center h-[250px] w-[300px]">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <div>
                {msgResp && (
                  <div className="flex justify-center items-center h-[250px] w-[300px]">
                    {msgError ? (
                      <div className="flex justify-center items-center h-[250px] w-[300px]">
                        <WarningIcon className="w-[68px] h-[68px] text-red" />
                        <span className="absolute bottom-[70px] text-red">
                          {" "}
                          <b>{msgText}</b>
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center h-[250px] w-[300px]">
                        <CheckCircleIcon className="w-[68px] h-[68px] text-green" />
                        <span className="absolute bottom-[70px] text-green">
                          {" "}
                          <b>{msgText}</b>
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </Dialog>
    </Dialog>
    )

  

  
}
