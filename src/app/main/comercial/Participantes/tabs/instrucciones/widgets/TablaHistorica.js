import * as React from "react";
import {
  Autocomplete,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
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

let apiHistorial = {};
export default function StickyHeadTable({ projects, diccionariop }) {
  // const [rows, setRows] = React.useState([
  // ]);
  const url = ` https://trigonosapi.azurewebsites.net/Historificacion?id=${diccionariop.id}`;
  const [table, setTable] = React.useState(true);
  const rows = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(url);
      setData(data);
    })();
  }, []);
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <FormGroup></FormGroup>
      <TableContainer sx={{ maxHeight: 440 }}>
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
                          onClick={
                            table
                              ? () => getModal(valuee)
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
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
