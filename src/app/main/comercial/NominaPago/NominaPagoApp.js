import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import FusePageSimple from "@fuse/core/FusePageSimple";

import { Stack } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { motion } from "framer-motion";

import SelectClient from "./tabs/SelectClient";

import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import TablaNominaBCI from "./tabs/widgets/TablaNominaBCI";
import TablaNominaSantander from "./tabs/widgets/TablaNominaSantander";
import TablaNominaSecurity from "./tabs/widgets/TablaNominaSecurity";
import { useGetNominasMutation } from "app/store/nominasApi/nominasApi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ReportIcon from "@mui/icons-material/Report";
import { forwardRef } from "react";
import { useGetParticipantesById_Query } from "app/store/participantesApi/participantesApi";
// REDUX
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
//
const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
let changeDisc;
let discPrueba = false;
let ldata;
let array = [];
let temporal = 0;
const NominaPagoApp = () => {
  let tablaSelect = 1;
  const user = useSelector(selectUser);
  const [getNominas, dataNomina] = useGetNominasMutation();
  const [clientData, setClienteData] = useState([]);
  const [payRollData, setPayRollData] = useState([]);
  const [disc, setDisc] = useState(false);
  const [stateNomina, setStateNomina] = useState({});
  const [stateNominaPrueba, setStateNominaPrueba] = useState({});
  const [open, setOpen] = useState(false);
  const [estado, setEstado] = useState("");
  const [cargando, setCargando] = useState(false);
  const { data: getDataParticipant, isFetching: isFetchinParticipant } =
    useGetParticipantesById_Query(user.idUser);
  console.log(getDataParticipant);
  useEffect(() => {
    discPrueba = false;
    changeDisc = undefined;
    ldata = undefined;
    setDisc(false);
    setClienteData([]);
    setStateNomina({});
    array = [];
    setCargando(true);
  }, [estado]);
  useEffect(() => {
    setStateNominaPrueba(array);
  }, [cargando]);
  const actualizarEstado = (nuevoEstado) => {
    setEstado(nuevoEstado);
  };
  const getClientData = (data, glosa = "") => {
    setClienteData(data);
    callApiPayroll(data.id, glosa);
    ldata = data;
  };
  const getDiscData = (disc, glosa = "") => {
    discPrueba = disc;
    setDisc(disc);
    getClientData(ldata, glosa);
  };
  const callApiPayroll = (id, glosa = "") => {
    temporal = 1;
    if (discPrueba == false) {
      getNominas({
        id: id,
        Glosa: glosa,
      })
        .then((response) => {
          const { data, error, count } = response;
          if (data != undefined) {
            if (data.count > 0) {
              let buclesF = Math.round(data.count / 100 + 0.49) + 2;
              for (let x = 1; x < buclesF; x++) {
                getNominas({
                  id: id,
                  Glosa: glosa,
                  PageIndex: x,
                })
                  .then((response) => {
                    response.data.data.map((e) => {
                      array.push(e);
                    });
                    console.log(array);
                    console.log(data);
                    if (array.length === data.count) {
                      setTimeout(() => {
                        setCargando(false);
                        temporal = 0;
                      }, 2000);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
              // temporal = 0;
              setStateNomina({
                data: data,
                error: data.length > 0 ? false : true,
                msgError: data.length > 0 ? error : "No se registran datos",
                title: "Notificación",
              });
            } else if (data.length === 0) {
              setOpen(true);
              setTimeout(() => {
                setOpen(false);
              }, 2000);
            } else {
              temporal = 0;
              setStateNomina({
                data: undefined,
                error: true,
                msgError: error,
                title: "Error en busqueda",
              });
              setOpen(true);
              setTimeout(() => {
                setOpen(false);
              }, 2000);
            }
          }
        })
        .catch((error) => {
          temporal = 0;
          setStateNomina({
            data: undefined,
            error: true,
            msgError: error,
            title: "Error en busqueda",
          });
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        });
    } else {
      getNominas({
        id: id,
        Glosa: glosa,
        Disc: "si",
      })
        .then((response) => {
          const { data, error } = response;
          if (data != undefined) {
            if (data.count > 0) {
              let buclesF = Math.round(data.count / 100 + 0.49) + 2;
              for (let x = 1; x < buclesF; x++) {
                getNominas({
                  id: id,
                  Glosa: glosa,
                  Disc: "si",
                  PageIndex: x,
                })
                  .then((response) => {
                    response.data.data.map((e) => {
                      array.push(e);
                    });
                    if (array.length === data.count) {
                      setTimeout(() => {
                        setCargando(false);
                        temporal = 0;
                      }, 2000);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
              setStateNomina({
                data: data,
                error: data.length > 0 ? false : true,
                msgError: data.length > 0 ? error : "No se registran datos",
                title: "Notificación",
              });
            }
            if (data.length === 0) {
              setOpen(true);
              setTimeout(() => {
                setOpen(false);
              }, 2000);
            }
          } else {
            setStateNomina({
              data: undefined,
              error: true,
              msgError: error,
              title: "Error en busqueda",
            });
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          }
        })

        .catch((error) => {
          setStateNomina({
            data: undefined,
            error: true,
            msgError: error,
            title: "Error en busqueda",
          });
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        });
    }
  };
  const getChangeDisc = (param) => {
    changeDisc = param;
  };

  return isFetchinParticipant ? (
    <Paper className="w-full p-[20px] mb-[20px]">
      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="primary" />
      </Stack>
    </Paper>
  ) : (
    <Root
      content={
        <div className="w-full">
          <motion.div
            className="grid auto-cols-auto smmax:grid-cols-2 sm:grid-cols-12 gap-2 w-full min-w-0 p-20 "
            initial="hidden"
            animate="show"
          >
            {/* INFORMACION SOBRE LO QUE HAY QUE HACER */}
            <motion.div className="  col-span-12 mb-[20px]">
              <Box className="  bg-white rounded-sm p-[10px] ">
                <h1 className="ml-[5px]">Nominas de Pago &#40;Deudor&#41;</h1>
                <h1 className="border border-b-pantoneazul"></h1>
                <Box className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]">
                  <div>
                    <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
                  </div>
                  <div>
                    <span className="text-grey-700">
                      Selecciona tu <b>Cliente</b>, descarga y edita los datos
                      de las <b>Fechas de Pago</b>
                    </span>
                  </div>
                </Box>
              </Box>
            </motion.div>
            {/* SELECT PARA ELEGIR CLIENTES */}
            <motion.div className=" mdmax:col-span-24  md:col-span-12">
              <SelectClient
                sendClientData={getClientData}
                disc={disc}
                actualizarEstado={actualizarEstado}
                changeDisc={getChangeDisc}
                dataParticipant={getDataParticipant.data.filter(
                  (p) =>
                    p.trgns_nomina == 2 ||
                    p.trgns_nomina == 6 ||
                    p.trgns_nomina == 1
                )}
              />
            </motion.div>
            {/* TABLA DATOS NOMINA */}
            <motion.div className="  col-span-12 ">
              <Stack
                sx={{ width: "100%", color: "grey.500", height: "3px" }}
                spacing={2}
              >
                {cargando && temporal == 1 ? (
                  <LinearProgress
                    color="primary"
                    className="ml-[20px] mr-[20px]"
                  />
                ) : cargando && temporal == 0 ? (
                  <></>
                ) : (
                  <Paper>
                    {clientData.trgns_nomina == 2 && (
                      <TablaNominaBCI
                        isLoading={dataNomina.isLoading}
                        payRollData={stateNomina}
                        sendDiscData={getDiscData}
                        changedDisc={changeDisc}
                        payRollDataPrueba={stateNominaPrueba}
                      />
                    )}
                    {clientData.trgns_nomina == 6 && (
                      <TablaNominaSecurity
                        payRollData={stateNomina}
                        sendDiscData={getDiscData}
                        changedDisc={changeDisc}
                        payRollDataPrueba={stateNominaPrueba}
                      />
                    )}
                    {clientData.trgns_nomina == 1 && (
                      <TablaNominaSantander
                        payRollData={stateNomina}
                        sendDiscData={getDiscData}
                        changedDisc={changeDisc}
                        payRollDataPrueba={stateNominaPrueba}
                      />
                    )}
                  </Paper>
                )}
              </Stack>
            </motion.div>
          </motion.div>
          {/* TERMINA  */}
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            // onClose={}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle sx={{ color: "#FF5733" }}>
              {stateNomina.title}
              <ReportIcon sx={{ color: "#FF5733" }} />
            </DialogTitle>
            <DialogContent>
              <h2 className="text-pantoneazul">
                {JSON.stringify(stateNomina.msgError)}
              </h2>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
            </DialogActions>
          </Dialog>
        </div>
      }
      scroll="content"
    />
  );
};

export default NominaPagoApp;
