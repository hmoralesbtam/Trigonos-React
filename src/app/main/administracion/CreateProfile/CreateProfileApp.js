import { styled, useTheme } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";

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
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AddIcon from "@mui/icons-material/Add";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";

import PropTypes from "prop-types";
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
import Dialog from "@mui/material/Dialog";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useCallback, useEffect, useState } from "react";
import ModalAddProfile from "./Widgets/ModalAddProfile";
import {
  useGetAllRolesQuery,
  useGetAllRolesTokenQuery,
  useGetAllRoutesQuery,
  useGetListarPaginaWebQuery,
  usePostActDesacDinamicRolMutation,
} from "app/store/RoutesRoles/routesApi";

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
// function createData(estado,codReferencia,nombre,descripcion,id) {
//   return {
//       estado,codReferencia,nombre,descripcion,id
//   };
// }

let rows = [];
let rowspermanent = [];

// async function CargaData(){

//   const data = await CallApiRoles();
//   console.log(data);
//   data.map(
//     ({
//       id, codReferencia, nombre, descripcion, bhabilitado,
//     }) =>
//     rows.push(
//         createData(
//           // createData('Activo', 4849, 'Trabajadores Prisma', 'Perfil para trabajadores de Prisma')
//           bhabilitado ===1 ? 'Activo':'Desactivado', codReferencia, nombre, descripcion,id
//         )
//       )

//   );
// }

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

