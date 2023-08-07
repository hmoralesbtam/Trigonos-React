/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Autocomplete, Stack, Alert } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import * as yup from "yup";
import _ from "@lodash";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CachedIcon from "@mui/icons-material/Cached";
import DescriptionIcon from "@mui/icons-material/Description";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import BackspaceIcon from "@mui/icons-material/Backspace";
// import jwtService from '../../auth/services/jwtService';
/* Importaciones mias */
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FusePageSimple from "@fuse/core/FusePageSimple";

import AdviceModule from "../../comercial/AdviceModule";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import Tooltip from "@mui/material/Tooltip";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import ModalAddCompany from "./widgets/ModalAddCompany";

import { FormHelperText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from "@mui/material/LinearProgress";
import { usePostUsuariosRegistrarMutation } from "app/store/usuariosApi/usuariosApi";
import { useGetAllRolesTokenQuery } from "app/store/RoutesRoles/routesApi";
import { useGetEmpresasQuery } from "app/store/empresaApi/empresaApi";
import { useGetParticipantesQuery } from "app/store/participantesApi/participantesApi";
const schema = yup.object().shape({
  // user: yup.string().required("Debe ingresar su nombre completo"),
  email: yup
    .string()
    .email("Debe ingresar un email correcto.")
    .required("Debe ingresar un email."),
  password: yup
    .string()
    .required("Por favor ingrese una contraseña.")
    // .matches(/[A-Z]/, "La contraseña debe tener almenos una MAYUSCULA")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "La contraseña debe tener almenos una mayuscula, un numero y un caracter especial."
    )
    .min(8, "Contraseña demasiado corta - mínimo 8 caracteres."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden."),
  idEmpresa: yup.string().required("Debe seleccionar una empresa."),
  pais: yup.string().required("Debe seleccionar el país."),
  firstName: yup.string().required("Debe ingresar el nombre del usuario."),
  lastName: yup.string().required("Debe ingresar el apellido del usuario."),
  rol: yup.string().required("Debe seleccionar un rol."),
  // user:yup.string().required("Debe ingresar un email para este campo"),
  project: yup
    .array()
    .min(1, "Debe seleccionar al menos un cliente")
    .required("Debe seleccionar al menos un cliente")
    .nullable(true),
});
const defaultValues = {
  user: "",
  pais: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  project: "",
  idEmpresa: "",
  pais: "",
  rol: "",
};
// PARA EL ESTILO DEL SELECT MULTIPLE
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightBold,
  };
}
// PARA EL ESTILO DE LOS TOOLTIP HOVER
const componentsProps = {
  tooltip: {
    sx: {
      userSelect: "none",
      bgcolor: "secondary.main",
      "& .MuiTooltip-arrow": {
        color: "secondary.main",
      },
    },
  },
};
//
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
//MODAL TABLA CAMBIOS
function createData(campo, value) {
  return { campo, value };
}

let rows = [];
let dataproject_ = {};
let dataempresas_ = {};

