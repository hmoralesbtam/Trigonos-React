import {
  Autocomplete,
  Stack,
  TextField,
  Button,
  Box,
  Alert,
  Tooltip,
} from "@mui/material";
import * as React from "react";
import axios from "axios";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// eslint-disable-next-line import/no-extraneous-dependencies
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { es } from "date-fns/locale";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import IconButton from "@mui/material/IconButton";

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
let buss;
const ReceptionState = ["Recepcionado", "No Recepcionado", "Rechazado"];
const AceptationState = ["Aceptado", "Rechazado", "Pendiente"];
const BillingState = ["No Facturado", "Facturado", "Facturado con Atraso"];
const PaymentState = ["No Pagado", "Pagado", "Pagado con Atraso"];
const FormInstructions = (props) => {
  const [value, setValue] = React.useState(
    new Date("December 01, 1995 03:24:00")
  );
  const [alertt, setAlertt] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorDp, setErrorDp] = React.useState(false);
  const handleChangeDataPicker = (newValue) => {
    const fechita = `20${newValue.getYear().toString().slice(1, 3)}/${
      newValue.getMonth() + 1
    }/${newValue.getDate()}`;

    setValue(fechita);
  };
  const [render, setRender] = React.useState(false);
  const [disabledChange, setDisabledChanged] = React.useState(true);
  React.useEffect(() => {
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
  const [states, setStates] = React.useState({
    reception: props.data.trgnS_dte_reception_status_name,
    aceptation: props.data.ceN_dte_acceptance_status_name,
    payment: props.data.ceN_payment_status_type_name,
    billing: props.data.ceN_billing_status_type_name,
    folio: props.data.folio,
  });
  const { reception, aceptation, payment, billing, folio } = states;
  const [dates, setDates] = React.useState({
    receptionDate: new Date(props.data.fecha_recepcion),
    aceptationDate: new Date(props.data.fecha_aceptacion),
    billingDate: new Date(props.data.fecha_emision),
    paymentDate: new Date(props.data.fecha_pago),
  });
  const { receptionDate, aceptationDate, billingDate, paymentDate } = dates;
  const viendoErrores = () => {};
  const ApiPatch = () => {
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
    const apiPatchParticipante =
      ` https://trigonosapi.azurewebsites.net/api/Instrucciones?` +
      `id=${props.data.id_instruccions}&` +
      // `EstadoEmision=${BillingState.indexOf(billing) + 1}&` +
      // `EstadoRecepcion=${ReceptionState.indexOf(reception) + 1}&` +
      // `EstadoPago=${PaymentState.indexOf(payment) + 1}&` +
      // `EstadoAceptacion=${AceptationState.indexOf(aceptation) + 1}&` +
      `FechaEmision=${receptionDateF}&` +
      `FechaRecepcion=${receptionDateF}&` +
      `FechaPago=${paymentDateF}&` +
      `FechaAceptacion=${receptionDateF}&` +
      `TipoInstructions=${1}&` +
      `Folio=${folio}&` +
      `Editor=PRUEBA`;
    const res = axios
      .patch(apiPatchParticipante)
      .then((response) => {
        setAlertt(true);
      })
      // eslint-disable-next-line no-shadow
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div>
      <h1>Actualizar Instruccion #{props.data.id_instruccions}</h1>
      <h3>
        Acreedor: {props.data.nombreAcreedor} / {props.data.rutAcreedor}
      </h3>
      <h3>
        Deudor: {props.data.nombreDeudor} / {props.data.rutDeudor}
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
            disabled={!props.acreedor && !props.fechaRecepcion ? false : true}
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
            disabled={props.fechaRecepcion && props.acreedor ? false : true}
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
          disabled={!props.acreedor && !props.fechaRecepcion ? false : true}
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
      <Box className="flex justify-evenly" mt={1.5}>
        {/* <Button
          sx={{ ml: 32, mr: 3, width: 200 }}
          variant="contained"
          color="success"
          onClick={() => {
            ApiPatch();
          }}
        >
          {" "}
          Modificar
        </Button> */}
        {/* absolute top-0 right-0 */}
        <Tooltip
          title="Actualizar Instrucción"
          arrow
          placement="top"
          componentsProps={componentsProps}

          // placement="top-start"
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
          // placement="top"
          componentsProps={componentsProps}
          // placement="top-start"
        >
          <IconButton
            className=""
            size="medium"
            variant="contained"
            color="info"
            // onClick={props.onClose}
          >
            <ErrorOutlineOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>

        <Tooltip
          title="Regresar a instrucciones"
          placement="top"
          componentsProps={componentsProps}
          // placement="top-start"
        >
          <IconButton
            className=""
            size="medium"
            variant="contained"
            color="primary"
            onClick={props.onClose}
          >
            <ArrowCircleRightOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        {/* <Button
          sx={{ width: 200 }}
          onClick={props.onClose}
          variant="contained"
          color="error"
        >
          {" "}
          Atras{" "}
        </Button> */}
      </Box>
    </div>
  );
};
export default FormInstructions;
