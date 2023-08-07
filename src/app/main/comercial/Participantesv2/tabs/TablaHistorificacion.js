import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";

import axios from "axios";
import { useEffect, useState } from "react";
import ModalCampo from "./widgets/ModalCampo";
import {
  Paper,
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
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Stack } from "@mui/system";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LinearProgress from "@mui/material/LinearProgress";
import { useGetHistorificacionMutation } from "app/store/participantesApi/participantesApi";
function createData(
  id,
  editor,
  date,
  updated_ts_old,
  updated_ts_new,
  coleccion_campos
) {
  return {
    id,
    editor,
    date,
    updated_ts_old,
    updated_ts_new,
    coleccion_campos,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function CleanArray(value) {
  if (value != 0 || value != "0") {
    return value + " ,";
  } else {
    return "";
  }
}

const columns = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "editor", label: "editor", minWidth: 40 },
  { id: "date", label: "date", minWidth: 40 },
  { id: "updated_ts_old", label: "Fecha Actualización Antigua", minWidth: 40 },
  { id: "updated_ts_new", label: "Fecha Actualización Nueva", minWidth: 40 },
  { id: "coleccion_campos", label: "Campos Modificados", minWidth: 40 },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  const [roll, setroll] = React.useState("");

  const handleChange = (event) => {
    setroll(event.target.value);
  };
  return (
    <Toolbar
      className="w-full"
      sx={{
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Box className="flex flex-col w-full">
        <Box className="flex flex-row w-full">
          <Typography className=" text-4xl font-extrabold text-center  tracking-tight leading-tight w-full">
            Cambios realizados
          </Typography>
        </Box>
      </Box>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TablaUltimosCambios(props) {
  const [table, setTable] = React.useState(true);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("codigo");
  const [selected, setSelected] = React.useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [histId, setHistId] = useState(0);
  const [histDate, setHistDate] = useState("");
  const [LoadingApis, setLoadingApis] = useState(false);
  const [DataRows, setDataRows] = useState([]);
  const [sendData, setSendData] = useState([]);
  const [getDataHist, { isLoading: isLoadingHist }] =
    useGetHistorificacionMutation();

  // const { data: getDataHist, isFetching: fetchHist, refetch: refetchHist} =  useGetHistorificacionMutation({id:props.idParticipant, PageIndex:pageIndex, PageSize:rowsPerPage  });
  // let url = ` https://trigonosapi.azurewebsites.net/Historificacion?id=${props.idParticipant}`;
  function getHistData() {
    setLoadingApis(true);
    getDataHist({
      id: props.idParticipant,
      PageIndex: pageIndex,
      PageSize: rowsPerPage,
    })
      .then((response) => {
        console.log("id", props.idParticipant);
        console.log("Respuesta", response);
        const { data, count, pageCount, pageIndex, pageSize } = response.data;

        if (response.data) {
          setSendData(data);
          setDataRows(
            data.map(function (el) {
              return {
                id: el.id,
                editor: el.editor,
                date: el.date,
                updated_ts_old: el.updated_ts_old,
                updated_ts_new: el.updated_ts_new,
                coleccion_campos:
                  (el.name_old != 0 || el.name_old != "0"
                    ? "[ Nombre ] "
                    : "") +
                  (el.rut_old != 0 || el.rut_old != "0" ? " [ Rut ] " : "") +
                  (el.verification_code_old != 0 ||
                  el.verification_code_old != "0"
                    ? "[ Token ]"
                    : "") +
                  (el.business_name_old != 0 || el.business_name_old != "0"
                    ? "[ Razón Social ]"
                    : "") +
                  (el.commercial_business_old != 0 ||
                  el.commercial_business_old != "0"
                    ? "[ Giro ]"
                    : "") +
                  (el.dte_reception_email_old != 0 ||
                  el.dte_reception_email_old != "0"
                    ? "[ Email DTE ]"
                    : "") +
                  (el.bank_account_old != 0 || el.bank_account_old != "0"
                    ? "[ Cuenta de Banco ]"
                    : "") +
                  (el.bank_old != 0 || el.bank_old != "0" ? "[ Banco ]" : "") +
                  (el.commercial_address_old != 0 ||
                  el.commercial_address_old != "0"
                    ? "[ Dirección Comercial ]"
                    : "") +
                  (el.postal_address_old != 0 || el.postal_address_old != "0"
                    ? "[ Dirección Postal ]"
                    : "") +
                  (el.manager_old != 0 || el.manager_old != "0"
                    ? "[ Gerente General ]"
                    : "") +
                  (el.pay_contact_first_name_old != 0 ||
                  el.pay_contact_first_name_old != "0"
                    ? "[ Nombre Contacto Pago ]"
                    : "") +
                  (el.pay_contact_last_name_old != 0 ||
                  el.pay_contact_last_name_old != "0"
                    ? "[ Apellido Contacto Pago ]"
                    : "") +
                  (el.pay_contact_address_old != 0 ||
                  el.pay_contact_address_old != "0"
                    ? "[ Dirección Contacto Pago ]"
                    : "") +
                  (el.pay_contact_phones_old != 0 ||
                  el.pay_contact_phones_old != "0"
                    ? "[ Teléfono Contacto Pago ]"
                    : "") +
                  (el.pay_contact_email_old != 0 ||
                  el.pay_contact_email_old != "0"
                    ? "[ Email Contacto Pago ]"
                    : "") +
                  (el.bills_contact_first_name_old != 0 ||
                  el.bills_contact_first_name_old != "0"
                    ? "[ Nombre Contacto Factura ]"
                    : "") +
                  (el.bills_contact_last_name_old != 0 ||
                  el.bills_contact_last_name_old != "0"
                    ? "[ Apellido Contacto Factura ]"
                    : "") +
                  (el.bills_contact_address_old != 0 ||
                  el.bills_contact_address_old != "0"
                    ? "[ Direccion Contacto Factura ]"
                    : "") +
                  (el.bills_contact_phones_old != 0 ||
                  el.bills_contact_phones_old != "0"
                    ? "[ Teléfono Contacto Factura ]"
                    : "") +
                  (el.bills_contact_email_old != 0 ||
                  el.bills_contact_email_old != "0"
                    ? "[ Email Contacto Factura ]"
                    : ""),
              };
            })
          );
          console.log(rows);
          setPagination(count);
          setPageCount(pageCount + 1);
          setLoadingApis(false);
          // setLoadingApis(verificacarga());
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingApis(false);
      });
  }
  // useEffect(() => {
  //   if(DataRows!=undefined){

  //   }
  // }, [DataRows])

  useEffect(() => {
    getHistData();
  }, [props.idParticipant, pageIndex, rowsPerPage]);
  let rows = [];

  // useEffect(() => {
  //   (async () => {
  //     const dataHist = await axios.get(url);
  //     setData(dataHist.data);
  //   })();

  // }, [props.idParticipant]);

  // data.map(
  //   ({
  //     id,
  //     editor,
  //     date,

  //     updated_ts_old,
  //     updated_ts_new,
  //     name_old,
  //     rut_old,
  //     verification_code_old,
  //     business_name_old,
  //     commercial_business_old,
  //     dte_reception_email_old,
  //     bank_account_old,
  //     bank_old,
  //     commercial_address_old,
  //     postal_address_old,
  //     manager_old,
  //     pay_contact_first_name_old,
  //     pay_contact_last_name_old,
  //     pay_contact_address_old,
  //     pay_contact_phones_old,
  //     pay_contact_email_old,
  //     bills_contact_first_name_old,
  //     bills_contact_last_name_old,
  //     bills_contact_address_old,
  //     bills_contact_phones_old,
  //     bills_contact_email_old,
  //   }) =>
  //     rows.push(
  //       createData(
  //         id,
  //         editor,
  //         date,

  //         updated_ts_old,
  //         updated_ts_new,
  //         (name_old != 0 || name_old != "0" ? "[ Nombre ] " : "") +
  //           (rut_old != 0 || rut_old != "0" ? " [ Rut ] " : "") +
  //           (verification_code_old != 0 || verification_code_old != "0"
  //             ? "[ Token ]"
  //             : "") +
  //           (business_name_old != 0 || business_name_old != "0"
  //             ? "[ Razón Social ]"
  //             : "") +
  //           (commercial_business_old != 0 || commercial_business_old != "0"
  //             ? "[ Giro ]"
  //             : "") +
  //           (dte_reception_email_old != 0 || dte_reception_email_old != "0"
  //             ? "[ Email DTE ]"
  //             : "") +
  //           (bank_account_old != 0 || bank_account_old != "0"
  //             ? "[ Cuenta de Banco ]"
  //             : "") +
  //           (bank_old != 0 || bank_old != "0" ? "[ Banco ]" : "") +
  //           (commercial_address_old != 0 || commercial_address_old != "0"
  //             ? "[ Dirección Comercial ]"
  //             : "") +
  //           (postal_address_old != 0 || postal_address_old != "0"
  //             ? "[ Dirección Postal ]"
  //             : "") +
  //           (manager_old != 0 || manager_old != "0"
  //             ? "[ Gerente General ]"
  //             : "") +
  //           (pay_contact_first_name_old != 0 ||
  //           pay_contact_first_name_old != "0"
  //             ? "[ Nombre Contacto Pago ]"
  //             : "") +
  //           (pay_contact_last_name_old != 0 || pay_contact_last_name_old != "0"
  //             ? "[ Apellido Contacto Pago ]"
  //             : "") +
  //           (pay_contact_address_old != 0 || pay_contact_address_old != "0"
  //             ? "[ Dirección Contacto Pago ]"
  //             : "") +
  //           (pay_contact_phones_old != 0 || pay_contact_phones_old != "0"
  //             ? "[ Teléfono Contacto Pago ]"
  //             : "") +
  //           (pay_contact_email_old != 0 || pay_contact_email_old != "0"
  //             ? "[ Email Contacto Pago ]"
  //             : "") +
  //           (bills_contact_first_name_old != 0 ||
  //           bills_contact_first_name_old != "0"
  //             ? "[ Nombre Contacto Factura ]"
  //             : "") +
  //           (bills_contact_last_name_old != 0 ||
  //           bills_contact_last_name_old != "0"
  //             ? "[ Apellido Contacto Factura ]"
  //             : "") +
  //           (bills_contact_address_old != 0 || bills_contact_address_old != "0"
  //             ? "[ Direccion Contacto Factura ]"
  //             : "") +
  //           (bills_contact_phones_old != 0 || bills_contact_phones_old != "0"
  //             ? "[ Teléfono Contacto Factura ]"
  //             : "") +
  //           (bills_contact_email_old != 0 || bills_contact_email_old != "0"
  //             ? "[ Email Contacto Factura ]"
  //             : "")
  //       )
  //     )
  //   // (name_old !=0 || name_old !='0' ?'Nombre':'')+','+(rut_old !=0 || rut_old !='0' ?'Rut ,':'')+','+(verification_code_old !=0 || verification_code_old !='0' ?'C':'')
  // );
  const handleChangePagedos = () => {
    setLoadingApis(true);
    setPageIndex(pageIndex > 1 ? pageIndex - 1 : 1);
    if (pageIndex === 1) {
      setLoadingApis(false);
    }

    // getHistData();
  };
  const handleChangePage = () => {
    setLoadingApis(true);

    setPageIndex(pageIndex === pageCount ? pageIndex : pageIndex + 1);
    if (pageIndex === pageCount) {
      setLoadingApis(false);
    }

    // getHistData();
  };
  const handleChangeRowsCount = (option) => {
    if (rowsPerPage != option) {
      setLoadingApis(true);
      setRowsPerPage(option);
      setPageIndex(1);
      // getHistData();
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.codigo);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, codigo) => {
    const selectedIndex = selected.indexOf(codigo);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, codigo);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (codigo) => selected.indexOf(codigo) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const getModal = (rows, date) => {
    setHistId(rows);
    setHistDate(date);

    setTable(false);
  };
  if (LoadingApis) {
    return (
      <Box className=" relative lfmax:w-[600px] p-[30px] ">
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="primary" />
        </Stack>
      </Box>
    );
  } else {
    return (
      <Box className=" relative lfmax:w-[600px] p-[30px] ">
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
            <b>{`Página ${pageIndex} de ${pageCount} / Total de filas: ${pagination}`}</b>
          </div>
        </div>
        <TableContainer>
          <Box sx={{ maxHeight: 360 }} overflow-y-auto>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {DataRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        const valuee = row;
                        return (
                          <TableCell
                            key={column.id}
                            style={{ cursor: "pointer" }}
                            onClick={
                              table
                                ? () => getModal(valuee.id, valuee.date)
                                : () => setTable(true)
                            }
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
        {/* <TablePagination
      rowsPerPageOptions={[6, 10, 25]}
      labelRowsPerPage="Filas por página"
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    /> */}
        {!table && (
          <ModalCampo
            rows={sendData}
            valueId={histId}
            date={histDate}
            setTable={() => setTable(true)}
          />
        )}
      </Box>
    );
  }
}
