/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import {
    Autocomplete,
  
    Stack,
    
    Alert,
  } from "@mui/material";
  import { useState, useEffect } from "react";
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
  import OutlinedInput from "@mui/material/OutlinedInput";
  // import jwtService from '../../auth/services/jwtService';
  /* Importaciones mias */
  import Select from "@mui/material/Select";
  import MenuItem from "@mui/material/MenuItem";
  import FusePageSimple from "@fuse/core/FusePageSimple";
  import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";
  import { CallApiParticipants } from "../../store/CallApiParticipants";
  
  const schema = yup.object().shape({
    user: yup.string().required("Debe ingresar su nombre completo"),
    email: yup
      .string()
      .email("Debe ingresar un email correcto")
      .required("Debe completar este campo"),
    password: yup
      .string()
      .required("Por favor ingrese una contraseña")
      // .matches(/[A-Z]/, "La contraseña debe tener almenos una MAYUSCULA")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "La contraseña debe tener almenos una mayuscula, un numero y un caracter especial"
      )
      .min(8, "Contraseña demasiado corta - mínimo 8 caracteres."),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  
    project: yup.string(),
  });
  const defaultValues = {
    user: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    project: "",
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
  
  // eslint-disable-next-line import/prefer-default-export
  // export const CreateUserApp = () => {
  function CreateUserApp(props) {
    const theme = useTheme();
    const [apiResponseProyects, setApiResponseProyects] = useState([]);
    const { control, formState, handleSubmit, reset } = useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });
    const [personName, setPersonName] = useState([]);
    const [rolName, setRolName] = useState("");
    const [alertt, setAlertt] = useState(false);
    const [error, setError] = useState(false);
    const { isValid, dirtyFields, errors } = formState;
    const handleChangeProyect = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
    const handleChangeRol = (event) => {
      const {
        target: { value },
      } = event;
      setRolName(value);
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
      const fetchData = async () => {
        let prueba;
        // eslint-disable-next-line prefer-const
        prueba = await CallApiParticipants();
        return prueba;
      };
      fetchData().then((value) => {
        setApiResponseProyects(value);
      });
    },  [alertt, error]);
    function onSubmit(e) {
      const data = {
        email: e.email,
        username: e.user,
        nombre: e.firstName,
        apellido: e.lastName,
        password: e.password,
        rol: rolName,
      };
      axios.post(jwtServiceConfig.signUp, data)
      .then((response) => {
        setAlertt(true);
      })
      .catch((error) => {
        setError(true);
      });
    }
    return (
      <div className="flex flex-col  items-center md:items-start justify-center md:justify-start flex-1 h-full w-full ">
        <Paper className=" md:flex md:items-center md:justify-end w-full  h-full   rounded-2xl  shadow  border-r-1 ">
          <div className="w-full  h-full  mx-auto sm:mx-0">
            {/* <div className="divLogo_">
              <img className="LogoTrgns" src="assets/images/logo/logoTRGNS.png" />
            </div> */}
            <Typography className="mt-32 text-4xl font-extrabold text-center tracking-tight leading-tight">
              Editar Usuario
            </Typography>
  
            <form
              name="EditUserForm"
              noValidate
              className="flex flex-wrap ssmmax:flex-col justify-between  ssmmax:p-[20px] w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
            
              <Controller
                name="user"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="m-24 w-auto "
                    label="Usuario"
                    
                    type="user"
                    error={!!errors.user}
                    helperText={errors?.user?.message}
                    variant="outlined"
                    required
                    
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="m-24 w-auto "
                    label="Nombre"
                    
                    type="name"
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                    variant="outlined"
                    required
                    
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="m-24 w-auto"
                    label="Apellido"
                    
                    type="apellido"
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                    variant="outlined"
                    required
                    
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="m-24 w-auto"
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    
                  />
                )}
              />
  
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="m-24 w-auto"
                    label="Contraseña (Antigua)"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    
                  />
                )}
              />
  
              <Controller
                name="passwordConfirm"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="m-24 w-auto"
                    label="Contraseña (Nueva)"
                    type="password"
                    error={!!errors.passwordConfirm}
                    helperText={errors?.passwordConfirm?.message}
                    variant="outlined"
                    required
                    
                  />
                )}
              />
              <Controller
                name="project"
                control={control}
                render={({ field }) => (
                  <FormControl
                    className="m-24 min-w-[240px]"
                    label="project"
                    error={!!errors.project}
                    type="select"
                    required
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Seleccione clientes
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={personName}
                      onChange={handleChangeProyect}
                      input={<OutlinedInput label="Name" />}
                      // MenuProps={MenuProps}
                    >
                      {apiResponseProyects.data != undefined ? (
                        apiResponseProyects.data.map((e) => (
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
                  </FormControl>
                )}
              />
              <Controller
                name="rol"
                control={control}
                render={({ field }) => (
                  <FormControl
                    className="m-24 min-w-[240px]"
                    label="Rol"
                    type="select"
                    required
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Seleccione rol
                    </InputLabel>
                    <Select
                      value={rolName}
                      onChange={handleChangeRol}
                      input={<OutlinedInput label="Name" />}
                      // MenuProps={MenuProps}
                    >
                      <MenuItem id="1" value="admin">
                        ADMIN
                      </MenuItem>
                      <MenuItem id="2" value="trgns">
                        TRGNS
                      </MenuItem>
                      <MenuItem id="3" value="cliente">
                        CLIENTE
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            <Box className="flex justify-evenly  w-full">
            <Button
                variant="contained"
                color="secondary"
                className="max-w-[240px] mt-24 mb-24"
                aria-label="Register"
                // disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="max-w-[240px]  mt-24 mb-24"
                aria-label="Register"
                // disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Guardar
              </Button>
            </Box>
              
              {alertt && (
                <Stack className="mt-[10px]" sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="success">
                    Usuario registrado correctamente!!
                  </Alert>
                </Stack>
              )}
              {error && (
                <Stack className="mt-[10px]" sx={{ width: "100%"}} spacing={2}>
                  <Alert severity="warning">
                    Error!! El usuario no se ha registrado
                  </Alert>
                </Stack>
              )}
            </form>
          </div>
        </Paper>
        
        {/* <Box
          className="relative hidden md:flex flex-auto  h-full p-64 lg:px-112 overflow-hidden opacity-50"
          id="box_der"
          sx={{ backgroundColor: "secondary.main" }}
        /> */}
      </div>
    );
  }
  
  export default CreateUserApp;
  