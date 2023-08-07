import * as React from "react";
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
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import { SiMicrosoftexcel } from "react-icons/si";
import { HiDownload } from "react-icons/hi";
import EditIcon from "@mui/icons-material/Edit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useEffect, useState } from "react";
// function createData(codigo, fechamod, usuario, campomod, antiguo, nuevo) {
//   return {
//     codigo,
//     fechamod,
//     usuario,
//     campomod,
//     antiguo,
//     nuevo,
//   };
// }

// usuario,
// nombre,
// apellido,
// email,
// contrasenia,
// clientes,
// rol

function createData(
  id,
  editor,
  date,
  name_old,
  name_new,
  rut_old,
  rut_new,
  verification_code_old,
  verification_code_new,
  business_name_old,
  business_name_new,
  commercial_business_old,
  commercial_business_new,
  dte_reception_email_old,
  dte_reception_email_new,
  bank_account_old,
  bank_account_new,
  bank_old,
  bank_new,
  commercial_address_old,
  commercial_address_new,
  postal_address_old,
  postal_address_new,
  manager_old,
  manager_new,
  pay_contact_first_name_old,
  pay_contact_first_name_new,
  pay_contact_last_name_old,
  pay_contact_last_name_new,
  pay_contact_address_old,
  pay_contact_address_new,
  pay_contact_phones_old,
  pay_contact_phones_new,
  pay_contact_email_old,
  pay_contact_email_new,
  bills_contact_first_name_old,
  bills_contact_first_name_new,
  bills_contact_last_name_old,
  bills_contact_last_name_new,
  bills_contact_address_old,
  bills_contact_address_new,
  bills_contact_phones_old,
  bills_contact_phones_new,
  bills_contact_email_old,
  bills_contact_email_new,
  created_ts_old,
  created_ts_new,
  updated_ts_old,
  updated_ts_new
) {
  return {
    id,
    editor,
    date,
    name_old,
    name_new,
    rut_old,
    rut_new,
    verification_code_old,
    verification_code_new,
    business_name_old,
    business_name_new,
    commercial_business_old,
    commercial_business_new,
    dte_reception_email_old,
    dte_reception_email_new,
    bank_account_old,
    bank_account_new,
    bank_old,
    bank_new,
    commercial_address_old,
    commercial_address_new,
    postal_address_old,
    postal_address_new,
    manager_old,
    manager_new,
    pay_contact_first_name_old,
    pay_contact_first_name_new,
    pay_contact_last_name_old,
    pay_contact_last_name_new,
    pay_contact_address_old,
    pay_contact_address_new,
    pay_contact_phones_old,
    pay_contact_phones_new,
    pay_contact_email_old,
    pay_contact_email_new,
    bills_contact_first_name_old,
    bills_contact_first_name_new,
    bills_contact_last_name_old,
    bills_contact_last_name_new,
    bills_contact_address_old,
    bills_contact_address_new,
    bills_contact_phones_old,
    bills_contact_phones_new,
    bills_contact_email_old,
    bills_contact_email_new,
    created_ts_old,
    created_ts_new,
    updated_ts_old,
    updated_ts_new,
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

const columns = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "editor", label: "editor", minWidth: 40 },
  { id: "date", label: "date", minWidth: 40 },
  { id: "name_old", label: "Nombre Antiguo", minWidth: 40 },
  { id: "name_new", label: "Nombre Nuevo", minWidth: 40 },
  { id: "rut_old", label: "Rut Antiguo", minWidth: 40 },
  { id: "rut_new", label: "Rut Nuevo", minWidth: 40 },
  { id: "verification_code_old", label: "Code Antiguo", minWidth: 40 },
  { id: "verification_code_new", label: "Code Nuevo", minWidth: 40 },
  { id: "business_name_old", label: "Nombre Negocio Antiguo", minWidth: 40 },
  { id: "business_name_new", label: "Nombre Negocio Nuevo", minWidth: 40 },
  {
    id: "commercial_business_old",
    label: "Nombre Comercial Antiguo",
    minWidth: 40,
  },
  {
    id: "commercial_business_new",
    label: "Nombre Comercial Nuevo",
    minWidth: 40,
  },
  { id: "dte_reception_email_old", label: "Email antiguo", minWidth: 40 },
  { id: "dte_reception_email_new", label: "Email Nuevo", minWidth: 40 },
  { id: "bank_account_old", label: "Cuenta de banco Antigua", minWidth: 40 },
  { id: "bank_account_new", label: "Cuenta de banco Nueva", minWidth: 40 },
  { id: "bank_old", label: "Banco antiguo", minWidth: 40 },
  { id: "bank_new", label: "Banco Nuevo", minWidth: 40 },
  {
    id: "commercial_address_old",
    label: "Dirección Comercial Antigua",
    minWidth: 40,
  },
  {
    id: "commercial_address_new",
    label: "Dirección Comercial Nueva",
    minWidth: 40,
  },
  { id: "postal_address_old", label: "Direccion Postal Nueva", minWidth: 40 },
  { id: "postal_address_new", label: "Direccion Postal Antigua", minWidth: 40 },
  { id: "manager_old", label: "Manager Antiguo", minWidth: 40 },
  { id: "manager_new", label: "Manager Nuevo", minWidth: 40 },
  {
    id: "pay_contact_first_name_old",
    label: "Nombre Contacto Pago Antiguo",
    minWidth: 40,
  },
  {
    id: "pay_contact_first_name_new",
    label: "Nombre Contacto Pago Nuevo",
    minWidth: 40,
  },
  {
    id: "pay_contact_last_name_old",
    label: "Apellido Contacto Pago Antiguo",
    minWidth: 40,
  },
  {
    id: "pay_contact_last_name_new",
    label: "Apellido Contacto Pago Nuevo",
    minWidth: 40,
  },
  {
    id: "pay_contact_address_old",
    label: "Direccion Contacto Pago Antiguo",
    minWidth: 40,
  },
  {
    id: "pay_contact_address_new",
    label: "Direccion Contacto Pago Nuevo",
    minWidth: 40,
  },
  {
    id: "pay_contact_phones_old",
    label: "Telefono Contacto Pago Antiguo",
    minWidth: 40,
  },
  {
    id: "pay_contact_phones_new",
    label: "Telefono Contacto Pago Nuevo",
    minWidth: 40,
  },
  {
    id: "pay_contact_email_old",
    label: "Email Contacto Pago Antiguo",
    minWidth: 40,
  },
  {
    id: "pay_contact_email_new",
    label: "Email Contacto Pago Nuevo",
    minWidth: 40,
  },
  {
    id: "bills_contact_first_name_old",
    label: "Nombre Contacto Factura Antiguo",
    minWidth: 40,
  },
  {
    id: "bills_contact_first_name_new",
    label: "Nombre Contacto Factura Nuevo",
    minWidth: 40,
  },
  {
    id: "bills_contact_last_name_old",
    label: "Apellido Contacto Factura Antiguo",
    minWidth: 40,
  },
  {
    id: "bills_contact_last_name_new",
    label: "Apellido Contacto Factura Nuevo",
    minWidth: 40,
  },
  {
    id: "bills_contact_address_old",
    label: "Direccion Contacto Factura Antiguo",
    minWidth: 40,
  },
  {
    id: "bills_contact_address_new",
    label: "Direccion Contacto Factura Nuevo",
    minWidth: 40,
  },
  {
    id: "bills_contact_phones_old",
    label: "Telefono Contacto Factura Antiguo ",
    minWidth: 40,
  },
  {
    id: "bills_contact_phones_new",
    label: "Telefono Contacto Factura Nuevo",
    minWidth: 40,
  },
  {
    id: "bills_contact_email_old",
    label: "Email Contacto Factura Antiguo",
    minWidth: 40,
  },
  {
    id: "bills_contact_email_new",
    label: "Email Contacto Factura Nueva",
    minWidth: 40,
  },
  { id: "created_ts_old", label: "Fecha Creacion Antigua", minWidth: 40 },
  { id: "created_ts_new", label: "Fecha Creacion Nueva", minWidth: 40 },
  { id: "updated_ts_old", label: "Fecha Actualización Antigua", minWidth: 40 },
  { id: "updated_ts_new", label: "Fecha Actualización Nueva", minWidth: 40 },
];
// let dataHist;
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
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
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

      {/* {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Seleccionados {numSelected} 
        </Typography>
      ) : (
        <Typography
          
        >
         
        </Typography>
      )} */}

      {/* {numSelected > 0 ? (
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
      )} */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TablaUltimosCambios(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("codigo");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  let url = ` https://trigonosapi.azurewebsites.net/Historificacion?id=${props.idParticipant}`;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let rows = [];
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const dataHist = await axios.get(url);
      setData(dataHist.data);
    })();
  }, [props.idParticipant]);
  data.map(
    ({
      id,
      editor,
      date,
      name_old,
      name_new,
      rut_old,
      rut_new,
      verification_code_old,
      verification_code_new,
      business_name_old,
      business_name_new,
      commercial_business_old,
      commercial_business_new,
      dte_reception_email_old,
      dte_reception_email_new,
      bank_account_old,
      bank_account_new,
      bank_old,
      bank_new,
      commercial_address_old,
      commercial_address_new,
      postal_address_old,
      postal_address_new,
      manager_old,
      manager_new,
      pay_contact_first_name_old,
      pay_contact_first_name_new,
      pay_contact_last_name_old,
      pay_contact_last_name_new,
      pay_contact_address_old,
      pay_contact_address_new,
      pay_contact_phones_old,
      pay_contact_phones_new,
      pay_contact_email_old,
      pay_contact_email_new,
      bills_contact_first_name_old,
      bills_contact_first_name_new,
      bills_contact_last_name_old,
      bills_contact_last_name_new,
      bills_contact_address_old,
      bills_contact_address_new,
      bills_contact_phones_old,
      bills_contact_phones_new,
      bills_contact_email_old,
      bills_contact_email_new,
      created_ts_old,
      created_ts_new,
      updated_ts_old,
      updated_ts_new,
    }) =>
      rows.push(
        createData(
          id,
          editor,
          date,
          name_old,
          name_new,
          rut_old,
          rut_new,
          verification_code_old,
          verification_code_new,
          business_name_old,
          business_name_new,
          commercial_business_old,
          commercial_business_new,
          dte_reception_email_old,
          dte_reception_email_new,
          bank_account_old,
          bank_account_new,
          bank_old,
          bank_new,
          commercial_address_old,
          commercial_address_new,
          postal_address_old,
          postal_address_new,
          manager_old,
          manager_new,
          pay_contact_first_name_old,
          pay_contact_first_name_new,
          pay_contact_last_name_old,
          pay_contact_last_name_new,
          pay_contact_address_old,
          pay_contact_address_new,
          pay_contact_phones_old,
          pay_contact_phones_new,
          pay_contact_email_old,
          pay_contact_email_new,
          bills_contact_first_name_old,
          bills_contact_first_name_new,
          bills_contact_last_name_old,
          bills_contact_last_name_new,
          bills_contact_address_old,
          bills_contact_address_new,
          bills_contact_phones_old,
          bills_contact_phones_new,
          bills_contact_email_old,
          bills_contact_email_new,
          created_ts_old,
          created_ts_new,
          updated_ts_old,
          updated_ts_new
        )
      )
  );
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

  const isSelected = (codigo) => selected.indexOf(codigo) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box className=" relative mdmax:max-w-[500px] p-[30px]">
      <TableContainer>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const valuee = row;
                      return (
                        <TableCell
                          key={column.id}
                          // onClick={
                          //   table
                          //     ? () => getModal(valuee)
                          //     : () => setTable(true)
                          // }
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
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 10, 25]}
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
