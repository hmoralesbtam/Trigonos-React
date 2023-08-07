import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { SiMicrosoftexcel } from "react-icons/si";
import { Button, TextField } from "@mui/material";
import { HiDownload } from "react-icons/hi";
import * as XLSX from "xlsx";
import { visuallyHidden } from "@mui/utils";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
//IMPORTACIONES PARA LOS DATAPICKER
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AdapterDateFns from "@date-io/date-fns";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { es } from "date-fns/locale";
//
import {
  Autocomplete,
  Divider,
  FormControlLabel,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormLabel,
} from "@mui/material";
function createData(
  rut,
  nombre,
  nro_documento,
  monto_pago,
  fecha_acept,
  glosa,
  id,
  disc
) {
  return {
    rut,
    nombre,
    nro_documento,
    monto_pago,
    fecha_acept,
    glosa,
    id,
    disc,
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
const headCells = [
  {
    id: "rut",
    numeric: false,
    disablePadding: true,
    label: "Rut Beneficiario",
  },
  {
    id: "nombre",
    numeric: false,
    disablePadding: false,
    label: "Nombre Beneficiario",
  },
  {
    id: "nro_documento",
    numeric: true,
    disablePadding: false,
    label: "N° Documento",
  },
  {
    id: "monto_pago",
    numeric: false,
    disablePadding: false,
    label: "Monto Pago",
  },
  {
    id: "fecha_acept",
    numeric: false,
    disablePadding: false,
    label: "Fecha Aceptación",
  },
  {
    id: "glosa",
    numeric: false,
    disablePadding: false,
    label: "Glosa",
  },
  {
    id: "Disconformidad",
    numeric: false,
    disablePadding: false,
    label: "Fecha Disconformidad",
  },
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
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            // align={headCell.numeric ? 'right' : 'left'}
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

  return (
    <Toolbar
      className="w-full"
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 1 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionados
        </Typography>
      ) : numSelected === 1 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} seleccionado
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle" component="div">
          Listado de nominas
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  let conditionPeriods = 0;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nro_documento");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [dataExport, setDataExport] = useState([]);
  const [disabledDateEnd, setDisabledDateEnd] = useState(true);
  const [checked, setChecked] = useState(false);
  const [render, setRender] = useState(false);
  const [glosa, setGlosa] = useState("");
  const [inputValue, setInputValue] = useState("");
  let rows = [];
  let glosas = [];
  let pruebaaa = [];
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }
  // const [disc, setDisc] = useState(false);
  const chile = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  });
  const limpiarFiltros = () => {
    rows = [];

    props.sendDiscData(false, "");
    activarDisc(false, "");
    setGlosa("");
    setChecked(false);
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
  if (props.payRollDataPrueba.length > 0) {
    props.payRollDataPrueba.map((p) => {
      rows.push(
        createData(
          p.rutAcreedor,
          p.nombreAcreedor,
          p.folio,
          chile.format(p.valorNeto),
          "29-07-2022",
          p.glosa,
          p.id,
          p.fechaDesconformidad
        )
      );
      glosas.push(p.glosa);
    });
  }

  useEffect(() => {
    if (props.payRollDataPrueba.length > 0) {
      let prueba = props.payRollDataPrueba.filter((p) =>
        selected.includes(p.id)
      );
      setDataExport(prueba);
      let pruebaValor = 0;
      prueba.map((p) => (pruebaValor = pruebaValor + p.valorNeto));
      setTotal(pruebaValor);
    }
  }, [selected]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (rut) => selected.indexOf(rut) !== -1;
  let headersExcel = [
    [
      "Rut",
      "Nombre Beneficiario",
      "FP",
      "BCO",
      "N° Cuenta Cte.",
      "N° Documento",
      "Monto a pago",
      "Of BCI",
      "Fecha",
      "Ap. Paterno",
      "Ap. Materno",
      "Nombre",
      "Rut Retirador",
      "Tipo",
      "Glosa",
      "CONVENIO",
      "EMAIL",
    ],
  ];
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function convertToSheet(data) {
    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, headersExcel);
    const sheet = XLSX.utils.sheet_add_json(ws, data, {
      origin: "A2",
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "filename.xlsx");
  }
  function downloadExcelFile(filename, data) {
    let dataPrueba = [];
    for (let i in data) {
      let obj = new Object();

      obj.Rut = data[i].rutAcreedor;
      obj.Nombre_Beneficiario = data[i].nombreAcreedor;
      obj.Fp = "CCT";
      obj.Bco = data[i].sBifAcreedor;
      obj.NumeroCuenta = data[i].cuentaBancoAcreedor;
      obj.NumeroDocumento = data[i].folio;
      obj.MontoPago = data[i].valorNeto;
      obj.OfBci = "";
      obj.Fecha = "23/03/2023";
      obj.ApPaterno = "";
      obj.ApMaterno = "";
      obj.Nombre = data[i].cuentaBancoAcreedor;
      obj.RutRetirador = "";
      obj.Tipo = "FAC";
      obj.Glosa = data[i].glosa;
      obj.Convenio = "";
      obj.Email = data[i].correoDteAcreedor;
      dataPrueba.push(obj);
    }
    convertToSheet(dataPrueba);
  }
  const activarDisc = (param, glosa = "") => {
    rows = [];

    if (param.target != undefined) {
      setGlosa("");
      setChecked(param.target.checked);
      props.sendDiscData(param.target.checked, glosa);
      props.changedDisc();
      return;
    }
    props.sendDiscData(checked, glosa);
    render ? setRender(false) : setRender(true);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box className="w-full text-center  p-[20px]">
        <Typography
          className="bg-grey-50"
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tabla de Nominas "BCI"
        </Typography>
        <h1 className="border border-b-pantoneazul"></h1>
        <div className="flex flex-row justify-center align-middle  ">
          <div className="bg-grey-100 flex flex-row p-[5px] m-[10px] rounded-lg">
            <Typography
              className="mt-[11px]"
              variant="subtitle1"
              id="tableTitle"
              component="div"
            >
              Disconformidad
            </Typography>
            <Switch
              checked={checked}
              onChange={(e) => activarDisc(e, "")}
              inputProps={{ "aria-label": "controlled" }}
              sx={{ mt: 1 }}
            />
          </div>
          <Autocomplete
            disablePortal
            value={glosa}
            id="combo-box-demo"
            options={glosas.filter(onlyUnique)}
            onChange={(event, newValue) =>
              newValue != undefined && setGlosa(newValue)
            }
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            sx={{ width: 300, mt: 2 }}
            renderInput={(params) => <TextField {...params} label="Concepto" />}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <FormControlLabel
              control={<Checkbox />}
              label="Desde"
              disabled
              checked
              name="desde"
              sx={{ ml: 2, mt: 1 }}
            />
            <DatePicker
              views={["year", "month"]}
              label="Fecha inicio"
              openTo="year"
              minDate={new Date("2017-02-01")}
              maxDate={new Date("2023-01-01")}
              // value={sInicioPeriodo === "" ? null : sInicioPeriodo}
              // onChange={(value) => {
              //   value != null &&
              //     setSelected({
              //       ...selected,
              //       sInicioPeriodo: value,
              //     });
              // }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  sx={{ mt: 2, width: 300 }}
                />
              )}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Hasta"
              onChange={(e) => conditionalPeriods(e)}
              name="hasta"
              sx={{ ml: 2, mt: 1 }}
            />
            <DatePicker
              views={["year", "month"]}
              label="Fecha termino"
              openTo="year"
              disabled={disabledDateEnd ? true : false}
              minDate={new Date("2017-02-01")}
              maxDate={new Date("2023-01-01")}
              // value={sInicioPeriodo === "" ? null : sInicioPeriodo}
              // onChange={(value) => {
              //   value != null &&
              //     setSelected({
              //       ...selected,
              //       sInicioPeriodo: value,
              //     });
              // }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  sx={{ mt: 2, width: 300 }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <h1 className="border border-b-pantoneazul"></h1>
        <div className="flex flex-row justify-center align-middle  ">
          <Button
            className="sm:w-[200px] lg:w-[300px] max-w-[300px] mt-[10px] mr-[100px] "
            variant="contained"
            color="secondary"
            onClick={() => limpiarFiltros()}
          >
            Limpiar Filtros
          </Button>
          <Button
            className="sm:w-[200px] lg:w-[300px] max-w-[300px] mt-[10px] "
            variant="contained"
            color="secondary"
            onClick={() => activarDisc(checked, glosa)}
          >
            {/* <SiMicrosoftexcel className="mr-3 " /> */}
            Buscar
          </Button>

          <Button
            className="sm:w-[200px] lg:w-[300px] max-w-[300px] mt-[10px] ml-[100px]"
            variant="contained"
            color="secondary"
            onClick={() => downloadExcelFile("mydata", dataExport)}
          >
            <SiMicrosoftexcel className="mr-3 " />
            Nomina de pago <HiDownload />
          </Button>
        </div>
      </Box>
      <h1 className="border border-b-pantoneazul"></h1>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": "Disconformidad",
                        }}
                      />
                    </TableCell>
                    {/* <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="left"
                    >
                      {row.id}
                    </TableCell> */}
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="left"
                    >
                      {row.rut}
                    </TableCell>
                    <TableCell align="left">{row.nombre}</TableCell>
                    <TableCell align="left">{row.nro_documento}</TableCell>
                    <TableCell align="left">{row.monto_pago}</TableCell>
                    <TableCell align="left">{row.fecha_acept}</TableCell>
                    <TableCell align="left">{row.glosa}</TableCell>
                    <TableCell align="left">{row.disc}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={2}>Total a pagar</TableCell>
              <TableCell align="left">{chile.format(total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        // label="prueba"
        labelRowsPerPage="Filas por página"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
