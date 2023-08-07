import {
  Autocomplete,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Typography,
  Checkbox,
  FormLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import BasicAlerts from "../widgets/BasicAlerts";
import axios from "axios";
import { motion } from "framer-motion";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Box, Paper } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CallBussinesName } from "../../../store/CallBussinesName";
import { CallConceptoFilter } from "../../../store/CallConceptoFilter";
import { CallNameDeudor } from "../../../store/CallNameDeudor";
import { CallRutCreditor } from "../../../store/CallRutCreditor";
import { CallRutDeudor } from "../../../store/CallRutDeudor";
import { CallNameCreditor } from "../../../store/CallNameCreditor";
import { CallConceptos } from "../../../store/CallConceptos";
import { CallParticipant } from "../../../store/CallParticipant";
import { CallRut } from "../../../store/CallRut";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { update } from "lodash";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Modal from "@mui/material/Modal";
let buss;
let concept;
let ruts;
let apiResponse;
let condicion = 1;
const isLetters = (str) => /[^0-9]/.test(str);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Filtros = (props) => {
  let condicionFilters = 0;
  let conditionPeriods = 0;
  const [bussN, setBusinessName] = useState([]);
  const [rutN, setRutName] = useState([]);
  const [conceptN, setConceptName] = useState([]);
  const [cart, setCart] = useState([]);
  const [codRef, setCodRef] = useState([]);
  
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
    buscar: "",
  });
  const [open, setOpen] = useState(false);
  const clearFilters = () => {
    setSelected({
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
    });
  };
  const [disabled, setDisabled] = useState(false);
  const [disabledd, setDisabledd] = useState(false);
  const [limpiar, setLimpiar] = useState(false);
  
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
  const [disabledDateEnd, setDisabledDateEnd] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    props.getClearDebtorAndCreditor(clearDebtorAndCreditor);
  }, [selected]);
  useEffect(() => {
    props.getClearFilters(clearFilters);

    if (props.stateTokenFiltros.acreedor || props.stateTokenFiltros.deudor) {
      setDisabledd(true);
    } else {
      setDisabledd(false);
    }
  }, [props.stateTokenFiltros.acreedor, props.stateTokenFiltros.deudor]);
  useEffect(() => {
    (async () => {
      setDisabled(false);
      let probando = false;
      if (
        props.stateTokenFiltros.acreedor === true ||
        props.stateTokenFiltros.deudor === true
      ) {
        buss = await CallBussinesName();
        ruts = await CallRut();
        setBusinessName(buss);
        setRutName(ruts);
      }
      concept = await CallConceptoFilter(
        props.idParticipante,
        props.stateTokenFiltros,
        selected
      );

      if (concept == "ERR_BAD_REQUEST") {
        setOpen(true);
        return;
      } else {
        setDisabled(true);

        setCodRef(concept.codRef);
        setCart(concept.carta);
        setConceptName(concept.label);

        condicion = 2;
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (condicion === 2) {
        setDisabled(false);
        setDisabledd(true);
        if (
          props.stateTokenFiltros.acreedor === true ||
          props.stateTokenFiltros.deudor === true
        ) {
          if (props.stateTokenFiltros.acreedor === true) {
            buss = await CallNameDeudor(
              props.idParticipante,
              props.stateTokenFiltros,
              selected
            );
            ruts = await CallRutDeudor(
              props.idParticipante,
              props.stateTokenFiltros,
              selected
            );
          } else {
            buss = await CallNameCreditor(
              props.idParticipante,
              props.stateTokenFiltros,
              selected
            );
            ruts = await CallRutCreditor(
              props.idParticipante,
              props.stateTokenFiltros,
              selected
            );
          }

          setBusinessName(buss);
          setRutName(ruts);
        }

        concept = await CallConceptoFilter(
          props.idParticipante,
          props.stateTokenFiltros,
          selected
        );

        if (concept == "ERR_BAD_REQUEST") {
          setOpen(true);
          return;
        } else {
          setConceptName(concept.label);
          setCodRef(concept.codRef);
          setCart(concept.carta);

          setDisabled(true);
          setDisabledd(false);
        }
      }
    })();
  }, [props.stateTokenFiltros, buscar]);
  useEffect(() => {
    props.selected(selected, disabled);
  }, [selected, disabled]);

  // props.selected(selected, disabled);
  const apiGet = async (numero, parametro) => {
    if (numero === 0) {
      apiResponse = await CallParticipant(0, parametro);
      setSelected({
        ...selected,
        sBusinessName: parametro,
        sRut: apiResponse.data[0].rut.concat(
          "-",
          apiResponse.data[0].verification_Code
        ),
      });
    } else {
      apiResponse = await CallParticipant(1, parametro.slice(0, 8));
      setSelected({
        ...selected,
        sRut: parametro,
        sBusinessName: apiResponse.data[0].business_Name,
      });
    }
  };
  const clearDebtorAndCreditor = () => {
    setSelected({
      ...selected,
      sBusinessName: "",
      sRut: "",
    });
  };
  const clearAllFilters = () => {
    clearFilters();
    props.getClearStates();
  };
  const conditionFilters = (e) => {
    if (e.target.name === "estados" && e.target.checked === true) {
      condicionFilters = 1;
    }
    if (e.target.name === "estados" && e.target.checked === false) {
      condicionFilters = 0;
    }
  };
  const conditionalPeriods = (e) => {
    if (e.target.name === "hasta" && e.target.checked === true) {
      conditionPeriods = 1;
      setDisabledDateEnd(false);
    }
    if (e.target.name === "hasta" && e.target.checked === false) {
      conditionPeriods = 0;
      setDisabledDateEnd(true);
    }
  };
  const chile = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  });
  useEffect(() => {
    props.getCargandoFiltros(disabled);
  }, [disabled]);
  return (
    <Paper
      sx={{ width: "100%", color: "grey.500" }}
      // tvxxl:max-w-[78%] tvdosk:max-w-[70%]
      className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full md:max-xl:flex   "
    >
      <div className="flex  justify-center">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate ">
          Filtros
        </Typography>
      </div>
      <div className="flex flex-col flex-auto mt-6">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Box className="flex flex-col hd:flex-col  ">
            {/* sx={{  width: 1000}} */}

            {!disabled ? (
              <div className="flex items-center">
                <Stack sx={{ width: "80%", color: "grey.500" }} spacing={1}>
                  <p>Cargando Filtros .....</p>
                  <LinearProgress color="success" />
                </Stack>
                <>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{ ...style, width: 400 }}>
                      <h2 id="parent-modal-title">
                        Se ha producido un error a la API
                      </h2>
                      <p id="parent-modal-description">
                        Se recargara la pagina
                      </p>
                      <Button
                        variant="outlined"
                        onClick={() => window.location.reload(true)}
                      >
                        Cerrar
                      </Button>
                    </Box>
                  </Modal>
                </>
              </div>
            ) : (
              <>
                <Box className="flex flex-wrap justify-evenly">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    disabled={
                      
                      (!props.stateTokenFiltros.acreedor &&
                        !props.stateTokenFiltros.deudor)
                        ? true
                        : false
                    }
                    options={bussN}
                    value={selected.sBusinessName}
                    isOptionEqualToValue={(option, value) =>
                      bussN.label === value.label
                    }
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
                        apiGet(0, newValue.label);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Coordinado" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    disabled={
                      
                      (!props.stateTokenFiltros.acreedor &&
                        !props.stateTokenFiltros.deudor)
                        ? true
                        : false
                    }
                    value={selected.sRut}
                    options={rutN}
                    sx={{ width: 300, mb: 2 }}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setSelected({
                          ...selected,
                          sRut: "",
                          sBusinessName: "",
                        });
                      } else {
                        setSelected({ ...selected, sRut: newValue.label });
                        apiGet(1, newValue.label);
                      }
                    }}
                    isOptionEqualToValue={(option, value) =>
                      rutN.label === value.label
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Rut" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={selected.sConcept}
                    disabled={!disabled ? true : false}
                    options={conceptN}
                    sx={{ width: 300, mb: 2 }}
                    onChange={(event, newValue, reason) => {
                      if (newValue !=null) {
                        setSelected({ ...selected, sConcept: newValue });
                      }else{
                        setSelected({ ...selected, sConcept: "" });

                      } 
                    }}
                    // isOptionEqualToValue={(option, value) => conceptN=== value.id}
                    renderInput={(params) => (
                      <TextField {...params} key={params.id} label="Concepto" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={selected.sCarta}
                    disabled={props.cargando || !disabled ? true : false}
                    options={cart}
                    sx={{ width: 300, mb: 2 }}
                    onChange={(event, newValue, reason) => {
                      if (newValue !=null) {
                        setSelected({ ...selected, sCarta: newValue });
                      } else{
                        setSelected({ ...selected, sCarta: "" });

                      } 
                    }}
                    // isOptionEqualToValue={(option, value) => cart === value}
                    renderInput={(params) => (
                      <TextField {...params}key={params.id} label="Carta" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={selected.sCodRef}
                    disabled={!disabled ? true : false}
                    options={codRef}
                    sx={{ width: 300, mb: 2 }}
                    onChange={(event, newValue, reason) => {
                      if (newValue != null) {
                        setSelected({ ...selected, sCodRef: newValue });
                      } else{
                        setSelected({ ...selected, sCodRef: "" });

                      } 
                    }}
                    // isOptionEqualToValue={(option, value) => codRef === value}
                    renderInput={(params) => (
                      <TextField {...params}  key={params.id} label="Codigo Referencia" />
                    )}
                  />

                  <TextField
                    label="Monto Neto"
                    id="outlined-start-adornment"
                    disabled={!disabled ? true : false}
                    sx={{ width: 300, mb: 2 }}
                    value={
                      limpiar || selected.sMontoNeto === ""
                        ? ""
                        : chile.format(selected.sMontoNeto).replace("$", "")
                    }
                    onChange={(event) => {
                      if (event.target.value === null) {
                        setSelected({ ...selected, sMontoNeto: null });
                      } else {
                        if (
                          !isLetters(
                            event.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace(".", "")
                          )
                        ) {
                          setSelected({
                            ...selected,
                            sMontoNeto: event.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace(".", ""),
                          });
                        }
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
                    disabled={!disabled ? true : false}
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
                        if (
                          !isLetters(
                            event.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace(".", "")
                          )
                        ) {
                          setSelected({
                            ...selected,
                            sMontoBruto: event.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace(".", ""),
                          });
                        }
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
                    disabled={!disabled ? true : false}
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
                            sx={{  mb: 2 }}
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
                        disabled={disabledDateEnd ? true : false}
                        minDate={new Date("2017-02-01")}
                        maxDate={new Date("2023-01-01")}
                        value={sTerminoPeriodo === "" ? null : sTerminoPeriodo}
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
                            
                            sx={{  mb: 2 }}
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
                {props.cargando ? <>Cargando...</> :
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
                }
                
              </>
            )}
          </Box>
        </Box>
      </div>
    </Paper>
  );
};

export default Filtros;
