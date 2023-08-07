import { styled, useTheme } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import * as XLSX from "xlsx";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
//ICONS
import { SiMicrosoftexcel, SiBitcoinsv } from "react-icons/si";
import Checkbox from "@mui/material/Checkbox";

import axios from "axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import PeopleIcon from "@mui/icons-material/People";
// MODAL
import Dialog from "@mui/material/Dialog";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
//
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";

import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useCallback, useEffect, useState } from "react";
// import ModalEditUser from "./widgets/ModalEditUser";
import { forwardRef } from "react";

//SECCIÓN PARA REALIZAR REDIRECCION DE RUTA/LINK A OTRA VENTANA
import PropTypes from "prop-types";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

import {
  useGetUsuariosPaginationQuery,
  useGetUsuariosRolesQuery,
} from "app/store/usuariosApi/usuariosApi";
// import { useGetEmpresasQuery } from "app/store/empresaApi/empresaApi";
import {
  useGetParticipantesByIdMutation,
  useGetParticipantesQuery,
} from "app/store/participantesApi/participantesApi";
import {
  useGetInstruccionesQuery,
  usePostFacturacionClMutation,
} from "app/store/instrucciones/instruccionesApi";
import { id } from "date-fns/locale";

let theme = createTheme(esES);

theme = responsiveFontSizes(theme);
const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