// eslint-disable-next-line import/prefer-default-export
// export const CreateUserApp = () => {
export default function CreateUserApp(props) {
  const theme = useTheme();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [personName, setPersonName] = useState([]);
  
 
  const [loading, setLoading] = useState(false);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText: "",
    msgError: false,
  });
  const { msgResp, msgText, msgError } = MsgAlert;

  const [alertt, setAlertt] = useState(false);
  const [error, setError] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const { isValid, dirtyFields, errors } = formState;
  const [modal, setModal] = useState(true);
  const [open, setOpen] = useState(false);
  const [secondDopen, setSecondDopen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [postAddUser, data_] = usePostUsuariosRegistrarMutation();
  const {data: getAllRoles, isLoading:isLoadRoles , isFetching: isFecthRoles} = useGetAllRolesTokenQuery(window.localStorage.getItem("token"));
  const {data: getEmpresas,isLoading:isLoadEmpresas } = useGetEmpresasQuery();
  const {data: getParticipants,isLoading:isLoadParticipant} = useGetParticipantesQuery();
  

  const [data, setData] = useState({
    email: "",
    username: "",
    nombre: "",
    apellido: "",
    idEmpresa: "",
    pais: "",
    password: "",
    rol: "",
    listIdProyects:[]
  });
 
 
  function onSubmit(e) {
    setData({
      email: e.email,
      username: e.email,
      nombre: e.firstName,
      apellido: e.lastName,
      idEmpresa: e.idEmpresa,
      pais: e.pais,
      password: e.password,
      rol: e.rol,
      listIdProyects: personName
    });

    setOpen(true);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseAlert = () => {
    setOpen(false);
  };
  const handleCloseSecond = () => {
    setSecondDopen(false);
  };
 

  const handleSetEmail = (event) => {
    const {
      target: { value },
    } = event;
    setEmailUser(value);
  };
  useEffect(() => {
    if (alertt === true) {
      setTimeout(() => {
        setAlertt(false);
      }, 5000);
    }
    if (error === true) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [alertt, error]);

  useEffect(() => {
    if (getParticipants != undefined) {
      let res = getParticipants.data
        .filter((item) => personName.includes(item.id))
        .map(function (el) {
          return {
            id: el.id,
            name: el.name,
          };
        });
      dataproject_ = res;
    }
  }, [personName]);

  const handleChangeProyect = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };


  function timeout(delay = number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  function ConfirmData() {
    rows = [
      createData("Email", data.email),
      createData("Nombre usuario", data.email),
      createData("Contraseña", data.password),
      createData("Rol", data.rol),
      createData("Nombre", data.nombre),
      createData("Apellido", data.apellido),
      createData("País", data.pais),
      createData("Empresa", dataempresas_.nombreEmpresa),
      createData(
        "Clientes Asignados",
        <TableContainer component={Paper} className="max-h-[300px]">
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Nombre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataproject_.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ backgroundColor: "pantoneazul" }}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ),
    ];
    return (
      <TableContainer component={Paper} className="bg-grey-100">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre Campo</TableCell>
              <TableCell align="left">Atributos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.campo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  className="text-pantoneazul text-lg  "
                  component="th"
                  scope="row"
                >
                  {row.campo}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  function onSubmitAxios() {
    setSecondDopen(true);
    setLoading(true);
    handleCloseAlert();
    setTimeout(() => {
    // let timer = 0;
    postAddUser(data).then((response)=>{
      console.log(response)
      setLoading(false);
      setMsgAlert({msgResp: true,msgText:"Usuario agregado correctamente.",msgError:false});
      setTimeout(() => {
        handleCloseSecond();
        reset({
            
        }, {
         
        });
        setPersonName([]);
        setEmailUser("");
      },2000);
     
    }).catch((error)=>{
      console.log(error)
      setLoading(false);
      setMsgAlert({msgResp: true,msgText:"Error, no se ha logrado agregar el usuario.",msgError:true});
      setTimeout(() => {
        handleCloseSecond();
      },2500);


    })
    // axios
    //   .post(jwtServiceConfig.signUp, data)
    //   .then((response) => {
    //     const idUser = response.data.id;
    //     personName.map(function(el){
    //       return { idProyect: el, idUser:response.data.id}
    //     })
    //     for (let x = 0; x < personName.length; x++) {
    //       timer = timer + 1000;
    //       const dataProyect = {
    //         idProyect: personName[x],
    //         idUser: idUser,
    //       };
    //       setTimeout(() => {
    //         axios
    //           .post(jwtServiceConfig.addProyects, dataProyect)
    //           .then((response) => {
                
    //           })
    //           .catch((error) => {
    //             console.log(`Error al agregar el proyecto ${personName[x]}`);
                
    //             return;
    //           });
    //       }, timer);
    //     }
        
    //   })
    //   .catch((error) => {
       
    //   });
    }, 2000);
  }

  return (
    <Root
      content={
        <form
          name="registerForm"
          noValidate
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-12 pt-16 sm:pt-24 lg:pt-24 md:pt-24 lg:ltr:pr-0 lg:rtl:pl-0 w-full ">
            <div className="grid auto-cols-auto smmax:grid-cols-2 sm:grid-cols-12 gap-2 w-full min-w-0 p-24   ">
              <div className="  col-span-12 mb-[20px]">
                {/* Box de titulo y guía */}
                <Box className="  bg-white rounded-sm p-[10px] ">
                  <h1 className="ml-[5px]">Agregar Usuarios</h1>
                  <h1 className="border border-b-pantoneazul"></h1>
                  <Box className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]">
                    <div>
                      <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
                    </div>

                    <div>
                      <span className="text-grey-700">
                        En el apartado de <b>Perfil Nuevo Usuario</b> podrá
                        asignar el <b>Rol</b> y los <b>Clientes</b> al usuario y
                        desde el apartado de <b>Información de Nuevo Usuario</b>{" "}
                        podrá completar la información personal del usuario y
                        posteriormente debe guardar y confirmar.
                      </span>
                    </div>
                  </Box>
                </Box>
              </div>

              <div className=" lgmax:col-span-12  lg:col-span-3 tvxxl:col-span-2 lg:mr-[20px] bg-white">
                <div className="flex flex-row w-full m-[20px]">
                  <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                    Perfil Nuevo Usuario
                  </Typography>

                  <AdminPanelSettingsIcon className="ml-[10px] text-pantoneazul" />
                </div>
                <AdviceModule
                  className="relative"
                  classnamesegund="absolute -top-[55px] right-[10px] "
                  textwidth={400}
                  msg={
                    'Los roles son creados en el modulo de "Gestión de Perfiles" estos están asociados a ciertas ventanas que podrá ver el usuario, en la parte inferior usted podrá asignar los clientes desplegando la lista y seleccionando uno por uno.'
                  }
                />

                <h1 className="border border-b-pantoneazul w-full"></h1>

                <div>
                  <div className="w-full m-[20px]">
                    <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate">
                      Rol Usuario:
                    </Typography>
                  </div>
                  {isFecthRoles?
                  <div className="flex items-center ml-[20px] mr-[20px] mb-[20px]">
                    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                      
                      <LinearProgress color="primary" />
                    </Stack>
                  </div>:
                  <>
                   <div className="ml-[20px] mr-[20px] mb-[20px]">
                    <Controller
                      name="rol"
                      control={control}
                      render={({ field }) => (
                        <FormControl className="w-full" type="select" required>
                          <InputLabel id="demo-simple-select-standard-label">
                            Seleccione Rol
                          </InputLabel>
                          <Select
                            {...field}
                            label="Seleccione Rol"
                            // value={idEmpresa}

                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            error={!!errors.rol}
                            variant="outlined"
                          >
                            {getAllRoles.map(({ name, id }) => (
                              <MenuItem key={id} id={id} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText className="text-red">
                            {errors?.rol?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </div>
                  </>}
                 
                  <div className="w-full m-[20px]">
                    <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate">
                      Clientes:
                    </Typography>
                  </div>
                  {isLoadParticipant?
                  <div className="flex items-center ml-[20px] mr-[20px] mb-[20px]">
                    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                      
                      <LinearProgress color="primary" />
                    </Stack>
                  </div>:
                  <>
                  <div className="ml-[20px] mr-[20px] mb-[20px]">
                    <Controller
                      name="project"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          className="w-full"
                          label="project"
                          error={!!errors.project}
                          type="select"
                          required
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            Seleccione clientes
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={personName}
                            label="Seleccione clientes"
                            onChange={(e) => {
                              field.onChange(e);
                              handleChangeProyect(e);
                            }}
                          >
                            {getParticipants != undefined ? (
                              getParticipants.data.map((e) => (
                                <MenuItem
                                  key={e.id}
                                  value={e.id}
                                  style={getStyles(
                                    e.commercial_Business,
                                    personName,
                                    theme
                                  )}
                                >
                                  {e.business_Name}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem id="1" value="1">
                                Proyecto 1
                              </MenuItem>
                            )}
                          </Select>
                          <FormHelperText className="text-red">
                            {errors?.project?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </div>
                  </>}
                  
                </div>
              </div>

              <div className=" lgmax:col-span-12  lg:col-span-9 tvxxl:col-span-10 lgmax:mt-[20px]  bg-white">
                <div className="flex flex-row w-full m-[20px]">
                  <div className="flex flex-row w-full">
                    <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                      Información de Nuevo Usuario
                    </Typography>

                    <PersonAddAltIcon className="ml-[10px] text-pantoneazul" />
                  </div>

                  <div className="relative ">
                    <Tooltip
                      title="Vaciar Casillas"
                      arrow
                      placement="top-start"
                      componentsProps={componentsProps}
                    >
                      <Button
                        size="small"
                        className=" absolute inset-y-0 right-[20px] text-pantoneazul"
                        onClick={() => {
                          reset(
                            {
                              project: [],
                            },
                            {}
                          );
                          setPersonName([]);
                          setEmailUser("");
                        }}
                      >
                        <CachedIcon />{" "}
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                <h1 className="border border-b-pantoneazul w-full"></h1>
                <div className="w-full m-[20px]">
                  <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate">
                    Datos:
                  </Typography>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-evenly ">
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="ml-[20px] mr-[10px] mb-[20px]"
                          label="Nombre"
                          type="name"
                          error={!!errors.firstName}
                          helperText={errors?.firstName?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="ml-[10px] mr-[20px] mb-[20px]"
                          label="Apellido"
                          type="apellido"
                          error={!!errors.lastName}
                          helperText={errors?.lastName?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="pais"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        className="ml-[20px] mr-[20px] mb-[20px]"
                        type="select"
                        required
                      >
                        <InputLabel id="demo-simple-select-standard-label">
                          Seleccionar País
                        </InputLabel>
                        <Select
                          {...field}
                          label="Seleccionar País"
                          // value={idEmpresa}

                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          error={!!errors.pais}
                          variant="outlined"
                          // input={<OutlinedInput label="Name" />}
                          // MenuProps={MenuProps}
                        >
                          <MenuItem id={1} value={"Chile"}>
                            Chile
                          </MenuItem>
                        </Select>
                        <FormHelperText className="text-red">
                          {errors?.pais?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="ml-[20px] mr-[20px] mb-[20px]"
                        label="Email"
                        type="email"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        variant="outlined"
                        required
                        onChange={(e) => {
                          field.onChange(e);
                          handleSetEmail(e);
                        }}
                      />
                    )}
                  />
                {isLoadEmpresas?
                  <div className="flex items-center ml-[20px] mr-[20px]">
                    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                      
                      <LinearProgress color="primary" />
                    </Stack>
                  </div>:
                  <>
                  <div className=" flex justify-evenly ml-[20px] mr-[20px]  ">
                 
                 <Controller
                   name="idEmpresa"
                   control={control}
                   render={({ field }) => (
                     <FormControl
                       className="mb-24 w-full"
                       type="select"
                       required
                     >
                       <InputLabel id="demo-simple-select-standard-label">
                         Seleccione Empresa
                       </InputLabel>
                       <Select
                         {...field}
                         label="Seleccione Empresa"
                         onChange={(e) => {
                           field.onChange(e);
                           dataempresas_ = getEmpresas.find(
                             (p) => p.id == e.target.value
                           );
                         }}
                         error={!!errors.idEmpresa}
                         variant="outlined"
                       >
                         {getEmpresas.map(({ nombreEmpresa, id }) => (
                           <MenuItem key={id} id={id} value={id}>
                             {nombreEmpresa}
                           </MenuItem>
                         ))}
                       </Select>
                       <FormHelperText className="text-red">
                         {errors?.idEmpresa?.message}
                       </FormHelperText>
                     </FormControl>
                   )}
                 />

                 <AdviceModule
                   className="relative w-[34px] ml-[20px]"
                   classnamesegund=""
                   textwidth={350}
                   msg={
                     "Este campo permite asignar la empresa asociada al usuario, si necesita crear una nueva presione el botón + en la parte inferior del campo."
                   }
                 />
               </div>
                  </>}
                  
                  <div className="ml-[20px] my-[5px] ">
                    <IconButton
                      variant="contained"
                      color="primary"
                      title="Crear Empresa"
                      size="small"
                      onClick={
                        modal ? () => setModal(false) : () => setModal(true)
                      }
                    >
                      <AddIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                  <h1 className="border border-b-pantoneazul  ml-[20px] mr-[20px]" />
                  <div className="w-full m-[20px]">
                    <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate">
                      Seguridad:
                    </Typography>
                  </div>

                  <div className=" flex justify-evenly ml-[20px] mr-[20px] mb-[20px] ">
                    <Controller
                      name="user"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className=" w-full"
                          label="Usuario"
                          type="user"
                          variant="outlined"
                          error={!!errors.user}
                          helperText={errors?.user?.message}
                          disabled
                          value={emailUser}
                        />
                      )}
                    />
                    <AdviceModule
                      className="relative w-[34px] ml-[20px]"
                      classnamesegund=""
                      textwidth={350}
                      msg={
                        'Este campo está desactivado debido a que el nombre de usuario por defecto es el email ingresado en el campo "Email".'
                      }
                    />
                  </div>

                  <div className="flex justify-evenly ml-[20px] mr-[20px] mb-[20px]">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mr-[10px] "
                          label="Contraseña"
                          type="text"
                          error={!!errors.password}
                          helperText={errors?.password?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="passwordConfirm"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="ml-[10px]"
                          label="Contraseña (Confirmar)"
                          type="text"
                          error={!!errors.passwordConfirm}
                          helperText={errors?.passwordConfirm?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />
                    <AdviceModule
                      className="relative w-[34px] ml-[20px]"
                      classnamesegund=""
                      textwidth={350}
                      msg={
                        "La contraseña debe contener:\n-Debe tener al menos 8 carácteres.\n-Debe tener al menos una mayúscula.\n-Debe tener al menos un número.\n-Debe tener al menos un carácter especial."
                      }
                    />
                  </div>
                  <Box className="flex justify-center">
                    <Button
                      variant="contained"
                      color="secondary"
                      className=" w-[200px] mb-[10px]"
                      aria-label="Register"
                      type="submit"
                      size="large"
                    >
                      Crear usuario
                    </Button>

                    {alertt && (
                      <Stack
                        className="mt-[10px]"
                        sx={{ width: "100%" }}
                        spacing={2}
                      >
                        <Alert severity="success">
                          Usuario registrado correctamente!!
                        </Alert>
                      </Stack>
                    )}
                    {error && (
                      <Stack
                        className="mt-[10px]"
                        sx={{ width: "100%" }}
                        spacing={2}
                      >
                        <Alert severity="warning">
                          Error!! El usuario no se ha registrado
                        </Alert>
                      </Stack>
                    )}
                  </Box>
                </div>
              </div>
            </div>
          </div>
          {!modal && <ModalAddCompany setActive={() => setModal(true)} />}
          <Dialog
            open={secondDopen}
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
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            scroll={"paper"}
          >
            <DialogTitle id="scroll-dialog-title">
              <div className="static ">
                <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 mt-[5px]">
                  Confirmar datos del nuevo usuario <DescriptionIcon />
                </Typography>
                <IconButton
                  className="absolute top-0 right-0"
                  onClick={handleCloseAlert}
                  variant="contained"
                  color="error"
                >
                  <HighlightOffIcon />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
              <Box>{<ConfirmData />}</Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAlert}>Cancelar</Button>
              <Button onClick={onSubmitAxios} autoFocus>
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      }
      scroll="content"
    />
  );
}
