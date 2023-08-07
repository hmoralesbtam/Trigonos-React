import {
  Box,
  Divider,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Tabs,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
// import { SiMicrosoftexcel } from "react-icons/si";
import { SiMicrosoftexcel } from "react-icons/si";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import { useEffect, useRef, useState, memo } from "react";
import { CallInstrucciones } from "../../../store/CallInstrucciones";
import AlertDialogSlide from "./AlertDialogSlide";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import ModalGeneric from "../widgets/ModalGeneric";
import { stubFalse } from "lodash";
import * as XLSX from "xlsx";

//ITEM PARA EL HEADER DE LA TABLA
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
  { id: "concepto", label: "Concepto" },
  { id: "montoNeto", label: "Monto Neto" },
  { id: "montoBruto", label: "Monto Bruto" },
  { id: "tipo_instruccion", label: "tipo_instruccion" },
  { id: "id_instruccions", label: "Instruccion" },
  { id: "editar", label: "editar" },
];

function createData(
  id_instruccions,
  ceN_billing_status_type_name,
  trgnS_dte_reception_status_name,
  ceN_payment_status_type_name,
  ceN_dte_acceptance_status_name,
  nombreAcreedor,
  rutAcreedor,
  nombreDeudor,
  rutDeudor,
  glosa,
  concepto,
  montoNeto,
  montoBruto,
  folio,
  fecha_pago,
  fecha_aceptacion,
  fecha_emision,
  fecha_recepcion,
  editar,
  carta,
  tipo_instruccion,
  fecha_carta
) {
  return {
    id_instruccions,
    ceN_billing_status_type_name,
    trgnS_dte_reception_status_name,
    ceN_payment_status_type_name,
    ceN_dte_acceptance_status_name,
    nombreAcreedor,
    rutAcreedor,
    nombreDeudor,
    rutDeudor,
    glosa,
    concepto,
    montoNeto,
    montoBruto,
    folio,
    fecha_pago,
    fecha_aceptacion,
    fecha_emision,
    fecha_recepcion,
    editar,
    carta,
    tipo_instruccion,
    fecha_carta,
  };
}
let pageIndex = 1;
let pagination = 0;
let condicion = 1;
let estados = [];
let tableData = [];
let columnsHidden = [
  "id_instruccions",
  "editar",
  "trgnS_dte_reception_status_name",
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
let idProyecto = 141;
let Respaldo;
let dataInstruction;
let tokenOpenModal;
let proyects;
let orderByList = {
  orderByNeto: "",
  orderByBruto: "",
  orderByFechaEmision: "",
  orderByFechaPago: "",
  orderByFechaCarta: "",
  orderByFolio: "",
};
// let editar;
const TablaInstrucciones = (props) => {
  esw3;
  const fontStyles = { color: "white", fontSize: "20px" };
  const [page, setPage] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [render, setRender] = useState(false);
  const [modal, setModal] = useState(false);
  const [editar, setEditar] = useState(false);
  const [render1, setRender1] = useState(false);
  useEffect(() => {
    idProyecto = props.idParticipante;
    setCargando(true);
    tableData = [];
    setPage(0);
    pageIndex = 1;
    // setTimeout(() => {
    //   setCargando(false);
    // }, 2000);
  }, [props.idParticipante]);
  useEffect(() => {
    setCargando(true);
  }, [render1]);

  const {
    estadoEmision,
    estadoPago,
    estadoRecepcion,
    estadoAceptacion,
    acreedor,
    deudor,
  } = props.estadoPar;
  useEffect(() => {
    setCargando(true);
    tableData = [];
    setPage(0);
    pageIndex = 1;
  }, [props.estadoPar, props.selected.buscar]);

  useEffect(() => {
    (async () => {
      const proyectsResponse = await axios.get(
        " https://trigonosapi.azurewebsites.net/api/Participantes"
      );
      proyects = await proyectsResponse;
    })();
  }, []);

  useEffect(() => {
    if (condicion == 1) {
      let fetchData = async (
        id = idProyecto,
        PageIndex = pageIndex,
        PageSize = rowsPerPage,
        data = props.estadoPar,
        filters = props.selected,
        orderByList = orderByList
      ) => {
        try {
          let response = await CallInstrucciones(
            PageIndex,
            PageSize,
            id,
            props.estadoPar,
            props.selected,
            orderByList
          );
          setError(response);
          if (response.data != [] && response.data != undefined) {
            let json = await response.data;
            pagination = response.count;

            json.map(
              ({
                id_instruccions,
                ceN_billing_status_type_name,
                trgnS_dte_reception_status_name,
                ceN_payment_status_type_name,
                ceN_dte_acceptance_status_name,
                nombreAcreedor,
                rutAcreedor,
                nombreDeudor,
                rutDeudor,
                glosa,
                concepto,
                montoNeto,
                montoBruto,
                folio,
                fecha_pago,
                fecha_aceptacion,
                fecha_emision,
                fecha_recepcion,
                carta,
                tipo_instruccion,
                fecha_carta,
              }) =>
                !tableData.some((e) => e.id_instruccions === id_instruccions) &&
                tableData.push(
                  createData(
                    id_instruccions,
                    ceN_billing_status_type_name,
                    trgnS_dte_reception_status_name,
                    ceN_payment_status_type_name,
                    ceN_dte_acceptance_status_name,
                    nombreAcreedor,
                    rutAcreedor,
                    nombreDeudor,
                    rutDeudor,
                    glosa,
                    concepto,
                    montoNeto,
                    montoBruto,
                    folio,
                    fecha_pago,
                    fecha_aceptacion,
                    fecha_emision,
                    fecha_recepcion,
                    editar,
                    carta,
                    tipo_instruccion,
                    fecha_carta
                  )
                )
            );
            setCargando(false);
          }
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchData(
        idProyecto,
        pageIndex,
        rowsPerPage,
        props.estadoPar,
        props.selected,
        orderByList
      );
    }
  }, [
    props.idParticipante,
    page,
    rowsPerPage,
    props.estadoPar,
    props.selected.buscar,
    props.idParticipante,
    render,
    render1,
    cargando,
  ]);
  // useEffect(() => {
  //   props.tokenCharge(cargando);
  // }, [cargando]);
  props.tokenCharge(cargando);
  // useEffect(() => {
  //   if (error === "ERR_BAD_RESPONSE") {
  //     setAlert(true);
  //     setCargando(false);
  //     tableData = [];
  //   }
  // }, [error]);
  const handleChangePage = (event, newPage) => {
    if (pageIndex === newPage) {
      condicion = 1;
      setCargando(true);
      pageIndex = pageIndex + 1;
      setPage(page + 1);

      return;
    }
    setPage(newPage);
    condicion = 0;
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    pageIndex = 1;
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

  const chile = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  });
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

    if (render === true) {
      setRender(false);
    } else {
      setRender(true);
    }
  };
  if (cargando) {
    return (
      <div className="flex items-center">
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <p>Cargando Instrucciones .....</p>
          <LinearProgress color="success" />
        </Stack>
      </div>
    );
  } else {
    return (
      <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full  w-full">
        <div className="flex flex-col sm:flex-row items-start justify-between">
          {alert && <AlertDialogSlide />}
        </div>
        <div className="flex flex-col flex-auto mt-9">
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
                {tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          const dataRow = row;

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
                                sx={{ display: { xl: "none", xs: "block" } }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          } else if ("editar" === column.label) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <EditIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    showModal(dataRow);
                                  }}
                                />
                              </TableCell>
                            );
                          } else if (
                            "Monto Bruto" === column.label ||
                            "Monto Neto" === column.label
                          ) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {chile.format(
                                  column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value
                                )}
                              </TableCell>
                            );
                          } else if ("tipo_instruccion" === column.label) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {returnInstructionState(value)}
                              </TableCell>
                            );
                          } else if (
                            column.label === "Fecha emision" ||
                            column.label === "Fecha pago" ||
                            column.label === "Fecha carta"
                          ) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {random(value)}
                              </TableCell>
                            );
                          } else if (
                            column.label === "E.Emision" ||
                            column.label === "E.Pago"
                          ) {
                            if (value.includes("No")) {
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ color: "red" }}
                                >
                                  {column.format && typeof value === "number"
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
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            }
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pagination}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        {modal && (
          <ModalGeneric
            data={dataInstruction}
            getOpenModal={getOpenModal}
            closeModal={() => {
              tableData = [];
              setModal(false);

              if (render1 === true) {
                setRender1(false);
              } else {
                setRender1(true);
              }
            }}
            proyects={proyects.data.data}
          />
        )}
      </Paper>
    );
  }
};

export default TablaInstrucciones;