let rows = [];
let rowspermanent = [];

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

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "nombre";
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    erp,
  } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };
  let headCells;
  if (erp == 2) {
    headCells = [
      {
        id: "id",
        numeric: false,
        disablePadding: false,
        label: "id",
      },
      {
        id: "rut",
        numeric: false,
        disablePadding: false,
        label: "Rut",
      },
      {
        id: "razonSocial",
        numeric: false,
        disablePadding: false,
        label: "Razón Social",
      },
      {
        id: "giro",
        numeric: false,
        disablePadding: false,
        label: "Giro",
      },
      {
        id: "comuna",
        numeric: false,
        disablePadding: false,
        label: "Comuna",
      },
      {
        id: "direccion",
        numeric: false,
        disablePadding: false,
        label: "Dirección",
      },
      {
        id: "producto",
        numeric: false,
        disablePadding: false,
        label: "Producto",
      },
      {
        id: "precio",
        numeric: false,
        disablePadding: false,
        label: "Precio",
      },
    ];
  } else if (erp == 1) {
    headCells = [
      {
        id: "id",
        numeric: false,
        disablePadding: false,
        label: "id",
      },
      {
        id: "folioReferencia",
        numeric: false,
        disablePadding: false,
        label: "Folio Referencia",
      },
      {
        id: "razonReferencia",
        numeric: false,
        disablePadding: false,
        label: "Razón Referencia",
      },
      {
        id: "razonSocial",
        numeric: false,
        disablePadding: false,
        label: "Razón Social",
      },
      {
        id: "rut",
        numeric: false,
        disablePadding: false,
        label: "Rut",
      },
      {
        id: "folio",
        numeric: false,
        disablePadding: false,
        label: "Folio",
      },
      {
        id: "fechaCarta",
        numeric: false,
        disablePadding: false,
        label: "Fecha Carta",
      },
      {
        id: "concepto",
        numeric: false,
        disablePadding: false,
        label: "Concepto",
      },
      {
        id: "neto",
        numeric: false,
        disablePadding: false,
        label: "Neto",
      },
      {
        id: "iva",
        numeric: false,
        disablePadding: false,
        label: "Iva",
      },
      {
        id: "total",
        numeric: false,
        disablePadding: false,
        label: "Total",
      },
      {
        id: "giro",
        numeric: false,
        disablePadding: false,
        label: "Giro",
      },
      {
        id: "direccion",
        numeric: false,
        disablePadding: false,
        label: "Dirección",
      },
      {
        id: "comuna",
        numeric: false,
        disablePadding: false,
        label: "Comuna",
      },
    ];
  } else if (erp == 7) {
    headCells = [
      {
        id: "id",
        numeric: false,
        disablePadding: false,
        label: "id",
      },
      {
        id: "numeroCorrelativo",
        numeric: false,
        disablePadding: false,
        label: "Número (Correlativo)",
      },
      {
        id: "fecha",
        numeric: false,
        disablePadding: false,
        label: "Fecha",
      },
      {
        id: "fechaVencimiento",
        numeric: false,
        disablePadding: false,
        label: "Fecha de Vencimiento",
      },
      {
        id: "codigoCliente",
        numeric: false,
        disablePadding: false,
        label: "Código del Cliente",
      },
      {
        id: "afecto",
        numeric: false,
        disablePadding: false,
        label: "Afecto",
      },
      {
        id: "total",
        numeric: false,
        disablePadding: false,
        label: "Total",
      },
      {
        id: "nombre",
        numeric: false,
        disablePadding: false,
        label: "Nombre",
      },
      {
        id: "direccion",
        numeric: false,
        disablePadding: false,
        label: "Drección",
      },
      {
        id: "comentarioProducto",
        numeric: false,
        disablePadding: false,
        label: "Comentario Producto",
      },
    ];
  } else if (erp == 7 || erp == 5) {
    headCells = [
      {
        id: "id",
        numeric: false,
        disablePadding: false,
        label: "id",
      },
      //
      {
        id: "numeroCorrelativo",
        numeric: false,
        disablePadding: false,
        label: "Número (Correlativo)",
      },
      {
        id: "fecha",
        numeric: false,
        disablePadding: false,
        label: "Fecha",
      },
      {
        id: "fechaVencimiento",
        numeric: false,
        disablePadding: false,
        label: "Fecha de Vencimiento",
      },
      {
        id: "codigoCliente",
        numeric: false,
        disablePadding: false,
        label: "Código del Cliente",
      },
      {
        id: "afecto",
        numeric: false,
        disablePadding: false,
        label: "Afecto",
      },
      {
        id: "total",
        numeric: false,
        disablePadding: false,
        label: "Total",
      },
      {
        id: "nombre",
        numeric: false,
        disablePadding: false,
        label: "Nombre",
      },
      {
        id: "direccion",
        numeric: false,
        disablePadding: false,
        label: "Drección",
      },
      {
        id: "comentarioProducto",
        numeric: false,
        disablePadding: false,
        label: "Comentario Producto",
      },
    ];
  }

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
            id={headCell.id}
            key={headCell.id}
            disabled={true}
            align="left"
            sx={
              headCell.id == "id"
                ? { display: { xl: "none", xs: "block" } }
                : {}
            }
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              id={headCell.id}
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
  erp: PropTypes.number.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
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
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Listado de Roles
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
function TabInstrucciones(props) {
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [visibleRows, setVisibleRows] = useState(null);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [table, setTable] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [postFacturacion] = usePostFacturacionClMutation();
  // const {
  //   data: props.dataInstructions = [],
  //   // isLoading: isLoadinginstructions = true,
  //   // isFetching: isfetchInstructions,
  // } = useGetInstruccionesQuery(props.id);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText: "",
    msgError: false,
  });
  const [cargandoModal, setCargandoModal] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const { msgResp, msgText, msgError } = MsgAlert;

  function search(searchString) {
    if (searchString.length === 0) {
      return rowspermanent;
    }

    let searchLower = searchString.toString().toLowerCase();
    function isFloat(number) {
      return number % 1 !== 0;
    }
    const filtered = rowspermanent.filter((obj) => {
      return Object.values(obj).some((value) => {
        if (typeof value === "string") {
          return value
            .toLowerCase()
            .includes(searchString.toString().toLowerCase());
        } else if (typeof value === "number") {
          if (isFloat(value)) {
            return value
              .toString()
              .toLowerCase()
              .includes(searchString.toString().toLowerCase());
          } else {
            return value
              .toString()
              .toLowerCase()
              .includes(searchString.toString().toLowerCase());
          }
        }

        return false;
      });
    });

    return filtered;
  }

  function rowsOnMount() {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );
    setVisibleRows(rowsOnMount);
  }

  //   return () => {
  //     rows = [];
  //      = [];
  //     console.log("Me ejecute");
  //   };
  // }, []);
  useEffect(() => {
    const devuelveFechaHoy = (param = 0) => {
      let fechaActual = new Date();
      param === 1 && fechaActual.setDate(fechaActual.getDate() + 2);
      let dia = fechaActual.getDate();
      let mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
      let año = fechaActual.getFullYear();

      if (dia < 10) {
        dia = "0" + dia;
      }
      if (mes < 10) {
        mes = "0" + mes;
      }
      let fechaCorta = dia + "/" + mes + "/" + año;
      return fechaCorta;
    };
    // if (!isLoadinginstructions) {
    if (props.erp == 2) {
      rows = props.dataInstructions.map((data) => {
        return {
          id: data.id_instruccions,
          rut: data.rutDeudor,
          razonSocial: data.nombreDeudor,
          giro: data.giroDeudor,
          comuna: "Las Condes",
          direccion: data.direccionDeudor,
          producto: data.glosa,
          precio: data.montoNeto,
        };
      });
    } else if (props.erp == 1) {
      rows = props.dataInstructions.map((data) => {
        return {
          id: data.id_instruccions,
          folioReferencia: data.codigoRef,
          razonReferencia: data.glosa,
          razonSocial: data.nombreDeudor,
          rut: data.rutDeudor,
          folio: data.folio,
          fechaCarta: data.fecha_carta,
          concepto: data.glosa,
          neto: data.montoNeto,
          iva: data.montoNeto * 0.19,
          total: data.montoBruto,
          giro: data.giroDeudor,
          direccion: data.direccionDeudor,
          comuna: "Las Condes",
        };
      });
    } else if (props.erp == 7 || props.erp == 5) {
      rows = props.dataInstructions.map((data) => {
        return {
          id: data.id_instruccions,
          numeroCorrelativo: data.id_instruccions,
          fecha: devuelveFechaHoy(),
          fechaVencimiento: devuelveFechaHoy(1),
          codigoCliente: data.rutDeudor,
          afecto: data.montoNeto,
          total: data.montoNeto * 0.19,
          nombre: data.nombreDeudor,
          direccion: data.direccionDeudor,
          comentarioProducto: data.glosa,
        };
      });
    }
    rowspermanent = rows;
    rowsOnMount();
    setRowsPerPage(5);
    let newPage = 0;
    setPage(newPage);
    const sortedRows = stableSort(rows, getComparator(order, orderBy));
    const updatedRows = sortedRows.slice(
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage
    );
    setVisibleRows(updatedRows);
    const numEmptyRows =
      newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;
    const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
    setPaddingHeight(newPaddingHeight);
    setTimeout(() => {
      setCargando(false);
    }, 1000);
    // }
  }, []);
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
      }, 4000);
    } else {
      setMsgAlert({
        msgResp: true,
        msgText: "SE HA FACTURADO CORRECTAMENTE",
        msgError: false,
      });
      setCargando(false);
      setTimeout(() => {
        setOpenDialog(false);
      }, 4000);
    }
  };
  const handleSetRow = (event) => {
    const {
      target: { value },
    } = event;
    rows = search(value.trim());
    rowsOnMount();
  };

  const handleRequestSort = useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        rows,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage]
  );

  //     if (event.target.checked) {
  //       const newSelected = rows.map((n) => n.codreferencia);
  //       setSelected(newSelected);
  //       return;
  //     }
  //     setSelected([]);
  //   };

  //   const handleClick = (event, codreferencia) => {
  //     const selectedIndex = selected.indexOf(codreferencia);
  //     let newSelected = [];

  //     if (selectedIndex === -1) {
  //       newSelected = newSelected.concat(selected, codreferencia);
  //     } else if (selectedIndex === 0) {
  //       newSelected = newSelected.concat(selected.slice(1));
  //     } else if (selectedIndex === selected.length - 1) {
  //       newSelected = newSelected.concat(selected.slice(0, -1));
  //     } else if (selectedIndex > 0) {
  //       newSelected = newSelected.concat(
  //         selected.slice(0, selectedIndex),
  //         selected.slice(selectedIndex + 1)
  //       );
  //     }

  //     setSelected(newSelected);
  //   };

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);
      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
          : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy]
  );

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (rut) => selected.indexOf(rut) !== -1;
  const chile = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  });
  let headersExcelF1 = [
    [
      "ID_CSV",
      "DTE",
      "ID_DTE",
      "Doc",
      "FolioReferencia",
      "RazonReferencia",
      "EstadoEmision",
      "EstadoPagado",
      "SiglaCen",
      "RazonSocial",
      "Rut",
      "Folio",
      "NNC",
      "NND",
      "FechaEmision",
      "FechaPago",
      "FechaVencimiento",
      "FechaReception",
      "FechaCarta",
      "CartaN",
      "Concepto",
      "MesConsumido",
      "Codcuadro",
      "CodigoCP",
      "Version",
      "neto",
      "iva",
      "total",
      "OrdenCompra",
      "FechaEstimaP",
      "Glosa",
      "MacroEmitFact",
      "MacroCobranza",
      "FechaEnviEmit",
      "MacroGenerarDTE",
      "giro",
      "DireccionesRecepcion",
      "ComunaRecepcion",
    ],
  ];

  let headersExcelF2Folio = [
    [
      "TIPO (33: Factura electrónica, 34:Factura exenta electrónica, 56: Nota débito electrónica, 61:Nota de crédito electrónica, 39: Boleta electrónica; 41: Boleta exenta electrónica )",
      "FOLIO",
      "Secuencia",
      "Fecha Emision",
      "Rut",
      "Razon Social",
      "Giro",
      "Comuna",
      "Direccion",
      "Afecto",
      "Producto",
      "Descripcion",
      "Cantidad",
      "Precio",
      "PORCENTDSCTO",
      "EMAIL",
      "TIPOSERVICIO (1: Boletas de servicios periódico ó Facturas de servicios periódicos domiciliarios; 2:Boletas de servicios periódicos domiciliarios ó Facturas de otros servicios periódicos; 3:Boletas de venta y servicios ó Factura de servicios)",
      "PeriodoDesde",
      "PERIODOHASTA",
      "FECHAVENCIMIENTO",
    ],
  ];
  let headersExcelF2Anexo = [
    [
      "TIPO",
      "FOLIO",
      "SECUENCIA",
      "TIPO DOCUMENTO REFERENCIADO (30: Factura, 33: Factura electrónica, 34:Factura electrónica exenta, 39: Boleta Electrónica, 41: Boleta Electrónica Exenta, 45: Factura de Compra, 46: Factura de Compra Electrónica, 50: Guía de Despacho, 52: Guía de despacho electrónica, 56: Nota débito electrónica, 61:Nota de crédito electrónica, 103:Liquidación, 801: Orden de Compra, 802: Nota de Pedido, NVE: Nota de Venta, CEC: Centro de Costo, 803: Contrato)",
      "FOLIO DOCUMENTO REFERENCIADO",
      "FECHA DOCUMENTO REFERENCIADO",
      "MOTIVO REFERENCIA(1: Anula documento, 2: Corrige texto, 3: Corrige monto)",
      "GLOSA REFERENCIA",
    ],
  ];
  let headersExcelF3 = [
    [
      "Rut",
      "Tipo",
      "Folio",
      "FechaEmision",
      "Rutreceptor",
      "RazonSocial",
      "giro",
      "DireccionesRecepcion",
      "ComunaRecepcion",
      "Email",
      "Exento",
      "neto",
      "iva",
      "total",
      "TipoReferencia",
      "CodReferencia",
      "DES1",
      "GLO1",
      "MNT1",
      "DES2",
      "GLO2",
      "MNT2",
      "DES3",
      "GLO3",
      "MNT3",
      "DES4",
      "GLO4",
      "MNT4",
      "DES5",
      "GLO5",
      "MNT5",
      "DES6",
      "GLO6",
      "MNT6",
      "DES7",
      "GLO7",
      "MNT7",
      "DES8",
      "GLO8",
      "MNT8",
      "DES9",
      "GLO9",
      "MNT9",
      "DES10",
      "GLO10",
      "MNT10",
      "GlosaLarga",
      "FechaVencimiento",
      "GlosaReferencia",
      "FechaCarta",
    ],
  ];
  let headersExcelF7 = [
    [
      "DestinodelDocumento",
      "Documentoimpresosegeneranulo",
      "DocumentoimpresoGeneraRebajaStock",
      "TipodeDocumento",
      "NúmeroCorrelativo",
      "Nimerofinalsiloboletas",
      "Fecha",
      "Local",
      "Vendedor",
      "MonedaReferencia",
      "TasaReferencia",
      "CondicióndePago",
      "FechadeVencimiento",
      "CódigodelCliente",
      "TipodeCliente",
      "CentrodeNegocios",
      "Clasificador1",
      "Clasificador2",
      "OrigendelDocumento",
      "ListadePrecio",
      "CódigodelProyecto",
      "Afecto",
      "Exento",
      "Total",
      "BodegaInventario",
      "MotivodemovimientoInventario",
      "CentrodeNegociosInventario",
      "TipodeCuentaInventario",
      "ProveedorInventario",
      "DireccióndeDespacho",
      "Clasificador1Inventario",
      "Clasificador2Inventario",
      "CódigoLegal",
      "Nombre",
      "Giros",
      "Dirección",
      "Ciudads",
      "Rubro",
      "Glosa",
      "LíneadeDetalle",
      "ArticuloServicio",
      "CodigodelProducto",
      "Cantidad",
      "PrecioUnitario",
      "Descuento",
      "TipodeDescuento",
      "TipodeVenta",
      "TotaldelProducto",
      "PrecioLista",
      "TotalNeto",
      "FichaProducto",
      "CentrodeNegociosProducto",
      "Clasificador1Producto",
      "Clasificador2Producto",
      "CantidaddeUnidadEquivalente",
      "CantidaddePeriodos",
      "ComentarioProducto",
      "AnálisisAtributo1Producto",
      "AnálisisAtributo2Producto",
      "AnálisisAtributo3Producto",
      "AnálisisAtributo4Producto",
      "AnálisisAtributo5Producto",
      "AnálisisLoteProducto",
      "FechadeVencimientoLote",
      "IngresoManual",
      "TipodeInventario",
      "Clasificador1InventarioLinea",
      "Clasificador2InventarioLinea",
      "NúmerodeDescuento",
      "Descuento2",
      "TipodeDescuento2",
      "NumerodeImpuesto",
      "CódigodeImpuesto",
      "ValordeImpuesto",
      "MontodeImpuesto",
      "CentrodeNegociosProducto2",
      "Clasificador1Impuesto",
      "Clasificador2Impuesto",
      "NúmerodeCuota",
      "FechadeCuota",
      "MontodeCuota",
      "RelaciónlineaSeries",
      "SufijoArtículoInventario",
      "TipodeRecargoyDescuento",
      "PrefijoArtículoInventario",
      "SerieArtículoInventario",
      "Distrito",
      "Transacción",
      "FechaFacturaciónDesde",
      "FechaFacturaciónHasta",
      "VíadeTransporte",
      "PaísDestinoReceptor",
      "PaísDestinoEmbarque",
      "ModalidadVenta",
      "TipoDespacho",
      "IndicadordeServicio",
      "ClaúsuladeVenta",
      "TotalClaúsuladeVenta",
      "PuertoEmbarque",
      "PuertoDesembarque",
      "UnidaddeMedidaTara",
      "TotalMedidaTara",
      "UnidadPesoBruto",
      "TotalPesoBruto",
      "UnidadPesoNeto",
      "TotalPesoNeto",
      "TipodeBulto",
      "TotaldeBultos",
      "FormadePago",
      "TipoDocumentoAsociado",
      "FolioDocumentoAsociado",
      "FechaDocumentoAsociado",
      "ComentarioDocumentoAsociado",
      "email",
      "EsdocumentodetraspasoSsiNno",
    ],
  ];

  function convertToSheet(data, nubox = 0) {
    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    if (props.erp == 1) {
      XLSX.utils.sheet_add_aoa(ws, headersExcelF1);
    } else if (props.erp == 2 && nubox == 1) {
      XLSX.utils.sheet_add_aoa(ws, headersExcelF2Folio);
    } else if (props.erp == 2 && nubox == 2) {
      XLSX.utils.sheet_add_aoa(ws, headersExcelF2Anexo);
    } else if (props.erp == 7 || props.erp == 5) {
      XLSX.utils.sheet_add_aoa(ws, headersExcelF7);
    }
    const sheet = XLSX.utils.sheet_add_json(ws, data, {
      origin: "A2",
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "filename.xlsx");
  }
  const probandoFacturacion = () => {
    setOpenDialog(true);
    setCargando(true);
    postFacturacion({ id: props.id, body: selected }).then((response) => {
      mostrarMensaje(response);
    });
  };
  function downloadExcelFile(filename, nubox = 0) {
    setOpenDialog(true);
    setCargando(true);
    let dataPrueba = [];
    const transformtToShortDate = (param) => {
      let fechaString = param;
      let fecha = new Date(fechaString);
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anio = fecha.getFullYear();
      if (dia < 10) {
        dia = "0" + dia;
      }
      if (mes < 10) {
        mes = "0" + mes;
      }
      let fechaCorta = dia + "-" + mes + "-" + anio;
      return fechaCorta;
    };
    const devuelveFechaHoy = (param = 0) => {
      let fechaActual = new Date();
      param === 1 && fechaActual.setDate(fechaActual.getDate() + 2);
      let dia = fechaActual.getDate();
      let mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
      let año = fechaActual.getFullYear();

      if (dia < 10) {
        dia = "0" + dia;
      }
      if (mes < 10) {
        mes = "0" + mes;
      }
      let fechaCorta = dia + "-" + mes + "-" + año;
      return fechaCorta;
    };
    for (let i in props.dataInstructions.filter((p) =>
      selected.includes(p.id_instruccions)
    )) {
      let obj = new Object();
      if (props.erp == 1) {
        obj.id_csv = "";
        obj.dte = "";
        obj.id_dte = "";
        obj.Doc = "";
        obj.FolioReferencia = props.dataInstructions[i].codigoRef;
        obj.RazonReferencia = props.dataInstructions[i].glosa;
        obj.EstadoEmision = "";
        obj.EstadoPagado = "";
        obj.SiglaCen = "";
        obj.RazonSocial = props.dataInstructions[i].nombreDeudor;
        obj.Rut = props.dataInstructions[i].rutDeudor;
        obj.Folio = "";
        obj.nnc = "";
        obj.nnd = "";
        obj.FechaEmision = devuelveFechaHoy();
        obj.FechaPago = "";
        obj.FechaVencimiento = devuelveFechaHoy(1);
        obj.FechaReception = "";
        obj.FechaCarta = transformtToShortDate(
          props.dataInstructions[i].fecha_carta
        );
        obj.CartaN = "";
        obj.Concepto = props.dataInstructions[i].glosa;
        obj.MesConsumido = "";
        obj.Codcuadro = "";
        obj.CodigoCP = "";
        obj.Version = "";
        obj.neto = props.dataInstructions[i].montoNeto;
        obj.iva =
          props.dataInstructions[i].montoBruto -
          props.dataInstructions[i].montoNeto;
        obj.total = props.dataInstructions[i].montoBruto;
        obj.OrdenCompra = "";
        obj.FechaEstimaP = "";
        obj.Glosa = props.dataInstructions[i].glosa;
        obj.MacroEmitFact = "";
        obj.MacroCobranza = "";
        obj.FechaEnviEmit = "";
        obj.MacroGenerarDTE = "";
        obj.giro = props.dataInstructions[i].giroDeudor;
        obj.DireccionesRecepcion = props.dataInstructions[i].direccionDeudor;
        obj.ComunaRecepcion = "Los leones";
      } else if (props.erp == 2 && nubox == 1) {
        obj.Tipo = "33";
        obj.Folio = props.dataInstructions[i].id_instruccions;
        obj.Secuencia = 1;
        obj.FechaEmision = devuelveFechaHoy();
        obj.Rut = props.dataInstructions[i].rutDeudor;
        obj.RazonSocial = props.dataInstructions[i].nombreDeudor;
        obj.giro = props.dataInstructions[i].giroDeudor.substring(0, 20);
        obj.ComunaRecepcion = "Las condes";
        obj.DireccionesRecepcion =
          props.dataInstructions[i].direccionDeudor == null
            ? ""
            : props.dataInstructions[i].direccionDeudor.substring(0, 20);
        obj.Afecto = "SI";
        obj.producto = props.dataInstructions[i].glosa;
        obj.Descripcion = "";
        obj.Cantidad = "1";
        obj.Precio = props.dataInstructions[i].montoNeto;
        obj.Porcentaje = 0;
        obj.Email = "";
        obj.TipoServicio = "";
        obj.PeriodoDesde = "";
        obj.PeriodoHasta = "";
        obj.FechaVencimiento = "";
      } else if (props.erp == 2 && nubox == 2) {
        obj.Tipo2 = "33";
        obj.Folio2 = props.dataInstructions[i].id_instruccions;
        obj.Secuencia2 = 1;
        obj.TipoDocumento = "SEN";
        obj.FolioReferencia = props.dataInstructions[i].codigoRef;
        obj.FechaCarta = transformtToShortDate(
          props.dataInstructions[i].fecha_carta
        );
        obj.MotivoRef = "";
        obj.RazonReferencia2 = props.dataInstructions[i].glosa;
      } else if (props.erp == 3) {
        obj.Rut = props.dataInstructions[i].rutDeudor.replace("-", "");
        obj.Tipo = "33";
        obj.Folio = props.dataInstructions[i].folio;
        obj.FechaEmision = devuelveFechaHoy();
        obj.Rutreceptor = props.dataInstructions[i].rutDeudor;
        obj.RazonSocial = props.dataInstructions[i].nombreDeudor;
        obj.giro = props.dataInstructions[i].giroDeudor;
        obj.DireccionesRecepcion = props.dataInstructions[i].direccionDeudor;
        obj.ComunaRecepcion = "Las condes";
        obj.Email = "";
        obj.Exento = "0";
        obj.neto = props.dataInstructions[i].montoNeto;
        obj.iva =
          props.dataInstructions[i].montoBruto -
          props.dataInstructions[i].montoNeto;
        obj.total = props.dataInstructions[i].montoBruto;
        obj.TipoReferencia = "SEN";
        obj.FolioReferencia = props.dataInstructions[i].codigoRef;
        obj.CodReferencia = "0";
        obj.DES1 = props.dataInstructions[i].glosa;
        obj.GLO1 = "";
        obj.MNT1 = props.dataInstructions[i].montoNeto;
        obj.DES2 = "";
        obj.GLO2 = "";
        obj.MNT2 = "0";
        obj.DES3 = "";
        obj.GLO3 = "";
        obj.MNT3 = "0";
        obj.DES4 = "";
        obj.GLO4 = "";
        obj.MNT4 = "0";
        obj.DES5 = "";
        obj.GLO5 = "";
        obj.MNT5 = "0";
        obj.DES6 = "";
        obj.GLO6 = "";
        obj.MNT6 = "0";
        obj.DES7 = "";
        obj.GLO7 = "";
        obj.MNT7 = "0";
        obj.DES8 = "";
        obj.GLO8 = "";
        obj.MNT8 = "0";
        obj.DES9 = "";
        obj.GLO9 = "";
        obj.MNT9 = "0";
        obj.DES10 = "";
        obj.GLO10 = "";
        obj.MNT10 = "0";
        obj.GlosaLarga = "";
        obj.FechaVencimiento = devuelveFechaHoy(2);
        obj.GlosaReferencia = props.dataInstructions[i].glosa;
        obj.FechaCarta = transformtToShortDate(
          props.dataInstructions[i].fecha_carta
        );
      } else if (props.erp == 7 || props.erp == 5) {
        obj.DestinodelDocumento = "A";
        obj.Documentoimpresosegeneranulo = "N";
        obj.DocumentoimpresoGeneraRebajaStock = "N";
        obj.TipodeDocumento = "FVAELECT";
        obj.NúmeroCorrelativo = props.dataInstructions[i].id_instruccions;
        obj.Nimerofinalsiloboletas = "";
        obj.Fecha = devuelveFechaHoy();
        obj.Local = "Local";
        obj.Vendedor = "VENDEDOR";
        obj.MonedaReferencia = "PESO";
        obj.TasaReferencia = "1";
        obj.CondicióndePago = "CR2";
        obj.FechadeVencimiento = devuelveFechaHoy(1);
        obj.CódigodelCliente = props.dataInstructions[i].rutDeudor;
        obj.TipodeCliente = "";
        obj.CentrodeNegocios = "";
        obj.Clasificador1 = "";
        obj.Clasificador2 = "";
        obj.OrigendelDocumento = "";
        obj.ListadePrecio = "";
        obj.CódigodelProyecto = "";
        obj.Afecto = props.dataInstructions[i].montoNeto;
        obj.Exento = "0";
        obj.Total = props.dataInstructions[i].montoBruto;
        obj.BodegaInventario = "";
        obj.MotivodemovimientoInventario = "";
        obj.CentrodeNegociosInventario = "";
        obj.TipodeCuentaInventario = "";
        obj.ProveedorInventario = "";
        obj.DireccióndeDespacho = "";
        obj.Clasificador1Inventario = "";
        obj.Clasificador2Inventario = "";
        obj.CódigoLegal = props.dataInstructions[i].rutDeudor;
        obj.Nombre = props.dataInstructions[i].nombreDeudor;
        obj.Giros = props.dataInstructions[i].giroDeudor;
        obj.Dirección = props.dataInstructions[i].direccionDeudor;
        obj.Ciudads = "Las condes";
        obj.Rubro = "1";
        obj.Glosa = "";
        obj.LíneadeDetalle = "1";
        obj.ArticuloServicio = "S";
        obj.CodigodelProducto = props.dataInstructions[i].glosa;
        obj.Cantidad = "1";
        obj.PrecioUnitario = props.dataInstructions[i].montoNeto;
        obj.Descuento = "0";
        obj.TipodeDescuento = "P";
        obj.TipodeVenta = "";
        obj.TotaldelProducto = props.dataInstructions[i].montoBruto;
        obj.PrecioLista = "";
        obj.TotalNeto = props.dataInstructions[i].montoNeto;
        obj.FichaProducto = "";
        obj.CentrodeNegociosProducto = "EMPADM000000000";
        obj.Clasificador1Producto = "";
        obj.Clasificador2Producto = "";
        obj.CantidaddeUnidadEquivalente = "";
        obj.CantidaddePeriodos = "";
        obj.ComentarioProducto = props.dataInstructions[i].concepto;
        obj.AnálisisAtributo1Producto = "";
        obj.AnálisisAtributo2Producto = "";
        obj.AnálisisAtributo3Producto = "";
        obj.AnálisisAtributo4Producto = "";
        obj.AnálisisAtributo5Producto = "";
        obj.AnálisisLoteProducto = "";
        obj.FechadeVencimientoLote = "";
        obj.IngresoManual = "";
        obj.TipodeInventario = "";
        obj.Clasificador1InventarioLinea = "";
        obj.Clasificador2InventarioLinea = "";
        obj.NúmerodeDescuento = "";
        obj.Descuento2 = "";
        obj.TipodeDescuento2 = "";
        obj.NumerodeImpuesto = "1";
        obj.CódigodeImpuesto = "IVA";
        obj.ValordeImpuesto = "19";
        obj.MontodeImpuesto =
          props.dataInstructions[i].montoBruto -
          props.dataInstructions[i].montoNeto;
        obj.CentrodeNegociosProducto2 = "";
        obj.Clasificador1Impuesto = "";
        obj.Clasificador2Impuesto = "";
        obj.NúmerodeCuota = "1";
        obj.FechadeCuota = devuelveFechaHoy(1);
        obj.MontodeCuota = props.dataInstructions[i].montoBruto;
        obj.RelaciónlineaSeries = "";
        obj.SufijoArtículoInventario = "";
        obj.TipodeRecargoyDescuento = "";
        obj.PrefijoArtículoInventario = "";
        obj.SerieArtículoInventario = "";
        obj.Distrito = "";
        obj.Transacción = "";
        obj.FechaFacturaciónDesde = "";
        obj.FechaFacturaciónHasta = "";
        obj.VíadeTransporte = "";
        obj.PaísDestinoReceptor = "";
        obj.PaísDestinoEmbarque = "";
        obj.ModalidadVenta = "";
        obj.TipoDespacho = "";
        obj.IndicadordeServicio = "";
        obj.ClaúsuladeVenta = "";
        obj.TotalClaúsuladeVenta = "";
        obj.PuertoEmbarque = "";
        obj.PuertoDesembarque = "";
        obj.UnidaddeMedidaTara = "";
        obj.TotalMedidaTara = "";
        obj.UnidadPesoBruto = "";
        obj.TotalPesoBruto = "";
        obj.UnidadPesoNeto = "";
        obj.TotalPesoNeto = "";
        obj.TipodeBulto = "";
        obj.TotaldeBultos = "";
        obj.FormadePago = "";
        obj.TipoDocumentoAsociado = "SEN";
        obj.FolioDocumentoAsociado = props.dataInstructions[i].codigoRef;
        obj.FechaDocumentoAsociado = transformtToShortDate(
          props.dataInstructions[i].fecha_carta
        );
        obj.ComentarioDocumentoAsociado = props.dataInstructions[i].concepto;
        obj.email = "";
        obj.EsdocumentodetraspasoSsiNno = "S";
      }
      dataPrueba.push(obj);
    }
    if (props.erp == 2 && nubox == 1) {
      convertToSheet(dataPrueba, 1);
    } else if (props.erp == 2 && nubox == 2) {
      convertToSheet(dataPrueba, 2);
    } else {
      convertToSheet(dataPrueba);
    }

    let url;
    url =
      "https://trigonosapi.azurewebsites.net/api/Instrucciones/ActualizarEstEmision?estadoEmision=4";
    axios
      .post(url, selected)
      .then(function (response) {
        mostrarMensaje(response);
      })
      .catch(function (error) {
        mostrarMensaje({ error: "api error" });
      });
  }

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
  return (
    <Box className="m-[20px]">
      <>
        <Box>
          <Box className="flex flex-row mb-[20px]  w-full">
            <TextField
              id="outlined-basic"
              label="Filtrar"
              variant="filled"
              onChange={(e) => {
                handleSetRow(e);
              }}
            />
            <Box className="flex justify-center mb-[5px] w-full">
              {props.erp == 1 || props.erp == 3 || props.erp == 7 ? (
                <Button
                  className=" rounded flex justify-start min-w-[170px] m-[5px]"
                  variant="contained"
                  color="customdos"
                  onClick={() => downloadExcelFile("mydata", 0)}
                >
                  <SiMicrosoftexcel size={30} className="mr-[10px] " />
                  Descargar
                </Button>
              ) : props.erp == 2 ? (
                <>
                  <Button
                    className=" rounded flex justify-start min-w-[170px] m-[5px]"
                    variant="contained"
                    color="customdos"
                    onClick={() => downloadExcelFile("mydata", 1)}
                  >
                    <SiMicrosoftexcel size={30} className="mr-[10px] " />
                    Descargar Folios
                  </Button>
                  <Button
                    className=" rounded flex justify-start min-w-[170px] m-[5px]"
                    variant="contained"
                    color="customdos"
                    // onClick={exportToExcel}
                    onClick={() => downloadExcelFile("mydata", 2)}
                  >
                    <SiMicrosoftexcel size={30} className="mr-[10px] " />
                    Descargar Anexo
                  </Button>
                </>
              ) : props.erp == 5 ? (
                <Button
                  className=" rounded flex justify-start min-w-[170px] m-[5px]"
                  variant="contained"
                  color="customdos"
                  onClick={() => probandoFacturacion()}
                >
                  <SiBitcoinsv size={30} className="mr-[10px]" />
                  Facturar
                </Button>
              ) : (
                <></>
              )}
            </Box>
          </Box>

          <TableContainer>
            {/* sx={{ maxHeight: 360 , overflow:"true" }} */}
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              stickyHeader
            >
              <EnhancedTableHead
                erp={props.erp}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows
                  ? visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      {
                        if (props.erp == 2 || props.erp == 3) {
                          return (
                            <StyledTableRow
                              hover
                              onClick={(event) => handleClick(event, row.id)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              selected={isItemSelected}
                            >
                              <StyledTableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": "Disconformidad",
                                  }}
                                />
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                component="th"
                                id={labelId}
                                scope="row"
                              >
                                {row.rut}
                              </StyledTableCell>
                              <StyledTableCell
                                key={row.razonSocial}
                                align="left"
                              >
                                {row.razonSocial}
                              </StyledTableCell>
                              <StyledTableCell key={row.giro} align="left">
                                {row.giro}
                              </StyledTableCell>
                              <StyledTableCell key={row.comuna} align="left">
                                {row.comuna}
                              </StyledTableCell>
                              <StyledTableCell key={row.direccion} align="left">
                                {row.direccion}
                              </StyledTableCell>
                              <StyledTableCell key={row.producto} align="left">
                                {row.producto}
                              </StyledTableCell>
                              <StyledTableCell key={row.precio} align="left">
                                {chile.format(row.precio)}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        } else if (props.erp == 1) {
                          return (
                            <StyledTableRow
                              hover
                              role="checkbox"
                              onClick={(event) => handleClick(event, row.id)}
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              selected={isItemSelected}
                            >
                              <StyledTableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": "Disconformidad",
                                  }}
                                />
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                component="th"
                                id={labelId}
                                scope="row"
                              >
                                {row.folioReferencia}
                              </StyledTableCell>
                              <StyledTableCell
                                key={row.razonReferencia}
                                align="left"
                              >
                                {row.razonReferencia}
                              </StyledTableCell>
                              <StyledTableCell
                                key={row.razonSocial}
                                align="left"
                              >
                                {row.razonSocial}
                              </StyledTableCell>
                              <StyledTableCell key={row.rut} align="left">
                                {row.rut}
                              </StyledTableCell>
                              <StyledTableCell key={row.folio} align="left">
                                {row.folio}
                              </StyledTableCell>
                              <StyledTableCell
                                key={row.fechaCarta}
                                align="left"
                              >
                                {row.fechaCarta}
                              </StyledTableCell>
                              <StyledTableCell key={row.concepto} align="left">
                                {row.concepto}
                              </StyledTableCell>
                              <StyledTableCell key={row.neto} align="left">
                                {chile.format(row.neto)}
                              </StyledTableCell>
                              <StyledTableCell key={row.iva} align="left">
                                {chile.format(row.iva)}
                              </StyledTableCell>
                              <StyledTableCell key={row.total} align="left">
                                {chile.format(row.total)}
                              </StyledTableCell>
                              <StyledTableCell key={row.giro} align="left">
                                {row.giro}
                              </StyledTableCell>
                              <StyledTableCell key={row.direccion} align="left">
                                {row.direccion}
                              </StyledTableCell>
                              <StyledTableCell key={row.comuna} align="left">
                                {row.comuna}
                              </StyledTableCell>
                              <StyledTableCell key={row.precio} align="left">
                                {chile.format(row.precio)}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        } else if (props.erp == 7 || props.erp == 5) {
                          return (
                            <StyledTableRow
                              hover
                              role="checkbox"
                              onClick={(event) => handleClick(event, row.id)}
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              selected={isItemSelected}
                            >
                              <StyledTableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": "Disconformidad",
                                  }}
                                />
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                component="th"
                                id={labelId}
                                scope="row"
                              >
                                {row.numeroCorrelativo}
                              </StyledTableCell>
                              <StyledTableCell key={row.fecha} align="left">
                                {row.fecha}
                              </StyledTableCell>
                              <StyledTableCell
                                key={row.fechaVencimiento}
                                align="left"
                              >
                                {row.fechaVencimiento}
                              </StyledTableCell>
                              <StyledTableCell
                                key={row.codigoCliente}
                                align="left"
                              >
                                {row.codigoCliente}
                              </StyledTableCell>
                              <StyledTableCell key={row.afecto} align="left">
                                {chile.format(row.afecto)}
                              </StyledTableCell>
                              <StyledTableCell key={row.total} align="left">
                                {chile.format(row.total)}
                              </StyledTableCell>
                              <StyledTableCell key={row.nombre} align="left">
                                {row.nombre}
                              </StyledTableCell>
                              <StyledTableCell key={row.direccion} align="left">
                                {row.direccion}
                              </StyledTableCell>
                              <StyledTableCell
                                key={row.comentarioProducto}
                                align="left"
                              >
                                {row.comentarioProducto}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        }
                      }
                    })
                  : null}
                {paddingHeight > 0 && (
                  <TableRow
                    style={{
                      height: paddingHeight,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            labelRowsPerPage="Filas por página"
            variant="h5"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Disminuir espacio"
        />
        <Dialog
          open={openDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          scroll={"paper"}
        >
          {cargando ? (
            <div className="flex justify-center items-center h-[250px] w-[300px]">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div>
              {msgResp && (
                <div className="flex justify-center items-center h-[250px] w-[300px]">
                  {msgError ? (
                    <div className="flex justify-center items-center h-[250px] w-[300px]">
                      <WarningIcon className="w-[68px] h-[68px]  text-red" />
                      <span className="absolute bottom-[20px] text-red">
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
        //
      </>
    </Box>
  );
}
export default TabInstrucciones;
