import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import LoadingButton from "@mui/lab/LoadingButton";
import * as XLSX from "xlsx";
import SaveIcon from "@mui/icons-material/Save";
import { SiMicrosoftexcel, SiBitcoinsv } from "react-icons/si";
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
import {
  useGetAgentesDeParticipanteMutation,
  useGetNumAgentesMutation,
} from "app/store/participantesApi/participantesApi";
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
//CABECERAS DEL EXCEL
let headAgentes = [
  ["ID", "Nombre", "Correo", "Telefono", "Nombre_Empresa", "Rut_Empresa"],
];
const columns = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "nombre", label: "Nombre", minWidth: 40 },
  { id: "correo", label: "Correo", minWidth: 40 },
  { id: "telefono", label: "Teléfono", minWidth: 40 },
  { id: "nombreEmpresa", label: "Nombre Empresa", minWidth: 40 },
  { id: "rutEmpresa", label: "Rut Empresa", minWidth: 40 },
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

export default function TablaAgentes(props) {
  const [table, setTable] = React.useState(true);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [histId, setHistId] = useState(0);
  const [histDate, setHistDate] = useState("");
  const [LoadingApis, setLoadingApis] = useState(false);
  const [DataRows, setDataRows] = useState([]);
  const [sendData, setSendData] = useState([]);
  const [getDataAgent, { isLoading: isLoadingHist }] =
    useGetAgentesDeParticipanteMutation();
  const [getAllData, { isLoading: isLoadingAllData }] =
    useGetAgentesDeParticipanteMutation();
  const [getNumAgent, { isLoading: isLoadingNumAgent }] =
    useGetNumAgentesMutation();
  const [getExcelData, setGetExcelData] = useState([]);
  const [cargaGetAgentsData, setCargaGetAgentsData] = useState(true);

  // const { data: getDataHist, isFetching: fetchHist, refetch: refetchHist} =  useGetHistorificacionMutation({id:props.idParticipant, PageIndex:pageIndex, PageSize:rowsPerPage  });
  // let url = ` https://trigonosapi.azurewebsites.net/Historificacion?id=${props.idParticipant}`;

  const convertAndDownloadExcel = (header, data, name, tipoExcel) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, header);
    if (tipoExcel) {
      const data_ = data.map(function (el) {
        return {
          id: el.id,
          nombre: (el.nombre ? el.nombre.trim() != "" : el.nombre)
            ? el.nombre
            : "Sin Nombre",
          correo: (el.correo ? el.correo.trim() != "" : el.correo)
            ? el.correo
            : "Sin Correo",
          telefono: (
            el.telefono
              ? el.telefono.trim().replace("[]", "") != ""
              : el.telefono
          )
            ? el.telefono
            : "Sin Teléfono",
          nombreEmpresa: el.nombreEmpresa,
          rutEmpresa: el.rutEmpresa,
        };
      });

      const sheet = XLSX.utils.sheet_add_json(ws, data_, {
        origin: "A2",
        skipHeader: true,
      });

      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      XLSX.writeFile(wb, `${name}.xlsx`);
    } else {
      const sheet = XLSX.utils.sheet_add_json(ws, data, {
        origin: "A2",
        skipHeader: true,
      });

      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      XLSX.writeFile(wb, `${name}.xlsx`);
    }
  };
  function getAllDataToExcel() {
    setGetExcelData([]);
    setCargaGetAgentsData(true);
    let specData = {
      PageIndex: 1,
      PageSize: 1000,
    };

    getNumAgent(specData)
      .then((response) => {
        console.log(response);
        const buclesF = Math.round(response.data / 1000 + 0.49) + 1;
        console.log(buclesF);
        const requests = Array.from({ length: buclesF - 1 }, (_, index) => {
          specData.PageIndex = index + 1;
          return getAllData(specData);
        });
        console.log(requests);

        Promise.all(requests)
          .then((responses) => {
            const newData = responses
              .map((response) => response.data.data)
              .flat();
            setGetExcelData((prevLista) => {
              if (Array.isArray(prevLista)) {
                return [...prevLista, ...newData];
              } else {
                return [...newData];
              }
            });
            setCargaGetAgentsData(false);
            console.log(newData);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getHistData() {
    setLoadingApis(true);
    getDataAgent({
      PageIndex: pageIndex,
      PageSize: rowsPerPage,
      Rut: props.rutParticipant,
    })
      .then((response) => {
        //   console.log("id",props.idParticipant);
        //   console.log("Respuesta",response);
        const { data, count, pageCount, pageIndex, pageSize } = response.data;

        if (response.data) {
          setSendData(data);
          setDataRows(
            data.map(function (el) {
              return {
                id: el.id,
                nombre: (el.nombre ? el.nombre.trim() != "" : el.nombre)
                  ? el.nombre
                  : "Sin Nombre",
                correo: (el.correo ? el.correo.trim() != "" : el.correo)
                  ? el.correo
                  : "Sin Correo",
                telefono: (
                  el.telefono
                    ? el.telefono.trim().replace("[]", "") != ""
                    : el.telefono
                )
                  ? el.telefono
                  : "Sin Teléfono",
                nombreEmpresa: el.nombreEmpresa,
                rutEmpresa: el.rutEmpresa,
              };
            })
          );
          // console.log(rows);
          setPagination(count);
          setPageCount(pageCount);
          setLoadingApis(false);
          // setLoadingApis(verificacarga());
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingApis(false);
      });
  }

  useEffect(() => {
    getHistData();
    getAllDataToExcel();
  }, [props.rutParticipant, pageIndex, rowsPerPage]);
  let rows = [];

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
  //   const getModal = (rows, date) => {
  //     setHistId(rows);
  //     setHistDate(date);

  //     setTable(false);
  //   };
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
        <Box className="flex justify-end space-x-[20px]">
          <Tooltip
            title="Descargar Excel del Participante Actual"
            arrow
            placement="top"
          >
            <span>
              <LoadingButton
                loading={cargaGetAgentsData}
                loadingPosition="start"
                startIcon={<SiMicrosoftexcel />}
                variant="contained"
                color="success"
                onClick={() => {
                  convertAndDownloadExcel(
                    headAgentes,
                    DataRows,
                    `Excel del participante ${props.nameParticipant}`,
                    false
                  );
                }}
              >
                Agentes del Participante Actual
              </LoadingButton>
            </span>
          </Tooltip>
          <Tooltip
            title="Descargar Excel de todos los participantes"
            arrow
            placement="top"
          >
            <span>
              <LoadingButton
                loading={cargaGetAgentsData}
                loadingPosition="start"
                startIcon={<SiMicrosoftexcel />}
                variant="contained"
                color="success"
                onClick={() => {
                  convertAndDownloadExcel(
                    headAgentes,
                    getExcelData,
                    `Excel Todos los Agentes`,
                    true
                  );
                }}
              >
                Todos los Agentes
              </LoadingButton>
            </span>
          </Tooltip>
        </Box>

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
                            //   onClick={
                            //     table
                            //       ? () => getModal(valuee.id, valuee.date)
                            //       : () => setTable(true)
                            //   }
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
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              DataRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const valuee = row;
                      return (
                        <TableCell
                          key={column.id}
                          style={{ cursor: "pointer" }}
                        //   onClick={
                        //     table 
                        //       ? () => getModal(valuee.id, valuee.date)
                        //       : () => setTable(true)
                        //   }
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
        {/* {!table && (
      <ModalCampo
        rows={sendData}
        valueId={histId}
        date={histDate}
        setTable={() => setTable(true)}
      />
    )} */}
      </Box>
    );
  }
}