const headCells = [
  {
    id: "estado",
    numeric: false,
    disablePadding: true,
    label: "Estado",
  },
  {
    id: "nombre",
    numeric: false,
    disablePadding: false,
    label: "Nombre",
  },
  {
    id: "descripcion",
    numeric: false,
    disablePadding: false,
    label: "Descripción",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Accciones",
  },
];

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "id";
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            id={headCell.id}
            key={headCell.id}
            align="left"
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
                <Box component="span" sx={visuallyHidden} id={headCell.id}>
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
function CreateProfileApp(props) {
  // const theme = useTheme();
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [visibleRows, setVisibleRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [table, setTable] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [tipoModal, setTipoModal] = useState(true);
  const [dataRol, setDataRol] = useState({});
  const [dataAsing, setDataAsing] = useState({});
  const [dataNoAsing, setDataNoAsing] = useState({});
  const [disableButton, setDisableButton] = useState(false);

  const { data: todos = [], isLoading: isloadingg = true } =
    useGetAllRoutesQuery();
  const { data: dataWeb = [], isLoading: isloadingListar = true } =
    useGetListarPaginaWebQuery();
  const {data: getAllRoles, isLoading:isLoadRoles } = useGetAllRolesTokenQuery(window.localStorage.getItem("token"));
  const [postActDesact, data_act_desc] = usePostActDesacDinamicRolMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText: "",
    msgError: false,
  });
  const { msgResp, msgText, msgError } = MsgAlert;
 
  
  function ActivarDesactivar(idRol){
    setOpenDialog(true);
    setLoading(true);

    postActDesact(idRol).then((response)=>{
      setLoading(false);
      console.log()
      if(response.error === undefined){
        setMsgAlert({
          msgResp: true,
          msgText: "Exito, Operación Realizada",
          msgError: false,
        });
        setTimeout(() => {
       
          setOpenDialog(false);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }, 1000);
      }else{
        setMsgAlert({
          msgResp: true,
          msgText: "No se logró realizar la operación",
          msgError: true,
        });
        setTimeout(() => {
       
          setOpenDialog(false);
        }, 1000);
      }
     
    }).catch((error)=>{
      setLoading(false);
  
      setMsgAlert({
        msgResp: true,
        msgText: "No se logró realizar la operación",
        msgError: true,
      });
      setTimeout(() => {
     
        setOpenDialog(false);
      }, 1000);
    })
    
  }
  
  function EnviarDatos(row) {
    if (isloadingg != true) {
      function getListRoles(idrol) {
        return todos.filter((item) => item.idrol === idrol);
      }
      // console.log(todos)
      let ids = getListRoles(row.id).map(function (el) {
        return el.idpagina;
      });
      function getListWebNoAsign(ids) {
        return dataWeb.filter((item) => !ids.includes(item.id));
      }

      setDataAsing(getListRoles(row.id));
      setDataNoAsing(getListWebNoAsign(ids));
      setDataRol(row);
      setTipoModal(false);
      setTable(true);
    }
  }
  function search(searchString) {
    if (typeof searchString !== "string" || searchString.length === 0) {
      return rowspermanent;
    }
    let searchLower = searchString.toString().toLowerCase();
    let filtered = rowspermanent.filter((key) => {
      if (key.estado.toLowerCase().includes(searchLower)) {
        return true;
      }

      if (key.nombre.toLowerCase().includes(searchLower)) {
        return true;
      }
      if (key.descripcion.toLowerCase().includes(searchLower)) {
        return true;
      }
      if (key.id.toString().toLowerCase().includes(searchLower)) {
        return true;
      }
    });
    return filtered;
  }

  function CargaDataRol() {
    
    rows = getAllRoles.map(function (el) {
      let habilitado = el.bhabilitado === 1 ? "Activo" : "Desactivado";
      return {
        estado: habilitado,
        nombre: el.name,
        descripcion: el.descripcion,
        id: el.id,
      };
    });
    rowspermanent = rows;
    rowsOnMount();
   
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
  useEffect(() => {
    if(!isLoadRoles){
      CargaDataRol();
    }
    
  }, [isLoadRoles]);
  useEffect(() => {
    if(getAllRoles !=undefined){
      CargaDataRol();

    }
    if(!table){
      setDisableButton(false);
    }
  }, [table]);

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.nombre);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, codReferencia) => {
    const selectedIndex = selected.indexOf(codReferencia);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, codReferencia);
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

  const isSelected = (codReferencia) => selected.indexOf(codReferencia) !== -1;

  return (
    <Root
      content={
        <div className="p-12 pt-16 sm:pt-24 lg:pt-24 md:pt-24 lg:ltr:pr-0 lg:rtl:pl-0 w-full ">
          <div className="grid auto-cols-auto smmax:grid-cols-2 sm:grid-cols-12 gap-2 w-full min-w-0 p-24   ">
            <div className="  col-span-12 mb-[20px]">
              <Box className="  bg-white rounded-sm p-[10px] ">
                <h1 className="ml-[5px]">Gestión de Perfiles</h1>
                <h1 className="border border-b-pantoneazul"></h1>
                <Box className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]">
                  <div>
                    <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
                  </div>
                  <div>
                    <span className="text-grey-700">
                      Debe presionar el botón de <b>Nuevo Perfil</b> en donde
                      debera ingresar la información correspondiente y también
                      las ventanas asociadas a ese perfil o rol y luego debe
                      presionar guardar y en caso de deshacer todo simplemente
                      debe cancelar.
                    </span>
                  </div>
                </Box>
              </Box>
            </div>

            <div className=" col-span-12   bg-white">
              <div className="flex justify-between w-full">
                <div className="flex flex-row  m-[20px]">
                  <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                    Agregar Perfil
                  </Typography>

                  <AssignmentIndIcon className="ml-[10px] text-pantoneazul" />
                </div>

                <div className=" m-[20px] ">
                  <Button
                    variant="contained"
                    color="secondary"
                    className=" h-[28px]  w-[130px] mr-[20px]"
                    aria-label="Register"
                    type="submit"
                    size="small"
                    onClick={() => {
                      setTable(true);
                      setTipoModal(true);
                      // console.log(dataWeb)
                    }}
                  >
                    <AddIcon />
                    Nuevo Perfil
                  </Button>
                </div>
              </div>
            </div>

            <div className=" col-span-12  bg-white mt-[20px]">
              <div className="flex flex-row  m-[20px]">
                <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                  Listado de Roles
                </Typography>

                <FormatListNumberedRtlIcon className="ml-[10px] text-pantoneazul" />
              </div>
              <h1 className="border border-b-pantoneazul w-full"></h1>
              <div className="flex flex-row m-[20px]">
                <TextField
                  id="outlined-basic"
                  label="Filtrar"
                  variant="filled"
                  name="uwu"
                  onChange={(e) => {
                    handleSetRow(e);
                  }}
                />
              </div>
              {isloading ? (
                <Box className="m-[20px]">
                  <Box>
                    <TableContainer sx={{ maxHeight: 360, overflow: "true" }}>
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                        stickyHeader
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
                          {visibleRows
                            ? visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                  <StyledTableRow
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                  >
                                    <StyledTableCell
                                      align="left"
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                    >
                                      {row.estado}
                                    </StyledTableCell>

                                    <StyledTableCell align="left">
                                      {row.nombre}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                      {row.descripcion}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                    <div className="flex flex-row">
                                    <Tooltip  
                                    title="Editar" 
                                    arrow 
                                    placement="top"
                                    // placement="top-start"
                                      >
                                    <span>
                                    <IconButton
                                      sx={{ "&:hover": { color: "#e4493f" } }}
                                      key="chechedLeft"
                                      aria-label="Close"
                                      color="primary"
                                      type="submit"
                                      disabled=  {disableButton}
                                      onClick={() => {
                                        EnviarDatos(row);
                                        setDisableButton(true);
                                      }}
                                      size="small"
                                    >
                                      <SettingsIcon fontSize="large" />
                                    </IconButton>
                                    </span>
                             
                                     </Tooltip>

                                     {row.estado ==="Desactivado"?   
                                          <Tooltip  
                                          title="Activar" 
                                          arrow 
                                          placement="top"
                                          // placement="top-start"
                                        >
                                        <IconButton
                                        sx={{ "&:hover": { color: "#e4493f" } }}
                                        key="chechedLeft"
                                        aria-label="Close"
                                        color="primary"
                                        onClick={() => {
                                            ActivarDesactivar(row.id)
                                        }}
                                        size="small"
                                      >
                                        <RestoreFromTrashIcon fontSize="large" />
                                      </IconButton>
                                      </Tooltip> :  
                                          <Tooltip  
                                          title="Desactivar" 
                                          arrow 
                                          placement="top"
                                          // placement="top-start"
                                        >
                                        <IconButton
                                        sx={{ "&:hover": { color: "#e4493f" } }}
                                        key="chechedLeft"
                                        aria-label="Close"
                                        color="primary"
                                        onClick={() => {
                                          ActivarDesactivar(row.id)
                                      }}
                                        size="small"
                                      >
                                        <DeleteForeverIcon fontSize="large" />
                                      </IconButton>
                                      </Tooltip> 
                                  
                                  } 

                                    </div>
                                
                                   
                                    
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
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
                    name="formControlLabel"
                    control={
                      <Switch checked={dense} onChange={handleChangeDense} />
                    }
                    label="Disminuir espacio"
                  />
                </Box>
              ) : (
                <div>UWU?</div>
              )}
            </div>
          </div>
          {table && (
            <ModalAddProfile
              setTable={() => setTable(false)}
              tipoModal={tipoModal}
              dataRol={dataRol}
              dataAsing={dataAsing}
              dataNoAsing={dataNoAsing}
              dataWeb={dataWeb}
            />
          )}
            <Dialog
            open={openDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            scroll={"paper"}
          >
            {loading ? (
              <div className="flex justify-center items-center h-[250px] w-[300px]">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <div>
                {msgResp && (
                  <div className="flex justify-center items-center h-[250px] w-[300px]">
                    {msgError ? (
                      <div className="flex justify-center items-center h-[250px] w-[300px]">
                        <WarningIcon className="w-[68px] h-[68px] text-red" />
                        <span className="absolute bottom-[70px] text-red">
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
        </div>
      }
      scroll="content"
    />
  );
}
export default CreateProfileApp;
