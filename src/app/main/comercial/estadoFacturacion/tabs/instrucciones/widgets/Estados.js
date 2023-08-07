import { Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { green } from "tailwindcss/colors";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Estados = (props) => {
  const [state, setState] = useState({
    estadoEmision: false,
    estadoPago: false,
    estadoRecepcion: false,
    estadoAceptacion: false,
    acreedor: false,
    deudor: false,
  });
  const [render, setRender] = useState(false);
  const {
    estadoEmision,
    estadoPago,
    estadoRecepcion,
    estadoAceptacion,
    acreedor,
    deudor,
  } = state;
  const clearStates = () => {
    setState({
      estadoEmision: false,
      estadoPago: false,
      estadoRecepcion: false,
      estadoAceptacion: false,
      acreedor: false,
      deudor: false,
    });
  };

  useEffect(() => {
    if (deudor === false && acreedor === false) {
      if (props.clearFilterRutAndName != undefined) {
        props.clearFilterRutAndName();
      }
    }
    props.stateToken(state);
    props.getClearStates(clearStates);
  }, [state]);

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

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          Estados
        </Typography>
      </div>
      <div className="flex flex-col flex-auto mt-12">
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="row"
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="space-evenly"
                alignItems="flex-start"
              >
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={
                            props.cargando || !props.cargarFiltros
                              ? true
                              : false
                          }
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
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={
                            props.cargando || !props.cargarFiltros
                              ? true
                              : false
                          }
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
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={
                            props.cargando || !props.cargarFiltros
                              ? true
                              : false
                          }
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
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={
                            props.cargando || !props.cargarFiltros
                              ? true
                              : false
                          }
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
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={
                            props.cargando || !props.cargarFiltros
                              ? true
                              : false
                          }
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
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={
                            props.cargando || !props.cargarFiltros
                              ? true
                              : false
                          }
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
            </Box>
          </FormGroup>
          <FormHelperText>Powered by Trigonos Energy & Api CEN</FormHelperText>
        </FormControl>
      </div>
    </Paper>
  );
};

export default Estados;
