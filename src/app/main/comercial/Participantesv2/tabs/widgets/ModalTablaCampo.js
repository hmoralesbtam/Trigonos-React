import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { SiMicrosoftexcel } from "react-icons/si";
import { Button } from '@mui/material';
import { HiDownload } from  "react-icons/hi";
import HistoryIcon from '@mui/icons-material/History';
import { visuallyHidden } from '@mui/utils';
import { padding } from '@mui/system';


function createData(campo,antiguo,nuevo,revertir) {
  if (nuevo != "0" && antiguo != "0" ){
    return{
      campo, antiguo, nuevo,revertir
    }
  }else{
    return;
  }
  
}

let rows = [
  // createData('Email', 	'Prueba@gmail.com','Prueba2@gmail.com',<Button ><HistoryIcon/></Button>),
  
  
];

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
  return order === 'desc'
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
    id: 'campo',
    numeric: false,
    disablePadding: true,
    label: 'Nombre Campo',
  },
  {
    id: 'antiguo',
    numeric: false,
    disablePadding: false,
    label: 'Antiguo',
  },
  {
    id: 'nuevo',
    numeric: false,
    disablePadding: false,
    label: 'Nuevo',
  },
  {
    id: 'revertir',
    numeric: false,
    disablePadding: false,
    label: 'Revertir',
  },
  
  
  
  
];
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow  >
     
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
            sx={{paddingLeft:5}}
            key={headCell.id}
            align="left"
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
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
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      
      {numSelected > 1 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
         {numSelected} selecionados
        </Typography>
      ):numSelected ===1 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
         {numSelected} seleccionado
        </Typography>
      ) : (
      
          <Typography
           
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {/* TITULO POSIBLE */}
          </Typography>
      
        
      )}

      
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ModalTablaCampo({prueba}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nro_documento');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const { id,
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
    updated_ts_new } = prueba;
    // (bank_account_new,bank_account_old);
    rows = [

      createData('Nombre', 	name_old,name_new,<Button ><HistoryIcon/></Button>),
      createData('Rut', 	rut_old,rut_new,<Button ><HistoryIcon/></Button>),
      createData('Código de verificación', 	verification_code_old,verification_code_new,<Button ><HistoryIcon/></Button>),
      createData('Razón Social', 	business_name_old,business_name_new,<Button ><HistoryIcon/></Button>),
      createData('Giro', 	commercial_business_old,commercial_business_new,<Button ><HistoryIcon/></Button>),
      createData('Email recepcion dte', 	dte_reception_email_old,dte_reception_email_new,<Button ><HistoryIcon/></Button>),
      createData('Cuenta de banco', 	bank_account_old,bank_account_new,<Button ><HistoryIcon/></Button>),
      createData('Banco', 	bank_old,bank_new,<Button ><HistoryIcon/></Button>),
      createData('Dirección Comercial', 	commercial_address_old,commercial_address_new,<Button ><HistoryIcon/></Button>),
      createData('Dirección Postal', 	postal_address_old,postal_address_new,<Button ><HistoryIcon/></Button>),
      createData('Manager', 	manager_old,manager_new,<Button ><HistoryIcon/></Button>),
      createData('Nombre Contacto Pago ', 	pay_contact_first_name_old,pay_contact_first_name_new,<Button ><HistoryIcon/></Button>),
      createData('Apellido Contacto Pago', 	pay_contact_last_name_old,pay_contact_last_name_new,<Button ><HistoryIcon/></Button>),
      createData('Direccion Contacto Pago', 	pay_contact_address_old,pay_contact_address_new,<Button ><HistoryIcon/></Button>),
      createData('Telefono Contacto Pago', 	pay_contact_phones_old,pay_contact_phones_new,<Button ><HistoryIcon/></Button>),
      createData('Email Contacto Pago', 	pay_contact_email_old,pay_contact_email_new,<Button ><HistoryIcon/></Button>),
      createData('Nombre Contacto Factura', 	bills_contact_first_name_old,bills_contact_first_name_new,<Button ><HistoryIcon/></Button>),
      createData('Apellido Contacto Factura', 	bills_contact_last_name_old,bills_contact_last_name_new,<Button ><HistoryIcon/></Button>),
      createData('Direccion Contacto Factura', 	bills_contact_address_old,bills_contact_address_new,<Button ><HistoryIcon/></Button>),
      createData('Telefono Contacto Factura', 	bills_contact_phones_old,bills_contact_phones_new,<Button ><HistoryIcon/></Button>),
      createData('Email Contacto Factura', 	bills_contact_email_old,bills_contact_email_new,<Button ><HistoryIcon/></Button>),
      

      
    ]
    rows = rows.filter(x => x!==undefined);

  


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.campo);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, campo) => {
    const selectedIndex = selected.indexOf(campo);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, campo);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
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

  const isSelected = (campo) => selected.indexOf(campo) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
     
        
        
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
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
                  const isItemSelected = isSelected(row.campo);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                    
                    
                    //   hover
                    //   onClick={(event) => handleClick(event, row.fecha)}
                    //   role="checkbox"
                    //   aria-checked={isItemSelected}
                    //   tabIndex={-1}
                    //   key={row.fecha}
                    //   selected={isItemSelected}
                    >
                      
                      <TableCell
                         sx={{paddingLeft:5}}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                        
                      >
                        {row.campo}
                      </TableCell>
                      <TableCell align="left" sx={{paddingLeft:5}}>{row.antiguo}</TableCell>
                      <TableCell align="left" sx={{paddingLeft:5}}>{row.nuevo}</TableCell>
                      <TableCell align="left" sx={{paddingLeft:5}}>{row.revertir}</TableCell>
                     
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
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="Filas por página"
          rowsPerPageOptions={[5, 10, 25 ]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}