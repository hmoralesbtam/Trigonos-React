import * as React from "react";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import BasicModal from "./instrucciones/ModalParticipante";
import axios from "axios";
import { CallApi } from "../store/CallApi";

const columns = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Participantes", minWidth: 40 },
  { id: "rut", label: "Rut", minWidth: 40 },
  { id: "businessName", label: "Nombre Empresa", minWidth: 40 },
];

function createData(id, name, rut, businessName) {
  return { id, name, rut, businessName };
}
let historia = {};
const diccionario = {
  id: 54,
  name: "Neomas",
  rut: "76112774",
  verification_Code: "8",
  business_Name: "Neomas SpA",
  commercial_Business:
    "Generación en Centrales Termoeléctricas de Ciclos Combinados",
  dte_Reception_Email: "dteneomas@neoelectra.es",
  bank_Account: "7181582-0",
  bank: 7,
  banksName: "Banco Santander-Chile",
  commercial_address: "Manquehue Sur 520, oficina 205, Las Condes",
  postal_address: "Manquehue Sur 520, oficina 205, Las Condes.",
  manager: "Antonio Cortés Ruiz",
  pay_Contact_First_Name: "Sebastíán",
  pay_contact_last_name: "Araya Sepúlveda",
  pay_contact_address: "",
  pay_contact_phones: '["+56 9 82883016"]',
  pay_contact_email: "saraya@neoelectra.es",
  bills_contact_last_name: "Romero",
  bills_contact_first_name: "Mario Roberto",
  bills_contact_address: "Cerro el Plomo 5931 of. 407",
  bills_contact_phones: '["56 232780590"]',
  bills_contact_email: "marioromero@neoelectra.es",
};
let pagination = 0;
let projects = [];
let rows = [];
let pageIndex = 1;
let condicion = 1;
export default function StickyHeadTable() {
  const [table, setTable] = React.useState(true);
  const [activo, setActivo] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [render, setRender] = React.useState(false);

  const dataParticipants = async (
    PageIndex = pageIndex,
    PageSize = rowsPerPage,
    todos = 0
  ) => {
    const datita = await CallApi(PageIndex, PageSize, todos);
    projects = datita.data;

    pagination = datita.count;
    if (render === false) {
      setRender(true);
    } else {
      setRender(false);
    }
    if (condicion === 1) {
      projects.map(
        ({ id, name, rut, business_Name }) =>
          !rows.some((e) => e.id === id) &&
          rows.push(createData(id, name, rut, business_Name))
      );
    }
  };
  React.useEffect(() => {
    (async () => {
      if (activo === true) {
        dataParticipants(pageIndex, rowsPerPage, 0);
        return;
      }
      dataParticipants(pageIndex, rowsPerPage, 1);
      return;
    })();
  }, [page, activo, rowsPerPage]);

  const prueba = () => {
    if (activo === true) {
      setPage(0);
      resetTable();
      setActivo(false);

      return;
    }
    setPage(0);
    resetTable();
    setActivo(true);
  };
  const getModal = async (hola) => {
    await axios
      .get(
        ` https://trigonosapi.azurewebsites.net/api/Participantes?id=${hola.id}`
      )
      .then((response) => {
        const prueba = response.data;
        diccionario.id = prueba.id;
        diccionario.name = prueba.name;
        diccionario.rut = prueba.rut;
        diccionario.verification_Code = prueba.verification_Code;
        diccionario.businessName = prueba.business_Name;
        diccionario.commercial_Business = prueba.commercial_Business;
        diccionario.dte_Reception_Email = prueba.dte_Reception_Email;
        (diccionario.bank_Account = prueba.bank_Account),
          (diccionario.bank = prueba.bank),
          (diccionario.banksName = prueba.banksName),
          (diccionario.commercial_address = prueba.commercial_address),
          (diccionario.postal_address = prueba.postal_address),
          (diccionario.manager = prueba.manager),
          (diccionario.pay_Contact_First_Name = prueba.pay_Contact_First_Name),
          (diccionario.pay_contact_last_name = prueba.pay_contact_last_name),
          (diccionario.pay_contact_address = prueba.pay_contact_address),
          (diccionario.pay_contact_phones = prueba.pay_contact_phones),
          (diccionario.pay_contact_email = prueba.pay_contact_email),
          (diccionario.bills_contact_last_name =
            prueba.bills_contact_last_name),
          (diccionario.bills_contact_first_name =
            prueba.bills_contact_first_name),
          (diccionario.bills_contact_address = prueba.bills_contact_address),
          (diccionario.bills_contact_phones = prueba.bills_contact_phones),
          (diccionario.bills_contact_email = prueba.bills_contact_email),
          setTable(false);
      });
  };
  const resetTable = () => {
    pagination = 0;
    pageIndex = 1;
    condicion = 1;
    rows = [];
  };
  const handleChangePage = (event, newPage) => {
    if (pageIndex === newPage) {
      condicion = 1;
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
    rows = [];
    pageIndex = 1;
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2, m: 2 }}>
      <FormGroup>
        <FormControlLabel
          onChange={prueba}
          control={<Switch defaultChecked />}
          label="Clientes"
        />
      </FormGroup>
      <TableContainer sx={{ maxHeight: 440, width: "auto" }}>
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
        count={pagination}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {!table && (
        <BasicModal
          diccionario={diccionario}
          projects={historia}
          setTable={() => setTable(true)}
        />
      )}
    </Paper>
  );
}
